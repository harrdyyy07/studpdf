'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TextPool {
    id: string;
    label: string;
    texts: string[];
}

const TEXT_POOLS: TextPool[] = [
    {
        id: 'quotes',
        label: 'Engineering Quotes',
        texts: [
            "Talk is cheap. Show me the code.",
            "Simplicity is prerequisite for reliability.",
            "The most damaging phrase in the language is: It's always been done this way.",
            "Programs must be written for people to read, and only incidentally for machines to execute.",
            "First, solve the problem. Then, write the code.",
            "Software is a great combination between artistry and engineering.",
            "There are only two hard things in Computer Science: cache invalidation and naming things."
        ]
    },
    {
        id: 'javascript',
        label: 'JavaScript Code',
        texts: [
            "const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);",
            "fetch(url).then(res => res.json()).then(data => console.log(data));",
            "const unique = [...new Set(array)];",
            "setTimeout(() => { console.log(\"Time's up!\"); }, 1000);",
            "const isEven = (num) => num % 2 === 0;",
            "const doubleVal = array.map(x => x * 2);",
            "const sum = arr.reduce((acc, curr) => acc + curr, 0);",
            "class Node { constructor(val) { this.val = val; this.next = null; } }"
        ]
    },
    {
        id: 'python',
        label: 'Python Code',
        texts: [
            "def find_max(numbers):\n    return max(numbers) if numbers else None",
            "squares = [x**2 for x in range(10) if x % 2 == 0]",
            "import math\narea = math.pi * (radius ** 2)",
            "with open('data.txt', 'r') as file:\n    content = file.read()",
            "class Car:\n    def __init__(self, brand):\n        self.brand = brand",
            "primes = [x for x in range(2, 50) if all(x % y != 0 for y in range(2, x))]"
        ]
    },
    {
        id: 'cpp',
        label: 'C++ Code',
        texts: [
            "std::cout << \"Hello, VTUwise C++ Typist!\" << std::endl;",
            "vector<int> dp(n + 1, 0); dp[0] = 1; dp[1] = 1;",
            "for (int i = 0; i < n; ++i) { sum += arr[i]; }",
            "struct Node { int data; Node* next; };",
            "std::unique_ptr<int> ptr = std::make_unique<int>(42);",
            "template <typename T> T myMax(T a, T b) { return (a > b) ? a : b; }"
        ]
    },
    {
        id: 'htmlcss',
        label: 'HTML & CSS Web',
        texts: [
            "<div className=\"container flex items-center justify-between mx-auto\">",
            "<button onClick={handleClick} className=\"btn-primary\">Submit</button>",
            "body { font-family: 'DM Sans', sans-serif; display: flex; }",
            "grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));",
            "animation: float-blob 15s infinite alternate ease-in-out;",
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        ]
    },
    {
        id: 'science',
        label: 'Hardware & IoT',
        texts: [
            "The hardware is what makes a machine fast; the software is what makes a fast machine slow.",
            "Silicon valleys are not built on technology alone, but on the collaborative engineering of human minds.",
            "Microcontrollers are the silent nervous systems of modern automated devices, executing millions of clock cycles in milliseconds.",
            "A compiler is a bridge that translates human imagination into binary logic gates.",
            "Embedded systems combine microprocessors with custom software algorithms to manage physical constraints."
        ]
    }
];

