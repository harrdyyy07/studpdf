'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { aptitudeQuestions, AptitudeQuestion } from '@/data/aptitudeQuestionsData';

export default function AptitudeClient() {
    // --- STATE MANAGEMENT ---
    const [selectedCompany, setSelectedCompany] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [testMode, setTestMode] = useState<'timed' | 'practice'>('timed');

    // Student Profile (USN & Email as separate fields)
    const [studentProfile, setStudentProfile] = useState({
        name: '',
        usn: '',
        email: '',
        branch: 'Computer Science (CSE)',
        college: 'VTU Affiliated College'
    });
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Test Flow
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [isTestSubmitted, setIsTestSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
    const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
    
    // Timer
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // Default 30 mins
    const [timeSpent, setTimeSpent] = useState(0);

    // Score Submission Status
    const [sheetSyncStatus, setSheetSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

    // Companies Config
    const companyList = [
        { id: 'All', name: 'All Companies', badge: 'Full Mock Test', count: '45 Qs', gradient: 'linear-gradient(135deg, #6366f1, #3b82f6)' },
        { id: 'TCS', name: 'TCS NQT / Digital', badge: 'TCS Placement', count: '45 Qs', gradient: 'linear-gradient(135deg, #0284c7, #0369a1)' },
        { id: 'Infosys', name: 'Infosys DSE / SP', badge: 'Infosys Special', count: '45 Qs', gradient: 'linear-gradient(135deg, #0284c7, #2563eb)' },
        { id: 'Accenture', name: 'Accenture Cognitive', badge: 'Accenture Test', count: '45 Qs', gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
        { id: 'Wipro', name: 'Wipro NLTH / Elite', badge: 'Wipro Drive', count: '45 Qs', gradient: 'linear-gradient(135deg, #059669, #10b981)' },
        { id: 'Cognizant', name: 'Cognizant GenC', badge: 'Cognizant OA', count: '45 Qs', gradient: 'linear-gradient(135deg, #d97706, #f59e0b)' },
        { id: 'Amazon', name: 'Amazon Assessment', badge: 'Tier-1 Tech', count: '45 Qs', gradient: 'linear-gradient(135deg, #ea580c, #f97316)' },
    ];

    // Load saved student profile from localStorage
    useEffect(() => {
        const savedProfile = localStorage.getItem('vtuwise_student_profile_v2');
        if (savedProfile) {
            try {
                setStudentProfile(JSON.parse(savedProfile));
            } catch (e) { console.error(e); }
        }
    }, []);

    // Filter questions based on selected criteria
    const activeQuestions = useMemo(() => {
        return aptitudeQuestions.filter(q => {
            const matchesCompany = selectedCompany === 'All' || q.companyTags.includes(selectedCompany as any);
            const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
            return matchesCompany && matchesCategory;
        });
    }, [selectedCompany, selectedCategory]);

    // Timer Effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isTestRunning && !isTestSubmitted) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleForceSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
                setTimeSpent(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTestRunning, isTestSubmitted]);

    // Save profile to localStorage
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('vtuwise_student_profile_v2', JSON.stringify(studentProfile));
        setIsProfileModalOpen(false);
    };

    // Start Test
    const handleStartTest = () => {
        if (!studentProfile.name.trim() || !studentProfile.usn.trim() || !studentProfile.email.trim()) {
            setIsProfileModalOpen(true);
            return;
        }
        setUserAnswers({});
        setFlaggedQuestions({});
        setCurrentQuestionIndex(0);
        setTimeRemaining(Math.round(activeQuestions.length * 40)); // 40 seconds per question
        setTimeSpent(0);
        setIsTestRunning(true);
        setIsTestSubmitted(false);
        setSheetSyncStatus('idle');
    };

    // Select Answer
    const handleSelectAnswer = (questionId: string, optionIdx: number) => {
        if (isTestSubmitted) return;
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: optionIdx
        }));
    };

    // Toggle Flag
    const handleToggleFlag = (questionId: string) => {
        setFlaggedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    // Calculate Final Score & Category Stats
    const testResults = useMemo(() => {
        let score = 0;
        let total = activeQuestions.length;
        let categoryStats: Record<string, { correct: number; total: number }> = {};

        activeQuestions.forEach(q => {
            if (!categoryStats[q.category]) {
                categoryStats[q.category] = { correct: 0, total: 0 };
            }
            categoryStats[q.category].total += 1;

            if (userAnswers[q.id] === q.correctAnswerIndex) {
                score += 1;
                categoryStats[q.category].correct += 1;
            }
        });

        const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
        return { score, total, percentage, categoryStats };
    }, [activeQuestions, userAnswers]);

    // Submit Test & Auto-sync score to backend Google Sheet
    const handleSubmitTest = async () => {
        setIsTestSubmitted(true);
        setIsTestRunning(false);
        await syncScoreToGoogleSheet(testResults.score, testResults.total, testResults.percentage, timeSpent);
    };

    const handleForceSubmit = async () => {
        setIsTestSubmitted(true);
        setIsTestRunning(false);
        await syncScoreToGoogleSheet(testResults.score, testResults.total, testResults.percentage, timeSpent);
    };

    // Silent background submit score to server Google Sheet API
    const syncScoreToGoogleSheet = async (score: number, total: number, percentage: number, duration: number) => {
        setSheetSyncStatus('syncing');
        try {
            const res = await fetch('/api/student-tools/aptitude-test/submit-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentName: studentProfile.name || 'Anonymous Engineering Student',
                    usn: studentProfile.usn || 'N/A',
                    email: studentProfile.email || 'N/A',
                    branch: studentProfile.branch,
                    collegeName: studentProfile.college,
                    testMode: testMode === 'timed' ? 'Full Placement Mock Test' : 'Practice Mode',
                    companyFilter: selectedCompany === 'All' ? 'All Companies (TCS/Infosys/Accenture)' : selectedCompany,
                    score,
                    totalMarks: total,
                    percentage,
                    timeTakenSeconds: duration,
                    categoryBreakdown: testResults.categoryStats
                })
            });

            const data = await res.json();
            if (data.success) {
                setSheetSyncStatus('success');
            } else {
                setSheetSyncStatus('error');
            }
        } catch {
            setSheetSyncStatus('error');
        }
    };

    // Format Seconds to MM:SS
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Progress percentage
    const progressPercent = activeQuestions.length > 0 
        ? Math.round(((currentQuestionIndex + 1) / activeQuestions.length) * 100) 
        : 0;

    const answeredCount = Object.keys(userAnswers).length;
    const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

    return (
        <div className="pro-aptitude-container">
            {/* TOP BAR NAV */}
            <header className="pro-aptitude-header">
                <div className="pro-header-content">
                    <div className="pro-brand-zone">
                        <Link href="/student-tools" className="pro-back-link">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>Student Hub</span>
                        </Link>
                        <div className="pro-divider-vertical" />
                        <div className="pro-title-wrapper">
                            <span className="pro-eyebrow">VTUwise Placement Readiness</span>
                            <h1 className="pro-app-title">Placement Aptitude Arena</h1>
                        </div>
                    </div>

                    <div className="pro-header-actions">
                        <button 
                            className="pro-profile-pill-btn"
                            onClick={() => setIsProfileModalOpen(true)}
                        >
                            <span className="profile-avatar-icon">👤</span>
                            <div className="profile-pill-text">
                                <span className="profile-pill-name">{studentProfile.name ? studentProfile.name : 'Set Student Details'}</span>
                                <span className="profile-pill-usn">{studentProfile.usn ? studentProfile.usn : 'USN & Branch'}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* MAIN CONTAINER */}
            <main className="pro-aptitude-main">
                {!isTestRunning && !isTestSubmitted ? (
                    // --- SETUP & SELECTION DASHBOARD ---
                    <div className="pro-dashboard-layout">
                        {/* HERO BANNER */}
                        <div className="pro-hero-card">
                            <div className="hero-text-side">
                                <span className="hero-badge">🚀 Placement Drive Prep 2026</span>
                                <h2>Engineering Campus Placement Aptitude Test</h2>
                                <p>
                                    Master questions asked in tier-1 IT recruitment drives (TCS NQT, Infosys DSE/SP, Accenture, Wipro NLTH, Cognizant & Amazon).
                                    Complete timed mock tests, analyze formula solutions, and track placement records.
                                </p>
                            </div>
                            <div className="hero-metric-side">
                                <div className="metric-box">
                                    <span className="metric-number">270+</span>
                                    <span className="metric-label">Curated Questions</span>
                                </div>
                                <div className="metric-box">
                                    <span className="metric-number">6</span>
                                    <span className="metric-label">Top IT Majors</span>
                                </div>
                            </div>
                        </div>

                        {/* COMPANY SELECTION CARDS GRID */}
                        <div className="pro-section-title-row">
                            <h3>🏢 Select Target Placement Drive</h3>
                            <span className="title-subtitle">Filter questions specific to company hiring patterns</span>
                        </div>

                        <div className="company-cards-grid">
                            {companyList.map(c => (
                                <button
                                    key={c.id}
                                    className={`company-card ${selectedCompany === c.id ? 'active-company' : ''}`}
                                    onClick={() => setSelectedCompany(c.id)}
                                >
                                    <div className="company-card-header">
                                        <span className="company-badge-tag">{c.badge}</span>
                                        <span className="company-qs-count">{c.count}</span>
                                    </div>
                                    <h4 className="company-name">{c.name}</h4>
                                    <div className="company-card-footer">
                                        <span>{selectedCompany === c.id ? 'Selected Target ✓' : 'Select Company'}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* CATEGORY & MODE CONTROLS */}
                        <div className="pro-filters-row">
                            {/* TOPIC SELECTOR */}
                            <div className="filter-box">
                                <label>📚 Category Filter</label>
                                <div className="topic-chips-group">
                                    {['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Core CS & Pseudocode'].map(cat => (
                                        <button
                                            key={cat}
                                            className={`topic-chip ${selectedCategory === cat ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat === 'All' ? 'All Topics' : cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* EXAM MODE TOGGLE */}
                            <div className="filter-box mode-box">
                                <label>⚡ Exam Mode</label>
                                <div className="mode-toggle-card">
                                    <button 
                                        className={`mode-btn ${testMode === 'timed' ? 'active' : ''}`}
                                        onClick={() => setTestMode('timed')}
                                    >
                                        <span className="mode-icon">⏱️</span>
                                        <div className="mode-text">
                                            <strong>Timed Placement Exam</strong>
                                            <small>Real exam timer with placement score report</small>
                                        </div>
                                    </button>
                                    <button 
                                        className={`mode-btn ${testMode === 'practice' ? 'active' : ''}`}
                                        onClick={() => setTestMode('practice')}
                                    >
                                        <span className="mode-icon">💡</span>
                                        <div className="mode-text">
                                            <strong>Practice & Learn</strong>
                                            <small>Immediate formula keys & explanations</small>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* EXAM START ACTION FOOTER */}
                        <div className="pro-start-action-card">
                            <div className="action-summary-info">
                                <div className="info-item">
                                    <span className="info-icon">📝</span>
                                    <div>
                                        <strong>{activeQuestions.length} Questions</strong>
                                        <small>{selectedCompany === 'All' ? 'Mixed Placement Pattern' : `${selectedCompany} Pattern`}</small>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">⏱️</span>
                                    <div>
                                        <strong>{Math.round((activeQuestions.length * 40) / 60)} Minutes</strong>
                                        <small>40 seconds per question</small>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">🎯</span>
                                    <div>
                                        <strong>60% Passing Cutoff</strong>
                                        <small>Placement benchmark score</small>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="pro-launch-btn"
                                onClick={handleStartTest}
                            >
                                Launch Placement Aptitude Exam 🚀
                            </button>
                        </div>
                    </div>
                ) : isTestRunning && !isTestSubmitted ? (
                    // --- ACTIVE EXAM INTERFACE ---
                    <div className="pro-arena-grid">
                        {/* MAIN EXAM WORKSPACE */}
                        <div className="pro-question-container">
                            {/* EXAM TOP PROGRESS BAR */}
                            <div className="pro-arena-bar">
                                <div className="arena-bar-left">
                                    <span className="pro-q-pill">Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
                                    <span className="pro-cat-tag">{activeQuestions[currentQuestionIndex].category}</span>
                                    <span className={`pro-diff-tag ${activeQuestions[currentQuestionIndex].difficulty.toLowerCase()}`}>
                                        {activeQuestions[currentQuestionIndex].difficulty}
                                    </span>
                                </div>
                                <div className="arena-bar-right">
                                    <div className="pro-company-pills">
                                        {activeQuestions[currentQuestionIndex].companyTags.map(tag => (
                                            <span key={tag} className="pro-company-pill">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* PROGRESS TRACK LINE */}
                            <div className="pro-progress-track">
                                <div className="pro-progress-fill" style={{ width: `${progressPercent}%` }} />
                            </div>

                            {/* QUESTION STATEMENT */}
                            <div className="pro-question-body">
                                <h2 className="pro-question-text">{activeQuestions[currentQuestionIndex].question}</h2>

                                {activeQuestions[currentQuestionIndex].codeSnippet && (
                                    <div className="pro-code-box">
                                        <div className="code-box-header">
                                            <span>Pseudocode / Code Snippet</span>
                                            <span className="code-lang">C / C++</span>
                                        </div>
                                        <pre className="code-pre"><code>{activeQuestions[currentQuestionIndex].codeSnippet}</code></pre>
                                    </div>
                                )}

                                {/* OPTIONS LIST */}
                                <div className="pro-options-grid">
                                    {activeQuestions[currentQuestionIndex].options.map((option, idx) => {
                                        const isSelected = userAnswers[activeQuestions[currentQuestionIndex].id] === idx;
                                        return (
                                            <button
                                                key={idx}
                                                className={`pro-option-card ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleSelectAnswer(activeQuestions[currentQuestionIndex].id, idx)}
                                            >
                                                <div className="pro-option-prefix">{String.fromCharCode(65 + idx)}</div>
                                                <div className="pro-option-text">{option}</div>
                                                {isSelected && <div className="pro-option-check">✓</div>}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* PRACTICE MODE EXPLANATION BOX */}
                                {testMode === 'practice' && userAnswers[activeQuestions[currentQuestionIndex].id] !== undefined && (
                                    <div className="pro-practice-solution">
                                        <h4>💡 Solution Walkthrough & Formula</h4>
                                        <p>{activeQuestions[currentQuestionIndex].explanation}</p>
                                        {activeQuestions[currentQuestionIndex].formula && (
                                            <div className="pro-formula-badge">📐 Formula: {activeQuestions[currentQuestionIndex].formula}</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* FOOTER ACTIONS BAR */}
                            <div className="pro-question-footer">
                                <button 
                                    className={`pro-flag-btn ${flaggedQuestions[activeQuestions[currentQuestionIndex].id] ? 'flagged' : ''}`}
                                    onClick={() => handleToggleFlag(activeQuestions[currentQuestionIndex].id)}
                                >
                                    🚩 {flaggedQuestions[activeQuestions[currentQuestionIndex].id] ? 'Flagged for Review' : 'Mark for Review'}
                                </button>

                                <div className="pro-nav-group">
                                    <button 
                                        disabled={currentQuestionIndex === 0}
                                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                        className="pro-btn-secondary"
                                    >
                                        ← Previous
                                    </button>
                                    {currentQuestionIndex < activeQuestions.length - 1 ? (
                                        <button 
                                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                            className="pro-btn-primary"
                                        >
                                            Next Question →
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={handleSubmitTest}
                                            className="pro-btn-success"
                                        >
                                            Submit Exam 🏁
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE CONTROL PANEL */}
                        <div className="pro-sidebar-panel">
                            {/* TIMER CARD */}
                            <div className="pro-timer-card">
                                <span className="timer-title">TIME REMAINING</span>
                                <div className={`pro-clock ${timeRemaining < 120 ? 'critical' : ''}`}>
                                    ⏱️ {formatTime(timeRemaining)}
                                </div>
                            </div>

                            {/* PALETTE NAVIGATOR */}
                            <div className="pro-palette-card">
                                <div className="palette-header">
                                    <h4>Question Navigator</h4>
                                    <span className="palette-counts">{answeredCount}/{activeQuestions.length} Answered</span>
                                </div>

                                <div className="pro-nav-grid">
                                    {activeQuestions.map((q, idx) => {
                                        const isAnswered = userAnswers[q.id] !== undefined;
                                        const isFlagged = flaggedQuestions[q.id];
                                        const isCurrent = currentQuestionIndex === idx;

                                        let statusClass = 'unanswered';
                                        if (isCurrent) statusClass += ' current';
                                        if (isFlagged) statusClass += ' flagged';
                                        else if (isAnswered) statusClass += ' answered';

                                        return (
                                            <button
                                                key={q.id}
                                                className={`pro-grid-node ${statusClass}`}
                                                onClick={() => setCurrentQuestionIndex(idx)}
                                            >
                                                {idx + 1}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pro-legend-list">
                                    <div className="legend-row"><span className="legend-dot answered"></span> Answered ({answeredCount})</div>
                                    <div className="legend-row"><span className="legend-dot flagged"></span> Flagged ({flaggedCount})</div>
                                    <div className="legend-row"><span className="legend-dot unanswered"></span> Unanswered ({activeQuestions.length - answeredCount})</div>
                                </div>
                            </div>

                            <button className="pro-finish-early-btn" onClick={handleSubmitTest}>
                                Finish & Submit Exam 🏁
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- POST-TEST REPORT & ANALYTICS ---
                    <div className="pro-results-container">
                        <div className="pro-results-hero">
                            <div className="results-badge-ring">
                                <span className="results-percentage">{testResults.percentage}%</span>
                                <span className="results-marks">{testResults.score} / {testResults.total} Marks</span>
                            </div>

                            <div className="results-title-group">
                                <h2>{testResults.percentage >= 60 ? '🎉 Outstanding Placement Performance!' : '💪 Placement Practice Completed!'}</h2>
                                <p>
                                    Student Record: <strong>{studentProfile.name}</strong> • USN: <strong>{studentProfile.usn}</strong> • {studentProfile.branch}
                                </p>

                                <div className="results-pills-row">
                                    <span className="results-pill">⏱️ Duration: {formatTime(timeSpent)}</span>
                                    <span className="results-pill">🏢 Target Drive: {selectedCompany}</span>
                                    <span className="results-pill">📧 {studentProfile.email}</span>
                                    <span className="results-pill status">
                                        {testResults.percentage >= 60 ? 'PASSED CUTOFF 🚀' : 'NEEDS PRACTICE 📈'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SOLUTION WALKTHROUGH SECTION */}
                        <div className="pro-solutions-card">
                            <h3>Detailed Solution & Formula Walkthrough</h3>
                            <div className="solutions-stack">
                                {activeQuestions.map((q, idx) => {
                                    const userAns = userAnswers[q.id];
                                    const isCorrect = userAns === q.correctAnswerIndex;
                                    const isSkipped = userAns === undefined;

                                    return (
                                        <div key={q.id} className={`pro-solution-card ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`}>
                                            <div className="sol-card-header">
                                                <span className="sol-q-num">Q{idx + 1}</span>
                                                <h4 className="sol-q-title">{q.question}</h4>
                                                <span className={`sol-status-badge ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`}>
                                                    {isCorrect ? 'Correct (+1)' : isSkipped ? 'Skipped (0)' : 'Incorrect (0)'}
                                                </span>
                                            </div>

                                            {q.codeSnippet && (
                                                <div className="pro-code-box">
                                                    <pre className="code-pre"><code>{q.codeSnippet}</code></pre>
                                                </div>
                                            )}

                                            <div className="sol-options-grid">
                                                {q.options.map((opt, oIdx) => {
                                                    let choiceStyle = '';
                                                    if (oIdx === q.correctAnswerIndex) choiceStyle = 'correct-choice';
                                                    else if (oIdx === userAns) choiceStyle = 'user-wrong-choice';
                                                    return (
                                                        <div key={oIdx} className={`sol-option-item ${choiceStyle}`}>
                                                            <span><strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}</span>
                                                            {oIdx === q.correctAnswerIndex && <span className="sol-tag correct">Correct</span>}
                                                            {oIdx === userAns && oIdx !== q.correctAnswerIndex && <span className="sol-tag wrong">Your Answer</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="sol-explanation-box">
                                                <strong>Explanation & Logic:</strong>
                                                <p>{q.explanation}</p>
                                                {q.formula && <div className="pro-formula-badge">📐 Formula: {q.formula}</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RE-TEST ACTION */}
                        <div className="pro-results-actions">
                            <button className="pro-launch-btn" onClick={handleStartTest}>
                                🔄 Retake Placement Test
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* --- MODAL: STUDENT PROFILE --- */}
            {isProfileModalOpen && (
                <div 
                    className="aptitude-modal-backdrop"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsProfileModalOpen(false);
                    }}
                >
                    <div className="aptitude-modal">
                        <div className="modal-header">
                            <h3>👤 Student Profile Details</h3>
                            <button 
                                type="button"
                                className="modal-close-x-btn" 
                                onClick={() => setIsProfileModalOpen(false)}
                                title="Exit / Close"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSaveProfile} className="modal-form">
                            <p className="modal-desc">Enter your details so your test score is recorded in your placement drive records.</p>
                            
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g. Rahul Sharma"
                                    value={studentProfile.name}
                                    onChange={e => setStudentProfile({ ...studentProfile, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>USN (University Seat Number) *</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g. 1VT21CS045"
                                    value={studentProfile.usn}
                                    onChange={e => setStudentProfile({ ...studentProfile, usn: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address *</label>
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="e.g. student@gmail.com"
                                    value={studentProfile.email}
                                    onChange={e => setStudentProfile({ ...studentProfile, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Engineering Branch</label>
                                <select 
                                    value={studentProfile.branch}
                                    onChange={e => setStudentProfile({ ...studentProfile, branch: e.target.value })}
                                >
                                    <option value="Computer Science (CSE)">Computer Science (CSE)</option>
                                    <option value="Information Science (ISE)">Information Science (ISE)</option>
                                    <option value="Artificial Intelligence (AI & ML)">Artificial Intelligence (AI & ML)</option>
                                    <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                                    <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                                    <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                                    <option value="Civil Engineering (CV)">Civil Engineering (CV)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>College Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. BMS College of Engineering"
                                    value={studentProfile.college}
                                    onChange={e => setStudentProfile({ ...studentProfile, college: e.target.value })}
                                />
                            </div>

                            <div className="modal-action-row">
                                <button type="submit" className="modal-save-btn">Save Profile Details</button>
                                <button 
                                    type="button" 
                                    className="modal-cancel-btn"
                                    onClick={() => setIsProfileModalOpen(false)}
                                >
                                    Cancel / Exit ✕
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
