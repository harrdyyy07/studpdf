'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';

const CASHFREE_URL = 'https://payments.cashfree.com/forms/vtuwise';
const PAYMENT_MODES = ['UPI', 'Google Pay', 'PhonePe', 'Paytm', 'Cards', 'NetBanking'];
const SUPPORT_POPUP_DISMISS_KEY = 'vtuwise_support_popup_dismissed_at';
const PAY_CLICK_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 1 day

const SupportClient: React.FC = () => {
    const handlePayClick = () => {
        try {
            localStorage.setItem(
                SUPPORT_POPUP_DISMISS_KEY,
                String(Date.now() + PAY_CLICK_COOLDOWN_MS)
            );
        } catch {
            // Ignore storage errors (e.g. private browsing)
        }
    };
    return (
        <div className="support-page">
            <div className="support-glow" aria-hidden="true" />

            <div className="support-container">
                {/* Badge */}
                <div className="support-badge">
                    <span className="support-badge-dot" />
                    <span>Student-Powered Community</span>
                </div>

                {/* Hero Heading */}
                <h1 className="support-title">
                    Help Us Keep VTUwise Running
                </h1>

                <p className="support-subtitle">
                    Keep notes, question papers, and model papers 100% free for every VTU engineering student. Your support directly funds fast cloud servers and bandwidth.
                </p>

                {/* Main Card */}
                <div className="support-card">
                    <div className="support-card-icon" aria-hidden="true">
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
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

                    <h2 className="support-card-title">Support VTUwise</h2>

                    <p className="support-card-desc">
                        Contribute any amount of your choice. Every small contribution helps keep the platform fast and accessible.
                    </p>

                    {/* Primary CTA */}
                    <a
                        href={CASHFREE_URL}
                        target="_parent"
                        onClick={handlePayClick}
                        className="support-primary-btn"
                    >
                        <span>Contribute Now</span>
                        <svg
                            width="17"
                            height="17"
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
                    </a>

                    {/* Divider + Cashfree Official Badge */}
                    <div className="support-cashfree-section">
                        <span className="support-cashfree-label">
                            Or pay directly via Cashfree
                        </span>

                        <a
                            href={CASHFREE_URL}
                            target="_parent"
                            onClick={handlePayClick}
                            title="Click here to pay on Cashfree"
                            className="support-cashfree-badge"
                        >
                            <img
                                src="https://cashfree-checkoutcartimages-prod.cashfree.com/favicon2hbc7621o2efg_prod.png"
                                alt="Cashfree logo"
                                className="support-cf-icon"
                            />
                            <div className="support-cf-text">
                                <span className="support-cf-title">Support vtuwise</span>
                                <span className="support-cf-powered">
                                    <span>Powered By Cashfree</span>
                                    <img
                                        src="https://cashfreelogo.cashfree.com/assets_images/cfbrand/cf_logo.svg"
                                        alt="Cashfree brand logo"
                                        className="support-cf-brand"
                                    />
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Payment Modes */}
                    <div className="support-modes-section">
                        <div className="support-modes-list">
                            {PAYMENT_MODES.map((mode) => (
                                <span key={mode} className="support-mode-pill">
                                    {mode}
                                </span>
                            ))}
                        </div>

                        <p className="support-trust-note">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="support-trust-icon"
                            >
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span>100% Encrypted &amp; Secured by Cashfree Payments</span>
                        </p>
                    </div>
                </div>

                {/* Highlights */}
                <div className="support-highlights">
                    <div className="support-highlight-item">
                        <span className="support-highlight-dot" />
                        <span>Fast Cloud Hosting</span>
                    </div>
                    <div className="support-highlight-item">
                        <span className="support-highlight-dot" />
                        <span>Zero Paywalls</span>
                    </div>
                    <div className="support-highlight-item">
                        <span className="support-highlight-dot" />
                        <span>All VTU Schemes</span>
                    </div>
                </div>

                {/* Back link */}
                <Link href="/" className="support-back-link">
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
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    <span>Back to VTUwise</span>
                </Link>
            </div>

            <style jsx>{`
                .support-page {
                    position: relative;
                    min-height: 85vh;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 56px 20px 72px;
                    overflow: hidden;
                    background: #f8fafc;
                    color: #0f172a;
                }

                :global([data-theme='dark']) .support-page,
                :global(.dark) .support-page {
                    background: #0b0f19;
                    color: #f8fafc;
                }

                .support-glow {
                    position: absolute;
                    top: -120px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 680px;
                    height: 420px;
                    background: radial-gradient(
                        ellipse at center,
                        rgba(79, 70, 229, 0.14) 0%,
                        rgba(79, 70, 229, 0.04) 45%,
                        transparent 75%
                    );
                    pointer-events: none;
                    z-index: 0;
                }

                :global([data-theme='dark']) .support-glow,
                :global(.dark) .support-glow {
                    background: radial-gradient(
                        ellipse at center,
                        rgba(99, 102, 241, 0.2) 0%,
                        rgba(79, 70, 229, 0.06) 45%,
                        transparent 75%
                    );
                }

                .support-container {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .support-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    border-radius: 9999px;
                    font-size: 12px;
                    font-weight: 700;
                    background: rgba(79, 70, 229, 0.08);
                    color: #4338ca;
                    border: 1px solid rgba(79, 70, 229, 0.2);
                    margin-bottom: 18px;
                }

                :global([data-theme='dark']) .support-badge,
                :global(.dark) .support-badge {
                    background: rgba(99, 102, 241, 0.14);
                    color: #a5b4fc;
                    border-color: rgba(129, 140, 248, 0.28);
                }

                .support-badge-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.22);
                }

                .support-title {
                    margin: 0 0 14px;
                    font-size: clamp(1.85rem, 4vw, 2.65rem);
                    font-weight: 800;
                    line-height: 1.15;
                    letter-spacing: -0.025em;
                    color: #0f172a;
                }

                :global([data-theme='dark']) .support-title,
                :global(.dark) .support-title {
                    color: #ffffff;
                }

                .support-subtitle {
                    margin: 0 0 32px;
                    max-width: 450px;
                    font-size: 15px;
                    line-height: 1.65;
                    color: #475569;
                }

                :global([data-theme='dark']) .support-subtitle,
                :global(.dark) .support-subtitle {
                    color: #94a3b8;
                }

                .support-card {
                    width: 100%;
                    padding: 34px 30px 28px;
                    border-radius: 24px;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 20px 45px -15px rgba(15, 23, 42, 0.08),
                                0 4px 12px -2px rgba(15, 23, 42, 0.04);
                }

                :global([data-theme='dark']) .support-card,
                :global(.dark) .support-card {
                    background: #111827;
                    border-color: #1f2937;
                    box-shadow: 0 24px 50px -15px rgba(0, 0, 0, 0.55),
                                0 0 0 1px rgba(255, 255, 255, 0.03);
                }

                .support-card-icon {
                    width: 56px;
                    height: 56px;
                    margin: 0 auto 18px;
                    border-radius: 16px;
                    background: rgba(79, 70, 229, 0.09);
                    border: 1px solid rgba(79, 70, 229, 0.18);
                    color: #4f46e5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                :global([data-theme='dark']) .support-card-icon,
                :global(.dark) .support-card-icon {
                    background: rgba(99, 102, 241, 0.14);
                    border-color: rgba(129, 140, 248, 0.24);
                    color: #818cf8;
                }

                .support-card-title {
                    margin: 0 0 8px;
                    font-size: 24px;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: #0f172a;
                }

                :global([data-theme='dark']) .support-card-title,
                :global(.dark) .support-card-title {
                    color: #ffffff;
                }

                .support-card-desc {
                    margin: 0 auto 24px;
                    max-width: 360px;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #64748b;
                }

                :global([data-theme='dark']) .support-card-desc,
                :global(.dark) .support-card-desc {
                    color: #94a3b8;
                }

                .support-card :global(.support-primary-btn) {
                    width: 100%;
                    height: 52px;
                    padding: 0 24px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
                    color: #ffffff;
                    font-size: 15.5px;
                    font-weight: 700;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    box-shadow: 0 10px 24px -6px rgba(79, 70, 229, 0.45);
                    transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease;
                }

                .support-card :global(.support-primary-btn:hover) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                    box-shadow: 0 14px 28px -6px rgba(79, 70, 229, 0.55);
                }

                .support-card :global(.support-primary-btn:active) {
                    transform: scale(0.99);
                }

                .support-cashfree-section {
                    margin-top: 24px;
                    padding-top: 22px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                :global([data-theme='dark']) .support-cashfree-section,
                :global(.dark) .support-cashfree-section {
                    border-top-color: #1e293b;
                }

                .support-cashfree-label {
                    font-size: 12px;
                    font-weight: 500;
                    color: #64748b;
                    margin-bottom: 12px;
                }

                :global([data-theme='dark']) .support-cashfree-label,
                :global(.dark) .support-cashfree-label {
                    color: #94a3b8;
                }

                .support-card :global(.support-cashfree-badge) {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 18px;
                    border-radius: 14px;
                    background: #090d16;
                    border: 1px solid #1e293b;
                    text-decoration: none;
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
                    transition: transform 0.18s ease, border-color 0.18s ease;
                }

                .support-card :global(.support-cashfree-badge:hover) {
                    transform: translateY(-1px) scale(1.02);
                    border-color: #334155;
                }

                .support-cf-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 8px;
                    display: block;
                    flex-shrink: 0;
                }

                .support-cf-text {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                }

                .support-cf-title {
                    font-size: 13.5px;
                    font-weight: 700;
                    color: #ffffff;
                    line-height: 1.25;
                }

                .support-cf-powered {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    margin-top: 2px;
                    font-size: 10.5px;
                    color: #94a3b8;
                }

                .support-cf-brand {
                    width: 13px;
                    height: 13px;
                    display: block;
                }

                .support-modes-section {
                    margin-top: 22px;
                    padding-top: 20px;
                    border-top: 1px solid #f1f5f9;
                }

                :global([data-theme='dark']) .support-modes-section,
                :global(.dark) .support-modes-section {
                    border-top-color: #1e293b;
                }

                .support-modes-list {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .support-mode-pill {
                    padding: 5px 10px;
                    border-radius: 8px;
                    font-size: 11.5px;
                    font-weight: 600;
                    background: #f1f5f9;
                    color: #475569;
                    border: 1px solid #e2e8f0;
                }

                :global([data-theme='dark']) .support-mode-pill,
                :global(.dark) .support-mode-pill {
                    background: #1e293b;
                    color: #cbd5e1;
                    border-color: #334155;
                }

                .support-trust-note {
                    margin: 14px 0 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #64748b;
                }

                :global([data-theme='dark']) .support-trust-note,
                :global(.dark) .support-trust-note {
                    color: #94a3b8;
                }

                .support-trust-icon {
                    color: #10b981;
                    flex-shrink: 0;
                }

                .support-highlights {
                    margin-top: 24px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                }

                .support-highlight-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #64748b;
                }

                :global([data-theme='dark']) .support-highlight-item,
                :global(.dark) .support-highlight-item {
                    color: #94a3b8;
                }

                .support-highlight-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10b981;
                }

                .support-container :global(.support-back-link) {
                    margin-top: 26px;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #64748b;
                    text-decoration: none;
                    transition: color 0.15s ease, background-color 0.15s ease;
                }

                .support-container :global(.support-back-link:hover) {
                    color: #4f46e5;
                    background: rgba(79, 70, 229, 0.06);
                }

                :global([data-theme='dark']) .support-container :global(.support-back-link),
                :global(.dark) .support-container :global(.support-back-link) {
                    color: #94a3b8;
                }

                :global([data-theme='dark']) .support-container :global(.support-back-link:hover),
                :global(.dark) .support-container :global(.support-back-link:hover) {
                    color: #a5b4fc;
                    background: rgba(99, 102, 241, 0.1);
                }

                @media (max-width: 640px) {
                    .support-page {
                        padding: 40px 16px 56px;
                    }

                    .support-card {
                        padding: 26px 20px 22px;
                        border-radius: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SupportClient;
