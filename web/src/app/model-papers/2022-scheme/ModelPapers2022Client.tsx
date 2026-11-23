'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/ui/Container';
import { modelPapers2022Data, ModelPaperItem } from '@/data/modelPapersData';

const ITEMS_PER_PAGE = 24;

const CATEGORIES = [
    { label: 'All Subjects', key: 'ALL' },
    { label: 'CSE & Information Sci.', key: 'CSE' },
    { label: 'Electronics & Comm.', key: 'ECE' },
    { label: 'Mechanical & Auto', key: 'MECH' },
    { label: 'Civil Engineering', key: 'CIVIL' },
    { label: 'Electrical & Electronics', key: 'EEE' },
    { label: 'Mathematics & Science', key: 'MATH' },
];

const matchesCategory = (item: ModelPaperItem, category: string): boolean => {
    if (category === 'ALL') return true;
    const s = item.subject.toUpperCase();
    const linkStr = item.links.map(l => l.title.toUpperCase()).join(' ');
    const combined = `${s} ${linkStr}`;

    if (category === 'CSE') {
        return combined.includes('COMPUTER') || combined.includes('DATA STRUCTURE') || combined.includes('ALGORITHM') ||
            combined.includes('OPERATING') || combined.includes('SOFTWARE') || combined.includes('JAVA') ||
            combined.includes('PYTHON') || combined.includes('CLOUD') || combined.includes('NETWORK') ||
            combined.includes('DATABASE') || combined.includes('CYBER') || combined.includes('MACHINE LEARNING') ||
            combined.includes('ARTIFICIAL') || combined.includes('BCS') || combined.includes('21CS') || combined.includes('21IS');
    }
    if (category === 'ECE') {
        return combined.includes('ELECTRONIC') || combined.includes('COMMUNICATION') || combined.includes('SIGNAL') ||
            combined.includes('MICROCONTROLLER') || combined.includes('VLSI') || combined.includes('EMBEDDED') ||
            combined.includes('DIGITAL DESIGN') || combined.includes('BEC') || combined.includes('21EC');
    }
    if (category === 'MECH') {
        return combined.includes('MECHANICAL') || combined.includes('THERMO') || combined.includes('FLUID') ||
            combined.includes('MANUFACTURING') || combined.includes('AUTOMOBILE') || combined.includes('MECHATRONICS') ||
            combined.includes('CAD') || combined.includes('BME') || combined.includes('21ME') || combined.includes('BMN');
    }
    if (category === 'CIVIL') {
        return combined.includes('CIVIL') || combined.includes('STRUCTURAL') || combined.includes('CONCRETE') ||
            combined.includes('GEOTECHNICAL') || combined.includes('SURVEYING') || combined.includes('ENVIRONMENTAL') ||
            combined.includes('HYDROLOGY') || combined.includes('BCV') || combined.includes('21CV');
    }
    if (category === 'EEE') {
        return combined.includes('ELECTRICAL') || combined.includes('POWER') || combined.includes('CONTROL') ||
            combined.includes('CIRCUIT') || combined.includes('MACHINE') || combined.includes('BEE') || combined.includes('21EE');
    }
    if (category === 'MATH') {
        return combined.includes('MATHEMATICS') || combined.includes('CALCULUS') || combined.includes('TRANSFORM') || combined.includes('BMAT') || combined.includes('21MAT');
    }
    return true;
};

// Helper to separate subject title and course code
const parseSubject = (item: ModelPaperItem) => {
    const raw = item.subject;
    if (item.code) {
        return { title: raw, code: item.code };
    }
    const parenMatch = raw.match(/\(([^)]+)\)$/);
    if (parenMatch) {
        return {
            title: raw.replace(/\(([^)]+)\)$/, '').trim(),
            code: parenMatch[1].trim()
        };
    }
    const endCodeMatch = raw.match(/\s+([A-Z0-9/]{5,20})$/);
    if (endCodeMatch) {
        return {
            title: raw.replace(endCodeMatch[0], '').trim(),
            code: endCodeMatch[1].trim()
        };
    }
    if (raw.startsWith('B.E. in') || raw.startsWith('B.E.')) {
        const sampleCode = item.links[0]?.title;
        const prefix = sampleCode ? sampleCode.slice(0, 3) : '';
        return {
            title: raw,
            code: prefix ? `${prefix} BUNDLE` : '2022 SCHEME'
        };
    }
    return { title: raw, code: '2022 SCHEME' };
};

