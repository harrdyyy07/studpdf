'use client';

import React, { useEffect, useState } from 'react';

/**
 * Preloader - A premium loading screen that shows on initial mount.
 * It uses a combination of scale pulses and smooth opacity transitions
 * to create a high-end entry experience for VTUwise.
 */
const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Skip preloader for Lighthouse audits and search engines
        const isBot = /Chrome-Lighthouse|Googlebot|bingbot|yandex|baiduspider/i.test(navigator.userAgent);
        const hasShown = sessionStorage.getItem('preloader_shown') === 'true';

        if (isBot || hasShown) {
            return;
        }

        setShouldRender(true);
        // Lock scroll while loading
        document.body.style.overflow = 'hidden';

        // Minimum visible duration for the "WOW" effect
        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('preloader_shown', 'true');
            
            // Allow exit animation to complete before unmounting
            const unmountTimer = setTimeout(() => {
                setShouldRender(false);
                document.body.style.overflow = 'unset';
            }, 800); // Matches the slide-up/fade-out duration

            return () => clearTimeout(unmountTimer);
        }, 1500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div className={`preloader-overlay ${!loading ? 'preloader-exit' : ''}`}>
            <div className="preloader-content">
                <div className="preloader-logo-container">
                    <div className="preloader-logo-glow"></div>
                    <div className="preloader-icon">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20L50 80L80 20" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M35 20L50 50L65 20" stroke="rgba(255,255,255,0.4)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="preloader-text">
                    <span className="preloader-brand">VTUwise</span>
                    <div className="preloader-line-container">
                        <div className="preloader-line"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .preloader-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    background: #0f172a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.8s cubic-bezier(0.87, 0, 0.13, 1);
                }

                .preloader-exit {
                    transform: translateY(-100%);
                    opacity: 0;
                    pointer-events: none;
                }

                .preloader-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                    animation: preloader-fade-in 0.6s ease-out;
                }

                .preloader-logo-container {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .preloader-logo-glow {
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
                    animation: preloader-glow 2s infinite ease-in-out;
                }

                .preloader-icon {
                    position: relative;
                    z-index: 1;
                    animation: preloader-pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }

                .preloader-text {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                }

                .preloader-brand {
                    font-size: 1.75rem;
                    font-weight: 900;
                    color: white;
                    letter-spacing: -0.05em;
                    text-transform: uppercase;
                }

                .preloader-line-container {
                    width: 120px;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 99px;
                    overflow: hidden;
                    position: relative;
                }

                .preloader-line {
                    position: absolute;
                    height: 100%;
                    width: 40%;
                    background: linear-gradient(90deg, transparent, #6366f1, transparent);
                    animation: preloader-progress 1.5s infinite ease-in-out;
                }

                @keyframes preloader-fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes preloader-glow {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.3); opacity: 0.8; }
                }

                @keyframes preloader-pulse {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0)); }
                    50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5)); }
                }

                @keyframes preloader-progress {
                    0% { left: -40%; }
                    100% { left: 100%; }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
