'use client';

import React from 'react';
import Link from 'next/link';

interface ToolCardProps {
    title: string;
    description: string;
    icon: string;
    path: string;
    badge?: string;
    gradient: string;
    isExternal?: boolean;
}

const ToolCard = ({ title, description, icon, path, badge, gradient, isExternal }: ToolCardProps) => {
    if (isExternal) {
        return (
            <a href={path} target="_blank" rel="noopener noreferrer" className="tools-card seal-featured-card">
                <div className="tools-card-bg" style={{ background: gradient }} />
                <div className="tools-card-inner">
                    <div className="tools-card-header">
                        <span className="tools-card-icon">{icon}</span>
                        {badge && <span className="tools-card-badge" style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: '#ffffff' }}>{badge}</span>}
                    </div>
                    <h3 className="tools-card-title">{title}</h3>
                    <p className="tools-card-desc">{description}</p>
                    <div className="tools-card-footer">
                        <span>Launch Seal PDF 🚀</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </div>
                </div>
            </a>
        );
    }

    return (
        <Link href={path} className="tools-card">
            <div className="tools-card-bg" style={{ background: gradient }} />
            <div className="tools-card-inner">
                <div className="tools-card-header">
                    <span className="tools-card-icon">{icon}</span>
                    {badge && <span className="tools-card-badge">{badge}</span>}
                </div>
                <h3 className="tools-card-title">{title}</h3>
                <p className="tools-card-desc">{description}</p>
                <div className="tools-card-footer">
                    <span>Launch Tool</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default function StudentToolsDashboard() {
    const tools = [
        {
            title: 'Seal PDF — Free PDF Toolkit',
            description: 'Merge multiple PDFs, compress document file size, convert PDF to Word/Images, split, protect and edit PDFs online for free with zero limits.',
            icon: '🦭',
            path: 'https://seal-pdf.com/',
            badge: '🔥 FREE PDF SUITE',
            gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
            isExternal: true
        },
        {
            title: 'VTU Results Portal',
            description: 'Check your semester results instantly, view color-coded marksheets, solve captcha authentications for live scraping, and analyze your CGPA trend.',
            icon: '🎓',
            path: '/student-tools/vtu-results',
            badge: 'Live',
            gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)'
        },
        {
            title: 'Resume Builder',
            description: 'Create a clean, single-page, ATS-friendly engineering resume. Fill out standard templates, preview instantly, and print/export to PDF.',
            icon: '📄',
            path: '/student-tools/resume-builder',
            badge: 'Popular',
            gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
        },
        {
            title: 'Code Practice',
            description: 'Practice fundamental engineering and coding questions in the browser. Test your code live against test suites in an interactive editor.',
            icon: '💻',
            path: '/student-tools/code-practice',
            badge: 'Interactive',
            gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
        },
        {
            title: 'Quiz Arena',
            description: 'Test your understanding of core computer science and engineering engineering subjects with active timer-based quizzes.',
            icon: '⚡',
            path: '/student-tools/quiz',
            badge: 'New',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        },
        {
            title: 'Typing Speed Test',
            description: 'Assess and practice your keyboarding speed. Type standard computer science paragraphs, check your active accuracy, and track live WPM scores.',
            icon: '⌨️',
            path: '/student-tools/typing-test',
            badge: 'Speed Run',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
        },
        {
            title: 'VTU SGPA Calculator',
            description: 'Calculate your VTU SGPA for 2022 scheme and 2025 scheme across all engineering branches and semesters accurately and instantly.',
            icon: '📈',
            path: '/sgpa-calculator',
            badge: '2022 & 2025 Scheme',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        },
        {
            title: 'CGPA Calculator',
            description: 'Calculate your Cumulative Grade Point Average based on previous semester scores and analyze academic rating trends.',
            icon: '📐',
            path: '/cgpa-calculator',
            gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
        }
    ];

    return (
        <div className="tools-hub-page">
            <div className="tools-hero">
                <div className="tools-blob-a" />
                <div className="tools-blob-b" />
                <div className="tools-hero-inner">
                    <div className="tools-eyebrow">⚡ VTUwise Student Suite</div>
                    <h1 className="tools-title">Engineering Student Tools</h1>
                    <p className="tools-subtitle">
                        Boost your academic and career productivity with our custom suite of calculators, compilers, study practice zones, and resume builders.
                    </p>
                </div>
            </div>

            <div className="tools-content-container">
                <div className="tools-grid">
                    {tools.map((t, idx) => (
                        <ToolCard key={idx} {...t} />
                    ))}
                </div>
            </div>

            <style>{`
                .tools-hub-page {
                    background: var(--background);
                    min-height: 90vh;
                }

                .tools-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #0b0f19 0%, #111827 50%, #1e1b4b 100%);
                    padding: 5rem 1.5rem 4rem;
                    text-align: center;
                }

                .tools-blob-a {
                    position: absolute;
                    top: -6rem;
                    right: -6rem;
                    width: 380px;
                    height: 380px;
                    border-radius: 50%;
                    pointer-events: none;
                    background: radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%);
                }

                .tools-blob-b {
                    position: absolute;
                    bottom: -5rem;
                    left: -5rem;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    pointer-events: none;
                    background: radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%);
                }

                .tools-hero-inner {
                    position: relative;
                    z-index: 1;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .tools-eyebrow {
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(165, 180, 252, 0.9);
                    margin-bottom: 1rem;
                }

                .tools-title {
                    font-size: clamp(2.2rem, 7vw, 4rem);
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    color: #fff;
                    margin-bottom: 1rem;
                    line-height: 1.1;
                }

                .tools-subtitle {
                    color: rgba(209, 213, 219, 0.8);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                .tools-content-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem 6rem;
                }

                .tools-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .tools-card {
                    position: relative;
                    text-decoration: none;
                    border-radius: 1.5rem;
                    overflow: hidden;
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    box-shadow: var(--card-shadow);
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s;
                    display: flex;
                    flex-direction: column;
                }

                .tools-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--hover-shadow);
                }

                .tools-card-bg {
                    height: 8px;
                    width: 100%;
                }

                .tools-card-inner {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    flex: 1;
                }

                .tools-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .tools-card-icon {
                    font-size: 2.2rem;
                    line-height: 1;
                }

                .tools-card-badge {
                    background: rgba(79, 70, 229, 0.08);
                    color: var(--primary);
                    padding: 0.35rem 0.8rem;
                    border-radius: 2rem;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .tools-card-title {
                    font-size: 1.5rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 0.75rem;
                    letter-spacing: -0.02em;
                }

                .tools-card-desc {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    flex: 1;
                }

                .tools-card-footer {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 700;
                    color: var(--primary);
                    font-size: 0.9rem;
                    margin-top: auto;
                    transition: gap 0.2s;
                }

                .tools-card-footer svg {
                    width: 16px;
                    height: 16px;
                    transition: transform 0.2s;
                }

                .tools-card:hover .tools-card-footer {
                    gap: 0.75rem;
                }

                .tools-card:hover .tools-card-footer svg {
                    transform: translateX(4px);
                }

                @media (max-width: 640px) {
                    .tools-hero {
                        padding: 3.5rem 1.25rem 2.5rem;
                    }
                    .tools-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .tools-content-container {
                        padding: 2.5rem 1.25rem 4rem;
                    }
                }
            `}</style>
        </div>
    );
}
