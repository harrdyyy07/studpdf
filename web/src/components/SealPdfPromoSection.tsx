'use client';

import React from 'react';

export default function SealPdfPromoSection() {
    const pdfTools = [
        {
            title: 'Merge & Combine PDFs',
            desc: 'Merge multiple PDF documents into a single seamlessly ordered file in seconds.',
            icon: '📑',
            badge: 'Popular',
            url: 'https://seal-pdf.com/'
        },
        {
            title: 'Compress PDF Size',
            desc: 'Reduce file size drastically while retaining high visual document & image quality.',
            icon: '📉',
            badge: 'Fast',
            url: 'https://seal-pdf.com/'
        },
        {
            title: 'Convert PDF to Word & Image',
            desc: 'Convert PDFs to editable Word docs, JPG, PNG, and convert images back to PDF.',
            icon: '🔄',
            badge: 'Smart',
            url: 'https://seal-pdf.com/'
        },
        {
            title: 'Split & Extract Pages',
            desc: 'Separate PDF pages or extract custom page ranges effortlessly.',
            icon: '✂️',
            badge: 'Easy',
            url: 'https://seal-pdf.com/'
        },
        {
            title: 'Protect & Unlock PDF',
            desc: 'Add strong password encryption to your PDFs or unlock password-protected files.',
            icon: '🔒',
            badge: 'Secure',
            url: 'https://seal-pdf.com/'
        },
        {
            title: 'Edit & Organize Pages',
            desc: 'Rotate, reorder, delete pages, add page numbers and watermark to your PDFs.',
            icon: '🛠️',
            badge: 'Free',
            url: 'https://seal-pdf.com/'
        }
    ];

    return (
        <section className="seal-pdf-promo-section">
            <div className="container">
                <div className="seal-pdf-banner-card">
                    {/* Background glow effects */}
                    <div className="seal-glow-1" />
                    <div className="seal-glow-2" />

                    <div className="seal-banner-header">
                        <div className="seal-brand-badge">
                            <span className="seal-emoji">🦭</span>
                            <span>OFFICIAL PDF PARTNER</span>
                            <span className="seal-pill-new">100% FREE</span>
                        </div>

                        <h2 className="seal-banner-title">
                            Unlock the Ultimate Free PDF Toolkit — <span className="seal-highlight">Seal PDF</span>
                        </h2>

                        <p className="seal-banner-subtitle">
                            Merge, compress, split, convert, and edit all your study notes, assignment PDFs, and documents with maximum speed & zero limits. No registration or software installation needed.
                        </p>

                        <div className="seal-actions-wrapper">
                            <a 
                                href="https://seal-pdf.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="seal-cta-btn main-cta"
                            >
                                🚀 Visit Seal-PDF.com Now
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                            
                            <div className="seal-trust-pills">
                                <span>⚡ Lightning Fast</span>
                                <span>🔒 100% Private & Secure</span>
                                <span>✨ No Watermark</span>
                            </div>
                        </div>
                    </div>

                    <div className="seal-tools-grid">
                        {pdfTools.map((tool, idx) => (
                            <a 
                                key={idx} 
                                href={tool.url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="seal-tool-card"
                            >
                                <div className="seal-card-header">
                                    <span className="seal-tool-icon">{tool.icon}</span>
                                    <span className="seal-tool-badge">{tool.badge}</span>
                                </div>
                                <h3 className="seal-tool-title">{tool.title}</h3>
                                <p className="seal-tool-desc">{tool.desc}</p>
                                <div className="seal-tool-link">
                                    <span>Try Tool</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .seal-pdf-promo-section {
                    padding: 3rem 0;
                }

                .seal-pdf-banner-card {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #090d16 0%, #111827 40%, #1e1b4b 100%);
                    border-radius: 2rem;
                    padding: 3.5rem 2.5rem;
                    border: 1px solid rgba(99, 102, 241, 0.25);
                    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.4), 0 0 30px rgba(99, 102, 241, 0.15);
                }

                .seal-glow-1 {
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(14, 165, 233, 0.22), transparent 70%);
                    pointer-events: none;
                }

                .seal-glow-2 {
                    position: absolute;
                    bottom: -120px;
                    left: -100px;
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%);
                    pointer-events: none;
                }

                .seal-banner-header {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    max-width: 820px;
                    margin: 0 auto 3rem;
                }

                .seal-brand-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(12px);
                    padding: 0.4rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.78rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    color: #93c5fd;
                    margin-bottom: 1.25rem;
                }

                .seal-emoji {
                    font-size: 1.1rem;
                }

                .seal-pill-new {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: #fff;
                    padding: 0.15rem 0.5rem;
                    border-radius: 1rem;
                    font-size: 0.68rem;
                }

                .seal-banner-title {
                    font-size: clamp(2rem, 5vw, 3.2rem);
                    font-weight: 900;
                    color: #ffffff;
                    line-height: 1.2;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.25rem;
                }

                .seal-highlight {
                    background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .seal-banner-subtitle {
                    font-size: 1.1rem;
                    color: #cbd5e1;
                    line-height: 1.7;
                    margin-bottom: 2rem;
                }

                .seal-actions-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.25rem;
                }

                .seal-cta-btn.main-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
                    color: #ffffff;
                    font-size: 1.15rem;
                    font-weight: 800;
                    padding: 1rem 2.25rem;
                    border-radius: 3rem;
                    text-decoration: none;
                    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
                    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                .seal-cta-btn.main-cta svg {
                    width: 20px;
                    height: 20px;
                    transition: transform 0.3s ease;
                }

                .seal-cta-btn.main-cta:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.6);
                }

                .seal-cta-btn.main-cta:hover svg {
                    transform: translate(3px, -3px);
                }

                .seal-trust-pills {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1rem;
                    color: #94a3b8;
                    font-size: 0.88rem;
                    font-weight: 600;
                }

                .seal-trust-pills span {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.35rem 0.85rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .seal-tools-grid {
                    position: relative;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.25rem;
                }

                .seal-tool-card {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 1.25rem;
                    padding: 1.5rem;
                    text-decoration: none;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                .seal-tool-card:hover {
                    background: rgba(255, 255, 255, 0.09);
                    border-color: rgba(147, 197, 253, 0.4);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                }

                .seal-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .seal-tool-icon {
                    font-size: 2rem;
                }

                .seal-tool-badge {
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #38bdf8;
                    background: rgba(56, 189, 248, 0.12);
                    padding: 0.25rem 0.65rem;
                    border-radius: 1rem;
                }

                .seal-tool-title {
                    font-size: 1.15rem;
                    font-weight: 750;
                    color: #f8fafc;
                    margin-bottom: 0.5rem;
                }

                .seal-tool-desc {
                    font-size: 0.88rem;
                    color: #94a3b8;
                    line-height: 1.5;
                    margin-bottom: 1.25rem;
                    flex: 1;
                }

                .seal-tool-link {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #60a5fa;
                    margin-top: auto;
                    transition: gap 0.2s ease;
                }

                .seal-tool-link svg {
                    width: 14px;
                    height: 14px;
                    transition: transform 0.2s ease;
                }

                .seal-tool-card:hover .seal-tool-link {
                    gap: 0.65rem;
                    color: #93c5fd;
                }

                .seal-tool-card:hover .seal-tool-link svg {
                    transform: translateX(4px);
                }

                @media (max-width: 768px) {
                    .seal-pdf-banner-card {
                        padding: 2.5rem 1.5rem;
                        border-radius: 1.5rem;
                    }
                    .seal-banner-title {
                        font-size: 1.8rem;
                    }
                    .seal-banner-subtitle {
                        font-size: 0.98rem;
                    }
                    .seal-cta-btn.main-cta {
                        width: 100%;
                        justify-content: center;
                        font-size: 1rem;
                        padding: 0.85rem 1.5rem;
                    }
                    .seal-tools-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
