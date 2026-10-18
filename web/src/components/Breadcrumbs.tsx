'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    showShareButton?: boolean;
}

const KNOWN_BRANCH_CODES = new Set([
    'CIVIL', 'CSE', 'ISE', 'ECE', 'EEE', 'MECH', 'AIML', 'AIDS', 'CSBS', 'CY', 'BT', 'CH', 'AUTO', 'AERO'
]);

const breadcrumbStyles = `
.vtu-breadcrumb-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 100%;
}

.vtu-breadcrumb-bar {
  display: inline-flex !important;
  align-items: center !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.85);
  border-radius: 9999px;
  box-shadow: 0 2px 10px -2px rgba(15, 23, 42, 0.04), 0 1px 3px -1px rgba(15, 23, 42, 0.02);
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.vtu-breadcrumb-bar::-webkit-scrollbar {
  display: none;
}

[data-theme="dark"] .vtu-breadcrumb-bar,
.dark .vtu-breadcrumb-bar {
  background: rgba(24, 27, 38, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}

/* Home Icon Pill */
.vtu-breadcrumb-home {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  color: #64748B;
  background: transparent;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  text-decoration: none;
}

.vtu-breadcrumb-home:hover {
  color: #4F46E5;
  background: rgba(79, 70, 229, 0.1);
  transform: translateY(-1px);
}

[data-theme="dark"] .vtu-breadcrumb-home,
.dark .vtu-breadcrumb-home {
  color: #94A3B8;
}

[data-theme="dark"] .vtu-breadcrumb-home:hover,
.dark .vtu-breadcrumb-home:hover {
  color: #818CF8;
  background: rgba(99, 102, 241, 0.18);
}

.vtu-breadcrumb-home:active {
  transform: scale(0.92);
}

/* Chevron Separator */
.vtu-breadcrumb-sep {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #64748B;
  opacity: 0.4;
  flex-shrink: 0;
  user-select: none;
  margin: 0 0.1rem;
}

[data-theme="dark"] .vtu-breadcrumb-sep,
.dark .vtu-breadcrumb-sep {
  color: #94A3B8;
  opacity: 0.35;
}

/* Branch Tag (e.g. CIVIL, CSE, AIML) */
.vtu-breadcrumb-branch {
  display: inline-flex !important;
  align-items: center !important;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.22rem 0.65rem;
  border-radius: 9999px;
  background: #EEF2FF;
  color: #4338CA;
  border: 1px solid rgba(99, 102, 241, 0.2);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.vtu-breadcrumb-branch:hover {
  background: #E0E7FF;
  border-color: rgba(99, 102, 241, 0.4);
  color: #3730A3;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.15);
}

[data-theme="dark"] .vtu-breadcrumb-branch,
.dark .vtu-breadcrumb-branch {
  background: rgba(79, 70, 229, 0.2);
  color: #A5B4FC;
  border: 1px solid rgba(129, 140, 248, 0.3);
}

[data-theme="dark"] .vtu-breadcrumb-branch:hover,
.dark .vtu-breadcrumb-branch:hover {
  background: rgba(79, 70, 229, 0.35);
  color: #C7D2FE;
  border-color: rgba(129, 140, 248, 0.5);
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
}

/* Standard Link (e.g. Sem 7) */
.vtu-breadcrumb-link {
  display: inline-flex !important;
  align-items: center !important;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748B;
  padding: 0.22rem 0.55rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.vtu-breadcrumb-link:hover {
  color: #4F46E5;
  background: rgba(79, 70, 229, 0.08);
  transform: translateY(-1px);
}

[data-theme="dark"] .vtu-breadcrumb-link,
.dark .vtu-breadcrumb-link {
  color: #94A3B8;
}

[data-theme="dark"] .vtu-breadcrumb-link:hover,
.dark .vtu-breadcrumb-link:hover {
  color: #C7D2FE;
  background: rgba(255, 255, 255, 0.06);
}

/* Current Destination (e.g. Estimation and Contract Management) */
.vtu-breadcrumb-current {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0F172A;
  padding: 0.22rem 0.55rem;
  border-radius: 9999px;
  max-width: 240px;
  flex-shrink: 1;
}

[data-theme="dark"] .vtu-breadcrumb-current,
.dark .vtu-breadcrumb-current {
  color: #F8FAFC;
}

@media (min-width: 640px) {
  .vtu-breadcrumb-current {
    max-width: 360px;
  }
}

@media (min-width: 1024px) {
  .vtu-breadcrumb-current {
    max-width: 520px;
  }
}

.vtu-breadcrumb-current-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Glowing dot for current active location */
.vtu-breadcrumb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
  flex-shrink: 0;
  animation: vtu-breadcrumb-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes vtu-breadcrumb-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.85);
  }
}

/* Quick Share / Copy URL button */
.vtu-breadcrumb-divider {
  width: 1px;
  height: 14px;
  background: rgba(226, 232, 240, 0.8);
  margin: 0 0.2rem;
  flex-shrink: 0;
}

[data-theme="dark"] .vtu-breadcrumb-divider,
.dark .vtu-breadcrumb-divider {
  background: rgba(255, 255, 255, 0.12);
}

.vtu-breadcrumb-action {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.3rem;
  height: 26px;
  padding: 0 0.55rem;
  border-radius: 9999px;
  background: transparent;
  border: none;
  color: #64748B;
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.vtu-breadcrumb-action:hover {
  color: #4F46E5;
  background: rgba(79, 70, 229, 0.08);
}

[data-theme="dark"] .vtu-breadcrumb-action,
.dark .vtu-breadcrumb-action {
  color: #94A3B8;
}

[data-theme="dark"] .vtu-breadcrumb-action:hover,
.dark .vtu-breadcrumb-action:hover {
  color: #818CF8;
  background: rgba(99, 102, 241, 0.18);
}

.vtu-breadcrumb-action.copied {
  color: #10B981 !important;
  background: rgba(16, 185, 129, 0.12) !important;
}
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, showShareButton = true }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (typeof window !== 'undefined') {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch {
            // fallback if clipboard api fails
        }
    };

    if (!items || items.length === 0) return null;

    // Structured data for SEO (Schema.org BreadcrumbList)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': typeof window !== 'undefined' ? window.location.origin : 'https://vtuwise.com'
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 2,
                'name': item.label,
                ...(item.href && item.href !== '#' ? { 'item': item.href } : {})
            }))
        ]
    };

    return (
        <div className="vtu-breadcrumb-wrapper">
            <style dangerouslySetInnerHTML={{ __html: breadcrumbStyles }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav className="vtu-breadcrumb-bar" aria-label="Breadcrumb">
                {/* Home Button */}
                <Link
                    href="/"
                    className="vtu-breadcrumb-home"
                    aria-label="VTUwise Home"
                    title="VTUwise Home"
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </Link>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isBranch = index === 0 && (KNOWN_BRANCH_CODES.has(item.label.toUpperCase()) || item.label.length <= 6);

                    return (
                        <React.Fragment key={`${item.label}-${index}`}>
                            {/* Modern Chevron Separator */}
                            <svg
                                className="vtu-breadcrumb-sep"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>

                            {isLast ? (
                                <span
                                    className="vtu-breadcrumb-current"
                                    title={item.label}
                                    aria-current="page"
                                >
                                    <span className="vtu-breadcrumb-dot" aria-hidden="true" />
                                    <span className="vtu-breadcrumb-current-text">{item.label}</span>
                                </span>
                            ) : isBranch ? (
                                <Link
                                    href={item.href}
                                    className="vtu-breadcrumb-branch"
                                    title={`View ${item.label} engineering`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="vtu-breadcrumb-link"
                                    title={item.label}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}

                {/* Quick Share / Copy URL Action */}
                {showShareButton && (
                    <>
                        <div className="vtu-breadcrumb-divider" aria-hidden="true" />
                        <button
                            type="button"
                            onClick={handleCopy}
                            className={`vtu-breadcrumb-action ${copied ? 'copied' : ''}`}
                            aria-label={copied ? 'Link copied to clipboard' : 'Copy page link'}
                            title={copied ? 'Copied to clipboard!' : 'Copy page link'}
                        >
                            {copied ? (
                                <>
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span className="text-[11px] font-semibold">Copied</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                    <span className="hidden sm:inline text-[11px]">Share</span>
                                </>
                            )}
                        </button>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
