'use client';

import { useState, useEffect, useRef, useCallback, type ChangeEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';

interface TextPool {
    id: string;
    label: string;
    icon: string;
    texts: string[];
}

const TEXT_POOLS: TextPool[] = [
    {
        id: 'quotes',
        label: 'Engineering Quotes',
        icon: '💬',
        texts: [
            "Talk is cheap. Show me the code.",
            "Simplicity is prerequisite for reliability in all software design.",
            "The most damaging phrase in the language is: It's always been done this way.",
            "Programs must be written for people to read, and only incidentally for machines to execute.",
            "First, solve the problem. Then, write the code.",
            "Software is a great combination between artistry and engineering.",
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
            "Premature optimization is the root of all evil in programming.",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
        ]
    },
    {
        id: 'javascript',
        label: 'JavaScript Code',
        icon: '⚡',
        texts: [
            "const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2);",
            "fetch(url).then(res => res.json()).then(data => console.log(data));",
            "const unique = [...new Set(array.filter(Boolean))];",
            "const isEven = (num) => num % 2 === 0;",
            "const doubleVal = array.map(x => x * 2);",
            "const sum = arr.reduce((acc, curr) => acc + curr, 0);",
            "const deepClone = (obj) => JSON.parse(JSON.stringify(obj));",
            "const debounce = (fn, delay) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); }; };"
        ]
    },
    {
        id: 'python',
        label: 'Python Code',
        icon: '🐍',
        texts: [
            "squares = [x**2 for x in range(10) if x % 2 == 0]",
            "primes = [x for x in range(2, 50) if all(x % y != 0 for y in range(2, x))]",
            "filtered = list(filter(lambda x: x > 0, numbers))",
            "def find_max(numbers): return max(numbers) if numbers else None",
            "word_count = {word: words.count(word) for word in set(words)}",
            "matrix = [[col for col in range(5)] for row in range(5)]",
            "data = sorted(items, key=lambda item: item['score'], reverse=True)"
        ]
    },
    {
        id: 'cpp',
        label: 'C++ Code',
        icon: '⚙️',
        texts: [
            "std::cout << \"Hello, VTUwise C++ Typist!\" << std::endl;",
            "vector<int> dp(n + 1, 0); dp[0] = 1; dp[1] = 1;",
            "for (int i = 0; i < n; ++i) { sum += arr[i]; }",
            "struct Node { int val; Node* next; Node(int x) : val(x), next(nullptr) {} };",
            "std::unique_ptr<int> ptr = std::make_unique<int>(42);",
            "template <typename T> T myMax(T a, T b) { return (a > b) ? a : b; }",
            "std::sort(vec.begin(), vec.end(), std::greater<int>());"
        ]
    },
    {
        id: 'htmlcss',
        label: 'HTML & CSS Web',
        icon: '🎨',
        texts: [
            "<div className=\"container flex items-center justify-between mx-auto\">",
            "<button onClick={handleClick} className=\"btn-primary\">Submit</button>",
            "body { font-family: 'Inter', sans-serif; display: flex; min-height: 100vh; }",
            "grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));",
            "animation: float-blob 15s infinite alternate ease-in-out;",
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.15);"
        ]
    },
    {
        id: 'science',
        label: 'Hardware & IoT',
        icon: '🤖',
        texts: [
            "The hardware is what makes a machine fast; the software is what makes a fast machine slow.",
            "Silicon valleys are not built on technology alone, but on collaborative human minds.",
            "Microcontrollers execute millions of clock cycles per second to coordinate physical sensors.",
            "A compiler is a bridge that translates human logic into binary gates and register instructions.",
            "Embedded systems combine microprocessors with real-time algorithms to control autonomous robots."
        ]
    }
];

