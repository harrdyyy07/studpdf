'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/ui/Container';

interface PaperBundle {
    label: string;
    link: string;
}

interface BranchGroup {
    name: string;
    code: string;
    subtitle: string;
    badgeBg: string;
    badgeText: string;
    papers: PaperBundle[];
}

const pyqpData: BranchGroup[] = [
    {
        name: "Artificial Intelligence and Data Science",
        code: "AI",
        subtitle: "B.E. AI & DS • Official Exam ZIP Bundles",
        badgeBg: "bg-violet-100 dark:bg-violet-950/70 border-violet-200 dark:border-violet-800",
        badgeText: "text-violet-700 dark:text-violet-300",
        papers: [
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/AI-DS-JAN-2025.zip" }
        ]
    },
    {
        name: "Computer Science and Engineering",
        code: "CS",
        subtitle: "B.E. CSE & Allied • Official Exam ZIP Bundles",
        badgeBg: "bg-indigo-100 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-800",
        badgeText: "text-indigo-700 dark:text-indigo-300",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/CS-JULY-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/CSE-IS-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/CS-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-JULY2023.zip" },
            { label: "FEB 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-FEB2023.zip" },
            { label: "AUG 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-AUG2022.zip" },
            { label: "MAR 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-MAR2022.zip" }
        ]
    },
    {
        name: "Electronics and Communication Engineering",
        code: "EC",
        subtitle: "B.E. ECE • Official Exam ZIP Bundles",
        badgeBg: "bg-sky-100 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800",
        badgeText: "text-sky-700 dark:text-sky-300",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/ECE-July-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/ECE-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/ECE-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-JULY2023.zip" },
            { label: "FEB 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-FEB2023.zip" },
            { label: "AUG 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-AUG2022.zip" },
            { label: "MAR 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-MAR2022.zip" }
        ]
    },
    {
        name: "Mechanical Engineering",
        code: "ME",
        subtitle: "B.E. ME • Official Exam ZIP Bundles",
        badgeBg: "bg-amber-100 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800",
        badgeText: "text-amber-700 dark:text-amber-300",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/ME-JULY-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/ME-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/MECH-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JULY2023.zip" },
            { label: "JAN 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JAN2023.zip" },
            { label: "JULY 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JULY2022.zip" },
            { label: "FEB 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-FEB2022.zip" }
        ]
    },
    {
        name: "Civil Engineering",
        code: "CV",
        subtitle: "B.E. Civil • Official Exam ZIP Bundles",
        badgeBg: "bg-emerald-100 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/Civil-July-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/CIVIL-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/CIVIL-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-JULY2023.zip" },
            { label: "FEB 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-FEB2023.zip" },
            { label: "AUG 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-AUG2022.zip" },
            { label: "MAR 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-MAR2022.zip" }
        ]
    },
    {
        name: "First Year",
        code: "1Y",
        subtitle: "1st & 2nd Semester • P & C Cycle Bundles",
        badgeBg: "bg-rose-100 dark:bg-rose-950/70 border-rose-200 dark:border-rose-800",
        badgeText: "text-rose-700 dark:text-rose-300",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/FIRST-YEAR-QUESTION-PAPER-July-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/FIRST-YEAR-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/FIRST-YR-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/07/First-Year-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/07/First-Year-JULY2023.zip" }
        ]
    }
];

const YEAR_FILTERS = ['ALL', '2025', '2024', '2023', '2022'] as const;

