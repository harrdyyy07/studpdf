'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SupportPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if the user has dismissed it in THIS session (Temporary)
        const dismissed = sessionStorage.getItem('support_popup_dismissed_session') === 'true';
        
        // Show if not dismissed, after a delay (e.g. 7 seconds)
        if (!dismissed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsVisible(false);
        sessionStorage.setItem('support_popup_dismissed_session', 'true');
    };

    if (!mounted || !isVisible) return null;

    return (
        <div className="support-popup-container glass">
            <button 
                onClick={closePopup}
                className="support-popup-close-btn"
                aria-label="Dismiss Support Popup"
            >
                &times;
            </button>
            <div className="support-popup-content">
                <div className="support-popup-header">
                    <span className="support-popup-icon">❤️</span>
                    <h4>Support VTUwise</h4>
                </div>
                <p className="support-popup-body">
                    Help us keep resources free and servers running. Consider contributing to our initiative!
                </p>
                <div className="support-popup-actions">
                    <Link href="/support" onClick={() => setIsVisible(false)} className="support-popup-donate-btn">
                        Support Us
                    </Link>
                </div>
            </div>

            <style>{`
                .support-popup-container {
                    position: fixed;
                    bottom: 5.5rem; /* Sit above the back-to-top button */
                    right: 2rem;
                    width: 290px;
                    padding: 1.25rem;
                    z-index: 995; /* below back-to-top (999) but high enough */
                    animation: supportSlideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    box-shadow: var(--hover-shadow);
                    transition: transform 0.3s ease, border-color 0.3s ease;
                }

                @keyframes supportSlideUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .support-popup-close-btn {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.75rem;
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    line-height: 1;
                    cursor: pointer;
                    color: var(--text-muted);
                    transition: color 0.2s;
                }

                .support-popup-close-btn:hover {
                    color: var(--text);
                }

                .support-popup-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .support-popup-icon {
                    font-size: 1.2rem;
                }

                .support-popup-header h4 {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: var(--text);
                    margin: 0;
                }

                .support-popup-body {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    text-align: left;
                }

                .support-popup-donate-btn {
                    display: inline-block;
                    width: 100%;
                    padding: 0.5rem 1rem;
                    background: var(--primary);
                    color: white;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-align: center;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                }

                .support-popup-donate-btn:hover {
                    background: var(--primary-hover);
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
                }

                @media (max-width: 768px) {
                    .support-popup-container {
                        bottom: 5rem;
                        right: 1.5rem;
                        width: 260px;
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default SupportPopup;
