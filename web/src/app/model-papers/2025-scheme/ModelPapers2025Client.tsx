'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/ui/Container';
import { modelPapers2025Data, ModelPaperItem } from '@/data/modelPapersData';

const CATEGORIES_2025 = [
    { label: 'All Subjects', key: 'ALL' },
    { label: 'Mathematics', key: 'MATHS' },
    { label: 'Physics Group', key: 'PHYSICS' },
    { label: 'Chemistry Group', key: 'CHEMISTRY' },
    { label: 'Programming & IT', key: 'PROGRAMMING' },
    { label: 'Core / Emerging', key: 'CORE' },
];

const matchesCategory2025 = (item: ModelPaperItem, cat: string): boolean => {
    if (cat === 'ALL') return true;
    const s = item.subject.toUpperCase();
    const c = (item.code || '').toUpperCase();

    if (cat === 'MATHS') {
        return s.includes('MATHEMATICS') || c.includes('MAT');
    }
    if (cat === 'PHYSICS') {
        return s.includes('PHYSICS') || c.includes('PHYS');
    }
    if (cat === 'CHEMISTRY') {
        return s.includes('CHEMISTRY') || c.includes('CHE');
    }
    if (cat === 'PROGRAMMING') {
        return s.includes('PROGRAMMING') || s.includes('PYTHON') || s.includes('C ') || c.includes('CSK') || c.includes('PEK');
    }
    if (cat === 'CORE') {
        return s.includes('ELECTRONIC') || s.includes('ELECTRICAL') || s.includes('CIVIL') || s.includes('MECHANICAL') || s.includes('INFORMATION') || c.includes('EIT') || c.includes('ESC');
    }
    return true;
};

