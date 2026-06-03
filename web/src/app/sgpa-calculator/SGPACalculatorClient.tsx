'use client';

import React, { useState } from 'react';
import { calculatorData } from '@/data/calculatorData';

const getGradeAndPoints = (marks: number) => {
    if (marks < 40) return { grade: 'F', points: 0 };
    if (marks >= 90) return { grade: 'S+', points: 10 };
    if (marks >= 80) return { grade: 'S', points: 9 };
    if (marks >= 70) return { grade: 'A', points: 8 };
    if (marks >= 60) return { grade: 'B', points: 7 };
    if (marks >= 50) return { grade: 'C', points: 6 };
    if (marks >= 45) return { grade: 'D', points: 5 };
    return { grade: 'E', points: 4 };
};

const gradeTable = [
    { range: 'M ≥ 90', grade: 'S+ (Outstanding)', pts: 10, color: '#10b981' },
    { range: '80 ≤ M < 90', grade: 'S (Excellent)', pts: 9, color: '#3b82f6' },
    { range: '70 ≤ M < 80', grade: 'A (Very Good)', pts: 8, color: '#6366f1' },
    { range: '60 ≤ M < 70', grade: 'B (Good)', pts: 7, color: '#8b5cf6' },
    { range: '50 ≤ M < 60', grade: 'C (Average)', pts: 6, color: '#f59e0b' },
    { range: '45 ≤ M < 50', grade: 'D (Satisfactory)', pts: 5, color: '#f97316' },
    { range: '40 ≤ M < 45', grade: 'E (Pass)', pts: 4, color: '#ef4444' },
    { range: 'M < 40', grade: 'F (Fail)', pts: 0, color: '#dc2626' },
];

