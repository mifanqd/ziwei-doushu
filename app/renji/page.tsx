/**
 * /renji — 人纪「中知人事」完整学习页
 * 数据来自 lib/nihai：针灸 / 内经 / 本草 / 伤寒 / 金匮 + 经方/经验穴/透针/汉唐方
 */

import Link from 'next/link';
import {
  RENJI_MODULES, ACU_EXPERIENCES, TRANS_NEEDLING,
  HANTANG_FORMULAS, CLASSIC_FORMULAS, RENJI_STATS,
} from '@/lib/nihai';
import type { AcuExperience } from '@/lib/nihai';

export const metadata = {
  title: '人纪 · 中知人事 — 倪海夏经方中医（针灸·内经·本草·伤寒·金匮）',
  description:
    '倪海厦《人纪》完整学习页：2004-2005 年完成，150+ 集。涵盖针灸大成、黄帝内经、神农本草经、伤寒论、金匮要略，含经典经方、针灸经验穴、透针法、汉唐方剂。仅供中医文化学习参考。',
  keywords: ['人纪', '倪海厦', '倪海夏', '经方', '针灸', '黄帝内经', '伤寒论', '金匮要略', '神农本草经', '中医'],
};

const AC = '#a98cba'; // 人纪紫
const STATUS_LABEL: Record<string, { text: string; bg: string; color: string }> = {
  active: { text: '已开放', bg: 'rgba(139,107,158,0.18)', color: AC },
  preview: { text: '预览', bg: 'rgba(139,107,158,0.14)', color: AC },
  coming: { text: '整理中', bg: 'rgba(150,150,150,0.14)', color: 'var(--tx-3)' },
};

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, rgba(139,107,158,0.5))' }} />
      <span style={{ fontSize: 11, color: AC, letterSpacing: '0.35em' }}>{label}</span>
      <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, rgba(139,107,158,0.5))' }} />
    </div>
  );
}

