'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Question {
    question: string;
    options: string[];
    answerIdx: number;
    explanation: string;
}

interface Topic {
    id: string;
    title: string;
    icon: string;
    desc: string;
    color: string;
    questions: Question[];
}

const TOPICS: Topic[] = [
    {
        id: 'dsa',
        title: 'Data Structures & Algorithms',
        icon: '🌳',
        desc: 'Big-O notation, Arrays, Linked Lists, Binary Trees, Stacks, Queues, Sorting & Search algorithms.',
        color: '#4f46e5',
        questions: [
            {
                question: 'What is the worst-case time complexity of lookup in a Hash Table?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                answerIdx: 2,
                explanation: 'In the worst case (when all keys hash to the same bucket causing index collisions), a hash table search degenerates to O(n) as it behaves like a linear linked list scan.'
            },
            {
                question: 'Which data structure follows the Last-In-First-Out (LIFO) principle?',
                options: ['Queue', 'Stack', 'Heap', 'Graph'],
                answerIdx: 1,
                explanation: 'A Stack is a LIFO (Last-In-First-Out) data structure where elements are added (pushed) and removed (popped) from the same end.'
            },
            {
                question: 'Which of the following sorting algorithms is NOT stable by default?',
                options: ['Merge Sort', 'Insertion Sort', 'Quick Sort', 'Bubble Sort'],
                answerIdx: 2,
                explanation: 'Quick Sort is generally unstable because swapping non-adjacent elements can disrupt the original relative ordering of identical keys.'
            },
            {
                question: 'What is the time complexity of searching in a balanced Binary Search Tree (BST)?',
                options: ['O(1)', 'O(n)', 'O(n log n)', 'O(log n)'],
                answerIdx: 3,
                explanation: 'In a balanced BST, search space halves at every comparison step, resulting in O(log n) time complexity.'
            },
            {
                question: 'Which traversal visits a binary tree in the order: Left child, Root, Right child?',
                options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
                answerIdx: 1,
                explanation: 'In-order traversal visits the left subtree first, then the root node, and finally the right subtree. For a BST, this yields values in sorted ascending order.'
            }
        ]
    },
    {
        id: 'webdev',
        title: 'Web Development',
        icon: '🌐',
        desc: 'HTML5, CSS layout grids, JavaScript execution loops, Promises, React rendering cycles, and Web APIs.',
        color: '#06b6d4',
        questions: [
            {
                question: 'Which of the following is correct about JavaScript closures?',
                options: [
                    'It refers to closing a browser window.',
                    'It is a function combined with its lexical environment.',
                    'It prevents variable shadowing.',
                    'It restricts global variable modification.'
                ],
                answerIdx: 1,
                explanation: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment), letting the function access outer scope variables even after the outer function has returned.'
            },
            {
                question: 'In CSS, what is the default behavior of "position: absolute"?',
                options: [
                    'Positions relative to the viewport.',
                    'Positions relative to its closest positioned ancestor.',
                    'Remains in normal document flow.',
                    'Positions relative to its parent element regardless.'
                ],
                answerIdx: 1,
                explanation: 'An absolutely positioned element is removed from the normal flow and positioned relative to its closest ancestor that has a position value other than static (relative, absolute, fixed, or sticky).'
            },
            {
                question: 'What does the "useCallback" hook do in React?',
                options: [
                    'Memoizes a computed value.',
                    'Memoizes a callback function definition to prevent re-creation.',
                    'Executes side effects asynchronously.',
                    'Stores a mutable reference to DOM nodes.'
                ],
                answerIdx: 1,
                explanation: 'useCallback returns a memoized version of the callback function that only changes if one of the dependencies has changed. This prevents unnecessary re-renders of child components that rely on reference equality.'
            },
            {
                question: 'Which HTTP status code represents "Internal Server Error"?',
                options: ['400', '403', '404', '500'],
                answerIdx: 3,
                explanation: 'HTTP 500 is the generic status code indicating that the server encountered an unexpected condition that prevented it from fulfilling the request.'
            },
            {
                question: 'What is the purpose of the "key" prop in React lists?',
                options: [
                    'To apply custom CSS styling.',
                    'To unique-identify items to optimize Virtual DOM reconciliation.',
                    'To encrypt state data values.',
                    'To bind click event handlers.'
                ],
                answerIdx: 1,
                explanation: 'React uses keys to identify which items in a list have changed, been added, or been removed. This helps React reconcile the virtual DOM efficiently instead of re-rendering everything.'
            }
        ]
    },
    {
        id: 'os',
        title: 'Operating Systems',
        icon: '🖥️',
        desc: 'Process states, Virtual Memory, Paging, Page Faults, deadlocks, CPU scheduling, and thread synch.',
        color: '#10b981',
        questions: [
            {
                question: 'What is a Deadlock in an operating system?',
                options: [
                    'A process completing execution successfully.',
                    'A state where each process is waiting for a resource held by another.',
                    'Memory leak caused by recursive loops.',
                    'System crashing due to CPU overheating.'
                ],
                answerIdx: 1,
                explanation: 'A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.'
            },
            {
                question: 'What is "Thrashing" in memory management?',
                options: [
                    'Deleting unused log files.',
                    'High paging activity where the system spends more time swapping pages than executing instructions.',
                    'Allocating large contiguous memory spaces.',
                    'Formatting system disk storage.'
                ],
                answerIdx: 1,
                explanation: 'Thrashing occurs when a virtual memory system spends a disproportionate amount of time swapping pages in and out of disk rather than executing operations, usually because main memory is insufficient.'
            },
            {
                question: 'Which scheduler selects processes from queue to load them into memory?',
                options: ['Short-term scheduler', 'Medium-term scheduler', 'Long-term scheduler', 'Real-time scheduler'],
                answerIdx: 2,
                explanation: 'The long-term (or job) scheduler determines which programs are admitted to the system for processing. It controls the degree of multiprogramming.'
            },
            {
                question: 'What is a "SemaPhore"?',
                options: [
                    'An error register inside the ALU.',
                    'An integer variable used to solve critical section synchronization problems.',
                    'A background daemon log system.',
                    'A fast caching hardware slot.'
                ],
                answerIdx: 1,
                explanation: 'A semaphore is a tool/integer variable that acts as a locking mechanism. It controls access to shared resources by multiple processes in concurrent operating systems.'
            },
            {
                question: 'Which page replacement algorithm suffers from Belady\'s Anomaly?',
                options: ['FIFO (First-In-First-Out)', 'LRU (Least Recently Used)', 'Optimal Page Replacement', 'LFU (Least Frequently Used)'],
                answerIdx: 0,
                explanation: 'Belady\'s Anomaly is a phenomenon where increasing the number of page frames results in an increase in the number of page faults. It occurs in FIFO.'
            }
        ]
    },
    {
        id: 'dbms',
        title: 'Database Systems (DBMS)',
        icon: '🗄️',
        desc: 'SQL joins, normalization indexes, transactions, ACID properties, and relational constraints.',
        color: '#ec4899',
        questions: [
            {
                question: 'What does the "A" in ACID database properties stand for?',
                options: ['Access', 'Atomicity', 'Availability', 'Aggregation'],
                answerIdx: 1,
                explanation: 'Atomicity ensures that a transaction is treated as a single, indivisible unit of work: either all operations in the transaction succeed, or none of them do.'
            },
            {
                question: 'Which Normal Form resolves multi-valued dependencies?',
                options: ['1NF', '2NF', '3NF', '4NF'],
                answerIdx: 3,
                explanation: 'A relation is in 4NF (Fourth Normal Form) if and only if it is in BCNF and contains no multi-valued dependencies.'
            },
            {
                question: 'Which type of SQL JOIN returns all rows from the left table and matched rows from the right table?',
                options: ['INNER JOIN', 'FULL JOIN', 'RIGHT OUTER JOIN', 'LEFT OUTER JOIN'],
                answerIdx: 3,
                explanation: 'LEFT OUTER JOIN (or LEFT JOIN) returns all records from the left table, and matching records from the right table. If no match is found, NULL is returned for columns of the right table.'
            },
            {
                question: 'What is the purpose of database Normalization?',
                options: [
                    'To duplicate database tables for backups.',
                    'To reduce redundancy and avoid insertion/deletion anomalies.',
                    'To encrypt private column fields.',
                    'To increase querying speed regardless of structure.'
                ],
                answerIdx: 1,
                explanation: 'Normalization is the process of organizing database tables to minimize redundancy (duplicate data) and prevent anomalies during insert, update, and delete actions.'
            },
            {
                question: 'What is a Foreign Key constraint?',
                options: [
                    'A key that encrypts data payloads.',
                    'A column that references the primary key of another table to maintain referential integrity.',
                    'A temporary key generated for search sorting.',
                    'A key generated by external APIs.'
                ],
                answerIdx: 1,
                explanation: 'A foreign key is a column or group of columns that establishes and enforces a link between data in two tables, ensuring that the referenced row must exist in the target table.'
            }
        ]
    },
    {
        id: 'vlsi',
        title: 'VLSI Design',
        icon: '🔌',
        desc: 'CMOS fabrication, leakage power, MOS transistor scaling, delay parameters, and semiconductor logic.',
        color: '#7c3aed',
        questions: [
            {
                question: 'Static power dissipation in a sub-micron CMOS inverter is primarily caused by which factor?',
                options: ['Capacitive charging current', 'Subthreshold leakage and gate tunnel currents', 'Short-circuit current during transition', 'Supply voltage ripple'],
                answerIdx: 1,
                explanation: 'Static power dissipation occurs when the circuit is in steady state (no switching). In sub-micron chips, it is dominated by subthreshold and gate leakage currents rather than charging or short circuits.'
            },
            {
                question: 'Why is the PMOS transistor in a standard CMOS inverter designed wider than the companion NMOS transistor?',
                options: ['To increase PMOS gate capacitance', 'To compensate for the lower mobility of holes relative to electrons', 'To reduce CMOS layout area metrics', 'To elevate PMOS leakage threshold levels'],
                answerIdx: 1,
                explanation: 'Holes (PMOS charge carriers) have roughly 2 to 3 times lower mobility than electrons (NMOS charge carriers). To achieve equal rising and falling delay times (symmetrical response), the PMOS width is increased proportionally.'
            },
            {
                question: 'What is defined as the "Setup Time" of a sequential flip-flop?',
                options: [
                    'Time required to charge the clock driver node.',
                    'Minimum duration input data must remain stable before the active clock edge occurs.',
                    'Time interval after the clock edge where data must hold its state.',
                    'Propagation delay from clock transition to Q output.'
                ],
                answerIdx: 1,
                explanation: 'Setup time is the minimum time window that the data input pin must be held stable before the clock edge arrives to guarantee error-free latching.'
            },
            {
                question: 'Which of the following semiconductor logic styles features zero static power consumption?',
                options: ['Pseudo-NMOS Logic', 'Pass Transistor Logic', 'Complementary MOS (CMOS) Logic', 'Dynamic DOMINO Logic'],
                answerIdx: 2,
                explanation: 'In complementary CMOS logic, one of the networks (either pull-up or pull-down) is always completely off in steady state, preventing direct current paths from VDD to ground and yielding near-zero static power.'
            },
            {
                question: 'What is the main purpose of inserting "Dummy Transistors" in high-performance VLSI layouts?',
                options: [
                    'To add redundant backup processing units.',
                    'To ensure uniform etching density and improve lithographic matching.',
                    'To increase circuit switching speeds.',
                    'To provide decoupling capacitance paths.'
                ],
                answerIdx: 1,
                explanation: 'Dummy structures are placed in sub-micron analog and digital matching layouts to ensure uniform environment density, avoiding lithographical variations during fabrication etching.'
            }
        ]
    },
    {
        id: 'embedded',
        title: 'Embedded Systems',
        icon: '🤖',
        desc: 'RTOS scheduler loops, interrupt service latency, serial protocols (SPI, I2C, UART), and flash memory.',
        color: '#f59e0b',
        questions: [
            {
                question: 'What is the primary function of a "Watchdog Timer" in a microcontroller unit?',
                options: [
                    'To display system real-time clocks on display panels.',
                    'To reset the system automatically if software hangs or goes into an infinite loop.',
                    'To regulate external clock frequency levels.',
                    'To speed up CPU execution times.'
                ],
                answerIdx: 1,
                explanation: 'A watchdog timer is a hardware safety feature that counts down. If software fails to clear (kick) the timer periodically due to a hang or trap, it triggers a hardware reset to restore system operations.'
            },
            {
                question: 'Which serial communication protocol features a synchronous, full-duplex interface using 4 signals?',
                options: ['UART', 'I2C', 'SPI', 'RS-232'],
                answerIdx: 2,
                explanation: 'SPI (Serial Peripheral Interface) is a synchronous, full-duplex, master-slave protocol that uses four wires: MISO, MOSI, SCLK, and SS.'
            },
            {
                question: 'What does the term "Interrupt Latency" refer to in Real-Time Operating Systems (RTOS)?',
                options: [
                    'The execution time of the Interrupt Service Routine (ISR).',
                    'The time elapsed from the trigger of a hardware interrupt to the start of its ISR execution.',
                    'The delay in disabling interrupts globally.',
                    'The duration the CPU spends in low-power sleep states.'
                ],
                answerIdx: 1,
                explanation: 'Interrupt latency is the latency/delay between the hardware signal assertion and the execution of the first instruction in the corresponding ISR.'
            },
            {
                question: 'How many active signal lines are required to run standard I2C bus communication?',
                options: ['1 line', '2 lines (SDA, SCL)', '3 lines (RX, TX, GND)', '4 lines'],
                answerIdx: 1,
                explanation: 'I2C (Inter-Integrated Circuit) is a 2-wire serial bus requiring only SDA (Serial Data Line) and SCL (Serial Clock Line) with pull-up resistors.'
            },
            {
                question: 'Which type of solid-state memory is typically used to execute firmware code "in-place" on microcontrollers?',
                options: ['SRAM', 'EEPROM', 'NOR Flash Memory', 'NAND Flash Memory'],
                answerIdx: 2,
                explanation: 'NOR Flash has a random-access interface similar to RAM, allowing CPUs to read instructions directly and execute code in-place (XIP). NAND Flash is block-accessible and not suited for direct execution.'
            }
        ]
    }
];

