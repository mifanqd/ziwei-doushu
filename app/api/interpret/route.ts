import { NextRequest } from 'next/server';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import { STEMS, BRANCHES } from '@/lib/ziwei/constants';

// DeepSeek / OpenAI 兼容接口，需在服务器侧调用，强制 Node 运行时
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

interface ProviderConfig {
  apiKey: string;
  baseUrl: string; // 不含 /chat/completions
  model: string;
}

/** 根据环境变量解析 AI 提供商配置（默认 DeepSeek，亦兼容任意 OpenAI 协议供应商） */
function resolveProvider(): ProviderConfig | null {
  const provider = (process.env.AI_PROVIDER || 'deepseek').toLowerCase();

  if (provider === 'deepseek') {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return null;
    return {
      apiKey,
      baseUrl: 'https://api.deepseek.com/v1',
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    };
  }

  // 通用 OpenAI 兼容供应商（如 mimo、硅基流动、Kimi 等）
  const apiKey = process.env.MIMO_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = process.env.MIMO_BASE_URL || process.env.OPENAI_BASE_URL;
  const model = process.env.MIMO_MODEL || process.env.OPENAI_MODEL;
  if (!apiKey || !baseUrl || !model) return null;
  return { apiKey, baseUrl: baseUrl.replace(/\/$/, ''), model };
}

/** 将命盘结构化数据压缩成可读中文摘要，作为 system prompt 上下文 */
function summarizeChart(chart: ZiweiChart): string {
  const { birthInfo, lunarInfo } = chart;
  const genderText = birthInfo.gender === 'male' ? '男' : '女';
  const lines: string[] = [];

  lines.push('【命主基本信息】');
  lines.push(
    `${birthInfo.name ? birthInfo.name + '，' : ''}${genderText}命，公历 ${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日 ${BRANCHES[birthInfo.hour]}时。`,
  );
  lines.push(
    `农历 ${lunarInfo.lunarYear}年${lunarInfo.isLeapMonth ? '闰' : ''}${Math.abs(lunarInfo.lunarMonth)}月${lunarInfo.lunarDay}日，` +
      `${STEMS[lunarInfo.yearStem]}${BRANCHES[lunarInfo.yearBranch]}年。`,
  );
  lines.push(
    `五行局：${chart.wuxingJuName}；命宫在${BRANCHES[chart.mingGongBranch]}，身宫在${BRANCHES[chart.shenGongBranch]}。`,
  );
  lines.push(`当前年龄 ${chart.currentAge} 岁。`);

  lines.push('\n【十二宫排布】');
  const sorted = [...chart.palaces].sort((a, b) => a.branch - b.branch);
  for (const p of sorted) {
    lines.push(formatPalace(p));
  }

  const curDaXian = chart.daXians[chart.currentDaXianIndex];
  if (curDaXian) {
    let dx = `\n【当前大限】${curDaXian.startAge}-${curDaXian.endAge}岁，行${curDaXian.palaceName}（${BRANCHES[curDaXian.palaceBranch]}）`;
    if (curDaXian.siHua) {
      dx += `，大限四化：禄${curDaXian.siHua.lu}、权${curDaXian.siHua.quan}、科${curDaXian.siHua.ke}、忌${curDaXian.siHua.ji}`;
    }
    lines.push(dx);
  }

  return lines.join('\n');
}

function formatPalace(p: Palace): string {
  const tags: string[] = [];
  if (p.isMingGong) tags.push('命宫');
  if (p.isShenGong) tags.push('身宫');
  if (p.isCurrentDaXian) tags.push('当前大限');
  const tagText = tags.length ? `[${tags.join('/')}]` : '';

  const starText =
    p.stars.length > 0
      ? p.stars
          .map((s) => {
            let t = s.name;
            if (s.siHua) t += `化${s.siHua}`;
            if (s.brightness === 'bright') t += '(庙旺)';
            else if (s.brightness === 'dim') t += '(落陷)';
            return t;
          })
          .join('、')
      : p.borrowedStars && p.borrowedStars.length
        ? `空宫，借对宫【${p.borrowedFromName}】之 ${p.borrowedStars.join('、')}`
        : '空宫';

  const selfHua =
    p.selfSihua && p.selfSihua.length
      ? `；宫干自化：${p.selfSihua.map((m) => `${m.starName}自化${m.siHua}`).join('、')}`
      : '';

  return `· ${STEMS[p.stem]}${BRANCHES[p.branch]} ${p.name}${tagText}：${starText}${selfHua}`;
}

const SYSTEM_PROMPT = `你是一位精通紫微斗数（倪海厦天纪体系）的命理分析师。请基于用户提供的命盘数据，结合星曜、四化、宫位、格局、大限等信息，给出专业、具体、有条理的解读。

要求：
1. 直接针对用户的问题作答，不要重复罗列命盘原始数据。
2. 论断要落到具体星曜与宫位上，说明推理依据，避免空泛套话。
3. 客观中正，趋吉避凶，不做绝对化的吉凶断言，不涉及医疗、违法等敏感建议。
4. 使用简体中文，条理清晰，可用小标题与分点。`;

export async function POST(req: NextRequest) {
  const cfg = resolveProvider();
  if (!cfg) {
    return new Response(
      JSON.stringify({ error: '未配置 AI 提供商，请在环境变量中设置 DEEPSEEK_API_KEY。' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let chart: ZiweiChart;
  let messages: ChatMessage[];
  try {
    const body = await req.json();
    chart = body.chart;
    messages = Array.isArray(body.messages) ? body.messages : [];
    if (!chart || !messages.length) throw new Error('参数缺失');
  } catch {
    return new Response(JSON.stringify({ error: '请求参数无效。' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const upstreamMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'system', content: `以下是命主的命盘数据：\n${summarizeChart(chart)}` },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  let upstream: Response;
  try {
    upstream = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.apiKey}`,
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: upstreamMessages,
        stream: true,
        temperature: 0.7,
      }),
    });
  } catch {
    return new Response(JSON.stringify({ error: '无法连接 AI 服务。' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    return new Response(
      JSON.stringify({ error: `AI 服务返回错误（${upstream.status}）`, detail: detail.slice(0, 500) }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // 将上游 OpenAI 风格 SSE 转换为前端期望的 data: {"delta":{"text":"..."}} 格式
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = '';
      const emit = (text: string) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`));

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n');
          buffer = parts.pop() ?? '';
          for (const line of parts) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === '[DONE]') continue;
            try {
              const json = JSON.parse(payload);
              const delta: string = json.choices?.[0]?.delta?.content ?? '';
              if (delta) emit(delta);
            } catch {
              /* 忽略不完整分片 */
            }
          }
        }
      } catch {
        emit('\n\n（生成中断，请重试）');
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
