'use client';

import React, { useState, useEffect } from 'react';

export default function SealPdfFloatingBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem('seal_pdf_banner_dismissed') === 'true';
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            }
        };

        // Also trigger after 4 seconds automatically if scroll hasn't occurred
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const dismissBanner = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsVisible(false);
        setIsDismissed(true);
        localStorage.setItem('seal_pdf_banner_dismissed', 'true');
    };

    if (isDismissed || !isVisible) return null;

    return (
        <div className="seal-floating-widget">
            <div className="seal-widget-inner">
                <button 
                    className="seal-close-btn" 
                    onClick={dismissBanner}
                    aria-label="Close PDF promo banner"
                >
                    &times;
                </button>
                <div className="seal-widget-badge">
                    <span>🦭 FREE PDF TOOLS</span>
                </div>
                <div className="seal-widget-content">
                    <h4>Need to Merge or Compress PDFs?</h4>
                    <p>Use <strong>Seal PDF</strong> — 100% Free, Fast & Unlimited Online PDF Suite!</p>
                </div>
                <a 
                    href="https://seal-pdf.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="seal-widget-cta"
                >
                    Open Seal PDF 🚀
                </a>
            </div>

            <style jsx>{`
                .seal-floating-widget {
                    position: fixed;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    z-index: 999;
                    max-width: 380px;
                    width: calc(100vw - 3rem);
                    animation: slideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .seal-widget-inner {
                    position: relative;
                    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                    border: 1px solid rgba(99, 102, 241, 0.4);
                    border-radius: 1.25rem;
                    padding: 1.25rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.25);
                    backdrop-filter: blur(16px);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .seal-close-btn {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.75rem;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-size: 1.4rem;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0.2rem;
                    transition: color 0.2s;
                }

                .seal-close-btn:hover {
                    color: #fff;
                }

                .seal-widget-badge span {
                    font-size: 0.68rem;
                    font-weight: 800;
                    letter-spacing: 0.08em;
                    color: #38bdf8;
                    background: rgba(56, 189, 248, 0.15);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    padding: 0.2rem 0.6rem;
                    border-radius: 1rem;
                }

                .seal-widget-content h4 {
                    font-size: 0.98rem;
                    font-weight: 800;
                    color: #f8fafc;
                    margin: 0 0 0.25rem 0;
                    padding-right: 1.25rem;
                }

                .seal-widget-content p {
                    font-size: 0.82rem;
                    color: #cbd5e1;
                    margin: 0;
                    line-height: 1.4;
                }

                .seal-widget-cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
                    color: #fff;
                    font-size: 0.88rem;
                    font-weight: 800;
                    padding: 0.6rem 1rem;
                    border-radius: 0.75rem;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }

                .seal-widget-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 18px rgba(99, 102, 241, 0.5);
                    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
                }

                @media (max-width: 640px) {
                    .seal-floating-widget {
                        bottom: 1rem;
                        right: 1rem;
                        width: calc(100vw - 2rem);
                    }
                }
            `}</style>
        </div>
    );
}