const SGPACalculator = () => {
    const [scheme, setScheme]   = useState('');
    const [branch, setBranch]   = useState('');
    const [semester, setSemester] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentUsn, setStudentUsn]   = useState('');
    const [marks, setMarks]     = useState<{ [key: string]: string }>({});
    const [result, setResult]   = useState<{ sgpa: number; totalCredits: number; totalPoints: number; subjects: any[] } | null>(null);
    const [showModal, setShowModal] = useState(false);

    const schemes   = Object.keys(calculatorData);
    const branches  = scheme ? Object.keys(calculatorData[scheme]) : [];
    const semesters = scheme && branch ? Object.keys(calculatorData[scheme][branch]) : [];

    const handleCalculate = () => {
        if (!scheme || !branch || !semester) return;
        const subjects = calculatorData[scheme][branch][semester];
        let totalPoints = 0, totalCredits = 0;
        const resultSubjects: any[] = [];
        subjects.forEach((sub) => {
            const mark = parseInt(marks[sub.code] || '0');
            const { grade, points } = getGradeAndPoints(mark);
            if (sub.credits > 0) { totalPoints += points * sub.credits; totalCredits += sub.credits; }
            resultSubjects.push({ ...sub, mark: sub.credits > 0 ? mark : 'N/A', grade: sub.credits > 0 ? grade : 'NP', points: points * sub.credits });
        });
        setResult({ sgpa: totalCredits > 0 ? totalPoints / totalCredits : 0, totalCredits, totalPoints, subjects: resultSubjects });
    };

    const sgpaNum  = result?.sgpa ?? 0;
    const sgpaColor = sgpaNum >= 9 ? '#10b981' : sgpaNum >= 7 ? '#3b82f6' : sgpaNum >= 5 ? '#f59e0b' : '#ef4444';

    const generationDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <>
            <div className="calc-page">

                {/* ── Hero ───────────────────────────────────── */}
                <div className="calc-hero calc-hero-sgpa">
                    <div className="calc-hero-blob-a" />
                    <div className="calc-hero-blob-b" />
                    <div className="calc-hero-inner">
                        <div className="calc-eyebrow">📐 VTUwise Calculators</div>
                        <h1 className="calc-hero-title">SGPA Calculator</h1>
                        <p className="calc-hero-sub">Calculate your Semester Grade Point Average for any VTU scheme, branch, and semester — instantly.</p>
                        <button className="calc-grade-btn" onClick={() => setShowModal(true)}>
                            View Grading System ↗
                        </button>
                    </div>
                </div>

                {/* ── Main card ──────────────────────────────── */}
                <div className="calc-body">

                    {/* Step 1: Selectors */}
                    <div className="calc-card no-print">
                        <h2 className="calc-section-title">
                            <span className="calc-step">1</span> Select Your Details
                        </h2>
                        <div className="calc-selectors">
                            <div className="calc-field">
                                <label className="calc-label">Scheme</label>
                                <select className="calc-select" value={scheme}
                                    onChange={e => { setScheme(e.target.value); setBranch(''); setSemester(''); setResult(null); }}>
                                    <option value="">Select Scheme</option>
                                    {schemes.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="calc-field">
                                <label className="calc-label">Branch</label>
                                <select className="calc-select" value={branch} disabled={!scheme}
                                    onChange={e => { setBranch(e.target.value); setSemester(''); setResult(null); }}>
                                    <option value="">Select Branch</option>
                                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="calc-field">
                                <label className="calc-label">Semester</label>
                                <select className="calc-select" value={semester} disabled={!branch}
                                    onChange={e => { setSemester(e.target.value); setResult(null); }}>
                                    <option value="">Select Semester</option>
                                    {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Student Details + Marks */}
                    {semester && (
                        <div className="calc-card no-print">
                            <h2 className="calc-section-title">
                                <span className="calc-step">2</span> Enter Your Marks
                            </h2>

                            <div className="calc-student-grid">
                                <div className="calc-field">
                                    <label className="calc-label">Full Name (optional)</label>
                                    <input className="calc-input" type="text" placeholder="e.g. Siddharth K"
                                        value={studentName} onChange={e => setStudentName(e.target.value)} />
                                </div>
                                <div className="calc-field">
                                    <label className="calc-label">USN (optional)</label>
                                    <input className="calc-input" type="text" placeholder="e.g. 1XX21CS000"
                                        value={studentUsn} onChange={e => setStudentUsn(e.target.value)} />
                                </div>
                            </div>

                            <div className="calc-marks-list">
                                {calculatorData[scheme][branch][semester].map((sub) =>
                                    sub.credits > 0 && (
                                        <div key={sub.code} className="calc-subject-row">
                                            <div className="calc-subject-info">
                                                <span className="calc-subject-code">{sub.code}</span>
                                                <span className="calc-subject-name">{sub.name}</span>
                                                <span className="calc-subject-credits">{sub.credits} Cr</span>
                                            </div>
                                            <input
                                                type="number" min="0" max="100"
                                                placeholder="Marks"
                                                value={marks[sub.code] || ''}
                                                onChange={e => setMarks({ ...marks, [sub.code]: e.target.value })}
                                                className="calc-marks-input"
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            <button className="calc-submit-btn" onClick={handleCalculate}>
                                Calculate SGPA →
                            </button>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {result && (
                        <div className="calc-card result-print-container" id="result-card">
                            {/* PRINT HEADER - ONLY VISIBLE ON PDF/PRINT */}
                            <div className="calc-print-header only-print">
                                <div className="print-header-top">
                                    <div className="print-logo">
                                        <span className="logo-icon">📐</span>
                                        <span className="logo-text">VTUwise</span>
                                    </div>
                                    <div className="print-date">Generated on {generationDate}</div>
                                </div>
                                <h2 className="print-main-title">Academic SGPA Report</h2>
                                <div className="print-header-divider" />
                            </div>

                            <h2 className="calc-section-title no-print">
                                <span className="calc-step" style={{ background: sgpaColor }}>3</span> Your Result
                            </h2>

                            {/* meta */}
                            <div className="calc-result-meta">
                                <div><span className="calc-meta-key">Name</span><span className="calc-meta-val">{studentName || '—'}</span></div>
                                <div><span className="calc-meta-key">USN</span><span className="calc-meta-val">{studentUsn || '—'}</span></div>
                                <div><span className="calc-meta-key">Scheme</span><span className="calc-meta-val">{scheme}</span></div>
                                <div><span className="calc-meta-key">Semester</span><span className="calc-meta-val">{semester}</span></div>
                            </div>

                            {/* SGPA display */}
                            <div className="calc-result-score" style={{ borderColor: `${sgpaColor}40`, background: `${sgpaColor}0d` }}>
                                <p className="calc-score-label">Your Calculated SGPA</p>
                                <div className="calc-score-value" style={{ color: sgpaColor }}>{result.sgpa.toFixed(2)}</div>
                                <div className="calc-score-formula">
                                    <span>{result.totalPoints.toFixed(1)}</span>
                                    <div className="calc-score-divider" />
                                    <span>{result.totalCredits}</span>
                                    <span>=</span>
                                    <strong style={{ color: sgpaColor }}>{result.sgpa.toFixed(2)}</strong>
                                </div>
                                <p className="calc-score-hint">Grade Points × Credits / Total Credits</p>
                            </div>

                            {/* table */}
                            <div className="calc-table-wrap">
                                <table className="calc-table">
                                    <thead>
                                        <tr>
                                            <th>Subject Code</th>
                                            <th>Subject Name</th>
                                            <th>Marks</th>
                                            <th>Grade</th>
                                            <th>Credits</th>
                                            <th>Pts × Cr</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.subjects.map((sub, i) => (
                                            <tr key={i} className={sub.grade === 'F' ? 'calc-row-fail' : ''}>
                                                <td className="calc-td-code">{sub.code}</td>
                                                <td>{sub.name}</td>
                                                <td>{sub.mark}</td>
                                                <td className={`calc-td-grade ${sub.grade === 'F' ? 'fail' : 'pass'}`}>{sub.grade}</td>
                                                <td>{sub.credits}</td>
                                                <td>{sub.points.toFixed(1)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <button className="calc-print-btn no-print" onClick={() => window.print()}>
                                🖨 Download / Print PDF
                            </button>

                            {/* PRINT FOOTER - ONLY VISIBLE ON PDF/PRINT */}
                            <div className="calc-print-footer only-print">
                                <div className="print-footer-divider" />
                                <div className="print-footer-content">
                                    <p className="print-footer-verify">This report was electronically generated by VTUwise SGPA Calculator.</p>
                                    <p>Visit <strong>www.vtuwise.in</strong> for more calculators and academic resources.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Grading Modal */}
            {showModal && (
                <div className="calc-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="calc-modal" onClick={e => e.stopPropagation()}>
                        <div className="calc-modal-header">
                            <h3>VTU Grading System</h3>
                            <button onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div className="calc-modal-body">
                            {gradeTable.map((row, i) => (
                                <div key={i} className="calc-grade-row">
                                    <span className="calc-grade-range">{row.range}</span>
                                    <span className="calc-grade-name">{row.grade}</span>
                                    <span className="calc-grade-pts" style={{ color: row.color }}>{row.pts}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .calc-page { background: var(--background); }

                /* hero */
                .calc-hero {
                    position: relative; overflow: hidden;
                    padding: 4.5rem 1.5rem 3.5rem;
                }
                .calc-hero-sgpa {
                    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%);
                }
                .calc-hero-blob-a {
                    position: absolute; top: -5rem; right: -5rem;
                    width: 350px; height: 350px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%);
                    pointer-events: none;
                }
                .calc-hero-blob-b {
                    position: absolute; bottom: -4rem; left: -4rem;
                    width: 250px; height: 250px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%);
                    pointer-events: none;
                }
                .calc-hero-inner {
                    position: relative; z-index: 1;
                    max-width: 800px; margin: 0 auto;
                }
                .calc-eyebrow {
                    font-size: 0.75rem; font-weight: 700;
                    letter-spacing: 0.15em; text-transform: uppercase;
                    color: rgba(165,180,252,0.8); margin-bottom: 1rem;
                }
                .calc-hero-title {
                    font-size: clamp(2rem, 6vw, 3.5rem);
                    font-weight: 900; letter-spacing: -0.04em;
                    color: #fff; margin-bottom: 0.75rem; line-height: 1;
                }
                .calc-hero-sub {
                    color: rgba(199,210,254,0.75);
                    font-size: 1rem; max-width: 500px; line-height: 1.7;
                    margin-bottom: 1.5rem;
                }
                .calc-grade-btn {
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25);
                    color: #fff; font-size: 0.8rem; font-weight: 700;
                    padding: 0.5rem 1.1rem; border-radius: 999px; cursor: pointer;
                    transition: background 0.2s; backdrop-filter: blur(6px);
                }
                .calc-grade-btn:hover { background: rgba(255,255,255,0.22); }

                /* body */
                .calc-body {
                    max-width: 800px; margin: 0 auto;
                    padding: 2.5rem 1.5rem 5rem;
                    display: flex; flex-direction: column; gap: 1.5rem;
                }

                /* card */
                .calc-card {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.5rem;
                    padding: 2rem;
                    box-shadow: var(--card-shadow);
                }

                /* section title */
                .calc-section-title {
                    display: flex; align-items: center; gap: 0.75rem;
                    font-size: 1.1rem; font-weight: 900;
                    color: var(--text); margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }
                .calc-step {
                    width: 28px; height: 28px; border-radius: 8px;
                    background: var(--primary); color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.8rem; font-weight: 900; flex-shrink: 0;
                }

                /* selectors */
                .calc-selectors {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1rem;
                }
                .calc-field { display: flex; flex-direction: column; gap: 0.4rem; }
                .calc-label {
                    font-size: 0.72rem; font-weight: 700;
                    letter-spacing: 0.1em; text-transform: uppercase;
                    color: var(--text-muted);
                }
                .calc-select, .calc-input {
                    width: 100%;
                    background: var(--background);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 0.75rem;
                    padding: 0.65rem 0.9rem;
                    font-size: 0.9rem; font-weight: 600;
                    color: var(--text);
                    outline: none; transition: border-color 0.2s;
                    -webkit-appearance: none;
                }
                .calc-select:focus, .calc-input:focus { border-color: var(--primary); }
                .calc-select:disabled { opacity: 0.4; cursor: not-allowed; }

                /* student grid */
                .calc-student-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
                    margin-bottom: 1.75rem;
                }
                @media (max-width: 600px) { .calc-student-grid { grid-template-columns: 1fr; } }

                /* marks */
                .calc-marks-list { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.75rem; }
                .calc-subject-row {
                    display: flex; align-items: center; gap: 1rem;
                    padding: 0.9rem 1rem;
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    border-radius: 0.9rem;
                    transition: border-color 0.2s;
                }
                .calc-subject-row:focus-within { border-color: var(--primary); }
                .calc-subject-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
                .calc-subject-code { font-size: 0.8rem; font-weight: 800; color: var(--primary); }
                .calc-subject-name { font-size: 0.85rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .calc-subject-credits { font-size: 0.7rem; color: var(--text-muted); }
                .calc-marks-input {
                    width: 80px; flex-shrink: 0;
                    background: var(--surface);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 0.6rem;
                    padding: 0.5rem 0.6rem;
                    font-size: 0.9rem; font-weight: 700;
                    color: var(--text); text-align: center; outline: none;
                    transition: border-color 0.2s;
                }
                .calc-marks-input:focus { border-color: var(--primary); }

                /* submit */
                .calc-submit-btn {
                    width: 100%; padding: 1rem;
                    background: linear-gradient(135deg, #4f46e5, #7c3aed);
                    color: #fff; font-size: 1rem; font-weight: 900;
                    border: none; border-radius: 0.9rem; cursor: pointer;
                    transition: opacity 0.2s, transform 0.2s;
                    box-shadow: 0 8px 24px rgba(79,70,229,0.3);
                }
                .calc-submit-btn:hover { opacity: 0.92; transform: translateY(-1px); }

                /* result meta */
                .calc-result-meta {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 0.6rem 1.5rem;
                    padding: 1rem 1.25rem;
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    border-radius: 0.9rem;
                    margin-bottom: 1.5rem;
                    font-size: 0.875rem;
                }
                .calc-result-meta > div { display: flex; flex-direction: column; gap: 0.1rem; }
                .calc-meta-key { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
                .calc-meta-val { font-weight: 700; color: var(--text); }

                /* score */
                .calc-result-score {
                    border: 2px solid; border-radius: 1.25rem;
                    padding: 2rem; text-align: center; margin-bottom: 1.5rem;
                }
                .calc-score-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 0.5rem; }
                .calc-score-value { font-size: clamp(3.5rem, 12vw, 6rem); font-weight: 900; letter-spacing: -0.05em; line-height: 1; margin-bottom: 1rem; }
                .calc-score-formula { display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-size: 1rem; font-weight: 700; color: var(--text-muted); }
                .calc-score-divider { width: 40px; height: 2px; background: var(--surface-border); }
                .calc-score-hint { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.75rem; letter-spacing: 0.05em; }

                /* table */
                .calc-table-wrap { overflow-x: auto; border-radius: 0.9rem; border: 1px solid var(--surface-border); margin-bottom: 1.5rem; }
                .calc-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
                .calc-table thead { background: var(--background); }
                .calc-table th {
                    padding: 0.75rem 1rem; text-align: left;
                    font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
                    color: var(--text-muted); border-bottom: 1px solid var(--surface-border);
                    white-space: nowrap;
                }
                .calc-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--surface-border); color: var(--text-muted); }
                .calc-table tr:last-child td { border-bottom: none; }
                .calc-table tr:hover td { background: var(--background); }
                .calc-row-fail td { background: rgba(239,68,68,0.04); }
                .calc-td-code { font-weight: 800; color: var(--primary) !important; }
                .calc-td-grade { font-weight: 900; }
                .calc-td-grade.pass { color: #10b981 !important; }
                .calc-td-grade.fail { color: #ef4444 !important; }

                /* print btn */
                .calc-print-btn {
                    width: 100%; padding: 0.9rem;
                    background: var(--background); color: var(--text);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 0.9rem; font-size: 0.9rem; font-weight: 700;
                    cursor: pointer; transition: border-color 0.2s;
                }
                .calc-print-btn:hover { border-color: var(--primary); color: var(--primary); }

                /* modal */
                .calc-modal-overlay {
                    position: fixed; inset: 0; z-index: 999;
                    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
                    display: flex; align-items: center; justify-content: center; padding: 1rem;
                }
                .calc-modal {
                    background: var(--surface); border: 1px solid var(--surface-border);
                    border-radius: 1.25rem; width: 100%; max-width: 480px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                }
                .calc-modal-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid var(--surface-border);
                    font-size: 1.1rem; font-weight: 900; color: var(--text);
                }
                .calc-modal-header button {
                    background: none; border: none; cursor: pointer;
                    color: var(--text-muted); font-size: 1.2rem;
                    width: 32px; height: 32px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                }
                .calc-modal-header button:hover { background: var(--background); }
                .calc-modal-body { padding: 1rem 1.5rem 1.5rem; }
                .calc-grade-row {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 0.6rem 0; border-bottom: 1px solid var(--surface-border);
                    font-size: 0.875rem; color: var(--text-muted);
                }
                .calc-grade-row:last-child { border-bottom: none; }
                .calc-grade-range { font-family: monospace; font-weight: 700; color: var(--text); }
                .calc-grade-pts { font-weight: 900; font-size: 1rem; }

                @media print {
                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                    body {
                        background: #fff !important;
                        color: #000 !important;
                    }
                    .no-print { display: none !important; }
                    .calc-hero { display: none; }
                    .calc-page { background: white; padding-top: 0 !important; }
                    .calc-body { padding: 0 !important; max-width: 100% !important; margin: 0 !important; }
                    
                    footer, .navbar, .top-bar, .back-to-top { display: none !important; }

                    .result-print-container {
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        background: #fff !important;
                        width: 100% !important;
                    }

                    .only-print { display: block !important; }

                    .calc-print-header {
                        margin-bottom: 2rem;
                        text-align: center;
                    }
                    .print-header-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 1.5rem;
                    }
                    .print-logo {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .logo-icon { font-size: 24px; }
                    .logo-text { font-size: 20px; font-weight: 900; color: #4f46e5; }
                    .print-date { font-size: 11px; color: #666; font-weight: 500; }
                    
                    .print-main-title {
                        font-size: 28px;
                        font-weight: 900;
                        letter-spacing: -0.05em;
                        color: #000;
                        margin: 1rem 0;
                        text-transform: uppercase;
                    }
                    .print-header-divider {
                        height: 3px;
                        background: linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5);
                        border-radius: 99px;
                        margin-top: 1rem;
                    }

                    .calc-result-meta {
                        grid-template-columns: repeat(4, 1fr) !important;
                        gap: 0 !important;
                        border: 1px solid #e2e8f0 !important;
                        padding: 1.25rem !important;
                        background: #f8fafc !important;
                        margin-bottom: 2rem !important;
                    }
                    .calc-result-meta > div {
                        border-right: 1px solid #e2e8f0;
                        padding: 0 1rem;
                    }
                    .calc-result-meta > div:last-child { border-right: none; }
                    .calc-meta-key { font-size: 9px !important; margin-bottom: 4px !important; }
                    .calc-meta-val { font-size: 13px !important; }

                    .calc-result-score {
                        padding: 1.5rem !important;
                        background: #fff !important;
                        border: 2px solid #000 !important;
                        margin-bottom: 2rem !important;
                        page-break-inside: avoid;
                    }
                    .calc-score-value { font-size: 4rem !important; }
                    .calc-score-formula { font-size: 0.9rem !important; color: #000 !important; }

                    .calc-table-wrap {
                        border: 1px solid #000 !important;
                        border-radius: 0 !important;
                    }
                    .calc-table th {
                        background: #f1f5f9 !important;
                        color: #000 !important;
                        border-bottom: 1px solid #000 !important;
                        font-size: 9px !important;
                        padding: 6px 8px !important;
                    }
                    .calc-table td {
                        color: #000 !important;
                        border-bottom: 1px solid #eee !important;
                        font-size: 10px !important;
                        padding: 6px 8px !important;
                    }
                    .calc-td-grade { font-style: bold; }
                    
                    .calc-print-footer {
                        margin-top: 3rem;
                        text-align: center;
                    }
                    .print-footer-divider {
                        height: 1px;
                        background: #e2e8f0;
                        margin-bottom: 1rem;
                    }
                    .print-footer-content p {
                        font-size: 10px;
                        color: #666;
                        margin-bottom: 4px;
                    }
                    .print-footer-verify {
                        font-style: italic;
                        font-weight: 500;
                    }
                }

                .only-print { display: none; }
            `}</style>
        </>
    );
};

export default SGPACalculator;
