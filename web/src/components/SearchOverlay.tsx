'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteData } from '@/data/notesData';
import Link from 'next/link';

interface SearchResult {
    title: string;
    subtitle: string;
    link: string;
    type: 'branch' | 'semester' | 'subject' | 'tool';
    code?: string;
}

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const QUICK_TOOLS = [
    { name: "VTU Results", desc: "Semester result & grade lookup", link: "/student-tools/vtu-results", icon: "📊" },
    { name: "SGPA Calculator", desc: "Grade point calculator", link: "/sgpa-calculator", icon: "🧮" },
    { name: "Solved PYQPs", desc: "Previous year question papers", link: "/previous-year-question-papers", icon: "📚" },
    { name: "Aptitude Test", desc: "Placement mock test", link: "/student-tools/aptitude-test", icon: "🎯" },
    { name: "Resume Builder", desc: "ATS engineering resumes", link: "/student-tools/resume-builder", icon: "📄" },
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setQuery('');
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const searchResults: SearchResult[] = [];

        // Check for matching tools
        QUICK_TOOLS.forEach(tool => {
            if (tool.name.toLowerCase().includes(lowerQuery) || tool.desc.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    title: tool.name,
                    subtitle: `Student Tool | ${tool.desc}`,
                    link: tool.link,
                    type: 'tool'
                });
            }
        });

        Object.keys(siteData).forEach(branchSlug => {
            const branch = siteData[branchSlug];
            
            // Search in branches
            if (branch.title.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    title: branch.title,
                    subtitle: 'Branch Directory',
                    link: `/${branchSlug}`,
                    type: 'branch'
                });
            }

            // Search in semesters and subjects
            if (branch.semesters) {
                branch.semesters.forEach(sem => {
                    sem.subjects.forEach(subject => {
                        if (subject.name.toLowerCase().includes(lowerQuery) || subject.code.toLowerCase().includes(lowerQuery)) {
                            searchResults.push({
                                title: subject.name,
                                subtitle: `${branch.title} • Sem ${sem.sem}`,
                                link: `/${branchSlug}/${sem.sem}/${subject.slug}`,
                                type: 'subject',
                                code: subject.code
                            });
                        }
                    });
                });
            }

            // Search in schemes and cycles
            if (branch.schemes) {
                branch.schemes.forEach(scheme => {
                    scheme.cycles.forEach(cycle => {
                        cycle.subjects.forEach(subject => {
                            if (subject.name.toLowerCase().includes(lowerQuery) || subject.code.toLowerCase().includes(lowerQuery)) {
                                searchResults.push({
                                    title: subject.name,
                                    subtitle: `${branch.title} • ${scheme.name} • ${cycle.name}`,
                                    link: `/${branchSlug}/${scheme.slug}/${cycle.slug}/${subject.slug}`,
                                    type: 'subject',
                                    code: subject.code
                                });
                            }
                        });
                    });
                });
            }
        });

        setResults(searchResults.slice(0, 10));
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className={`search-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="search-spotlight-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-header-box">
                    <svg className="search-icon-inside" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search notes, subject codes (e.g. 21CS61), or tools..." 
                        className="search-spotlight-input"
                        aria-label="Search site content"
                    />

                    {query && (
                        <button className="search-clear-btn" onClick={() => setQuery('')} aria-label="Clear Query">
                            ✕
                        </button>
                    )}

                    <button className="search-esc-badge" onClick={onClose} aria-label="Close modal">
                        ESC
                    </button>
                </div>

                <div className="search-body-box">
                    {!query ? (
                        <div className="search-initial-view">
                            <div className="search-section-label">STUDENT TOOLS</div>
                            <div className="quick-tools-grid">
                                {QUICK_TOOLS.map(tool => (
                                    <Link key={tool.link} href={tool.link} onClick={onClose} className="quick-tool-card">
                                        <span className="tool-card-icon">{tool.icon}</span>
                                        <div className="tool-card-info">
                                            <span className="tool-card-name">{tool.name}</span>
                                            <span className="tool-card-desc">{tool.desc}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="search-section-label" style={{ marginTop: '1.25rem' }}>POPULAR SEARCH TOPICS</div>
                            <div className="popular-tags-flex">
                                {['Mathematics', 'Physics', 'Data Structures', 'Operating Systems', 'Python', 'Civil'].map(tag => (
                                    <button key={tag} onClick={() => setQuery(tag)} className="popular-tag-btn">
                                        🔍 {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="search-results-list">
                            {results.map((res, i) => (
                                <Link key={i} href={res.link} onClick={onClose} className="spotlight-result-item">
                                    <div className="result-left">
                                        <span className={`result-type-badge type-${res.type}`}>
                                            {res.type.toUpperCase()}
                                        </span>
                                        <div className="result-text-col">
                                            <span className="result-title-text">{res.title}</span>
                                            <span className="result-sub-text">{res.subtitle}</span>
                                        </div>
                                    </div>

                                    {res.code && (
                                        <span className="result-code-pill">{res.code}</span>
                                    )}

                                    <svg className="result-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14m-7-7l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            ))}

                            {results.length === 0 && (
                                <div className="no-search-matches">
                                    <div className="no-matches-icon">🔍</div>
                                    <p>No results found for "<strong>{query}</strong>"</p>
                                    <span>Try searching for course codes like 21CS61 or subject names</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="search-footer-bar">
                    <span>💡 Tip: Press <kbd>ESC</kbd> to exit search anytime</span>
                    <span>VTU wise Directory</span>
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