export default function QuizClient() {
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Timer effect
    useEffect(() => {
        if (selectedTopic && !isFinished) {
            setTimeLeft(30);
            if (timerRef.current) clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Time expired: auto-move next or finish
                        handleNextQuestion(-1); // -1 marks unanswered
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [selectedTopic, currentQuestionIdx, isFinished]);

    const startQuiz = (topic: Topic) => {
        setSelectedTopic(topic);
        setCurrentQuestionIdx(0);
        setAnswers([]);
        setIsFinished(false);
    };

    const handleSelectOption = (optIdx: number) => {
        const updated = [...answers];
        updated[currentQuestionIdx] = optIdx;
        setAnswers(updated);
    };

    const handleNextQuestion = (forcedVal?: number) => {
        // If an option wasn't clicked and no value is forced, mark as -1 (skipped)
        const updatedAnswers = [...answers];
        if (updatedAnswers[currentQuestionIdx] === undefined) {
            updatedAnswers[currentQuestionIdx] = forcedVal !== undefined ? forcedVal : -1;
            setAnswers(updatedAnswers);
        }

        if (currentQuestionIdx < (selectedTopic?.questions.length || 0) - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            setIsFinished(true);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        if (!selectedTopic) return { correct: 0, wrong: 0, skipped: 0, percent: 0 };
        let correct = 0;
        let wrong = 0;
        let skipped = 0;

        selectedTopic.questions.forEach((q, idx) => {
            const ans = answers[idx];
            if (ans === undefined || ans === -1) skipped++;
            else if (ans === q.answerIdx) correct++;
            else wrong++;
        });

        const percent = Math.round((correct / selectedTopic.questions.length) * 100);
        return { correct, wrong, skipped, percent };
    };

    const quitQuiz = () => {
        if (window.confirm('Quit current quiz? Progress will not be saved.')) {
            setSelectedTopic(null);
            setIsFinished(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    // Calculate dynamic circular timer percentage
    const strokePct = ((30 - timeLeft) / 30) * 100;
    const strokeColor = timeLeft > 15 ? '#06b6d4' : timeLeft > 5 ? '#f59e0b' : '#ef4444';

    return (
        <div className="quiz-page">
            <div className="quiz-header">
                <div className="container quiz-header-inner">
                    <div>
                        <span className="quiz-eyebrow">⚡ Engineering Knowledge Hub</span>
                        <h1 className="quiz-title">Quiz Arena</h1>
                    </div>
                    {selectedTopic && (
                        <button className="btn-quit-quiz" onClick={quitQuiz}>
                            ✕ Quit Quiz
                        </button>
                    )}
                </div>
            </div>

            <div className="quiz-container">
                {/* ── Mode 1: Topic Selector ── */}
                {!selectedTopic && (
                    <div className="quiz-topic-select-view">
                        <div className="quiz-select-intro">
                            <h2>Select Your Domain</h2>
                            <p>Select a subject category to test your engineering concepts. Each quiz contains 5 questions with a 30-second timer per question.</p>
                        </div>
                        
                        <div className="topics-grid">
                            {TOPICS.map((topic) => (
                                <div key={topic.id} className="topic-card">
                                    <div className="topic-card-icon" style={{ background: `${topic.color}15` }}>
                                        {topic.icon}
                                    </div>
                                    <h3 className="topic-card-title">{topic.title}</h3>
                                    <p className="topic-card-desc">{topic.desc}</p>
                                    <button 
                                        className="btn-start-topic" 
                                        style={{ background: topic.color }}
                                        onClick={() => startQuiz(topic)}
                                    >
                                        Start Quiz
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Mode 2: Active Question Board ── */}
                {selectedTopic && !isFinished && (
                    <div className="quiz-play-view">
                        <div className="quiz-play-layout">
                            {/* Question Section */}
                            <div className="quiz-question-panel">
                                <div className="quiz-play-header">
                                    <div className="q-progress">
                                        <span className="q-progress-badge">Q {currentQuestionIdx + 1} of {selectedTopic.questions.length}</span>
                                        <div className="q-progress-bar-track">
                                            <div 
                                                className="q-progress-bar-fill" 
                                                style={{ width: `${((currentQuestionIdx + 1) / selectedTopic.questions.length) * 100}%` }} 
                                            />
                                        </div>
                                    </div>

                                    {/* Circular Progress Timer */}
                                    <div className="circular-timer">
                                        <svg viewBox="0 0 36 36" className="timer-svg">
                                            <path
                                                className="timer-bg"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className="timer-fill"
                                                stroke={strokeColor}
                                                strokeDasharray={`${strokePct}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                        <span className="timer-text" style={{ color: strokeColor }}>{timeLeft}s</span>
                                    </div>
                                </div>

                                <div className="quiz-question-box">
                                    <h2 className="quiz-question-text">
                                        {selectedTopic.questions[currentQuestionIdx].question}
                                    </h2>
                                </div>

                                <div className="quiz-options-list">
                                    {selectedTopic.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                                        const isSelected = answers[currentQuestionIdx] === oIdx;
                                        return (
                                            <button 
                                                key={oIdx}
                                                className={`option-card ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleSelectOption(oIdx)}
                                            >
                                                <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                                                <span className="option-text">{opt}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="quiz-nav-footer">
                                    <button 
                                        className="btn-quiz-nav btn-prev"
                                        onClick={handlePrevQuestion}
                                        disabled={currentQuestionIdx === 0}
                                    >
                                        ← Previous
                                    </button>
                                    
                                    <button 
                                        className="btn-quiz-nav btn-next"
                                        onClick={() => handleNextQuestion()}
                                    >
                                        {currentQuestionIdx === selectedTopic.questions.length - 1 ? 'Finish Quiz ✓' : 'Next Question →'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Mode 3: Quiz Score Summary ── */}
                {selectedTopic && isFinished && (
                    <div className="quiz-results-view">
                        {(() => {
                            const score = calculateScore();
                            return (
                                <>
                                    <div className="results-hero-card">
                                        <div className="results-hero-glow" />
                                        <div className="results-radial-score">
                                            <div className="score-circle">
                                                <span className="score-percent">{score.percent}%</span>
                                                <span className="score-ratio">{score.correct} / {selectedTopic.questions.length} Correct</span>
                                            </div>
                                        </div>

                                        <div className="results-hero-info">
                                            <h2>Quiz Completed!</h2>
                                            <p>You have successfully finished the <strong>{selectedTopic.title}</strong> assessment.</p>
                                            
                                            <div className="results-grid-stats">
                                                <div className="stat-box-card">
                                                    <span className="stat-label">Correct</span>
                                                    <span className="stat-value text-passed">{score.correct}</span>
                                                </div>
                                                <div className="stat-box-card">
                                                    <span className="stat-label">Wrong</span>
                                                    <span className="stat-value text-failed">{score.wrong}</span>
                                                </div>
                                                <div className="stat-box-card">
                                                    <span className="stat-label">Skipped</span>
                                                    <span className="stat-value text-muted">{score.skipped}</span>
                                                </div>
                                            </div>

                                            <div className="results-actions-bar">
                                                <button className="btn-results-action primary" onClick={() => startQuiz(selectedTopic)}>
                                                    ↺ Try Again
                                                </button>
                                                <button className="btn-results-action secondary" onClick={() => setSelectedTopic(null)}>
                                                    🗂 Try Another Topic
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Question review */}
                                    <div className="results-review-section">
                                        <h3>Detailed Question Review</h3>
                                        <div className="review-list">
                                            {selectedTopic.questions.map((q, idx) => {
                                                const userAnsIdx = answers[idx];
                                                const isCorrect = userAnsIdx === q.answerIdx;
                                                const isSkipped = userAnsIdx === undefined || userAnsIdx === -1;
                                                
                                                return (
                                                    <div key={idx} className={`review-card ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`}>
                                                        <div className="review-badge">
                                                            Question {idx + 1}
                                                        </div>
                                                        <h4 className="review-question-text">{q.question}</h4>
                                                        
                                                        <div className="review-options">
                                                            {q.options.map((opt, oIdx) => {
                                                                const wasChosen = userAnsIdx === oIdx;
                                                                const isRight = q.answerIdx === oIdx;
                                                                let itemClass = '';
                                                                if (isRight) itemClass = 'is-right';
                                                                else if (wasChosen && !isRight) itemClass = 'was-chosen-wrong';

                                                                return (
                                                                    <div key={oIdx} className={`review-option-row ${itemClass}`}>
                                                                        <span className="review-indicator">
                                                                            {isRight ? '✓' : wasChosen ? '✗' : ''}
                                                                        </span>
                                                                        <span>{opt}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        <div className="review-explanation">
                                                            <strong>Explanation:</strong>
                                                            <p>{q.explanation}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}
            </div>

            <style>{`
                .quiz-page {
                    background: var(--background);
                    min-height: 90vh;
                }

                .quiz-header {
                    background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
                    padding: 3rem 1.5rem 2rem;
                    color: white;
                }

                .quiz-header-inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .quiz-eyebrow {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.15em;
                    color: #a7f3d0;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                .quiz-title {
                    font-size: 2.2rem;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    line-height: 1;
                }

                .btn-quit-quiz {
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

                .btn-quit-quiz:hover {
                    background: rgba(255, 255, 255, 0.18);
                }

                .quiz-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 5rem;
                }

                /* Topic Selector View */
                .quiz-select-intro {
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto 3rem;
                }

                .quiz-select-intro h2 {
                    font-size: 1.8rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 0.75rem;
                }

                .quiz-select-intro p {
                    font-size: 0.98rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                }

                .topics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2rem;
                }

                .topic-card {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.5rem;
                    padding: 2rem;
                    box-shadow: var(--card-shadow);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s;
                }

                .topic-card:hover {
                    transform: translateY(-6px);
                    box-shadow: var(--hover-shadow);
                }

                .topic-card-icon {
                    width: 64px;
                    height: 64px;
                    border-radius: 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                }

                .topic-card-title {
                    font-size: 1.25rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 0.75rem;
                }

                .topic-card-desc {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    flex: 1;
                }

                .btn-start-topic {
                    width: 100%;
                    border: none;
                    color: white;
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    font-weight: 800;
                    font-size: 0.9rem;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                    transition: transform 0.2s;
                }

                .btn-start-topic:hover {
                    transform: translateY(-2px);
                }

                /* Play View */
                .quiz-play-view {
                    max-width: 760px;
                    margin: 0 auto;
                }

                .quiz-question-panel {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.5rem;
                    padding: 2rem;
                    box-shadow: var(--card-shadow);
                }

                .quiz-play-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    gap: 1.5rem;
                }

                .q-progress {
                    flex: 1;
                }

                .q-progress-badge {
                    font-size: 0.72rem;
                    font-weight: 850;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .q-progress-bar-track {
                    height: 6px;
                    background: var(--surface-border);
                    border-radius: 99px;
                    overflow: hidden;
                }

                .q-progress-bar-fill {
                    height: 100%;
                    background: var(--primary);
                    border-radius: 99px;
                    transition: width 0.3s ease;
                }

                /* Circular Timer styling */
                .circular-timer {
                    width: 56px;
                    height: 56px;
                    position: relative;
                    flex-shrink: 0;
                }

                .timer-svg {
                    width: 100%;
                    height: 100%;
                    transform: rotate(-90deg);
                }

                .timer-bg {
                    fill: none;
                    stroke: var(--surface-border);
                    stroke-width: 3.5;
                }

                .timer-fill {
                    fill: none;
                    stroke-width: 3.5;
                    stroke-linecap: round;
                    transition: stroke-dasharray 1s linear, stroke 0.3s;
                }

                .timer-text {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 900;
                    font-family: monospace;
                }

                .quiz-question-box {
                    margin-bottom: 2rem;
                }

                .quiz-question-text {
                    font-size: 1.4rem;
                    font-weight: 850;
                    color: var(--text);
                    line-height: 1.4;
                    letter-spacing: -0.01em;
                }

                .quiz-options-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }

                .option-card {
                    width: 100%;
                    text-align: left;
                    background: var(--background);
                    border: 1.5px solid var(--surface-border);
                    padding: 1.1rem 1.5rem;
                    border-radius: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .option-card:hover {
                    border-color: var(--primary);
                }

                .option-card.selected {
                    background: rgba(79, 70, 229, 0.05);
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.08);
                }

                .option-letter {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--surface-border);
                    color: var(--text);
                    font-size: 0.82rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.2s, color 0.2s;
                }

                .option-card.selected .option-letter {
                    background: var(--primary);
                    color: white;
                }

                .option-text {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--text);
                }

                .quiz-nav-footer {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                    border-top: 1px solid var(--surface-border);
                    padding-top: 1.5rem;
                }

                .btn-quiz-nav {
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-size: 0.88rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-prev {
                    background: none;
                    border: 1.5px solid var(--surface-border);
                    color: var(--text-muted);
                }

                .btn-prev:hover:not(:disabled) {
                    border-color: var(--text);
                    color: var(--text);
                }

                .btn-prev:disabled {
                    opacity: 0.5;
                    cursor: default;
                }

                .btn-next {
                    background: var(--gradient);
                    color: white;
                    border: none;
                    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.15);
                }

                .btn-next:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.25);
                }

                /* Results View */
                .quiz-results-view {
                    max-width: 760px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .results-hero-card {
                    background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
                    border-radius: 1.5rem;
                    padding: 2.5rem;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 15px 40px rgba(6, 78, 59, 0.2);
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
                    background: radial-gradient(circle, rgba(167, 243, 208, 0.15), transparent 70%);
                    pointer-events: none;
                }

                .results-radial-score {
                    flex-shrink: 0;
                }

                .score-circle {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 8px solid rgba(255, 255, 255, 0.15);
                    border-top-color: #a7f3d0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.2);
                }

                .score-percent {
                    font-size: 2.2rem;
                    font-weight: 900;
                    line-height: 1;
                    margin-bottom: 0.2rem;
                }

                .score-ratio {
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #a7f3d0;
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

                .results-hero-info p {
                    font-size: 0.95rem;
                    color: #a7f3d0;
                    margin-bottom: 1.5rem;
                }

                .results-grid-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .stat-box-card {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.75rem;
                    border-radius: 0.75rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .stat-label {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: 900;
                }

                .text-passed { color: #a7f3d0; }
                .text-failed { color: #fca5a5; }

                .results-actions-bar {
                    display: flex;
                    gap: 0.75rem;
                }

                .btn-results-action {
                    padding: 0.6rem 1.25rem;
                    border-radius: 0.6rem;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-results-action.primary {
                    background: white;
                    color: #064e3b;
                    border: none;
                }

                .btn-results-action.primary:hover {
                    background: #f0fdf4;
                    transform: translateY(-1px);
                }

                .btn-results-action.secondary {
                    background: rgba(255, 255, 255, 0.12);
                    border: 1.5px solid rgba(255, 255, 255, 0.2);
                    color: white;
                }

                .btn-results-action.secondary:hover {
                    background: rgba(255, 255, 255, 0.18);
                    transform: translateY(-1px);
                }

                /* Review Section */
                .results-review-section h3 {
                    font-size: 1.2rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 1.25rem;
                }

                .review-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .review-card {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem;
                    padding: 1.75rem;
                    box-shadow: var(--card-shadow);
                }

                .review-card.correct { border-left: 4px solid #10b981; }
                .review-card.wrong { border-left: 4px solid #ef4444; }
                .review-card.skipped { border-left: 4px solid var(--text-muted); }

                .review-badge {
                    font-size: 0.65rem;
                    font-weight: 850;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                }

                .review-question-text {
                    font-size: 1.1rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 1.25rem;
                    line-height: 1.4;
                }

                .review-options {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1.25rem;
                }

                .review-option-row {
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    padding: 0.75rem 1rem;
                    border-radius: 0.6rem;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: var(--text);
                    font-weight: 700;
                }

                .review-option-row.is-right {
                    background: rgba(16, 185, 129, 0.08);
                    border-color: #10b981;
                }

                .review-option-row.was-chosen-wrong {
                    background: rgba(239, 68, 68, 0.08);
                    border-color: #ef4444;
                }

                .review-indicator {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 900;
                }

                .review-option-row.is-right .review-indicator {
                    color: #10b981;
                }

                .review-option-row.was-chosen-wrong .review-indicator {
                    color: #ef4444;
                }

                .review-explanation {
                    background: var(--background);
                    border-top: 1px solid var(--surface-border);
                    padding-top: 1rem;
                    font-size: 0.88rem;
                    line-height: 1.6;
                }

                .review-explanation strong {
                    color: var(--text);
                    display: block;
                    margin-bottom: 0.25rem;
                }

                .review-explanation p {
                    color: var(--text-muted);
                }
            `}</style>
        </div>
    );
}