const PYQPClient = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('ALL');
    const [expandedBranches, setExpandedBranches] = useState<string[]>([
        'Computer Science and Engineering'
    ]);

    const totalBundlesAll = useMemo(
        () => pyqpData.reduce((sum, b) => sum + b.papers.length, 0),
        []
    );

    const filteredBranches = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return pyqpData
            .map((branch) => {
                const branchMatches =
                    !query ||
                    branch.name.toLowerCase().includes(query) ||
                    branch.code.toLowerCase().includes(query) ||
                    branch.subtitle.toLowerCase().includes(query);

                const matchingPapers = branch.papers.filter((paper) => {
                    const matchesYear =
                        selectedYear === 'ALL' || paper.label.includes(selectedYear);
                    const matchesPaperQuery =
                        !query ||
                        branchMatches ||
                        paper.label.toLowerCase().includes(query);
                    return matchesYear && matchesPaperQuery;
                });

                return {
                    ...branch,
                    papers: matchingPapers
                };
            })
            .filter((branch) => branch.papers.length > 0);
    }, [searchQuery, selectedYear]);

    const visibleBundleCount = useMemo(
        () => filteredBranches.reduce((sum, b) => sum + b.papers.length, 0),
        [filteredBranches]
    );

    const yearCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: totalBundlesAll };
        YEAR_FILTERS.forEach((yr) => {
            if (yr !== 'ALL') {
                counts[yr] = pyqpData.reduce(
                    (sum, b) => sum + b.papers.filter((p) => p.label.includes(yr)).length,
                    0
                );
            }
        });
        return counts;
    }, [totalBundlesAll]);

    const isFiltering = Boolean(searchQuery.trim()) || selectedYear !== 'ALL';

    const toggleBranch = (branchName: string) => {
        setExpandedBranches((prev) =>
            prev.includes(branchName)
                ? prev.filter((name) => name !== branchName)
                : [...prev, branchName]
        );
    };

    const allExpanded =
        filteredBranches.length > 0 &&
        filteredBranches.every((b) => expandedBranches.includes(b.name));

    const handleToggleAll = () => {
        if (allExpanded) {
            setExpandedBranches([]);
        } else {
            setExpandedBranches(filteredBranches.map((b) => b.name));
        }
    };

    return (
        <div className="w-full">
            <Container className="pt-6 md:pt-8 pb-20 md:pb-28">
                {/* Breadcrumb Navigation */}
                <div className="mb-6 md:mb-8">
                    <Breadcrumbs
                        items={[
                            {
                                label: 'Previous Year Question Papers',
                                href: '/previous-year-question-papers'
                            }
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
                            <span>Official VTU Archive • Semester Exam ZIP Bundles</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            VTUwise Previous Year Question Papers
                        </h1>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                            Download official Visvesvaraya Technological University (VTU) previous year question paper ZIP bundles organized by engineering branch and exam session.
                        </p>

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-white">
                                    {pyqpData.length} Branches
                                </div>
                                <div className="text-xs text-slate-400">UG &amp; First Year</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-indigo-400">
                                    {totalBundlesAll} Bundles
                                </div>
                                <div className="text-xs text-slate-400">Complete ZIP Sets</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-white">
                                    2022–2025
                                </div>
                                <div className="text-xs text-slate-400">Exam Sessions</div>
                            </div>
                            <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-base sm:text-lg font-black text-emerald-400">
                                    100% Free
                                </div>
                                <div className="text-xs text-slate-400">Direct Downloads</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Search & Year Filter Card */}
                <div className="mp-search-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <span>Branch &amp; Session Finder</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Find Question Paper Bundles
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Filter by branch name (e.g. CSE, ECE, Mechanical, First Year) or exam session
                            </p>
                        </div>

                        <div className="self-start sm:self-auto shrink-0">
                            <span className="mp-code-pill-indigo inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                {filteredBranches.length} Branches ({visibleBundleCount} Bundles)
                            </span>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div
                        className="mp-search-input-box w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 focus-within:border-indigo-600 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-sm mb-4"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: '54px',
                            height: '54px',
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
                            placeholder="Search branch or session (e.g. Computer Science, JULY 2025, First Year)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoComplete="off"
                            spellCheck="false"
                            className="flex-1 w-full bg-transparent border-0 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 text-sm md:text-base font-medium"
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                flex: 1,
                                minWidth: 0,
                                height: '100%',
                                padding: '0 4px',
                                margin: 0,
                                fontSize: '0.975rem',
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

                    {/* Year Filter Chips */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                Filter by Exam Year:
                            </span>
                            {isFiltering && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedYear('ALL');
                                        setSearchQuery('');
                                    }}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                                >
                                    Reset filters
                                </button>
                            )}
                        </div>
                        <div className="flex items-center flex-wrap gap-2.5">
                            {YEAR_FILTERS.map((yr) => {
                                const isSelected = selectedYear === yr;
                                const label = yr === 'ALL' ? 'All Years' : yr;
                                return (
                                    <button
                                        key={yr}
                                        type="button"
                                        onClick={() => setSelectedYear(yr)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none border ${
                                            isSelected
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 scale-[1.02]'
                                                : 'mp-filter-chip-inactive bg-slate-100 hover:bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700'
                                        }`}
                                    >
                                        <span>{label}</span>
                                        <span
                                            className={`mp-chip-count px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                isSelected
                                                    ? 'bg-white/25 text-white'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                            }`}
                                        >
                                            {yearCounts[yr] ?? 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Section Header + Expand/Collapse Control */}
                <section aria-label="Under Graduate Question Paper Bundles">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Under Graduate &amp; First Year
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Select a branch below to view and download semester-wise ZIP archives
                            </p>
                        </div>

                        {!isFiltering && filteredBranches.length > 0 && (
                            <button
                                type="button"
                                onClick={handleToggleAll}
                                className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                            >
                                <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
                            </button>
                        )}
                    </div>

                    {/* Branch Accordion Cards */}
                    {filteredBranches.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {filteredBranches.map((branch) => {
                                const isOpen = isFiltering || expandedBranches.includes(branch.name);
                                const latestLabel = branch.papers[0]?.label;

                                return (
                                    <div key={branch.name} className="pyqp-branch-card">
                                        <button
                                            type="button"
                                            onClick={() => toggleBranch(branch.name)}
                                            aria-expanded={isOpen}
                                            className="pyqp-branch-trigger"
                                        >
                                            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                                                {/* Branch Code Monogram */}
                                                <div
                                                    className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center font-black text-sm sm:text-base tracking-tight ${branch.badgeBg} ${branch.badgeText}`}
                                                >
                                                    {branch.code}
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug truncate">
                                                        {branch.name}
                                                    </h3>
                                                    <div className="flex items-center flex-wrap gap-2 mt-1">
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                                            {branch.subtitle}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2.5 shrink-0">
                                                {latestLabel && (
                                                    <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80">
                                                        Latest: {latestLabel}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                    {branch.papers.length}{' '}
                                                    {branch.papers.length === 1 ? 'Bundle' : 'Bundles'}
                                                </span>
                                                <span
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-transform duration-200 ${
                                                        isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-300' : ''
                                                    }`}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="pyqp-paper-grid">
                                                {branch.papers.map((paper) => {
                                                    const isLatest2025 = paper.label.includes('2025');
                                                    return (
                                                        <a
                                                            key={paper.link}
                                                            href={paper.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="pyqp-paper-card group"
                                                        >
                                                            <div className="flex items-start justify-between gap-2">
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-200/70 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300">
                                                                    ZIP
                                                                </span>
                                                                {isLatest2025 && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                                                        2025
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                                                    {paper.label}
                                                                </div>
                                                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                                    Exam Paper Bundle
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-700/70 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                                                <span>Download</span>
                                                                <svg
                                                                    className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                    <polyline points="7 10 12 15 17 10" />
                                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                                </svg>
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="pyqp-branch-card p-10 text-center">
                            <div className="text-3xl mb-3">🔍</div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                No matching question paper bundles
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                                Try clearing your search or selecting &ldquo;All Years&rdquo;.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedYear('ALL');
                                }}
                                className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </section>

                {/* Cross-Link Banner to Model Question Papers */}
                <aside className="pyqp-cta-banner">
                    <div>
                        <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                            More Exam Resources
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                            Need Scheme-Wise Model Question Papers?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Browse subject-by-subject official VTU Model Question Papers for 2022 and 2025 schemes.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <Link
                            href="/model-papers/2022-scheme"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors no-underline shadow-sm"
                        >
                            <span>2022 Scheme</span>
                            <span>→</span>
                        </Link>
                        <Link
                            href="/model-papers/2025-scheme"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 transition-colors no-underline"
                        >
                            <span>2025 Scheme</span>
                            <span>→</span>
                        </Link>
                    </div>
                </aside>
            </Container>
        </div>
    );
};

export default PYQPClient;
