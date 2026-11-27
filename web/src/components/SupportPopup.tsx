'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DISMISS_STORAGE_KEY = 'vtuwise_support_popup_dismissed_at';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SHOW_DELAY_MS = 25000; // 25 seconds after page load

const SupportPopup: React.FC = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const dismiss = useCallback((cooldownMs: number = DISMISS_COOLDOWN_MS) => {
        setIsClosing(true);
        try {
            localStorage.setItem(
                DISMISS_STORAGE_KEY,
                String(Date.now() + cooldownMs)
            );
        } catch {
            // Ignore storage errors (e.g. private browsing)
        }
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
        }, 200);
    }, []);

    useEffect(() => {
        if (pathname === '/support') {
            return;
        }

        try {
            const dismissedUntil = Number(localStorage.getItem(DISMISS_STORAGE_KEY) || '0');
            if (dismissedUntil > Date.now()) {
                return;
            }
        } catch {
            // Proceed if storage is unavailable
        }

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, SHOW_DELAY_MS);

        return () => clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        if (!isVisible) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                dismiss();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, dismiss]);

    if (!isVisible || pathname === '/support') {
        return null;
    }

    return (
        <aside
            aria-label="Support VTUwise"
            className={`vtu-support-popup no-print ${isClosing ? 'is-closing' : ''}`}
        >
            <div className="vtu-support-header">
                <div className="vtu-support-title-group">
                    <div className="vtu-support-icon" aria-hidden="true">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                            <line x1="6" x2="6" y1="2" y2="4" />
                            <line x1="10" x2="10" y1="2" y2="4" />
                            <line x1="14" x2="14" y1="2" y2="4" />
                        </svg>
                    </div>
                    <h3>Keep VTUwise Free</h3>
                </div>

                <button
                    type="button"
                    onClick={() => dismiss()}
                    aria-label="Dismiss support popup"
                    className="vtu-support-close"
                >
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
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            <p className="vtu-support-body">
                Enjoying free notes? Help cover server costs.
            </p>

            <div className="vtu-support-actions">
                <Link
                    href="/support"
                    onClick={() => dismiss(14 * 24 * 60 * 60 * 1000)}
                    className="vtu-support-cta"
                >
                    <span>Support Us</span>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>

                <button
                    type="button"
                    onClick={() => dismiss()}
                    className="vtu-support-later"
                >
                    Not now
                </button>
            </div>

            <style jsx>{`
                .vtu-support-popup {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 990;
                    width: calc(100vw - 32px);
                    max-width: 264px;
                    padding: 12px 14px;
                    border-radius: 14px;
                    background: rgba(255, 255, 255, 0.96);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 12px 30px -8px rgba(15, 23, 42, 0.14),
                                0 2px 8px -2px rgba(15, 23, 42, 0.06);
                    color: #0f172a;
                    animation: vtuSupportSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    transition: opacity 0.18s ease, transform 0.18s ease;
                }

                .vtu-support-popup.is-closing {
                    opacity: 0;
                    transform: translateY(10px);
                    pointer-events: none;
                }

                :global([data-theme='dark']) .vtu-support-popup,
                :global(.dark) .vtu-support-popup {
                    background: rgba(20, 24, 34, 0.96);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 14px 34px -8px rgba(0, 0, 0, 0.55),
                                0 0 0 1px rgba(255, 255, 255, 0.03);
                    color: #f8fafc;
                }

                @keyframes vtuSupportSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .vtu-support-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                }

                .vtu-support-title-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .vtu-support-icon {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    background: rgba(79, 70, 229, 0.1);
                    border: 1px solid rgba(79, 70, 229, 0.2);
                    color: #4f46e5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                :global([data-theme='dark']) .vtu-support-icon,
                :global(.dark) .vtu-support-icon {
                    background: rgba(99, 102, 241, 0.14);
                    border-color: rgba(129, 140, 248, 0.24);
                    color: #818cf8;
                }

                .vtu-support-title-group h3 {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                    color: #0f172a;
                }

                :global([data-theme='dark']) .vtu-support-title-group h3,
                :global(.dark) .vtu-support-title-group h3 {
                    color: #f8fafc;
                }

                .vtu-support-close {
                    width: 24px;
                    height: 24px;
                    margin-right: -2px;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background-color 0.15s ease, color 0.15s ease;
                    flex-shrink: 0;
                }

                .vtu-support-close:hover {
                    background: #f1f5f9;
                    color: #334155;
                }

                :global([data-theme='dark']) .vtu-support-close:hover,
                :global(.dark) .vtu-support-close:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #e2e8f0;
                }

                .vtu-support-body {
                    margin: 8px 0 11px;
                    font-size: 12px;
                    line-height: 1.45;
                    color: #475569;
                }

                :global([data-theme='dark']) .vtu-support-body,
                :global(.dark) .vtu-support-body {
                    color: #cbd5e1;
                }

                .vtu-support-actions {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .vtu-support-actions :global(.vtu-support-cta) {
                    flex: 1;
                    height: 32px;
                    padding: 0 12px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
                    color: #ffffff;
                    font-size: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    box-shadow: 0 3px 10px rgba(79, 70, 229, 0.25);
                    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
                }

                .vtu-support-actions :global(.vtu-support-cta:hover) {
                    filter: brightness(1.06);
                    box-shadow: 0 5px 14px rgba(79, 70, 229, 0.34);
                    transform: translateY(-1px);
                }

                .vtu-support-actions :global(.vtu-support-cta:active) {
                    transform: scale(0.98);
                }

                .vtu-support-later {
                    height: 32px;
                    padding: 0 10px;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-size: 11.5px;
                    font-weight: 500;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background-color 0.15s ease, color 0.15s ease;
                }

                .vtu-support-later:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                }

                :global([data-theme='dark']) .vtu-support-later,
                :global(.dark) .vtu-support-later {
                    color: #94a3b8;
                }

                :global([data-theme='dark']) .vtu-support-later:hover,
                :global(.dark) .vtu-support-later:hover {
                    background: rgba(255, 255, 255, 0.06);
                    color: #f8fafc;
                }

                @media (max-width: 640px) {
                    .vtu-support-popup {
                        bottom: 14px;
                        right: 14px;
                    }
                }
            `}</style>
        </aside>
    );
};

export default SupportPopup;
