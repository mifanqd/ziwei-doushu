/**
 * /tianji — 天纪「上知天文」完整学习页
 * 数据来自 lib/nihai：术数体系（紫微/易经/堪舆/推命/面相/测字）
 */

import Link from 'next/link';
import {
  TIANJI_MODULES, HEXAGRAMS, FENGSHUI_ENTRIES, TIANJI_EPISODES,
  TIANJI_QUOTES, TIANJI_STATS,
} from '@/lib/nihai';

export const metadata = {
  title: '天纪 · 上知天文 — 倪海夏术数体系（紫微·易经·堪舆·推命·面相·测字）',
  description:
    '倪海厦《天纪》完整学习页：1994 年录制 24 集（48 小时）。涵盖紫微斗数（三合派）、易经 64 卦、堪舆风水（九星派）、推命、面相、测字，含课程集数纲要、核心章节、倪师语录。',
  keywords: ['天纪', '倪海厦', '倪海夏', '紫微斗数', '易经', '堪舆', '风水', '面相', '测字', '术数'],
};

const STATUS_LABEL: Record<string, { text: string; bg: string; color: string }> = {
  active: { text: '已开放', bg: 'rgba(184,146,42,0.16)', color: 'var(--ac)' },
  preview: { text: '预览', bg: 'rgba(120,140,90,0.16)', color: '#9fb07e' },
  coming: { text: '整理中', bg: 'rgba(150,150,150,0.14)', color: 'var(--tx-3)' },
};

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, rgba(184,146,42,0.4))' }} />
      <span style={{ fontSize: 11, color: 'var(--ac)', letterSpacing: '0.35em' }}>{label}</span>
      <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, rgba(184,146,42,0.4))' }} />
    </div>
  );
}

