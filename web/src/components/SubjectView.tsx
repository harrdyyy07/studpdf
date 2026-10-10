'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Subject } from '@/data/notesData';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSubjectBlog } from '@/data/subjectBlogsData';

interface SubjectViewProps {
    branch: string;
    branchTitle: string;
    sem: number | string;
    subject: Subject;
    cycle?: string;
}

const typeLabels: Record<string, string> = {
    'Notes': 'Notes',
    'notes': 'Notes',
    'PYQP': 'Question Paper',
    'MQP': 'Model Paper',
    'scheme': 'Scheme of Evaluation',
    'Scheme of Evaluation': 'Scheme of Evaluation',
    'question bank': 'Question Bank',
    'Lab Manual': 'Lab Manual',
    'Textbook': 'Textbook',
    'textbook': 'Textbook',
    'PYQP & MQP': 'PYQP & MQP',
    'youtube links': 'YouTube Links',
    'Handbook': 'Handbook',
    'Solved PYQP': 'Solved PYQP'
};

const getPreviewLink = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
        return url.replace('/view', '/preview').split('?')[0];
    }
    return url;
};

const getDownloadLink = (url: string) => {
    const match = url.match(/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url;
};

const SubjectView: React.FC<SubjectViewProps> = ({ branch, branchTitle, sem, subject, cycle }) => {
    const availableTypes = Array.from(new Set(subject.modules.map(mod => mod.type)));
    const [activeFilter, setActiveFilter] = useState('All');
    const [previewContent, setPreviewContent] = useState<{url: string, title: string} | null>(null);
    const [mounted, setMounted] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const blog = getSubjectBlog(subject.code, subject.name, subject.modules);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (previewContent) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setPreviewContent(null);
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [previewContent]);

    // Sort filters to put 'Notes' and 'PYQP' early if they exist
    const filters = ['All', ...availableTypes.sort((a, b) => {
        const aLabel = typeLabels[a] || a;
        const bLabel = typeLabels[b] || b;
        if (aLabel === 'Notes') return -1;
        if (bLabel === 'Notes') return 1;
        if (aLabel === 'Question Paper') return -1;
        if (bLabel === 'Question Paper') return 1;
        return aLabel.localeCompare(bLabel);
    })];

    const filteredModules = activeFilter === 'All' 
        ? subject.modules 
        : subject.modules.filter(mod => mod.type === activeFilter);

    const breadcrumbItems = [
        { label: branch.toUpperCase(), href: `/${branch}` },
        { label: `Sem ${sem}`, href: `/${branch}/${sem}` },
        { label: subject.name, href: '#' }
    ];

    return (
        <div className="container py-8">
            <Breadcrumbs items={breadcrumbItems} />
            
            <div className="mb-12">
                <div className="flex flex-col gap-6">
                    <div>
                        <span className="pill pill-subject">SUBJECT</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-text">{subject.name}</h1>
                    <p className="text-lg text-text-muted max-w-2xl">Access module-wise notes and solved question papers.</p>
                </div>
                
                <div className="mt-6">
                    <div className="pill pill-dept">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
                        {branchTitle}
                    </div>
                </div>
            </div>

            <div className="chip-group">
                {filters.map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`chip ${activeFilter === filter ? 'active' : ''}`}
                    >
                        {typeLabels[filter] || filter}
                    </button>
                ))}
            </div>

            <div className="module-grid">
                {filteredModules.map((mod, idx) => (
                    <div key={`${mod.id}-${idx}`} className="module-card">
                        <div>
                            <div className="module-header">
                                <div className="module-icon-box">📄</div>
                                <span className="module-type-badge">
                                    {(typeLabels[mod.type] || mod.type).toUpperCase()}
                                </span>
                            </div>
                            <h3>{mod.name}</h3>
                            <p>{mod.desc}</p>
                        </div>
                        <div className="module-actions">
                            <button 
                                onClick={() => setPreviewContent({ url: getPreviewLink(mod.link), title: mod.name })} 
                                className="btn-preview cursor-pointer"
                            >
                                Preview
                            </button>
                            <a href={getDownloadLink(mod.link)} target="_blank" rel="noopener noreferrer" className="btn-download-solid">Download</a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredModules.length > 0 && (
                <div className="support-callout-card glass mt-8 p-6 text-center flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-text mb-1 flex items-center gap-2">
                            <span>❤️</span> Support VTUwise
                        </h3>
                        <p className="text-sm text-text-muted">
                            If you find these notes and resources helpful, please consider supporting us. Your contributions help keep this platform free and ad-free!
                        </p>
                    </div>
                    <Link href="/support" className="btn-download-solid shrink-0 px-6 py-2.5 font-bold text-sm rounded-xl text-center inline-block hover:scale-[1.02] transition-transform">
                        Support Us
                    </Link>
                </div>
            )}
            
            {filteredModules.length === 0 && (
                <div className="text-center py-24 opacity-30 italic">No resources found for this category.</div>
            )}

            {blog && (
                <div className="subject-blog-section mt-16 pt-12 border-t border-surface-border">
                    <div className="subject-blog-card">
                        <div className="subject-blog-badge">📚 STUDY GUIDE & EXAM STRATEGY</div>
                        <h2 className="subject-blog-title">{blog.title}</h2>
                        <div className="subject-blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {blog.faqs && blog.faqs.length > 0 && (
                        <div className="subject-faq-section mt-16">
                            <h2 className="section-title text-left mb-8">Frequently Asked Questions</h2>
                            <div className="faq-list">
                                {blog.faqs.map((faq, idx) => (
                                    <div key={idx} className="faq-item">
                                        <button 
                                            className="faq-question"
                                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                        >
                                            <span>{faq.question}</span>
                                            <span className={`faq-icon ${openFaqIndex === idx ? 'open' : ''}`}>▼</span>
                                        </button>
                                        <div className={`faq-answer-wrapper ${openFaqIndex === idx ? 'open' : ''}`}>
                                            <div className="faq-answer">{faq.answer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {blog.faqs && blog.faqs.length > 0 && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "FAQPage",
                                    "mainEntity": blog.faqs.map(faq => ({
                                        "@type": "Question",
                                        "name": faq.question,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": faq.answer
                                        }
                                    }))
                                })
                            }}
                        />
                    )}
                </div>
            )}

            {mounted && previewContent && createPortal(
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-sm"
                    onClick={() => setPreviewContent(null)}>
                    
                    <div className="relative w-full max-w-6xl h-full max-h-[92vh] bg-[#222222] rounded-[12px] flex flex-col overflow-hidden shadow-2xl"
                         onClick={e => e.stopPropagation()}>
                         
                        <div className="flex items-center justify-between px-6 py-4 bg-[#282828] shrink-0 border-b border-white/5">
                            <h3 className="text-white font-bold text-[16px] m-0 tracking-wide truncate min-w-0 pr-4">{previewContent.title}</h3>
                            <button onClick={() => setPreviewContent(null)}
                                    className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
                                    title="Close">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        
                        <div className="flex-1 w-full relative bg-[#222222]">
                            <iframe 
                                src={previewContent.url} 
                                className="absolute inset-0 w-full h-full border-0"
                                allow="autoplay"
                                title={previewContent.title}
                            ></iframe>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <style>{`
                /* Subject Blog Styling */
                .subject-blog-section {
                    max-width: 850px;
                    margin: 4rem auto 0;
                }
                .subject-blog-card {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: var(--radius-xl);
                    padding: 2.5rem;
                    box-shadow: var(--card-shadow);
                    text-align: left;
                }
                .subject-blog-badge {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--primary);
                    background: rgba(79, 70, 229, 0.08);
                    padding: 0.4rem 1rem;
                    border-radius: 2rem;
                    letter-spacing: 0.05em;
                    margin-bottom: 1.5rem;
                }
                .subject-blog-title {
                    font-size: clamp(1.8rem, 4vw, 2.5rem);
                    font-weight: 900;
                    line-height: 1.2;
                    letter-spacing: -0.03em;
                    color: var(--text);
                    margin-bottom: 2rem;
                    text-align: left;
                }
                .subject-blog-content {
                    font-size: 1rem;
                    line-height: 1.8;
                    color: var(--text-muted);
                    text-align: left;
                }
                .subject-blog-content p {
                    margin-bottom: 1.25rem;
                }
                .subject-blog-content h2 {
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: var(--text);
                    margin: 2.5rem 0 1rem;
                    padding-left: 0.75rem;
                    border-left: 4px solid var(--primary);
                    text-align: left;
                }
                .subject-blog-content h3 {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: var(--text);
                    margin: 1.75rem 0 0.75rem;
                    text-align: left;
                }
                .subject-blog-content ul, .subject-blog-content ol {
                    margin: 1rem 0 1.5rem;
                    padding-left: 1.25rem;
                }
                .subject-blog-content li {
                    margin-bottom: 0.5rem;
                    text-align: left;
                }
                .subject-blog-content strong {
                    color: var(--text);
                }
                .subject-blog-content .syllabus-modules-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    margin: 1.5rem 0;
                }
                .subject-blog-content .syllabus-module-item {
                    background: var(--background);
                    border: 1px solid var(--surface-border);
                    border-radius: var(--radius-md);
                    padding: 1.25rem 1.5rem;
                    text-align: left;
                }
                .subject-blog-content .syllabus-module-item h3 {
                    margin-top: 0;
                    margin-bottom: 0.5rem;
                    color: var(--text);
                }

                /* FAQ Accordion Styling */
                .faq-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 3rem;
                }
                .faq-item {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: var(--radius-md);
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .faq-item:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
                    border-color: var(--primary);
                }
                .faq-question {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 1.25rem 1.5rem;
                    background: none;
                    border: none;
                    text-align: left;
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--text);
                    cursor: pointer;
                }
                .faq-icon {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    transition: transform 0.3s ease;
                }
                .faq-icon.open {
                    transform: rotate(180deg);
                    color: var(--primary);
                }
                .faq-answer-wrapper {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1);
                }
                .faq-answer-wrapper.open {
                    max-height: 1000px;
                    transition: max-height 0.5s ease-in-out;
                }
                .faq-answer {
                    padding: 0 1.5rem 1.5rem;
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: var(--text-muted);
                    text-align: left;
                }
            `}</style>
        </div>
    );
};

export default SubjectView;