const ModelPapers2025Client = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // Dynamic category counts for interactive chips
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: modelPapers2025Data.length };
        CATEGORIES_2025.forEach(cat => {
            if (cat.key !== 'ALL') {
                counts[cat.key] = modelPapers2025Data.filter(item => matchesCategory2025(item, cat.key)).length;
            }
        });
        return counts;
    }, []);

    const filteredPapers = useMemo(() => {
        let result = modelPapers2025Data;

        if (selectedCategory !== 'ALL') {
            result = result.filter(item => matchesCategory2025(item, selectedCategory));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            const cleanQuery = query.replace(/[\s\-_]/g, '');

            result = result.filter(item => {
                const sub = item.subject.toLowerCase();
                const cleanSub = sub.replace(/[\s\-_]/g, '');
                const code = item.code ? item.code.toLowerCase() : '';
                const cleanCode = code.replace(/[\s\-_]/g, '');
                const stream = item.stream ? item.stream.toLowerCase() : '';

                const matchesSubject = sub.includes(query) || cleanSub.includes(cleanQuery);
                const matchesCode = code.includes(query) || cleanCode.includes(cleanQuery);
                const matchesStream = stream.includes(query);

                const matchesLinks = item.links.some(l => {
                    const title = l.title.toLowerCase();
                    const cleanTitle = title.replace(/[\s\-_]/g, '');
                    const url = l.url.toLowerCase();
                    return title.includes(query) || cleanTitle.includes(cleanQuery) || url.includes(query);
                });

                return matchesSubject || matchesCode || matchesStream || matchesLinks;
            });
        }

        return result;
    }, [searchQuery, selectedCategory]);

    const activeCategoryLabel = CATEGORIES_2025.find(c => c.key === selectedCategory)?.label || 'All';

    return (
        <div className="w-full">
            <Container className="pt-6 md:pt-8 pb-20 md:pb-28">
                {/* Breadcrumb Navigation */}
                <div className="mb-6 md:mb-8">
                    <Breadcrumbs
                        items={[
                            { label: 'Model Question Papers', href: '/model-papers' },
                            { label: '2025 Scheme', href: '/model-papers/2025-scheme' }
                        ]}
                    />
                </div>

                {/* Hero Header Section */}
                <header className="mp-scheme-header relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-500/20 mb-8 sm:mb-10">
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-emerald-300 border border-white/20 mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Official VTU Belagavi BOS Blueprints • 2025 Scheme</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            2025 Scheme Model Question Papers
                        </h1>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                            Official Visvesvaraya Technological University (VTU) question blueprints for 1st and 2nd Semester B.E. / B.Tech courses under newly revised 2025 CBCS guidelines. Covers Physics and Chemistry cycles.
                        </p>

                        {/* Quick Stats Pill Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-white">15 Subjects</div>
                                <div className="text-xs text-slate-400">Core Curriculum</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-emerald-400">P &amp; C Cycles</div>
                                <div className="text-xs text-slate-400">Cycle-Specific</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-white">Official PDFs</div>
                                <div className="text-xs text-slate-400">Direct From VTU</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-emerald-400">100% Free</div>
                                <div className="text-xs text-slate-400">Unlimited Access</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dedicated Search & Filter Control Center */}
                <div className="mp-search-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm mb-10">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <span>2025 Blueprint Directory</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Search 2025 Model Question Papers
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Search by subject code (e.g. 1BMATC101, 1BPHYS102), cycle, or subject name
                            </p>
                        </div>
                        <div className="self-start sm:self-auto shrink-0">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {filteredPapers.length} Subjects Available
                            </span>
                        </div>
                    </div>

                    {/* Modern Flexbox Search Input Box (Zero text/icon overlap) */}
                    <div 
                        className="w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 focus-within:border-emerald-600 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all shadow-sm mb-3"
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
                            className="shrink-0 flex items-center justify-center text-emerald-500 dark:text-emerald-400"
                            style={{ flexShrink: 0, width: '22px', height: '22px' }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by code (e.g. 1BMATC101, 1BPHYS102) or subject name..."
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
                            {['1BMATC101', '1BPHYS102', '1BCHEM102', '1BPYTK107', '1BPOPS103'].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSearchQuery(tag)}
                                    className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-300 border border-slate-200/70 dark:border-slate-700 transition-colors cursor-pointer"
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
                                Filter by Category / Cycle:
                            </span>
                            {(selectedCategory !== 'ALL' || searchQuery) && (
                                <button
                                    onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 transition-colors cursor-pointer"
                                >
                                    Reset filters
                                </button>
                            )}
                        </div>
                        <div className="flex items-center flex-wrap gap-2.5">
                            {CATEGORIES_2025.map((cat) => {
                                const isSelected = selectedCategory === cat.key;
                                const count = categoryCounts[cat.key] ?? 0;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none border ${isSelected
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 scale-[1.02]'
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
                    <div className="text-center py-16 p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-gray-800 mb-16 bg-white dark:bg-slate-900/50">
                        <div className="text-5xl mb-3">🔍</div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No Model Papers Found</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-5 max-w-md mx-auto">
                            No 2025 scheme papers matched your search for &ldquo;{searchQuery}&rdquo;. Try another subject code or keyword.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
                        >
                            Reset Search &amp; Filters
                        </button>
                    </div>
                ) : (
                    <div className="mp-results-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {filteredPapers.map((paper, index) => (
                            <div
                                key={index}
                                className="mp-subject-card mp-subject-card-emerald bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-400 dark:hover:border-emerald-500 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Card Top Row: Code Pill Left, Cycle Badge Right */}
                                    <div className="flex items-center justify-between gap-2 mb-3.5">
                                        <span className="font-mono text-xs font-black tracking-wider px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 shadow-xs flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                                            {paper.code || '2025 SCHEME'}
                                        </span>
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 flex items-center gap-1.5">
                                            ✨ {paper.stream || '1st / 2nd Sem'}
                                        </span>
                                    </div>

                                    {/* Subject Title */}
                                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {paper.subject}
                                    </h3>

                                    {/* Scheme / BOS Subtitle */}
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-5">
                                        <span>2025 Scheme CBCS</span>
                                        <span>•</span>
                                        <span>Official VTU Belagavi Board of Studies</span>
                                    </div>
                                </div>

                                {/* Card Footer: Direct Download CTA Button */}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center justify-between">
                                        <span>Official Board of Studies Paper:</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Verified PDF</span>
                                    </div>
                                    {paper.links.map((link, lIndex) => (
                                        <a
                                            key={lIndex}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-98 transition-all cursor-pointer no-underline select-none"
                                            title={`Download ${paper.subject} Official Model Paper PDF`}
                                        >
                                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            <span>Download Official Model Paper (PDF)</span>
                                            <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Scheme Switcher Footer Banner */}
                <div className="mp-switcher-banner flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-xl">
                        <div className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-2">
                            Need Higher Semesters?
                        </div>
                        <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white mb-1.5">
                            Looking for 3rd to 8th Semester Papers?
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                            Access 204+ subjects across all engineering branches under the 2022 Scheme regulations.
                        </p>
                    </div>
                    <Link
                        href="/model-papers/2022-scheme"
                        className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                    >
                        Switch to 2022 Scheme ➔
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default ModelPapers2025Client;