const ModelPapers2022Client = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Track previous filter state to adjust visibleCount during render without useEffect
    const [prevFilters, setPrevFilters] = useState({ query: '', category: 'ALL' });
    if (prevFilters.query !== searchQuery || prevFilters.category !== selectedCategory) {
        setPrevFilters({ query: searchQuery, category: selectedCategory });
        setVisibleCount(ITEMS_PER_PAGE);
    }

    // Dynamic category counts for interactive chips
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: modelPapers2022Data.length };
        CATEGORIES.forEach(cat => {
            if (cat.key !== 'ALL') {
                counts[cat.key] = modelPapers2022Data.filter(item => matchesCategory(item, cat.key)).length;
            }
        });
        return counts;
    }, []);

    const filteredPapers = useMemo(() => {
        let result = modelPapers2022Data;

        if (selectedCategory !== 'ALL') {
            result = result.filter(item => matchesCategory(item, selectedCategory));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            const cleanQuery = query.replace(/[\s\-_]/g, '');

            result = result.filter(item => {
                const sub = item.subject.toLowerCase();
                const cleanSub = sub.replace(/[\s\-_]/g, '');
                const code = item.code ? item.code.toLowerCase() : '';
                const cleanCode = code.replace(/[\s\-_]/g, '');

                const matchesSubject = sub.includes(query) || cleanSub.includes(cleanQuery);
                const matchesCode = code.includes(query) || cleanCode.includes(cleanQuery);

                const matchesLinks = item.links.some(l => {
                    const title = l.title.toLowerCase();
                    const cleanTitle = title.replace(/[\s\-_]/g, '');
                    const url = l.url.toLowerCase();
                    return title.includes(query) || cleanTitle.includes(cleanQuery) || url.includes(query);
                });

                return matchesSubject || matchesCode || matchesLinks;
            });
        }

        return result;
    }, [searchQuery, selectedCategory]);

    const totalSets = useMemo(() => {
        return filteredPapers.reduce((sum, item) => sum + item.links.length, 0);
    }, [filteredPapers]);

    const visiblePapers = useMemo(() => {
        return filteredPapers.slice(0, visibleCount);
    }, [filteredPapers, visibleCount]);

    const activeCategoryLabel = CATEGORIES.find(c => c.key === selectedCategory)?.label || 'All';

    return (
        <div className="w-full">
            <Container className="pt-6 md:pt-8 pb-20 md:pb-28">
                {/* Breadcrumb Navigation */}
                <div className="mb-6 md:mb-8">
                    <Breadcrumbs
                        items={[
                            { label: 'Model Question Papers', href: '/model-papers' },
                            { label: '2022 Scheme', href: '/model-papers/2022-scheme' }
                        ]}
                    />
                </div>

                {/* Hero Header Section */}
                <header className="mp-scheme-header relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 mb-8 sm:mb-10">
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-indigo-300 border border-white/20 mb-4">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            <span>Core Curriculum • 1st through 8th Semesters</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            2022 Scheme Model Question Papers
                        </h1>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                            Complete university archive of official model question papers from Visvesvaraya Technological University (VTU) across all engineering departments. Over 200 subjects and 900+ official question paper sets.
                        </p>

                        {/* Quick Stats Pill Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-white">204 Subjects</div>
                                <div className="text-xs text-slate-400">All Engg Branches</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-indigo-400">909 Paper Sets</div>
                                <div className="text-xs text-slate-400">Multiple Official Sets</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-white">1st–8th Sem</div>
                                <div className="text-xs text-slate-400">Complete Degree</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-emerald-400">100% Free</div>
                                <div className="text-xs text-slate-400">Direct VTU PDFs</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dedicated Search & Filter Control Center */}
                <div className="mp-search-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm mb-10">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <span>Subject Directory &amp; Search</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Find 2022 Scheme Question Papers
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Instant lookup by subject code (e.g. 21CS42, BMATC101) or course name
                            </p>
                        </div>
                        <div className="self-start sm:self-auto shrink-0">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                {filteredPapers.length} Subjects ({totalSets} Sets)
                            </span>
                        </div>
                    </div>

                    {/* Modern Flexbox Search Input Box (Zero text/icon overlap) */}
                    <div 
                        className="w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 focus-within:border-indigo-600 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-sm mb-3"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '56px',
                            height: '56px',
                            paddingLeft: '18px',
                            paddingRight: '14px',
                            gap: '12px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div 
                            className="shrink-0 flex items-center justify-center text-indigo-500 dark:text-indigo-400"
                            style={{ flexShrink: 0, width: '22px', height: '22px' }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Type subject code (e.g. BCV401, BME301, BCS401, BMATC101) or course name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoComplete="off"
                            spellCheck="false"
                            className="flex-1 w-full bg-transparent border-0 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base font-medium"
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                flex: 1,
                                minWidth: 0,
                                height: '100%',
                                padding: '0 4px',
                                margin: 0,
                                fontSize: '1rem',
                                color: 'inherit',
                                boxShadow: 'none'
                            }}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="shrink-0 inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
                                style={{ flexShrink: 0 }}
                            >
                                <span>✕</span>
                                <span>Clear</span>
                            </button>
                        )}
                    </div>

                    {/* Quick Popular Search Tags */}
                    {!searchQuery && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-5 flex-wrap">
                            <span className="font-semibold text-slate-400">Popular:</span>
                            {['BCV401', 'BME301', 'BCS401', 'BMATC101', 'BEE302'].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSearchQuery(tag)}
                                    className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 border border-slate-200/70 dark:border-slate-700 transition-colors cursor-pointer"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Category Filter Chips */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                Filter by Branch / Stream:
                            </span>
                            {(selectedCategory !== 'ALL' || searchQuery) && (
                                <button
                                    onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 transition-colors cursor-pointer"
                                >
                                    Reset filters
                                </button>
                            )}
                        </div>
                        <div className="flex items-center flex-wrap gap-2.5">
                            {CATEGORIES.map((cat) => {
                                const isSelected = selectedCategory === cat.key;
                                const count = categoryCounts[cat.key] ?? 0;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none border ${isSelected
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 scale-[1.02]'
                                            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700'
                                            }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isSelected
                                            ? 'bg-white/25 text-white'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                            }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Filter Status Hint */}
                    {(selectedCategory !== 'ALL' || searchQuery) && (
                        <div className="mt-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>
                                Showing <strong>{filteredPapers.length}</strong> matching subjects in <strong>{activeCategoryLabel}</strong>
                                {searchQuery && <> for &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
                            </span>
                        </div>
                    )}
                </div>

                {/* Results Grid */}
                {filteredPapers.length === 0 ? (
                    <div className="text-center py-16 p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 mb-16 bg-white dark:bg-slate-900/50">
                        <div className="text-5xl mb-3">🔍</div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No Model Papers Found</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-5 max-w-md mx-auto">
                            No 2022 scheme papers matched &ldquo;{searchQuery}&rdquo;. Try another subject code or choose another category filter.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mp-results-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {visiblePapers.map((paper, index) => {
                                const { title, code } = parseSubject(paper);
                                const q = searchQuery.toLowerCase().trim();
                                const cq = q.replace(/[\s\-_]/g, '');
                                const isSearching = q.length >= 2;

                                const displayLinks = isSearching
                                    ? [...paper.links].sort((a, b) => {
                                        const aTitle = a.title.toLowerCase();
                                        const bTitle = b.title.toLowerCase();
                                        const aMatch = aTitle.includes(q) || aTitle.replace(/[\s\-_]/g, '').includes(cq);
                                        const bMatch = bTitle.includes(q) || bTitle.replace(/[\s\-_]/g, '').includes(cq);
                                        if (aMatch && !bMatch) return -1;
                                        if (!aMatch && bMatch) return 1;
                                        return 0;
                                    })
                                    : paper.links;

                                return (
                                    <div
                                        key={index}
                                        className="mp-subject-card bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-400 dark:hover:border-indigo-500 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                                    >
                                        <div>
                                            {/* Card Top Row: Code Pill Left, Set Count Pill Right */}
                                            <div className="flex items-center justify-between gap-2 mb-3.5">
                                                <span className="font-mono text-xs font-black tracking-wider px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 shadow-xs flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                                    {code}
                                                </span>
                                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 flex items-center gap-1.5">
                                                    📑 {paper.links.length} {paper.links.length === 1 ? 'Official Set' : 'Official Sets'}
                                                </span>
                                            </div>

                                            {/* Subject Title */}
                                            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {title}
                                            </h3>

                                            {/* Regulation / BOS Badge */}
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-5">
                                                <span>2022 Scheme CBCS</span>
                                                <span>•</span>
                                                <span>Official VTU Belagavi BOS Blueprint</span>
                                            </div>
                                        </div>

                                        {/* Card Footer: Set Download Action Buttons */}
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center justify-between">
                                                <span>Official Question Paper Sets:</span>
                                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Direct VTU PDFs</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2.5">
                                                {displayLinks.map((link, lIndex) => {
                                                    const setLabel = link.title.replace(/set/i, 'Set').trim();
                                                    const linkTitleLower = link.title.toLowerCase();
                                                    const isDirectMatch = isSearching && (
                                                        linkTitleLower.includes(q) ||
                                                        linkTitleLower.replace(/[\s\-_]/g, '').includes(cq)
                                                    );

                                                    return (
                                                        <a
                                                            key={lIndex}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer no-underline select-none ${isDirectMatch
                                                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900 scale-105'
                                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-600/25 hover:shadow-md active:scale-95'
                                                                }`}
                                                            title={`Download ${title} ${setLabel} PDF`}
                                                        >
                                                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                                            </svg>
                                                            <span>{setLabel} (PDF)</span>
                                                            {isDirectMatch ? (
                                                                <span className="text-[10px] bg-white/25 text-white px-1.5 py-0.5 rounded-md font-black tracking-wider uppercase">
                                                                    MATCH
                                                                </span>
                                                            ) : (
                                                                <svg className="w-3 h-3 opacity-60 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                                                </svg>
                                                            )}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination / Load More */}
                        {visibleCount < filteredPapers.length && (
                            <div className="text-center mb-16">
                                <button
                                    onClick={() => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredPapers.length))}
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                >
                                    <span>Load More Subjects</span>
                                    <span className="text-xs px-2.5 py-1 rounded-lg bg-white/20">
                                        +{Math.min(ITEMS_PER_PAGE, filteredPapers.length - visibleCount)} more
                                    </span>
                                </button>
                                <p className="text-xs text-slate-400 dark:text-gray-500 mt-2.5 font-medium">
                                    Showing {visibleCount} of {filteredPapers.length} subjects
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Scheme Switcher Banner */}
                <div className="mp-switcher-banner flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-xl">
                        <div className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                            Newly Revised Syllabus
                        </div>
                        <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white mb-1.5">
                            Looking for 1st &amp; 2nd Semester 2025 Scheme?
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                            Access updated 2025 CBCS question paper blueprints for Physics and Chemistry cycles.
                        </p>
                    </div>
                    <Link
                        href="/model-papers/2025-scheme"
                        className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                    >
                        Switch to 2025 Scheme ➔
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default ModelPapers2022Client;