export default function TypingTestClient() {
    const [selectedPoolId, setSelectedPoolId] = useState('quotes');
    const [duration, setDuration] = useState(30); // 30s or 60s
    
    // Active states
    const [targetText, setTargetText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [started, setStarted] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isCompleted, setIsCompleted] = useState(false);
    const [totalTyped, setTotalTyped] = useState(0);
    const [errors, setErrors] = useState(0);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const resetTest = useCallback((_customText?: string) => {
        setUserInput('');
        setStarted(false);
        setTimeLeft(duration);
        setIsCompleted(false);
        setTotalTyped(0);
        setErrors(0);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }, [duration]);

    const loadRandomText = useCallback((poolId: string) => {
        const pool = TEXT_POOLS.find(p => p.id === poolId) || TEXT_POOLS[0];
        const texts = pool.texts;
        if (texts.length <= 1) {
            setTargetText(texts[0] || '');
            resetTest(texts[0] || '');
            return;
        }

        // Prevent selecting the exact same text sequentially
        let rand = targetText;
        let attempts = 0;
        while ((rand === targetText || !rand) && attempts < 15) {
            rand = texts[Math.floor(Math.random() * texts.length)];
            attempts++;
        }
        
        setTargetText(rand);
        resetTest(rand);
    }, [targetText, resetTest]);

    // Initial text loader
    useEffect(() => {
        loadRandomText(selectedPoolId);
    }, [selectedPoolId, loadRandomText]);

    // Update duration selector
    const handleDurationChange = (secs: number) => {
        setDuration(secs);
        setTimeLeft(secs);
        resetTest();
    };

    // Triggered on first key press
    const startTimer = () => {
        setStarted(true);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

        timerIntervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsCompleted(true);
                    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Process keystrokes
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isCompleted) return;

        const val = e.target.value;

        // Limit inputs length to target text
        if (val.length > targetText.length) return;

        // Start timer on first char
        if (!started && val.length > 0) {
            startTimer();
        }

        // Calculate active errors
        let errorCount = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i] !== targetText[i]) {
                errorCount++;
            }
        }

        setUserInput(val);
        setErrors(errorCount);
        setTotalTyped(val.length);

        // Auto complete when finished text
        if (val.length === targetText.length) {
            setIsCompleted(true);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        }
    };

    // Focus input area when workspace card is clicked
    const focusEditor = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Calculations
    const timeUsed = duration - timeLeft;
    const timeFactor = timeUsed > 0 ? timeUsed / 60 : 1 / 60; // minimum time factor to avoid infinity
    
    // WPM is standardly calculated as: (total characters typed / 5) / time elapsed in minutes
    const wpm = Math.round((totalTyped / 5) / timeFactor);
    
    // Accuracy is calculated based on correct keystrokes
    const accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;

    // Categorize typing tiers
    const getTypistTier = (wpmVal: number) => {
        if (wpmVal >= 80) return { label: 'Grandmaster Typist 🚀', desc: 'Incredible speed! You type at a professional developer caliber.', color: '#10b981' };
        if (wpmVal >= 55) return { label: 'Pro Typist 💻', desc: 'Excellent speed! Perfect for writing code quickly.', color: '#06b6d4' };
        if (wpmVal >= 35) return { label: 'Intermediate Coder', desc: 'Healthy typing velocity. Good logic writing speed.', color: '#f59e0b' };
        return { label: 'Novice Keyboardist', desc: 'Keep practicing! Focus on layout consistency.', color: '#94a3b8' };
    };

    const tier = getTypistTier(wpm);

    return (
        <div className="typing-page">
            <div className="typing-header no-print">
                <div className="container typing-header-inner">
                    <div>
                        <span className="typing-eyebrow">⌨️ Speed Finger Runs</span>
                        <h1 className="typing-title">Typing Speed Test</h1>
                    </div>
                    <button className="btn-typing-reset" onClick={() => loadRandomText(selectedPoolId)}>
                        ↺ Random Text
                    </button>
                </div>
            </div>

            <div className="typing-container">
                <div className="typing-layout">
                    
                    {/* ── Settings Panel ── */}
                    <div className="settings-panel no-print">
                        <div className="settings-section">
                            <span className="settings-label">Coding & Tech Category</span>
                            <div className="pool-selector-group">
                                {TEXT_POOLS.map(p => (
                                    <button 
                                        key={p.id}
                                        className={`pool-btn ${selectedPoolId === p.id ? 'active' : ''}`}
                                        onClick={() => setSelectedPoolId(p.id)}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="settings-section">
                            <span className="settings-label">Timer Duration</span>
                            <div className="duration-selector-group">
                                <button className={`duration-btn ${duration === 30 ? 'active' : ''}`} onClick={() => handleDurationChange(30)}>30 Seconds</button>
                                <button className={`duration-btn ${duration === 60 ? 'active' : ''}`} onClick={() => handleDurationChange(60)}>60 Seconds</button>
                            </div>
                        </div>
                    </div>

                    {/* ── Active Play Board ── */}
                    {!isCompleted ? (
                        <div className="typing-play-view">
                            <div className="live-stats-bar no-print">
                                <div className="stat-pill">
                                    <span className="stat-key">WPM</span>
                                    <span className="stat-val wpm-accent">{wpm}</span>
                                </div>
                                <div className="stat-pill">
                                    <span className="stat-key">Accuracy</span>
                                    <span className="stat-val">{accuracy}%</span>
                                </div>
                                <div className="stat-pill">
                                    <span className="stat-key">Time Left</span>
                                    <span className="stat-val timer-accent">{timeLeft}s</span>
                                </div>
                            </div>

                            {/* Styled reference text area */}
                            <div className={`reference-card ${isFocused ? 'focused' : ''}`} onClick={focusEditor}>
                                <div className="text-display">
                                    {targetText.split('').map((char, index) => {
                                        let className = '';
                                        const isTyped = index < userInput.length;
                                        const isCurrent = index === userInput.length;
                                        
                                        if (isTyped) {
                                            className = userInput[index] === char ? 'char-correct' : 'char-incorrect';
                                        }

                                        return (
                                            <span 
                                                key={index} 
                                                className={`char-span ${className} ${isCurrent && isFocused ? 'char-active' : ''}`}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </div>
                                
                                {!started && !isFocused && (
                                    <div className="start-prompt">
                                        Click inside the card and start typing to initiate the timer.
                                    </div>
                                )}
                            </div>

                            {/* Invisible Textarea overlay captures raw input */}
                            <textarea
                                ref={inputRef}
                                value={userInput}
                                onChange={handleInputChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="hidden-textarea"
                                placeholder="Type here..."
                                autoFocus
                                spellCheck="false"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                        </div>
                    ) : (
                        /* ── Completion Results Panel ── */
                        <div className="typing-results-panel">
                            <div className="results-hero-card">
                                <div className="results-hero-glow" />
                                
                                <div className="wpm-circle-wrapper">
                                    <div className="wpm-circle" style={{ borderColor: tier.color }}>
                                        <span className="circle-wpm-val" style={{ color: tier.color }}>{wpm}</span>
                                        <span className="circle-wpm-lbl">WPM</span>
                                    </div>
                                </div>

                                <div className="results-hero-info">
                                    <h2>Test Results Summary</h2>
                                    <span className="tier-badge" style={{ background: `${tier.color}20`, color: tier.color }}>
                                        {tier.label}
                                    </span>
                                    <p className="tier-desc">{tier.desc}</p>

                                    <div className="stats-breakdown-grid">
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Accuracy</span>
                                            <span className="stat-val">{accuracy}%</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Correct Keystrokes</span>
                                            <span className="stat-val text-passed">{totalTyped - errors}</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Total Typos</span>
                                            <span className="stat-val text-failed">{errors}</span>
                                        </div>
                                    </div>

                                    <div className="actions-row">
                                        <button className="btn-result-action primary" onClick={() => loadRandomText(selectedPoolId)}>
                                            ↺ Retake Test
                                        </button>
                                        <button className="btn-result-action secondary" onClick={() => resetTest()}>
                                            ↺ Try Same Text
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .typing-page {
                    background: var(--background);
                    min-height: 90vh;
                }

                .typing-header {
                    background: linear-gradient(135deg, #2e0854 0%, #1c0637 100%);
                    padding: 3rem 1.5rem 2rem;
                    color: white;
                }

                .typing-header-inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .typing-eyebrow {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.15em;
                    color: #d946ef;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                .typing-title {
                    font-size: 2.2rem;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    line-height: 1;
                }

                .btn-typing-reset {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 0.5rem 1.25rem;
                    border-radius: 99px;
                    color: white;
                    font-size: 0.82rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .btn-typing-reset:hover {
                    background: rgba(255, 255, 255, 0.18);
                }

                .typing-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 5rem;
                }

                .typing-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                /* Settings panel */
                .settings-panel {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem;
                    padding: 1.5rem 2rem;
                    box-shadow: var(--card-shadow);
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                @media (min-width: 640px) {
                    .settings-panel {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .settings-section {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .settings-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .pool-selector-group,
                .duration-selector-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .pool-btn,
                .duration-btn {
                    padding: 0.45rem 0.95rem;
                    background: var(--background);
                    border: 1.5px solid var(--surface-border);
                    color: var(--text-muted);
                    border-radius: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: border-color 0.2s, color 0.2s, background 0.2s;
                }

                .pool-btn:hover,
                .duration-btn:hover {
                    border-color: var(--primary);
                    color: var(--text);
                }

                .pool-btn.active,
                .duration-btn.active {
                    background: rgba(139, 92, 246, 0.05);
                    border-color: var(--primary);
                    color: var(--primary);
                }

                /* Play area */
                .typing-play-view {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .live-stats-bar {
                    display: flex;
                    gap: 1rem;
                }

                .live-stats-bar .stat-pill {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    padding: 0.6rem 1.5rem;
                    border-radius: 1rem;
                    box-shadow: var(--card-shadow);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .stat-key {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                }

                .stat-val {
                    font-size: 1.3rem;
                    font-weight: 900;
                    color: var(--text);
                }

                .wpm-accent { color: var(--primary); }
                .timer-accent { color: #ec4899; }

                /* Reference sheet */
                .reference-card {
                    background: var(--surface);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 1.5rem;
                    padding: 2.5rem;
                    box-shadow: var(--card-shadow);
                    cursor: text;
                    position: relative;
                    min-height: 180px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }

                .reference-card.focused {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
                }

                .text-display {
                    font-family: 'Fira Code', 'Courier New', Courier, monospace;
                    font-size: 1.35rem;
                    line-height: 1.7;
                    color: var(--text-muted);
                    white-space: pre-wrap;
                    letter-spacing: 0.5px;
                }

                .char-span {
                    border-radius: 3px;
                    padding: 0 1px;
                    transition: color 0.08s;
                }

                /* Monkeytype-like minimalistic aesthetics */
                .char-correct {
                    color: var(--text);
                    opacity: 0.95;
                }

                .char-incorrect {
                    color: #ef4444;
                    border-bottom: 2.5px solid #ef4444;
                }

                .char-active {
                    border-left: 2px solid var(--primary);
                    animation: blink-caret 1s step-end infinite;
                    color: var(--text);
                    margin-left: -1px;
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent; }
                    50% { border-color: var(--primary); }
                }

                .start-prompt {
                    position: absolute;
                    inset: 0;
                    background: rgba(255, 255, 255, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    border-radius: 1.5rem;
                }

                [data-theme="dark"] .start-prompt {
                    background: rgba(30, 30, 30, 0.95);
                    color: #f8fafc;
                }

                /* Hidden textarea handles input capture */
                .hidden-textarea {
                    position: absolute;
                    left: -9999px;
                    opacity: 0;
                }

                /* Results Page */
                .typing-results-panel {
                    max-width: 760px;
                    margin: 0 auto;
                }

                .results-hero-card {
                    background: linear-gradient(135deg, #2e0854 0%, #150328 100%);
                    border-radius: 1.5rem;
                    padding: 2.5rem;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 15px 40px rgba(46, 8, 84, 0.2);
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    align-items: center;
                }

                @media (min-width: 640px) {
                    .results-hero-card {
                        flex-direction: row;
                    }
                }

                .results-hero-glow {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(circle, rgba(217, 70, 239, 0.15), transparent 70%);
                    pointer-events: none;
                }

                .wpm-circle-wrapper {
                    flex-shrink: 0;
                }

                .wpm-circle {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 8px solid rgba(255, 255, 255, 0.12);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.2);
                }

                .circle-wpm-val {
                    font-size: 3rem;
                    font-weight: 900;
                    line-height: 1;
                    margin-bottom: 0.1rem;
                }

                .circle-wpm-lbl {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: rgba(255, 255, 255, 0.5);
                    letter-spacing: 0.05em;
                }

                .results-hero-info {
                    flex: 1;
                }

                .results-hero-info h2 {
                    font-size: 1.8rem;
                    font-weight: 850;
                    margin-bottom: 0.5rem;
                }

                .tier-badge {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 0.3rem 0.75rem;
                    border-radius: 99px;
                    margin-bottom: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .tier-desc {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }

                .stats-breakdown-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .result-stat-box {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .stat-lbl {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: rgba(255, 255, 255, 0.45);
                    text-transform: uppercase;
                }

                .result-stat-box .stat-val {
                    font-size: 1.25rem;
                    font-weight: 900;
                    color: white;
                }

                .text-passed { color: #10b981 !important; }
                .text-failed { color: #ef4444 !important; }

                .actions-row {
                    display: flex;
                    gap: 0.75rem;
                }

                .btn-result-action {
                    padding: 0.6rem 1.25rem;
                    border-radius: 0.6rem;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-result-action.primary {
                    background: white;
                    color: #2e0854;
                    border: none;
                }

                .btn-result-action.primary:hover {
                    background: #fdf4ff;
                    transform: translateY(-1px);
                }

                .btn-result-action.secondary {
                    background: rgba(255, 255, 255, 0.12);
                    border: 1.5px solid rgba(255, 255, 255, 0.2);
                    color: white;
                }

                .btn-result-action.secondary:hover {
                    background: rgba(255, 255, 255, 0.18);
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
}
