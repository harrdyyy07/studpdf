'use client';

import React, { useState, useEffect } from 'react';

const getRating = (cgpa: number) => {
    if (cgpa >= 9.0)  return { label: 'Outstanding 🏆',   color: '#10b981' };
    if (cgpa >= 8.25) return { label: 'Excellent ⭐',      color: '#3b82f6' };
    if (cgpa >= 7.5)  return { label: 'Very Good 👍',      color: '#6366f1' };
    if (cgpa >= 6.75) return { label: 'Good',              color: '#8b5cf6' };
    if (cgpa >= 6.0)  return { label: 'Above Average',     color: '#f59e0b' };
    if (cgpa >= 5.0)  return { label: 'Average',           color: '#f97316' };
    if (cgpa > 0)     return { label: 'Below Average',      color: '#ef4444' };
    return { label: '—', color: '#94a3b8' };
};

const CGPACalculator = () => {
    const [sgpas, setSgpas] = useState<string[]>(Array(8).fill(''));
    const [cgpa, setCgpa]   = useState('0.00');
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const active = sgpas.map(s => parseFloat(s)).filter(n => !isNaN(n) && n > 0);
        const total  = active.reduce((a, c) => a + c, 0);
        setCgpa(active.length > 0 ? (total / active.length).toFixed(2) : '0.00');
        setCompletedCount(active.length);
    }, [sgpas]);

    const cgpaNum = parseFloat(cgpa);
    const rating  = getRating(cgpaNum);

    const handleChange = (i: number, v: string) => {
        const n = [...sgpas]; n[i] = v; setSgpas(n);
    };
    const reset = () => setSgpas(Array(8).fill(''));

    return (
        <>
            <div className="cgpa-page">

                {/* ── Hero ─────────────────────────────────── */}
                <div className="cgpa-hero">
                    <div className="cgpa-blob-a" /><div className="cgpa-blob-b" />
                    <div className="cgpa-hero-inner">
                        <div className="cgpa-eyebrow">📐 VTUwise Calculators</div>
                        <h1 className="cgpa-hero-title">CGPA Calculator</h1>
                        <p className="cgpa-hero-sub">Enter your semester-wise SGPA to calculate your Cumulative Grade Point Average — updated in real time.</p>
                    </div>
                </div>

                <div className="cgpa-body">
                    <div className="cgpa-layout">

                        {/* ── Input grid ──────────────────────── */}
                        <div className="cgpa-inputs">
                            <h2 className="cgpa-section-title">Enter Semester SGPA</h2>
                            <div className="cgpa-grid">
                                {sgpas.map((val, i) => {
                                    const v = parseFloat(val);
                                    const filled = !isNaN(v) && v > 0;
                                    const pct = filled ? (v / 10) * 100 : 0;
                                    const barColor = v >= 8 ? '#10b981' : v >= 6 ? '#6366f1' : '#f59e0b';
                                    return (
                                        <div key={i} className={`cgpa-sem-card ${filled ? 'filled' : ''}`}>
                                            <div className="cgpa-sem-header">
                                                <span className="cgpa-sem-badge">S{i + 1}</span>
                                                <span className="cgpa-sem-label">Semester {i + 1}</span>
                                                {filled && <span className="cgpa-sem-val" style={{ color: barColor }}>{val}</span>}
                                            </div>
                                            <input
                                                type="number" step="0.01" min="0" max="10"
                                                placeholder="0.00"
                                                value={sgpas[i]}
                                                onChange={e => handleChange(i, e.target.value)}
                                                className="cgpa-input"
                                            />
                                            {/* mini progress bar */}
                                            <div className="cgpa-bar-track">
                                                <div className="cgpa-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button className="cgpa-reset-btn no-print" onClick={reset}>
                                ↺ Reset All
                            </button>
                        </div>

                        {/* ── Result sidebar ──────────────────── */}
                        <aside className="cgpa-aside">
                            <div className="cgpa-result-card">
                                {/* decorative glow */}
                                <div className="cgpa-result-glow" />

                                <p className="cgpa-result-label">Your CGPA</p>
                                <div className="cgpa-result-value" style={{ color: rating.color }}>
                                    {cgpa}
                                </div>

                                {/* bar chart */}
                                <div className="cgpa-chart">
                                    {sgpas.map((val, i) => {
                                        const v = parseFloat(val);
                                        const h = (!isNaN(v) && v > 0) ? (v / 10) * 100 : 8;
                                        const c = v >= 8 ? '#10b981' : v >= 6 ? '#6366f1' : v > 0 ? '#f59e0b' : 'rgba(255,255,255,0.1)';
                                        return (
                                            <div key={i} className="cgpa-bar-col">
                                                <div className="cgpa-bar-fill-v" style={{ height: `${h}%`, background: c }} />
                                                <span className="cgpa-bar-lbl">S{i + 1}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="cgpa-stats">
                                    <div className="cgpa-stat">
                                        <span className="cgpa-stat-key">Semesters Done</span>
                                        <span className="cgpa-stat-val">{completedCount} / 8</span>
                                    </div>
                                    <div className="cgpa-stat">
                                        <span className="cgpa-stat-key">Academic Rating</span>
                                        <span className="cgpa-stat-badge" style={{ background: `${rating.color}25`, color: rating.color }}>
                                            {rating.label}
                                        </span>
                                    </div>
                                </div>

                                <button className="cgpa-print-btn no-print" onClick={() => window.print()}>
                                    🖨 Print / Save PDF
                                </button>
                            </div>

                            <div className="cgpa-info-card">
                                <p className="cgpa-info-title">ℹ️ How it works</p>
                                <p className="cgpa-info-text">This calculator uses a simple average of your semester SGPAs. VTU typically follows this method. For a credit-weighted average, use your official transcript.</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <style>{`
                .cgpa-page { background: var(--background); }

                /* hero */
                .cgpa-hero {
                    position: relative; overflow: hidden;
                    background: linear-gradient(135deg, #0a0a1a 0%, #10082a 50%, #1a0a3a 100%);
                    padding: 4.5rem 1.5rem 3.5rem;
                }
                .cgpa-blob-a {
                    position: absolute; top: -5rem; right: -5rem;
                    width: 350px; height: 350px; border-radius: 50%; pointer-events: none;
                    background: radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%);
                }
                .cgpa-blob-b {
                    position: absolute; bottom: -4rem; left: -4rem;
                    width: 250px; height: 250px; border-radius: 50%; pointer-events: none;
                    background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);
                }
                .cgpa-hero-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
                .cgpa-eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(196,181,253,0.8); margin-bottom: 0.9rem; }
                .cgpa-hero-title { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900; letter-spacing: -0.04em; color: #fff; margin-bottom: 0.7rem; line-height: 1; }
                .cgpa-hero-sub { color: rgba(199,210,254,0.7); font-size: 1rem; max-width: 480px; line-height: 1.7; }

                /* body */
                .cgpa-body { max-width: 860px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; }
                .cgpa-layout { display: grid; grid-template-columns: 1fr; gap: 2rem; }
                @media (min-width: 860px) { .cgpa-layout { grid-template-columns: 1fr 280px; align-items: start; } }

                /* section title */
                .cgpa-section-title { font-size: 1rem; font-weight: 900; letter-spacing: -0.02em; color: var(--text); margin-bottom: 1.25rem; }

                /* sem grid */
                .cgpa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem; }
                .cgpa-sem-card {
                    background: var(--surface); border: 1.5px solid var(--surface-border);
                    border-radius: 0.9rem; padding: 0.9rem 1rem;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .cgpa-sem-card.filled { border-color: rgba(99,102,241,0.4); box-shadow: 0 0 0 3px rgba(99,102,241,0.06); }
                .cgpa-sem-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
                .cgpa-sem-badge {
                    width: 24px; height: 24px; border-radius: 6px;
                    background: var(--primary); color: #fff;
                    font-size: 0.65rem; font-weight: 900;
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .cgpa-sem-label { font-size: 0.72rem; font-weight: 700; color: var(--text-muted); flex: 1; }
                .cgpa-sem-val { font-size: 0.75rem; font-weight: 900; }
                .cgpa-input {
                    width: 100%; background: var(--background);
                    border: 1.5px solid var(--surface-border); border-radius: 0.55rem;
                    padding: 0.45rem 0.6rem; font-size: 1rem; font-weight: 700;
                    color: var(--text); outline: none; transition: border-color 0.2s; margin-bottom: 0.6rem;
                }
                .cgpa-input:focus { border-color: var(--primary); }
                .cgpa-bar-track { height: 4px; background: var(--surface-border); border-radius: 99px; overflow: hidden; }
                .cgpa-bar-fill { height: 100%; border-radius: 99px; transition: width 0.4s ease, background 0.4s ease; }

                /* reset */
                .cgpa-reset-btn {
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    background: none; border: 1.5px solid var(--surface-border);
                    color: var(--text-muted); font-size: 0.8rem; font-weight: 700;
                    padding: 0.5rem 1rem; border-radius: 999px; cursor: pointer;
                    transition: border-color 0.2s, color 0.2s;
                }
                .cgpa-reset-btn:hover { border-color: var(--primary); color: var(--primary); }

                /* result card */
                .cgpa-aside { display: flex; flex-direction: column; gap: 1rem; }
                @media (min-width: 860px) { .cgpa-aside { position: sticky; top: 6rem; } }
                .cgpa-result-card {
                    background: linear-gradient(145deg, #1e1b4b, #0f0c29);
                    border-radius: 1.5rem; padding: 2rem 1.75rem;
                    color: #fff; position: relative; overflow: hidden;
                    box-shadow: 0 20px 60px rgba(79,70,229,0.3);
                }
                .cgpa-result-glow {
                    position: absolute; bottom: -3rem; right: -3rem;
                    width: 160px; height: 160px; border-radius: 50%; pointer-events: none;
                    background: radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%);
                }
                .cgpa-result-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(196,181,253,0.7); margin-bottom: 0.5rem; }
                .cgpa-result-value { font-size: 5rem; font-weight: 900; letter-spacing: -0.06em; line-height: 1; margin-bottom: 1.25rem; transition: color 0.5s; }

                /* bar chart */
                .cgpa-chart { display: flex; align-items: flex-end; gap: 4px; height: 60px; margin-bottom: 1.25rem; }
                .cgpa-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
                .cgpa-bar-fill-v { width: 100%; border-radius: 3px 3px 0 0; transition: height 0.4s ease, background 0.4s ease; min-height: 4px; }
                .cgpa-bar-lbl { font-size: 0.45rem; color: rgba(255,255,255,0.4); font-weight: 700; }

                /* stats */
                .cgpa-stats { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.1rem; display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem; }
                .cgpa-stat { display: flex; justify-content: space-between; align-items: center; }
                .cgpa-stat-key { font-size: 0.8rem; color: rgba(255,255,255,0.55); }
                .cgpa-stat-val { font-size: 1.1rem; font-weight: 900; color: rgba(165,180,252,0.9); }
                .cgpa-stat-badge { font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: 999px; }

                /* print */
                .cgpa-print-btn {
                    width: 100%; padding: 0.75rem;
                    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                    color: #fff; border-radius: 0.75rem; font-size: 0.85rem; font-weight: 700;
                    cursor: pointer; transition: background 0.2s;
                }
                .cgpa-print-btn:hover { background: rgba(255,255,255,0.18); }

                /* info card */
                .cgpa-info-card {
                    background: var(--surface); border: 1px solid var(--surface-border);
                    border-radius: 1rem; padding: 1.1rem 1.25rem;
                }
                .cgpa-info-title { font-size: 0.85rem; font-weight: 800; color: var(--text); margin-bottom: 0.4rem; }
                .cgpa-info-text { font-size: 0.78rem; color: var(--text-muted); line-height: 1.65; }

                @media print {
                    .no-print { display: none !important; }
                    .cgpa-hero { display: none; }
                    .cgpa-page { background: white; padding-top: 0 !important; }
                    footer, .navbar, .top-bar, .back-to-top { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default CGPACalculator;
