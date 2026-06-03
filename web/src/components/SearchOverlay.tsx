'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteData } from '@/data/notesData';
import Link from 'next/link';

interface SearchResult {
    title: string;
    subtitle: string;
    link: string;
    type: 'branch' | 'semester' | 'subject';
}

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setQuery('');
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const searchResults: SearchResult[] = [];

        Object.keys(siteData).forEach(branchSlug => {
            const branch = siteData[branchSlug];
            
            // Search in branches
            if (branch.title.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    title: branch.title,
                    subtitle: 'Branch',
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
                                subtitle: `${branch.title} | Sem ${sem.sem} | ${subject.code}`,
                                link: `/${branchSlug}/${sem.sem}/${subject.slug}`,
                                type: 'subject'
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
                                    subtitle: `${branch.title} | ${scheme.name} | ${cycle.name} | ${subject.code}`,
                                    link: `/${branchSlug}/${scheme.slug}/${cycle.slug}/${subject.slug}`,
                                    type: 'subject'
                                });
                            }
                        });
                    });
                });
            }
        });

        setResults(searchResults.slice(0, 10)); // Top 10 results
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className={`search-overlay ${isOpen ? 'active' : ''}`}>
            <button className="search-close-large" onClick={onClose} aria-label="Close Search">&times;</button>
            
            <div className="search-container">
                <div className="search-input-wrapper">
                    <svg className="search-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search notes, subjects, or codes..." 
                        className="search-input"
                        aria-label="Search notes, subjects, or codes"
                    />
                </div>

                {!query && (
                    <div className="search-quick-links">
                        <p>Popular Search:</p>
                        <div className="quick-link-chips">
                            {['Mathematics', 'Physics', 'Chemistry', 'Civil', 'Mechanical'].map(tag => (
                                <button key={tag} onClick={() => setQuery(tag)} className="quick-chip">{tag}</button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="search-results-v2">
                    {results.map((res, i) => (
                        <Link key={i} href={res.link} onClick={onClose} className="search-result-item">
                            <div className="res-content">
                                <span className="res-title">{res.title}</span>
                                <span className="res-subtitle">{res.subtitle}</span>
                            </div>
                            <svg className="res-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7l7 7-7 7"></path></svg>
                        </Link>
                    ))}
                    {query && results.length === 0 && (
                        <div className="no-results">No matches found for "{query}"</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