export default function TianjiPage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* 顶栏 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/" style={{ fontSize: 12, color: 'var(--ac)', letterSpacing: '0.3em', textDecoration: 'none' }}>← 首页</Link>
        <div style={{ fontSize: 12, color: 'var(--tx-3)', letterSpacing: '0.2em' }}>倪师三纪 · 天纪</div>
        <Link href="/diji" style={{ fontSize: 12, color: 'var(--ac)', letterSpacing: '0.2em', textDecoration: 'none' }}>地纪 →</Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 py-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, rgba(184,146,42,0.4))' }} />
          <span style={{ fontSize: 11, color: 'var(--ac)', letterSpacing: '0.4em' }}>TIAN JI · 上知天文</span>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, rgba(184,146,42,0.4))' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.18em', marginBottom: 14 }}>天　纪</h1>
        <p style={{ fontSize: 14, color: 'var(--tx-2)', letterSpacing: '0.06em', maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
          天之纪，术数研究的体系化成果。倪海厦 1994 年录制《天纪》共 24 集（48 小时），
          讲义分《天机道》《人间道》《地脉道》《64 卦易图》四册。
          <br />前一小时讲命学，后一小时讲易经。
        </p>
      </div>

      {/* 统计条 */}
      <div className="max-w-4xl mx-auto px-6 mb-14">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { n: TIANJI_STATS.videoHours + 'h', l: '视频时长' },
            { n: TIANJI_STATS.videoEpisodes, l: '原始集数' },
            { n: TIANJI_STATS.hdEpisodes, l: '高清集数' },
            { n: TIANJI_STATS.totalModules, l: '术数模块' },
            { n: TIANJI_STATS.totalHexagrams, l: '易经卦' },
            { n: TIANJI_STATS.totalQuotes, l: '倪师语录' },
          ].map((s, i) => (
            <div key={i} className="text-center py-4 rounded-xl"
              style={{ border: '1px solid rgba(184,146,42,0.15)', background: 'rgba(184,146,42,0.03)' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ac)', letterSpacing: '0.04em' }}>{s.n}</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', letterSpacing: '0.1em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* 学派标签 */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {TIANJI_STATS.schools.map((s) => (
            <span key={s} style={{
              fontSize: 12, color: 'var(--tx-2)', padding: '4px 12px', borderRadius: 999,
              border: '1px solid rgba(184,146,42,0.2)', background: 'rgba(184,146,42,0.04)',
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* 术数模块 + 章节 */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <Divider label="术数模块" />
        <div className="flex flex-col gap-6">
          {TIANJI_MODULES.map((m) => {
            const st = STATUS_LABEL[m.status] ?? STATUS_LABEL.coming;
            return (
              <section key={m.id} className="rounded-2xl p-6"
                style={{ border: '1px solid rgba(184,146,42,0.16)', background: 'var(--bg-card, rgba(184,146,42,0.02))' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 26, color: 'var(--ac)' }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.06em' }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--tx-3)', letterSpacing: '0.12em', marginTop: 2 }}>{m.nameEn} · {m.subtitle}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: st.color, background: st.bg, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{st.text}</span>
                </div>

                <p style={{ fontSize: 13.5, color: 'var(--tx-2)', lineHeight: 1.8, marginBottom: 14 }}>{m.description}</p>

                {/* 详细介绍 */}
                <div className="flex flex-col gap-2 mb-4">
                  {m.details.map((d, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.85, paddingLeft: 14, borderLeft: '2px solid rgba(184,146,42,0.25)' }}>{d}</p>
                  ))}
                </div>

                {/* 章节 */}
                {m.chapters.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {m.chapters.map((ch) => (
                      <div key={ch.id} className="rounded-xl p-4" style={{ background: 'rgba(184,146,42,0.05)', border: '1px solid rgba(184,146,42,0.1)' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tx-0)' }}>{ch.title}</div>
                        {ch.subtitle && <div style={{ fontSize: 11, color: 'var(--ac)', letterSpacing: '0.08em', marginTop: 2 }}>{ch.subtitle}</div>}
                        <div style={{ fontSize: 12.5, color: 'var(--tx-2)', lineHeight: 1.7, margin: '8px 0' }}>{ch.description}</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {ch.keyPoints.map((kp, i) => (
                            <li key={i} style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.7, paddingLeft: 14, position: 'relative' }}>
                              <span style={{ position: 'absolute', left: 0, color: 'var(--ac)' }}>·</span>{kp}
                            </li>
                          ))}
                        </ul>
                        {ch.quotes?.map((q, i) => (
                          <div key={i} style={{ fontSize: 12, color: 'var(--tx-3)', fontStyle: 'italic', marginTop: 8, paddingLeft: 10, borderLeft: '2px solid rgba(184,146,42,0.3)' }}>「{q}」</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* 关键词 + 参考 */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {m.keywords.map((k) => (
                    <span key={k} style={{ fontSize: 11, color: 'var(--tx-3)', padding: '2px 8px', borderRadius: 6, background: 'rgba(184,146,42,0.06)' }}>{k}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.8 }}>
                  <span style={{ color: 'var(--ac)' }}>参考：</span>{m.references.join(' · ')}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 课程集数 */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Divider label="课程集数 · 24 DVD" />
        <div className="grid sm:grid-cols-2 gap-3">
          {TIANJI_EPISODES.map((ep) => (
            <div key={ep.dvd} className="rounded-xl p-4" style={{ border: '1px solid rgba(184,146,42,0.12)', background: 'rgba(184,146,42,0.02)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--bg-page)', background: 'var(--ac)', borderRadius: 6, padding: '1px 8px' }}>DVD {ep.dvd}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--ac)' }}>前｜</span>{ep.firstHalf}
              </div>
              <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.6, marginBottom: 6 }}>
                <span style={{ color: 'var(--ac)' }}>后｜</span>{ep.secondHalf}
              </div>
              <div className="flex flex-wrap gap-1">
                {ep.highlights.map((h, i) => (
                  <span key={i} style={{ fontSize: 10.5, color: 'var(--tx-3)', padding: '1px 6px', borderRadius: 5, background: 'rgba(184,146,42,0.05)' }}>{h}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 易经 64 卦 */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Divider label="易经 · 六十四卦" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {HEXAGRAMS.map((h) => (
            <div key={h.number} className="rounded-xl p-4" style={{ border: '1px solid rgba(184,146,42,0.12)', background: 'rgba(184,146,42,0.02)' }}>
              <div className="flex items-baseline justify-between mb-1">
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--tx-0)' }}>{h.number}. {h.name}</span>
                <span style={{ fontSize: 11, color: 'var(--ac)' }}>{h.composition}</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--tx-3)', marginBottom: 6 }}>上{h.upper} · 下{h.lower}</div>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.65, marginBottom: 4 }}>{h.niInterpretation}</div>
              <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.6 }}><span style={{ color: 'var(--ac)' }}>断：</span>{h.divination}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 堪舆 */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Divider label="堪舆 · 风水要诀" />
        <div className="grid sm:grid-cols-2 gap-3">
          {FENGSHUI_ENTRIES.map((f) => (
            <div key={f.id} className="rounded-xl p-4" style={{ border: '1px solid rgba(184,146,42,0.12)', background: 'rgba(184,146,42,0.02)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tx-0)', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--tx-2)', lineHeight: 1.7, marginBottom: 8 }}>{f.description}</div>
              <div className="flex flex-wrap gap-1.5">
                {f.keyPoints.map((kp, i) => (
                  <span key={i} style={{ fontSize: 11, color: 'var(--tx-3)', padding: '2px 8px', borderRadius: 6, background: 'rgba(184,146,42,0.06)' }}>{kp}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 倪师语录 */}
      <div className="max-w-4xl mx-auto px-6 py-10 pb-20">
        <Divider label="倪师语录" />
        <div className="grid sm:grid-cols-2 gap-3">
          {TIANJI_QUOTES.map((q, i) => (
            <div key={i} className="rounded-xl p-4" style={{ border: '1px solid rgba(184,146,42,0.1)', background: 'rgba(184,146,42,0.02)' }}>
              <div style={{ fontSize: 13, color: 'var(--tx-1)', lineHeight: 1.8 }}>「{q.text}」</div>
              <div style={{ fontSize: 11, color: 'var(--ac)', letterSpacing: '0.1em', marginTop: 8 }}>— {q.topic}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="max-w-4xl mx-auto px-6 pb-16 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(184,146,42,0.12)', paddingTop: 24 }}>
        <Link href="/chart" style={{ fontSize: 13, color: 'var(--ac)', textDecoration: 'none', letterSpacing: '0.1em' }}>→ 立即排盘</Link>
        <Link href="/diji" style={{ fontSize: 13, color: 'var(--ac)', textDecoration: 'none', letterSpacing: '0.1em' }}>下知地理 · 地纪 →</Link>
      </div>
    </div>
  );
}