export default function TypingTestClient() {
    const [selectedPoolId, setSelectedPoolId] = useState('quotes');
    const [duration, setDuration] = useState(30); // 15s, 30s, or 60s
    
    // Active typing states
    const [targetText, setTargetText] = useState(TEXT_POOLS[0].texts[0]);
    const targetTextRef = useRef(TEXT_POOLS[0].texts[0]);
    
    const [userInput, setUserInput] = useState('');
    const [started, setStarted] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isCompleted, setIsCompleted] = useState(false);
    const [totalTypedKeys, setTotalTypedKeys] = useState(0);
    const [copiedShare, setCopiedShare] = useState(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const endTimeRef = useRef<number | null>(null);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, []);

    // Stable reset function
    const resetTest = useCallback((newDuration?: number, newTarget?: string) => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }

        const effectiveDuration = typeof newDuration === 'number' ? newDuration : duration;
        setUserInput('');
        setStarted(false);
        setTimeLeft(effectiveDuration);
        setIsCompleted(false);
        setTotalTypedKeys(0);
        startTimeRef.current = null;
        endTimeRef.current = null;

        if (newTarget) {
            setTargetText(newTarget);
            targetTextRef.current = newTarget;
        }

        // Keep editor focused
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 50);
    }, [duration]);

    // Pick a random text without re-render loop
    const loadRandomText = useCallback((poolId: string) => {
        const pool = TEXT_POOLS.find(p => p.id === poolId) || TEXT_POOLS[0];
        const texts = pool.texts;
        const current = targetTextRef.current;
        let next = current;

        if (texts.length > 1) {
            let attempts = 0;
            while (next === current && attempts < 20) {
                next = texts[Math.floor(Math.random() * texts.length)];
                attempts++;
            }
        } else {
            next = texts[0] || '';
        }

        resetTest(undefined, next);
    }, [resetTest]);

    // Handle pool switch
    const handlePoolChange = (poolId: string) => {
        setSelectedPoolId(poolId);
        loadRandomText(poolId);
    };

    // Update duration selector
    const handleDurationChange = (secs: number) => {
        setDuration(secs);
        resetTest(secs);
    };

    // Triggered on first keystroke
    const startTimer = () => {
        setStarted(true);
        startTimeRef.current = Date.now();

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

        timerIntervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerIntervalRef.current) {
                        clearInterval(timerIntervalRef.current);
                        timerIntervalRef.current = null;
                    }
                    endTimeRef.current = Date.now();
                    setIsCompleted(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Process keystrokes
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (isCompleted) return;

        const val = e.target.value;

        // Prevent typing beyond target length
        if (val.length > targetText.length) return;

        // Start timer on first char
        if (!started && val.length > 0) {
            startTimer();
        }

        // Track total key operations
        setTotalTypedKeys(prev => prev + 1);
        setUserInput(val);

        // Auto complete when all characters typed
        if (val.length === targetText.length && targetText.length > 0) {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
            endTimeRef.current = Date.now();
            setIsCompleted(true);
        }
    };

    // Focus input area when workspace card is clicked
    const focusEditor = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Keyboard shortcuts: Tab or Esc to restart
    const handleKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            loadRandomText(selectedPoolId);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            resetTest();
        }
    };

    // Desktop global typing catch: typing anywhere focuses the input
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (isCompleted) return;

            // Don't intercept if user is typing in another input/textarea or using shortcuts
            const activeTag = document.activeElement?.tagName.toLowerCase();
            if (activeTag === 'input' || (activeTag === 'textarea' && document.activeElement === inputRef.current)) {
                return;
            }
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            // If printable key or backspace pressed, refocus editor
            if (e.key.length === 1 || e.key === 'Backspace') {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isCompleted]);

    // Live Metrics Calculations
    const getElapsedSeconds = () => {
        if (!started) return 0;
        if (endTimeRef.current && startTimeRef.current) {
            return Math.max(1, (endTimeRef.current - startTimeRef.current) / 1000);
        }
        return Math.max(1, duration - timeLeft);
    };

    const elapsedSeconds = getElapsedSeconds();
    const timeInMinutes = Math.max(elapsedSeconds / 60, 0.0167); // avoid division by zero

    // Correct vs Error calculation
    let correctChars = 0;
    let currentErrors = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetText[i]) {
            correctChars++;
        } else {
            currentErrors++;
        }
    }

    // Net WPM = (Correct Characters / 5) / Time in Minutes
    const netWpm = started && userInput.length > 0 ? Math.round((correctChars / 5) / timeInMinutes) : 0;
    
    // Raw WPM
    const rawWpm = started && userInput.length > 0 ? Math.round((userInput.length / 5) / timeInMinutes) : 0;

    // Accuracy %
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

    // Progress %
    const progressPercent = targetText.length > 0 ? Math.min(100, Math.round((userInput.length / targetText.length) * 100)) : 0;

    // Categorize typing tiers
    const getTypistTier = (wpmVal: number) => {
        if (wpmVal >= 80) return { label: 'Grandmaster Typist 🚀', desc: 'Incredible speed! You type at a professional engineering velocity.', color: '#10b981' };
        if (wpmVal >= 55) return { label: 'Pro Coder 💻', desc: 'Excellent typing pace! Fast, reliable, and production-ready.', color: '#06b6d4' };
        if (wpmVal >= 35) return { label: 'Intermediate Typist ⚡', desc: 'Good solid rhythm! Capable of quick coding and fast replies.', color: '#f59e0b' };
        return { label: 'Novice Keyboardist 🎯', desc: 'Keep practicing daily! Consistency will quickly double your speed.', color: '#8b5cf6' };
    };

    const tier = getTypistTier(netWpm);

    // Share result function
    const copyShareResult = () => {
        const shareText = `⌨️ VTUwise Typing Test Result:\n🚀 Speed: ${netWpm} WPM\n🎯 Accuracy: ${accuracy}%\n⏱️ Category: ${TEXT_POOLS.find(p => p.id === selectedPoolId)?.label || 'Tech'}\n🔥 Test your typing speed at: https://vtuwise.in/student-tools/typing-test`;
        navigator.clipboard.writeText(shareText);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
    };

    return (
        <div className="typing-page">
            {/* Header Banner */}
            <div className="typing-header no-print">
                <div className="container typing-header-inner">
                    <div className="header-info">
                        <span className="typing-eyebrow">⌨️ VTU STUDENT TOOLS</span>
                        <h1 className="typing-title">Typing Speed Test</h1>
                        <p className="typing-subtitle">
                            Practice typing engineering quotes, algorithmic code snippets, and tech passages in real-time.
                        </p>
                    </div>
                    <div className="header-actions">
                        <button 
                            className="btn-typing-reset" 
                            onClick={() => loadRandomText(selectedPoolId)}
                            title="Shortcut: Tab key"
                        >
                            <span className="icon">↺</span> New Text
                        </button>
                    </div>
                </div>
            </div>

            <div className="typing-container">
                <div className="typing-layout">
                    
                    {/* ── Settings Panel ── */}
                    <div className="settings-panel no-print">
                        <div className="settings-section">
                            <span className="settings-label">Coding &amp; Passage Category</span>
                            <div className="pool-selector-group">
                                {TEXT_POOLS.map(p => (
                                    <button 
                                        key={p.id}
                                        className={`pool-btn ${selectedPoolId === p.id ? 'active' : ''}`}
                                        onClick={() => handlePoolChange(p.id)}
                                    >
                                        <span className="pool-icon">{p.icon}</span>
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="settings-section">
                            <span className="settings-label">Timer Duration</span>
                            <div className="duration-selector-group">
                                {[15, 30, 60].map(sec => (
                                    <button 
                                        key={sec}
                                        className={`duration-btn ${duration === sec ? 'active' : ''}`} 
                                        onClick={() => handleDurationChange(sec)}
                                    >
                                        {sec} Seconds
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Active Play View ── */}
                    {!isCompleted ? (
                        <div className="typing-play-view">
                            {/* Live Stats Bar */}
                            <div className="live-stats-bar no-print">
                                <div className="stat-pill">
                                    <span className="stat-key">WPM</span>
                                    <span className="stat-val wpm-accent">{netWpm}</span>
                                </div>
                                <div className="stat-pill">
                                    <span className="stat-key">Accuracy</span>
                                    <span className="stat-val">{accuracy}%</span>
                                </div>
                                <div className="stat-pill">
                                    <span className="stat-key">Time Left</span>
                                    <span className={`stat-val ${timeLeft <= 5 ? 'timer-danger' : 'timer-accent'}`}>
                                        {timeLeft}s
                                    </span>
                                </div>
                                <div className="stat-pill progress-stat-pill">
                                    <span className="stat-key">Progress</span>
                                    <span className="stat-val">{progressPercent}%</span>
                                </div>
                            </div>

                            {/* Reference Text Card & Direct Input Overlay */}
                            <div 
                                className={`reference-card ${isFocused ? 'focused' : ''}`} 
                                onClick={focusEditor}
                            >
                                {/* Top Progress Bar */}
                                <div 
                                    className="typing-progress-line" 
                                    style={{ width: `${progressPercent}%` }} 
                                />

                                {/* Render each character with correct/incorrect/active states */}
                                <div className="text-display" aria-hidden="true">
                                    {targetText.split('').map((char, index) => {
                                        let className = 'char-pending';
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
                                                {char === ' ' && className === 'char-incorrect' ? '␣' : char}
                                            </span>
                                        );
                                    })}
                                </div>
                                
                                {/* Subtle Floating Prompt for Unstarted State */}
                                {!started && !isFocused && (
                                    <div className="start-prompt-pill">
                                        <span>⌨️ Tap here or start typing to begin</span>
                                    </div>
                                )}

                                {/* Transparent Full-Overlay Textarea ensures rock-solid focus on Mobile & Desktop */}
                                <textarea
                                    ref={inputRef}
                                    value={userInput}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className="typing-input-overlay"
                                    placeholder=""
                                    autoFocus
                                    spellCheck="false"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    aria-label="Typing test input field"
                                />
                            </div>

                            {/* Bottom Helpful Tips */}
                            <div className="typing-tips-bar no-print">
                                <span>💡 <strong>Tip:</strong> Press <kbd>Tab</kbd> for a new random text, or <kbd>Esc</kbd> to restart.</span>
                                <span>{userInput.length} / {targetText.length} characters typed</span>
                            </div>
                        </div>
                    ) : (
                        /* ── Completion Results Panel ── */
                        <div className="typing-results-panel">
                            <div className="results-hero-card">
                                <div className="results-hero-glow" />
                                
                                <div className="wpm-circle-wrapper">
                                    <div className="wpm-circle" style={{ borderColor: tier.color, boxShadow: `0 0 35px ${tier.color}40` }}>
                                        <span className="circle-wpm-val" style={{ color: tier.color }}>{netWpm}</span>
                                        <span className="circle-wpm-lbl">NET WPM</span>
                                    </div>
                                </div>

                                <div className="results-hero-info">
                                    <div className="tier-header">
                                        <span className="tier-badge" style={{ background: `${tier.color}25`, color: tier.color, border: `1px solid ${tier.color}50` }}>
                                            {tier.label}
                                        </span>
                                        <h2>Test Complete!</h2>
                                    </div>
                                    <p className="tier-desc">{tier.desc}</p>

                                    <div className="stats-breakdown-grid">
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Accuracy</span>
                                            <span className="stat-val stat-val-accuracy">{accuracy}%</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Raw WPM</span>
                                            <span className="stat-val">{rawWpm}</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Correct Chars</span>
                                            <span className="stat-val text-passed">{correctChars}</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Errors</span>
                                            <span className="stat-val text-failed">{currentErrors}</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Time Taken</span>
                                            <span className="stat-val">{Math.round(elapsedSeconds)}s</span>
                                        </div>
                                        <div className="result-stat-box">
                                            <span className="stat-lbl">Keystrokes</span>
                                            <span className="stat-val">{totalTypedKeys}</span>
                                        </div>
                                    </div>

                                    <div className="actions-row">
                                        <button className="btn-result-action primary" onClick={() => loadRandomText(selectedPoolId)}>
                                            ↺ New Text
                                        </button>
                                        <button className="btn-result-action secondary" onClick={() => resetTest()}>
                                            ↻ Try Same Text
                                        </button>
                                        <button className="btn-result-action share-btn" onClick={copyShareResult}>
                                            {copiedShare ? '✓ Copied!' : '📋 Copy Score'}
                                        </button>
                                        <a 
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`⚡ I just scored ${netWpm} WPM with ${accuracy}% accuracy on the VTUwise Typing Test! Try it yourself: https://vtuwise.in/student-tools/typing-test`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-result-action whatsapp-btn"
                                        >
                                            💬 WhatsApp
                                        </a>
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
                    color: var(--text);
                }

                .typing-header {
                    background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
                    padding: 3rem 1.5rem 2.2rem;
                    color: white;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .typing-header-inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1000px;
                    margin: 0 auto;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .header-info {
                    max-width: 600px;
                }

                .typing-eyebrow {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.15em;
                    color: #a855f7;
                    text-transform: uppercase;
                    margin-bottom: 0.4rem;
                    display: block;
                }

                .typing-title {
                    font-size: 2.2rem;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    margin: 0 0 0.5rem 0;
                }

                .typing-subtitle {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.4;
                    margin: 0;
                }

                .btn-typing-reset {
                    background: rgba(255, 255, 255, 0.12);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 0.6rem 1.3rem;
                    border-radius: 99px;
                    color: white;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: all 0.2s;
                }

                .btn-typing-reset:hover {
                    background: rgba(255, 255, 255, 0.22);
                    transform: translateY(-1px);
                }

                .btn-typing-reset .icon {
                    font-size: 1rem;
                }

                .typing-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 6rem;
                }

                .typing-layout {
                    display: flex;
                    flex-direction: column;
                    gap: 1.75rem;
                }

                /* Settings panel */
                .settings-panel {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem;
                    padding: 1.5rem 1.75rem;
                    box-shadow: var(--card-shadow);
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .settings-section {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .settings-label {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
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
                    border-radius: 0.6rem;
                    font-size: 0.82rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
                }

                .pool-btn:hover,
                .duration-btn:hover {
                    border-color: var(--primary);
                    color: var(--text);
                    transform: translateY(-1px);
                }

                .pool-btn.active,
                .duration-btn.active {
                    background: rgba(79, 70, 229, 0.08);
                    border-color: var(--primary);
                    color: var(--primary);
                    font-weight: 800;
                }

                [data-theme="dark"] .pool-btn.active,
                [data-theme="dark"] .duration-btn.active {
                    background: rgba(99, 102, 241, 0.18);
                    border-color: #818cf8;
                    color: #c7d2fe;
                }

                /* Play area */
                .typing-play-view {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .live-stats-bar {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 0.75rem;
                }

                .live-stats-bar .stat-pill {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    padding: 0.75rem 1.25rem;
                    border-radius: 1rem;
                    box-shadow: var(--card-shadow);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .stat-key {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .stat-val {
                    font-size: 1.4rem;
                    font-weight: 900;
                    color: var(--text);
                }

                .wpm-accent { color: var(--primary); }
                .timer-accent { color: #ec4899; }
                .timer-danger { color: #ef4444; animation: pulseDanger 1s infinite; }

                @keyframes pulseDanger {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.08); }
                }

                /* Reference Card & Input Overlay */
                .reference-card {
                    background: var(--surface);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 1.5rem;
                    padding: 2.5rem 2rem 2.5rem;
                    box-shadow: var(--card-shadow);
                    cursor: text;
                    position: relative;
                    min-height: 180px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    overflow: hidden;
                    user-select: none;
                }

                .reference-card.focused {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15), var(--hover-shadow);
                }

                .typing-progress-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #6366f1, #a855f7);
                    transition: width 0.1s linear;
                }

                .text-display {
                    font-family: 'Fira Code', 'Courier New', Courier, monospace;
                    font-size: 1.35rem;
                    line-height: 1.75;
                    white-space: pre-wrap;
                    letter-spacing: 0.5px;
                    position: relative;
                    z-index: 1;
                }

                .char-span {
                    border-radius: 2px;
                    padding: 0 1px;
                    transition: color 0.05s;
                }

                .char-pending {
                    color: var(--text-muted);
                    opacity: 0.55;
                }

                [data-theme="dark"] .char-pending {
                    color: #64748b;
                    opacity: 0.75;
                }

                .char-correct {
                    color: var(--text);
                    opacity: 1;
                    font-weight: 600;
                }

                [data-theme="dark"] .char-correct {
                    color: #f8fafc;
                }

                .char-incorrect {
                    color: #ffffff;
                    background: #ef4444;
                    border-radius: 3px;
                }

                .char-active {
                    position: relative;
                    color: var(--text);
                }

                .char-active::before {
                    content: '';
                    position: absolute;
                    left: -2px;
                    top: 10%;
                    bottom: 10%;
                    width: 2.5px;
                    background: var(--primary);
                    animation: blink-caret 0.9s step-end infinite;
                }

                @keyframes blink-caret {
                    from, to { opacity: 0; }
                    50% { opacity: 1; }
                }

                /* Floating subtle hint */
                .start-prompt-pill {
                    position: absolute;
                    bottom: 1rem;
                    right: 1.25rem;
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    padding: 0.35rem 0.85rem;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    pointer-events: none;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    animation: fadeIn 0.3s;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Transparent Overlay Textarea */
                .typing-input-overlay {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: text;
                    z-index: 10;
                    resize: none;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: transparent;
                    font-size: 16px; /* Prevents iOS Safari auto-zoom */
                    -webkit-user-select: none;
                }

                .typing-tips-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    padding: 0 0.5rem;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .typing-tips-bar kbd {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 4px;
                    padding: 0.15rem 0.4rem;
                    font-family: inherit;
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: var(--text);
                }

                /* Results Page */
                .typing-results-panel {
                    max-width: 820px;
                    margin: 0 auto;
                    animation: slideUpResults 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideUpResults {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .results-hero-card {
                    background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 1.75rem;
                    padding: 2.75rem;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.4);
                    display: flex;
                    flex-direction: column;
                    gap: 2.25rem;
                    align-items: center;
                }

                @media (min-width: 640px) {
                    .results-hero-card {
                        flex-direction: row;
                        align-items: flex-start;
                    }
                }

                .results-hero-glow {
                    position: absolute;
                    top: -60px;
                    right: -60px;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(168, 85, 247, 0.22), transparent 70%);
                    pointer-events: none;
                }

                .wpm-circle-wrapper {
                    flex-shrink: 0;
                    display: flex;
                    justify-content: center;
                }

                .wpm-circle {
                    width: 155px;
                    height: 155px;
                    border-radius: 50%;
                    border: 8px solid rgba(255, 255, 255, 0.15);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(8px);
                }

                .circle-wpm-val {
                    font-size: 3.4rem;
                    font-weight: 900;
                    line-height: 1;
                    margin-bottom: 0.1rem;
                }

                .circle-wpm-lbl {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: rgba(255, 255, 255, 0.6);
                    letter-spacing: 0.1em;
                }

                .results-hero-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .tier-header {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .tier-header h2 {
                    font-size: 1.8rem;
                    font-weight: 900;
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .tier-badge {
                    display: inline-block;
                    font-size: 0.72rem;
                    font-weight: 800;
                    padding: 0.3rem 0.8rem;
                    border-radius: 99px;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    width: fit-content;
                }

                .tier-desc {
                    font-size: 0.92rem;
                    color: rgba(255, 255, 255, 0.75);
                    margin: 0;
                    line-height: 1.5;
                }

                .stats-breakdown-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.75rem;
                }

                @media (max-width: 480px) {
                    .stats-breakdown-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                .result-stat-box {
                    background: rgba(255, 255, 255, 0.07);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.75rem;
                    border-radius: 0.85rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .result-stat-box .stat-lbl {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                }

                .result-stat-box .stat-val {
                    font-size: 1.3rem;
                    font-weight: 900;
                    color: white;
                }

                .stat-val-accuracy { color: #38bdf8 !important; }
                .text-passed { color: #10b981 !important; }
                .text-failed { color: #f87171 !important; }

                .actions-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                    margin-top: 0.25rem;
                }

                .btn-result-action {
                    padding: 0.65rem 1.25rem;
                    border-radius: 0.75rem;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .btn-result-action.primary {
                    background: white;
                    color: #1e1b4b;
                    border: none;
                }

                .btn-result-action.primary:hover {
                    background: #f1f5f9;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
                }

                .btn-result-action.secondary {
                    background: rgba(255, 255, 255, 0.12);
                    border: 1.5px solid rgba(255, 255, 255, 0.2);
                    color: white;
                }

                .btn-result-action.secondary:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }

                .btn-result-action.share-btn {
                    background: rgba(99, 102, 241, 0.25);
                    border: 1.5px solid rgba(99, 102, 241, 0.5);
                    color: #c7d2fe;
                }

                .btn-result-action.share-btn:hover {
                    background: rgba(99, 102, 241, 0.4);
                    color: #fff;
                    transform: translateY(-2px);
                }

                .btn-result-action.whatsapp-btn {
                    background: #25D366;
                    color: #052e16;
                    border: none;
                }

                .btn-result-action.whatsapp-btn:hover {
                    background: #22c55e;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                }

                @media (max-width: 640px) {
                    .reference-card {
                        padding: 1.75rem 1.25rem;
                    }
                    .text-display {
                        font-size: 1.15rem;
                        line-height: 1.65;
                    }
                    .typing-header {
                        padding: 2.2rem 1rem 1.8rem;
                    }
                    .typing-title {
                        font-size: 1.8rem;
                    }
                    .results-hero-card {
                        padding: 1.75rem 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}
