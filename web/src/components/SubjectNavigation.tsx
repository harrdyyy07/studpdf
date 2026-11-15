import React from 'react';
import Link from 'next/link';
import { Subject } from '@/data/notesData';

export interface SubjectNavigationProps {
    prevSubject: Subject | null;
    nextSubject: Subject | null;
    prevHref?: string;
    nextHref?: string;
}

interface NavCardProps {
    direction: 'prev' | 'next';
    subject: Subject;
    href: string;
    className?: string;
}

function NavCard({ direction, subject, href, className = '' }: NavCardProps) {
    const isPrev = direction === 'prev';
    const label = isPrev ? 'PREVIOUS ARTICLE' : 'NEXT ARTICLE';
    const ariaLabel = `${isPrev ? 'Previous' : 'Next'} article: ${subject.name}`;

    return (
        <Link
            href={href}
            aria-label={ariaLabel}
            className={`nav-card group relative flex items-center gap-[16px] p-[20px_24px] min-h-[104px] h-full box-border rounded-[16px] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 overflow-visible ${
                isPrev ? 'flex-row text-left' : 'flex-row-reverse text-right'
            } ${className}`}
        >
            {/* Arrow circle: 40px x 40px, flex-shrink 0, centered chevron icon */}
            <div className="nav-arrow-circle w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full shrink-0 flex items-center justify-center overflow-hidden transition-all duration-200 ease-out">
                <svg
                    className={`w-[16px] h-[16px] transition-transform duration-200 ease-out ${
                        isPrev ? 'group-hover:-translate-x-[2px]' : 'group-hover:translate-x-[2px]'
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {isPrev ? (
                        <polyline points="15 18 9 12 15 6" />
                    ) : (
                        <polyline points="9 18 15 12 9 6" />
                    )}
                </svg>
            </div>

            {/* Text block: flex 1, min-width 0, display flex column, gap 4px */}
            <div className={`flex-1 min-w-0 flex flex-col gap-[4px] ${isPrev ? 'items-start text-left' : 'items-end text-right'}`}>
                {/* Label */}
                <span className="nav-label text-[11px] uppercase tracking-[0.08em] font-[600] leading-[1.2] m-0">
                    {label}
                </span>

                {/* Title */}
                <h3 className="nav-title text-[18px] font-[600] leading-[1.3] line-clamp-2 m-0 transition-colors duration-200">
                    {subject.name}
                </h3>

                {/* Code badge */}
                {subject.code && (
                    <span
                        className={`nav-code-badge inline-block px-[10px] py-[3px] rounded-[999px] text-[12px] font-[500] leading-normal whitespace-nowrap ${
                            isPrev ? 'self-start' : 'self-end'
                        }`}
                    >
                        {subject.code}
                    </span>
                )}
            </div>
        </Link>
    );
}

export default function SubjectNavigation({
    prevSubject,
    nextSubject,
    prevHref,
    nextHref,
}: SubjectNavigationProps) {
    if (!prevSubject && !nextSubject) {
        return null;
    }

    const hasPrev = Boolean(prevSubject && prevHref);
    const hasNext = Boolean(nextSubject && nextHref);

    return (
        <nav aria-label="Article navigation" className="w-full my-8 sm:my-10">
            {/* Grid wrapper: 2 equal columns, 20px gap, one column under 640px, align-items stretch so both cards have equal height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] items-stretch w-full">
                {/* PREVIOUS ARTICLE CARD */}
                {hasPrev ? (
                    <NavCard direction="prev" subject={prevSubject!} href={prevHref!} />
                ) : (
                    <div className="hidden sm:block" />
                )}

                {/* NEXT ARTICLE CARD */}
                {hasNext ? (
                    <NavCard 
                        direction="next" 
                        subject={nextSubject!} 
                        href={nextHref!} 
                        className={!hasPrev ? 'sm:col-start-2' : ''} 
                    />
                ) : (
                    <div className="hidden sm:block" />
                )}
            </div>

            <style>{`
                /* Light Mode Default */
                .nav-card {
                    background-color: #FFFFFF;
                    border: 1px solid #E5E7EB;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                }
                .nav-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
                    border-color: #4F46E5;
                }
                .nav-arrow-circle {
                    background-color: #F1F5F9;
                    border: 1px solid #E2E8F0;
                    color: #64748B;
                }
                .nav-card:hover .nav-arrow-circle {
                    background-color: #4F46E5;
                    border-color: #4F46E5;
                    color: #FFFFFF;
                }
                .nav-label {
                    color: #64748B;
                }
                .nav-title {
                    color: #0F172A;
                }
                .nav-card:hover .nav-title {
                    color: #4F46E5;
                }
                .nav-code-badge {
                    background-color: #EEF2FF;
                    color: #4338CA;
                    border: 1px solid rgba(79, 70, 229, 0.15);
                }

                /* Dark Mode Override: support both [data-theme="dark"] and .dark on <html> */
                [data-theme="dark"] .nav-card,
                .dark .nav-card {
                    background-color: #1e1e1e !important;
                    border-color: #2d2d2d !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
                }
                [data-theme="dark"] .nav-card:hover,
                .dark .nav-card:hover {
                    border-color: #818CF8 !important;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6) !important;
                }
                [data-theme="dark"] .nav-arrow-circle,
                .dark .nav-arrow-circle {
                    background-color: rgba(255, 255, 255, 0.06) !important;
                    border-color: rgba(255, 255, 255, 0.1) !important;
                    color: #94A3B8 !important;
                }
                [data-theme="dark"] .nav-card:hover .nav-arrow-circle,
                .dark .nav-card:hover .nav-arrow-circle {
                    background-color: #4F46E5 !important;
                    border-color: #4F46E5 !important;
                    color: #FFFFFF !important;
                }
                [data-theme="dark"] .nav-label,
                .dark .nav-label {
                    color: #94A3B8 !important;
                }
                [data-theme="dark"] .nav-title,
                .dark .nav-title {
                    color: #F8FAFC !important;
                }
                [data-theme="dark"] .nav-card:hover .nav-title,
                .dark .nav-card:hover .nav-title {
                    color: #A5B4FC !important;
                }
                [data-theme="dark"] .nav-code-badge,
                .dark .nav-code-badge {
                    background-color: rgba(79, 70, 229, 0.2) !important;
                    color: #A5B4FC !important;
                    border-color: rgba(165, 180, 252, 0.25) !important;
                }
            `}</style>
        </nav>
    );
}
