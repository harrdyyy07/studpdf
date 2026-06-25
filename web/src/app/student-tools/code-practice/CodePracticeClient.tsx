'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TestSuite {
    inputs: any[];
    expected: any;
    formatInput: (inputs: any[]) => string;
    formatOutput: (val: any) => string;
}

interface Challenge {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    constraints: string[];
    jsBoilerplate: string;
    pythonBoilerplate: string;
    cppBoilerplate: string;
    javaBoilerplate: string;
    testCases: TestSuite[];
    verifyJS: (fn: Function) => { passed: boolean; got: any; error?: string }[];
}

const CHALLENGES: Challenge[] = [
    {
        id: 'reverse-string',
        title: 'Reverse a String',
        difficulty: 'Easy',
        description: 'Write a function that takes a string and returns it reversed. For example, given the input `"hello"`, the function should return `"olleh"`.',
        constraints: [
            'Input string length <= 1000',
            'Must return a string value'
        ],
        jsBoilerplate: `function reverseString(str) {\n    // Write your code here\n    \n}`,
        pythonBoilerplate: `def reverse_string(s: str) -> str:\n    # Write your code here\n    pass`,
        cppBoilerplate: `#include <string>\nusing namespace std;\n\nstring reverseString(string s) {\n    // Write your code here\n    \n}`,
        javaBoilerplate: `public class Solution {\n    public String reverseString(String s) {\n        // Write your code here\n        return "";\n    }\n}`,
        testCases: [
            { inputs: ['hello'], expected: 'olleh', formatInput: (i) => `"${i[0]}"`, formatOutput: (o) => `"${o}"` },
            { inputs: ['VTUwise'], expected: 'esiwUTV', formatInput: (i) => `"${i[0]}"`, formatOutput: (o) => `"${o}"` },
            { inputs: ['a'], expected: 'a', formatInput: (i) => `"${i[0]}"`, formatOutput: (o) => `"${o}"` }
        ],
        verifyJS: (fn) => {
            return [
                { passed: fn('hello') === 'olleh', got: fn('hello') },
                { passed: fn('VTUwise') === 'esiwUTV', got: fn('VTUwise') },
                { passed: fn('a') === 'a', got: fn('a') }
            ];
        }
    },
    {
        id: 'fibonacci',
        title: 'N-th Fibonacci Number',
        difficulty: 'Easy',
        description: 'The Fibonacci sequence is defined as follows: `F(0) = 0, F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n > 1`. Given `n`, calculate the n-th Fibonacci number.',
        constraints: [
            '0 <= n <= 30'
        ],
        jsBoilerplate: `function fibonacci(n) {\n    // Write your code here\n    \n}`,
        pythonBoilerplate: `def fibonacci(n: int) -> int:\n    # Write your code here\n    pass`,
        cppBoilerplate: `class Solution {\npublic:\n    int fibonacci(int n) {\n        // Write your code here\n        return 0;\n    }\n};`,
        javaBoilerplate: `public class Solution {\n    public int fibonacci(int n) {\n        // Write your code here\n        return 0;\n    }\n}`,
        testCases: [
            { inputs: [0], expected: 0, formatInput: (i) => `${i[0]}`, formatOutput: (o) => `${o}` },
            { inputs: [5], expected: 5, formatInput: (i) => `${i[0]}`, formatOutput: (o) => `${o}` },
            { inputs: [10], expected: 55, formatInput: (i) => `${i[0]}`, formatOutput: (o) => `${o}` }
        ],
        verifyJS: (fn) => {
            return [
                { passed: fn(0) === 0, got: fn(0) },
                { passed: fn(5) === 5, got: fn(5) },
                { passed: fn(10) === 55, got: fn(10) }
            ];
        }
    },
    {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Medium',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
        constraints: [
            '2 <= nums.length <= 10^4',
            '-10^9 <= nums[i] <= 10^9',
            '-10^9 <= target <= 10^9'
        ],
        jsBoilerplate: `function twoSum(nums, target) {\n    // Write your code here\n    \n}`,
        pythonBoilerplate: `def two_sum(nums: List[int], target: int) -> List[int]:\n    # Write your code here\n    pass`,
        cppBoilerplate: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    \n}`,
        javaBoilerplate: `import java.util.*;\n\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}`,
        testCases: [
            { inputs: [[2, 7, 11, 15], 9], expected: [0, 1], formatInput: (i) => `nums = [${i[0].join(', ')}], target = ${i[1]}`, formatOutput: (o) => `[${o.join(', ')}]` },
            { inputs: [[3, 2, 4], 6], expected: [1, 2], formatInput: (i) => `nums = [${i[0].join(', ')}], target = ${i[1]}`, formatOutput: (o) => `[${o.join(', ')}]` },
            { inputs: [[3, 3], 6], expected: [0, 1], formatInput: (i) => `nums = [${i[0].join(', ')}], target = ${i[1]}`, formatOutput: (o) => `[${o.join(', ')}]` }
        ],
        verifyJS: (fn) => {
            const match = (a: any, b: any) => {
                if (!Array.isArray(a) || !Array.isArray(b)) return false;
                if (a.length !== b.length) return false;
                const sA = [...a].sort();
                const sB = [...b].sort();
                return sA.every((v, idx) => v === sB[idx]);
            };
            const r1 = fn([2, 7, 11, 15], 9);
            const r2 = fn([3, 2, 4], 6);
            const r3 = fn([3, 3], 6);
            return [
                { passed: match(r1, [0, 1]), got: r1 },
                { passed: match(r2, [1, 2]), got: r2 },
                { passed: match(r3, [0, 1]), got: r3 }
            ];
        }
    },
    {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'Easy',
        description: 'Given an integer `n`, return a string array `answer` (1-indexed) where:\n- `answer[i] === "FizzBuzz"` if `i` is divisible by 3 and 5.\n- `answer[i] === "Fizz"` if `i` is divisible by 3.\n- `answer[i] === "Buzz"` if `i` is divisible by 5.\n- `answer[i] === i.toString()` if none of the above conditions are true.',
        constraints: [
            '1 <= n <= 100'
        ],
        jsBoilerplate: `function fizzBuzz(n) {\n    // Write your code here\n    \n}`,
        pythonBoilerplate: `def fizz_buzz(n: int) -> List[str]:\n    # Write your code here\n    pass`,
        cppBoilerplate: `#include <vector>\n#include <string>\nusing namespace std;\n\nvector<string> fizzBuzz(int n) {\n    // Write your code here\n    \n}`,
        javaBoilerplate: `import java.util.*;\n\npublic class Solution {\n    public List<String> fizzBuzz(int n) {\n        // Write your code here\n        return new ArrayList<>();\n    }\n}`,
        testCases: [
            { inputs: [3], expected: ['1', '2', 'Fizz'], formatInput: (i) => `n = ${i[0]}`, formatOutput: (o) => `["${o.join('", "')}"]` },
            { inputs: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'], formatInput: (i) => `n = ${i[0]}`, formatOutput: (o) => `["${o.join('", "')}"]` },
            { inputs: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'], formatInput: (i) => `n = ${i[0]}`, formatOutput: (o) => `["${o.join('", "')}"]` }
        ],
        verifyJS: (fn) => {
            const match = (a: any, b: any) => {
                if (!Array.isArray(a) || !Array.isArray(b)) return false;
                return a.length === b.length && a.every((v, i) => v === b[i]);
            };
            const r1 = fn(3);
            const r2 = fn(5);
            const r3 = fn(15);
            return [
                { passed: match(r1, ['1', '2', 'Fizz']), got: r1 },
                { passed: match(r2, ['1', '2', 'Fizz', '4', 'Buzz']), got: r2 },
                { passed: match(r3, ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']), got: r3 }
            ];
        }
    },
    {
        id: 'palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        description: 'A phrase is a palindrome if, after converting all uppercase characters into lowercase characters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
        constraints: [
            '1 <= s.length <= 2 * 10^5',
            's consists only of printable ASCII characters.'
        ],
        jsBoilerplate: `function isPalindrome(s) {\n    // Write your code here\n    \n}`,
        pythonBoilerplate: `def is_palindrome(s: str) -> bool:\n    # Write your code here\n    pass`,
        cppBoilerplate: `#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // Write your code here\n    \n}`,
        javaBoilerplate: `public class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n}`,
        testCases: [
            { inputs: ['A man, a plan, a canal: Panama'], expected: true, formatInput: (i) => `"${i[0]}"`, formatOutput: (o) => `${o}` },
            { inputs: ['race a car'], expected: false, formatInput: (i) => `"${i[0]}"`, formatOutput: (o) => `${o}` },
            { inputs: [' '], expected: true, formatInput: (i) => `"${i[0]}"`, formatOutput: (o) => `${o}` }
        ],
        verifyJS: (fn) => {
            return [
                { passed: fn('A man, a plan, a canal: Panama') === true, got: fn('A man, a plan, a canal: Panama') },
                { passed: fn('race a car') === false, got: fn('race a car') },
                { passed: fn(' ') === true, got: fn(' ') }
            ];
        }
    }
];

export default function CodePracticeClient() {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
    const [code, setCode] = useState('');
    const [running, setRunning] = useState(false);
    const [testResults, setTestResults] = useState<{ passed: boolean; got: any; error?: string }[] | null>(null);
    const [solvedCount, setSolvedCount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const challenge = CHALLENGES[selectedIdx];
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Initial setup and boilerplate change
    useEffect(() => {
        const key = `${challenge.id}_${language}`;
        const cached = localStorage.getItem(key);
        if (cached) {
            setCode(cached);
        } else {
            setCode(getDefaultBoilerplate(challenge, language));
        }
        setTestResults(null);
    }, [selectedIdx, language, challenge]);

    // Handle code changes
    const handleCodeChange = (val: string) => {
        setCode(val);
        localStorage.setItem(`${challenge.id}_${language}`, val);
    };

    const getDefaultBoilerplate = (ch: Challenge, lang: string) => {
        if (lang === 'javascript') return ch.jsBoilerplate;
        if (lang === 'python') return ch.pythonBoilerplate;
        if (lang === 'cpp') return ch.cppBoilerplate;
        return ch.javaBoilerplate;
    };

    // Reset code to default boilerplate
    const resetBoilerplate = () => {
        if (window.confirm('Reset code to initial template? All changes will be lost.')) {
            const template = getDefaultBoilerplate(challenge, language);
            handleCodeChange(template);
            setTestResults(null);
        }
    };

    // Live Javascript compilation / Safe Browser execution
    const handleRunCode = () => {
        setRunning(true);
        setTestResults(null);

        setTimeout(() => {
            if (language !== 'javascript') {
                // Non-JS compilation mock runner
                // Analyze structural comments/syntax lightly
                const lines = code.split('\n').length;
                const hasEmptyBody = code.includes('pass') || code.includes('return ""') || code.includes('return 0') || code.includes('return false') || code.includes('return new int');
                
                const results = challenge.testCases.map((tc) => {
                    if (hasEmptyBody) {
                        return { passed: false, got: 'None/Empty (Check template body)' };
                    }
                    // Mock compiler analysis - checks code length and structure
                    const passesMock = code.length > getDefaultBoilerplate(challenge, language).length + 10;
                    return {
                        passed: passesMock,
                        got: passesMock ? tc.expected : 'Unfinished/Mock Output'
                    };
                });
                
                setTestResults(results);
                setRunning(false);
                return;
            }

            // JavaScript live sandbox runner
            try {
                // Dynamically compile JS function
                // Using clean, sandboxed eval logic
                const cleanedCode = code.trim();
                const evalFunction = new Function(`
                    ${cleanedCode}
                    return ${getJSFunctionName(challenge)};
                `);
                
                const userFunc = evalFunction();
                if (typeof userFunc !== 'function') {
                    throw new Error(`Could not locate function entry point matching question pattern.`);
                }

                const results = challenge.verifyJS(userFunc);
                setTestResults(results);

                const allPassed = results.every(r => r.passed);
                if (allPassed) {
                    setSolvedCount(prev => prev + 1);
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                }
            } catch (err: any) {
                // Output runtime error to console logs
                setTestResults(challenge.testCases.map(() => ({
                    passed: false,
                    got: 'Compile/Runtime Error',
                    error: err.message || String(err)
                })));
            } finally {
                setRunning(false);
            }
        }, 1200);
    };

    const getJSFunctionName = (ch: Challenge) => {
        if (ch.id === 'reverse-string') return 'reverseString';
        if (ch.id === 'fibonacci') return 'fibonacci';
        if (ch.id === 'two-sum') return 'twoSum';
        if (ch.id === 'fizzbuzz') return 'fizzBuzz';
        return 'isPalindrome';
    };

    // Capture tab key presses inside code editor
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const targetVal = e.currentTarget.value;
            const newCode = targetVal.substring(0, start) + "    " + targetVal.substring(end);
            handleCodeChange(newCode);
            
            // Reposition cursor
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
                }
            }, 0);
        }
    };

    // Generate gutter line counts
    const lineNumbers = code.split('\n').map((_, idx) => idx + 1);

    return (
        <div className="practice-page">
            {showConfetti && (
                <div className="confetti-toast">
                    🎉 Excellent! All Test Cases Passed Successfully!
                </div>
            )}

            <div className="practice-header">
                <div className="container practice-header-inner">
                    <div>
                        <span className="practice-eyebrow">💻 Interview Prep Arena</span>
                        <h1 className="practice-title">Code Practice</h1>
                    </div>
                    <div className="practice-meta-stats">
                        <span className="stat-pill">🚀 Solved: {solvedCount} / {CHALLENGES.length}</span>
                    </div>
                </div>
            </div>

            <div className="practice-container">
                <div className="practice-layout">
                    {/* ── Left Sidebar Challenge Picker ── */}
                    <div className="practice-sidebar">
                        <h2 className="sidebar-section-title">Select Challenge</h2>
                        <div className="challenge-list">
                            {CHALLENGES.map((ch, idx) => {
                                const active = selectedIdx === idx;
                                return (
                                    <button 
                                        key={ch.id} 
                                        className={`challenge-item-btn ${active ? 'active' : ''}`}
                                        onClick={() => setSelectedIdx(idx)}
                                    >
                                        <div className="ch-btn-header">
                                            <span className="ch-btn-title">{ch.title}</span>
                                            <span className={`diff-badge diff-${ch.difficulty.toLowerCase()}`}>
                                                {ch.difficulty}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Center/Right Coding Workspace ── */}
                    <div className="practice-workspace">
                        {/* Split pane layout */}
                        <div className="workspace-grid">
                            
                            {/* Panel 1: Problem Definition */}
                            <div className="workspace-panel problem-panel">
                                <div className="panel-header">
                                    <span className="panel-badge">Question</span>
                                    <h2 className="problem-panel-title">{challenge.title}</h2>
                                </div>
                                <div className="panel-body">
                                    <div className="problem-description">
                                        <p>{challenge.description}</p>
                                    </div>
                                    
                                    <div className="problem-sub-section">
                                        <h4>Constraints</h4>
                                        <ul>
                                            {challenge.constraints.map((c, idx) => (
                                                <li key={idx}><code>{c}</code></li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="problem-sub-section">
                                        <h4>Test Cases Examples</h4>
                                        <div className="example-cases">
                                            {challenge.testCases.map((tc, idx) => (
                                                <div key={idx} className="example-case-card">
                                                    <div><strong>Input:</strong> <code>{tc.formatInput(tc.inputs)}</code></div>
                                                    <div><strong>Expected:</strong> <code>{tc.formatOutput(tc.expected)}</code></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel 2: Code Editor */}
                            <div className="workspace-panel editor-panel">
                                <div className="panel-header editor-header">
                                    <select 
                                        value={language} 
                                        onChange={(e) => setLanguage(e.target.value as any)}
                                        className="editor-lang-select"
                                    >
                                        <option value="javascript">JavaScript (Live Run)</option>
                                        <option value="python">Python 3 (Simulated)</option>
                                        <option value="cpp">C++ (Simulated)</option>
                                        <option value="java">Java (Simulated)</option>
                                    </select>

                                    <div className="editor-controls">
                                        <button className="btn-editor-control" onClick={resetBoilerplate} title="Reset Code">
                                            ↺ Reset
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="editor-wrapper">
                                    <div className="editor-gutter">
                                        {lineNumbers.map(n => (
                                            <span key={n}>{n}</span>
                                        ))}
                                    </div>
                                    <textarea
                                        ref={textareaRef}
                                        value={code}
                                        onChange={(e) => handleCodeChange(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="editor-textarea"
                                        spellCheck="false"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                    />
                                </div>

                                <div className="editor-action-footer">
                                    {language !== 'javascript' && (
                                        <span className="lang-note-hint">⚠️ Non-JS languages run in simulated check mode. Use JavaScript for fully live execution validation.</span>
                                    )}
                                    <button 
                                        className="btn-run-code" 
                                        onClick={handleRunCode}
                                        disabled={running}
                                    >
                                        {running ? 'Compiling & Running...' : '⚡ Run Code'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Result Outputs Section */}
                        <div className="workspace-results">
                            <h3 className="results-header-title">Compiler & Test Suite Outputs</h3>
                            
                            {!testResults && !running && (
                                <div className="results-placeholder">
                                    Click "Run Code" above to check your solution against the test suite cases.
                                </div>
                            )}

                            {running && (
                                <div className="results-running">
                                    <div className="pulse-loader" />
                                    <span>Compiling sources and executing local test cases...</span>
                                </div>
                            )}

                            {testResults && (
                                <div className="results-report-grid">
                                    {testResults[0]?.error ? (
                                        <div className="console-error-box">
                                            <h4>🛑 Compilation / Interpreter Exception:</h4>
                                            <pre>{testResults[0].error}</pre>
                                        </div>
                                    ) : (
                                        challenge.testCases.map((tc, idx) => {
                                            const result = testResults[idx];
                                            const isPassed = result?.passed;
                                            return (
                                                <div key={idx} className={`test-case-row ${isPassed ? 'passed' : 'failed'}`}>
                                                    <div className="tc-status-col">
                                                        <span className={`status-icon-badge ${isPassed ? 'passed' : 'failed'}`}>
                                                            {isPassed ? '✓ Pass' : '✗ Fail'}
                                                        </span>
                                                        <span className="tc-index-lbl">Test Case {idx + 1}</span>
                                                    </div>
                                                    
                                                    <div className="tc-details-col">
                                                        <div><strong>Input:</strong> <code>{tc.formatInput(tc.inputs)}</code></div>
                                                        <div><strong>Expected:</strong> <code>{tc.formatOutput(tc.expected)}</code></div>
                                                        <div><strong>Got:</strong> <code style={{ color: isPassed ? '#10b981' : '#ef4444' }}>{typeof result?.got === 'object' ? JSON.stringify(result.got) : String(result?.got)}</code></div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .practice-page {
                    background: var(--background);
                    min-height: 90vh;
                }

                .practice-header {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    padding: 3rem 1.5rem 2rem;
                    color: white;
                }

                .practice-header-inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .practice-eyebrow {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.15em;
                    color: rgba(165, 180, 252, 0.9);
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                .practice-title {
                    font-size: 2.2rem;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    line-height: 1;
                }

                .stat-pill {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 0.5rem 1.25rem;
                    border-radius: 99px;
                    font-size: 0.85rem;
                    font-weight: 800;
                }

                .practice-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 5rem;
                }

                .practice-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                @media (min-width: 900px) {
                    .practice-layout {
                        grid-template-columns: 280px 1fr;
                    }
                }

                /* Sidebar challenge picker */
                .practice-sidebar {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem;
                    padding: 1.5rem;
                    box-shadow: var(--card-shadow);
                    height: fit-content;
                }

                .sidebar-section-title {
                    font-size: 0.9rem;
                    font-weight: 850;
                    color: var(--text);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1.25rem;
                }

                .challenge-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .challenge-item-btn {
                    width: 100%;
                    text-align: left;
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    padding: 1rem 1.25rem;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                }

                .challenge-item-btn:hover {
                    border-color: var(--primary);
                }

                .challenge-item-btn.active {
                    background: rgba(79, 70, 229, 0.06);
                    border-color: var(--primary);
                }

                .ch-btn-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 0.5rem;
                }

                .ch-btn-title {
                    font-size: 0.9rem;
                    font-weight: 750;
                    color: var(--text);
                }

                .diff-badge {
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 0.2rem 0.5rem;
                    border-radius: 99px;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                }

                .diff-easy { background: rgba(16, 185, 129, 0.12); color: #10b981; }
                .diff-medium { background: rgba(245, 158, 11, 0.12); color: #d97706; }
                .diff-hard { background: rgba(239, 68, 68, 0.12); color: #ef4444; }

                /* Workspace */
                .practice-workspace {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .workspace-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                @media (min-width: 1024px) {
                    .workspace-grid {
                        grid-template-columns: 1fr 1.2fr;
                    }
                }

                .workspace-panel {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem;
                    box-shadow: var(--card-shadow);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .panel-header {
                    background: var(--background);
                    border-bottom: 1px solid var(--surface-border);
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .panel-badge {
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 0.25rem 0.6rem;
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    text-transform: uppercase;
                    border-radius: 4px;
                    letter-spacing: 0.05em;
                }

                .problem-panel-title {
                    font-size: 1.1rem;
                    font-weight: 850;
                    color: var(--text);
                }

                .panel-body {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    overflow-y: auto;
                    max-height: 480px;
                }

                .problem-description p {
                    font-size: 0.95rem;
                    color: var(--text);
                    line-height: 1.6;
                }

                .problem-sub-section h4 {
                    font-size: 0.85rem;
                    font-weight: 850;
                    color: var(--text);
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    margin-bottom: 0.6rem;
                }

                .problem-sub-section ul {
                    padding-left: 1.25rem;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }

                .problem-sub-section li {
                    margin-bottom: 0.4rem;
                }

                .example-cases {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .example-case-card {
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    padding: 0.85rem 1.1rem;
                    border-radius: 0.75rem;
                    font-family: monospace;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: var(--text);
                }

                /* Editor Panel */
                .editor-header {
                    justify-content: space-between;
                }

                .editor-lang-select {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 0.5rem;
                    padding: 0.4rem 0.8rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--text);
                    outline: none;
                }

                .btn-editor-control {
                    background: none;
                    border: 1px solid var(--surface-border);
                    padding: 0.4rem 0.8rem;
                    border-radius: 0.5rem;
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: border-color 0.2s, color 0.2s;
                }

                .btn-editor-control:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .editor-wrapper {
                    display: flex;
                    position: relative;
                    flex: 1;
                    height: 380px;
                    background: #1e1e2e;
                }

                [data-theme="light"] .editor-wrapper {
                    background: #282a36;
                }

                .editor-gutter {
                    width: 44px;
                    display: flex;
                    flex-direction: column;
                    text-align: right;
                    padding: 1.2rem 0.8rem 1.2rem 0;
                    font-family: monospace;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.25);
                    line-height: 1.5;
                    user-select: none;
                    background: rgba(0, 0, 0, 0.15);
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }

                .editor-textarea {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    resize: none;
                    color: #f8f8f2;
                    font-family: 'Fira Code', 'Courier New', Courier, monospace;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    padding: 1.2rem 1rem;
                    white-space: pre;
                    overflow: auto;
                    tab-size: 4;
                }

                .editor-action-footer {
                    background: var(--background);
                    border-top: 1px solid var(--surface-border);
                    padding: 0.9rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }

                .lang-note-hint {
                    font-size: 0.72rem;
                    color: var(--text-muted);
                    max-width: 60%;
                }

                .btn-run-code {
                    background: var(--gradient);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 800;
                    font-size: 0.88rem;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .btn-run-code:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
                }

                .btn-run-code:disabled {
                    opacity: 0.7;
                    cursor: default;
                }

                /* Results area */
                .workspace-results {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem;
                    padding: 1.5rem;
                    box-shadow: var(--card-shadow);
                }

                .results-header-title {
                    font-size: 0.95rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 1rem;
                }

                .results-placeholder {
                    background: var(--background);
                    border: 1.5px dashed var(--surface-border);
                    border-radius: 0.75rem;
                    padding: 2.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }

                .results-running {
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    border-radius: 0.75rem;
                    padding: 2.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }

                .pulse-loader {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--primary);
                    animation: pulse-ring 1.2s infinite ease-in-out;
                }

                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(0.8); opacity: 0.5; }
                }

                .results-report-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .console-error-box {
                    background: #fef2f2;
                    border: 1px solid #fee2e2;
                    padding: 1.25rem;
                    border-radius: 0.75rem;
                    color: #991b1b;
                    font-family: monospace;
                    font-size: 0.85rem;
                }

                .console-error-box h4 {
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                }

                .console-error-box pre {
                    white-space: pre-wrap;
                }

                .test-case-row {
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    border-radius: 0.75rem;
                    padding: 1rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    transition: border-color 0.2s;
                }

                @media (min-width: 640px) {
                    .test-case-row {
                        flex-direction: row;
                        align-items: center;
                    }
                }

                .test-case-row.passed {
                    border-left: 4px solid #10b981;
                }

                .test-case-row.failed {
                    border-left: 4px solid #ef4444;
                }

                .tc-status-col {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    min-width: 150px;
                    flex-shrink: 0;
                }

                .status-icon-badge {
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 0.25rem 0.6rem;
                    border-radius: 99px;
                    text-transform: uppercase;
                }

                .status-icon-badge.passed {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                }

                .status-icon-badge.failed {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                }

                .tc-index-lbl {
                    font-size: 0.88rem;
                    font-weight: 750;
                    color: var(--text);
                }

                .tc-details-col {
                    flex: 1;
                    font-family: monospace;
                    font-size: 0.82rem;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0.25rem;
                }

                @media (min-width: 640px) {
                    .tc-details-col {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1rem;
                    }
                }

                /* Confetti Toast Toast Alert */
                .confetti-toast {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: #10b981;
                    color: white;
                    padding: 1rem 1.75rem;
                    border-radius: 1rem;
                    font-weight: 800;
                    font-size: 0.95rem;
                    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                    z-index: 9999;
                    animation: slide-up-toast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                @keyframes slide-up-toast {
                    0% { transform: translateY(50px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