export default function RenjiPage() {
  // 针灸经验穴按分类分组
  const acuByCat = ACU_EXPERIENCES.reduce<Record<string, AcuExperience[]>>((acc, e) => {
    (acc[e.category] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* 顶栏 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(139,107,158,0.2)', background: 'var(--bg-page)' }}>
        <Link href="/diji" style={{ fontSize: 12, color: AC, letterSpacing: '0.2em', textDecoration: 'none' }}>← 地纪</Link>
        <div style={{ fontSize: 12, color: 'var(--tx-3)', letterSpacing: '0.2em' }}>倪师三纪 · 人纪</div>
        <Link href="/" style={{ fontSize: 12, color: AC, letterSpacing: '0.2em', textDecoration: 'none' }}>首页 →</Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 py-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, rgba(139,107,158,0.5))' }} />
          <span style={{ fontSize: 11, color: AC, letterSpacing: '0.4em' }}>REN JI · 中知人事</span>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, rgba(139,107,158,0.5))' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.18em', marginBottom: 14 }}>人　纪</h1>
        <p style={{ fontSize: 14, color: 'var(--tx-2)', letterSpacing: '0.06em', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
          中知人事，倪海厦经方中医教学体系。2004-2005 年完成，共 150+ 集。
          以「针灸 → 黄帝内经 → 神农本草经 → 伤寒论 → 金匮要略」为学习次第，
          经方一剂知、二剂已。
        </p>
        {/* 免责声明 */}
        <div className="mx-auto mt-6" style={{ maxWidth: 580 }}>
          <div style={{
            fontSize: 12, color: AC, lineHeight: 1.75, padding: '10px 16px', borderRadius: 12,
            border: '1px dashed rgba(139,107,158,0.4)', background: 'rgba(139,107,158,0.05)',
          }}>
            ⚕ 本页为中医文化学习与典籍整理，仅供研究参考，<strong>不构成诊断或用药建议</strong>。如有不适请就医，方药须经专业中医师辨证。
          </div>
        </div>
      </div>

      {/* 统计条 */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { n: '150+', l: '课程集数' },
            { n: RENJI_STATS.totalModules, l: '经典课程' },
            { n: RENJI_STATS.acuExperienceCount, l: '针灸经验穴' },
            { n: RENJI_STATS.transNeedlingCount, l: '透针法' },
            { n: RENJI_STATS.hantangFormulaCount, l: '汉唐方剂' },
            { n: RENJI_STATS.classicFormulaCount, l: '经典经方' },
          ].map((s, i) => (
            <div key={i} className="text-center py-4 rounded-xl"
              style={{ border: '1px solid rgba(139,107,158,0.18)', background: 'rgba(139,107,158,0.03)' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: AC, letterSpacing: '0.04em' }}>{s.n}</div>
              <div style={{ fontSize: 11, color: 'var(--tx-3)', letterSpacing: '0.1em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* 学习次第 */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          {RENJI_STATS.learningOrder.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <span style={{ color: AC, opacity: 0.6 }}>→</span>}
              <span style={{
                fontSize: 12, color: 'var(--tx-2)', padding: '4px 12px', borderRadius: 999,
                border: '1px solid rgba(139,107,158,0.25)', background: 'rgba(139,107,158,0.04)',
              }}>{s}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 课程模块 + 章节 */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <Divider label="经典课程" />
        <div className="flex flex-col gap-6">
          {RENJI_MODULES.map((m) => {
            const st = STATUS_LABEL[m.status] ?? STATUS_LABEL.coming;
            return (
              <section key={m.id} className="rounded-2xl p-6"
                style={{ border: '1px solid rgba(139,107,158,0.18)', background: 'rgba(139,107,158,0.025)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 26, color: AC }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.06em' }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--tx-3)', letterSpacing: '0.12em', marginTop: 2 }}>{m.nameEn} · {m.subtitle}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: st.color, background: st.bg, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{st.text}</span>
                </div>

                <p style={{ fontSize: 13.5, color: 'var(--tx-2)', lineHeight: 1.8, marginBottom: 14 }}>{m.description}</p>

                <div className="flex flex-col gap-2 mb-4">
                  {m.details.map((d, i) => (
                    <p key={i} style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.85, paddingLeft: 14, borderLeft: '2px solid rgba(139,107,158,0.3)' }}>{d}</p>
                  ))}
                </div>

                {m.chapters.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {m.chapters.map((ch) => (
                      <div key={ch.id} className="rounded-xl p-4" style={{ background: 'rgba(139,107,158,0.06)', border: '1px solid rgba(139,107,158,0.12)' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tx-0)' }}>{ch.title}</div>
                        {ch.subtitle && <div style={{ fontSize: 11, color: AC, letterSpacing: '0.08em', marginTop: 2 }}>{ch.subtitle}</div>}
                        <div style={{ fontSize: 12.5, color: 'var(--tx-2)', lineHeight: 1.7, margin: '8px 0' }}>{ch.description}</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {ch.keyPoints.map((kp, i) => (
                            <li key={i} style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.7, paddingLeft: 14, position: 'relative' }}>
                              <span style={{ position: 'absolute', left: 0, color: AC }}>·</span>{kp}
                            </li>
                          ))}
                        </ul>
                        {ch.quotes?.map((q, i) => (
                          <div key={i} style={{ fontSize: 12, color: 'var(--tx-3)', fontStyle: 'italic', marginTop: 8, paddingLeft: 10, borderLeft: `2px solid rgba(139,107,158,0.35)` }}>「{q}」</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {m.keywords.map((k) => (
                    <span key={k} style={{ fontSize: 11, color: 'var(--tx-3)', padding: '2px 8px', borderRadius: 6, background: 'rgba(139,107,158,0.07)' }}>{k}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.8 }}>
                  <span style={{ color: AC }}>参考：</span>{m.references.join(' · ')}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 经典经方 */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Divider label="经典经方 · 伤寒金匮" />
        <div className="grid sm:grid-cols-2 gap-3">
          {CLASSIC_FORMULAS.map((f) => (
            <div key={f.id} className="rounded-xl p-4" style={{ border: '1px solid rgba(139,107,158,0.14)', background: 'rgba(139,107,158,0.02)' }}>
              <div className="flex items-baseline justify-between mb-1">
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--tx-0)' }}>{f.name}</span>
                <span style={{ fontSize: 11, color: AC }}>{f.source}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.65, marginBottom: 4 }}>{f.composition}</div>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.6 }}><span style={{ color: AC }}>主治：</span>{f.indication}</div>
              {f.niUsage && <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.6, marginTop: 4 }}><span style={{ color: AC }}>倪师：</span>{f.niUsage}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 汉唐方剂 */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Divider label="汉唐方剂" />
        <div className="grid sm:grid-cols-2 gap-3">
          {HANTANG_FORMULAS.map((f) => (
            <div key={f.id} className="rounded-xl p-4" style={{ border: '1px solid rgba(139,107,158,0.14)', background: 'rgba(139,107,158,0.02)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-0)', marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.6 }}><span style={{ color: AC }}>主治：</span>{f.indication}</div>
              {f.theory && <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.6, marginTop: 4 }}>{f.theory}</div>}
              {f.ingredients && <div style={{ fontSize: 11, color: 'var(--tx-3)', lineHeight: 1.6, marginTop: 4 }}><span style={{ color: AC }}>组成：</span>{f.ingredients}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 针灸经验穴 */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Divider label="针灸经验穴" />
        <div className="flex flex-col gap-5">
          {Object.entries(acuByCat).map(([cat, list]) => (
            <div key={cat}>
              <div style={{ fontSize: 13, fontWeight: 600, color: AC, letterSpacing: '0.1em', marginBottom: 8 }}>{cat}</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.map((a) => (
                  <div key={a.id} className="rounded-lg p-3" style={{ border: '1px solid rgba(139,107,158,0.1)', background: 'rgba(139,107,158,0.02)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx-1)' }}>{a.condition}</div>
                    <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.6, marginTop: 2 }}>{a.acupoints}</div>
                    {a.note && <div style={{ fontSize: 11, color: 'var(--tx-3)', marginTop: 2 }}>{a.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 透针法 */}
      <div className="max-w-4xl mx-auto px-6 py-10 pb-16">
        <Divider label="透针透穴法" />
        <div className="grid sm:grid-cols-2 gap-3">
          {TRANS_NEEDLING.map((t) => (
            <div key={t.id} className="rounded-xl p-4" style={{ border: '1px solid rgba(139,107,158,0.14)', background: 'rgba(139,107,158,0.02)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx-0)' }}>{t.combo}</div>
              <div style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.6, marginTop: 4 }}><span style={{ color: AC }}>主治：</span>{t.indication}</div>
              {t.supporting && <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.6, marginTop: 2 }}><span style={{ color: AC }}>配穴：</span>{t.supporting}</div>}
              <div style={{ fontSize: 11, color: 'var(--tx-3)', marginTop: 4, opacity: 0.8 }}>来源：{t.source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="max-w-4xl mx-auto px-6 pb-16 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(139,107,158,0.15)', paddingTop: 24 }}>
        <Link href="/tianji" style={{ fontSize: 13, color: AC, textDecoration: 'none', letterSpacing: '0.1em' }}>← 天纪</Link>
        <Link href="/chart" style={{ fontSize: 13, color: AC, textDecoration: 'none', letterSpacing: '0.1em' }}>立即排盘 →</Link>
      </div>
    </div>
  );
}
