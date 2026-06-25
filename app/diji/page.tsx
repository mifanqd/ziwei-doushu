/**
 * /diji — 地纪「下知地理」完整学习页
 * 数据来自 lib/nihai：国家地理志（未竟）、堪舆理论、遗稿后学
 */

import Link from 'next/link';
import { DIJI_MODULES, DIJI_STATS } from '@/lib/nihai';

export const metadata = {
  title: '地纪 · 下知地理 — 倪海夏未竟之业（国家地理志 · 堪舆理论）',
  description:
    '倪海厦《地纪》学习页：地之纪，原计划 60 岁后以风水地理知识重写各国地理志，研究地理与国民性格、物产、国运的关系。倪师 2012 年辞世未竟，现整理国家地理志构想、堪舆理论基础与遗稿后学。',
  keywords: ['地纪', '倪海厦', '倪海夏', '风水', '堪舆', '国家地理', '国运', '阳宅', '阴宅'],
};

const STATUS_LABEL: Record<string, { text: string; bg: string; color: string }> = {
  active: { text: '已开放', bg: 'rgba(120,140,90,0.18)', color: '#9fb07e' },
  preview: { text: '遗稿研读', bg: 'rgba(120,140,90,0.14)', color: '#9fb07e' },
  coming: { text: '整理中', bg: 'rgba(150,150,150,0.14)', color: 'var(--tx-3)' },
};

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, rgba(120,140,90,0.45))' }} />
      <span style={{ fontSize: 11, color: '#9fb07e', letterSpacing: '0.35em' }}>{label}</span>
      <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, rgba(120,140,90,0.45))' }} />
    </div>
  );
}

export default function DijiPage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* 顶栏 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(120,140,90,0.18)', background: 'var(--bg-page)' }}>
        <Link href="/tianji" style={{ fontSize: 12, color: '#9fb07e', letterSpacing: '0.2em', textDecoration: 'none' }}>← 天纪</Link>
        <div style={{ fontSize: 12, color: 'var(--tx-3)', letterSpacing: '0.2em' }}>倪师三纪 · 地纪</div>
        <Link href="/" style={{ fontSize: 12, color: '#9fb07e', letterSpacing: '0.2em', textDecoration: 'none' }}>首页 →</Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 py-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, rgba(120,140,90,0.45))' }} />
          <span style={{ fontSize: 11, color: '#9fb07e', letterSpacing: '0.4em' }}>DI JI · 下知地理</span>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, rgba(120,140,90,0.45))' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.18em', marginBottom: 14 }}>地　纪</h1>
        <p style={{ fontSize: 14, color: 'var(--tx-2)', letterSpacing: '0.06em', maxWidth: 640, margin: '0 auto', lineHeight: 1.8 }}>
          地之纪，地理志的体系化研究。倪师原计划六十岁后，以天文地理知识与医学素养重写各国地理志，
          研究国家人性、物产与风水地理的关系。
        </p>
        {/* 未竟之业提示 */}
        <div className="mx-auto mt-6" style={{ maxWidth: 560 }}>
          <div style={{
            fontSize: 12.5, color: '#9fb07e', lineHeight: 1.8, padding: '12px 18px', borderRadius: 12,
            border: '1px dashed rgba(120,140,90,0.4)', background: 'rgba(120,140,90,0.05)',
          }}>
            ⊞ 倪师未竟之业 —— {DIJI_STATS.note}。<br />现有内容整理自天纪堪舆学部分及后辈遗稿。
          </div>
        </div>
      </div>

      {/* 模块 + 章节 */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <Divider label="地纪模块" />
        <div className="flex flex-col gap-6">
          {DIJI_MODULES.map((m) => {
            const st = STATUS_LABEL[m.status] ?? STATUS_LABEL.coming;
            return (
              <section key={m.id} className="rounded-2xl p-6"
                style={{ border: '1px solid rgba(120,140,90,0.18)', background: 'rgba(120,140,90,0.025)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 26, color: '#9fb07e' }}>{m.icon}</span>
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
                    <p key={i} style={{ fontSize: 13, color: 'var(--tx-2)', lineHeight: 1.85, paddingLeft: 14, borderLeft: '2px solid rgba(120,140,90,0.3)' }}>{d}</p>
                  ))}
                </div>

                {m.chapters.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {m.chapters.map((ch) => (
                      <div key={ch.id} className="rounded-xl p-4" style={{ background: 'rgba(120,140,90,0.06)', border: '1px solid rgba(120,140,90,0.12)' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--tx-0)' }}>{ch.title}</div>
                        {ch.subtitle && <div style={{ fontSize: 11, color: '#9fb07e', letterSpacing: '0.08em', marginTop: 2 }}>{ch.subtitle}</div>}
                        <div style={{ fontSize: 12.5, color: 'var(--tx-2)', lineHeight: 1.7, margin: '8px 0' }}>{ch.description}</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {ch.keyPoints.map((kp, i) => (
                            <li key={i} style={{ fontSize: 12, color: 'var(--tx-2)', lineHeight: 1.7, paddingLeft: 14, position: 'relative' }}>
                              <span style={{ position: 'absolute', left: 0, color: '#9fb07e' }}>·</span>{kp}
                            </li>
                          ))}
                        </ul>
                        {ch.quotes?.map((q, i) => (
                          <div key={i} style={{ fontSize: 12, color: 'var(--tx-3)', fontStyle: 'italic', marginTop: 8, paddingLeft: 10, borderLeft: '2px solid rgba(120,140,90,0.35)' }}>「{q}」</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {m.keywords.map((k) => (
                    <span key={k} style={{ fontSize: 11, color: 'var(--tx-3)', padding: '2px 8px', borderRadius: 6, background: 'rgba(120,140,90,0.07)' }}>{k}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--tx-3)', lineHeight: 1.8 }}>
                  <span style={{ color: '#9fb07e' }}>参考：</span>{m.references.join(' · ')}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="max-w-4xl mx-auto px-6 py-16 mt-6 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(120,140,90,0.15)', paddingTop: 24 }}>
        <Link href="/tianji" style={{ fontSize: 13, color: '#9fb07e', textDecoration: 'none', letterSpacing: '0.1em' }}>← 上知天文 · 天纪</Link>
        <Link href="/chart" style={{ fontSize: 13, color: '#9fb07e', textDecoration: 'none', letterSpacing: '0.1em' }}>立即排盘 →</Link>
      </div>
    </div>
  );
}
