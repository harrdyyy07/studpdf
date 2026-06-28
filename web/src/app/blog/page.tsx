import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';

export const metadata: Metadata = {
    title: 'VTU Blog & Updates - Tips, Rules & Study Guides | VTUwise',
    description: 'Read the latest VTU blog posts, study tips, 2022 scheme passing rules, and exam preparation strategies designed exclusively for engineering students.',
};

const tagEmoji: Record<string, string> = {
    'Career Guidance': '🎓',
    'KCET Updates': '📄',
    'Study Tips': '🎯',
    'VTU Rules': '📖',
    'Sports Updates': '🏏',
    'Exam Updates': '📢',
};

const tagColor: Record<string, string> = {
    'Career Guidance': '#7c3aed',
    'KCET Updates': '#2563eb',
    'Study Tips': '#d97706',
    'VTU Rules': '#dc2626',
    'Sports Updates': '#047857',
    'Exam Updates': '#2563eb',
};

export default function BlogIndex() {
    const [featured, ...rest] = blogPosts;

    return (
        <>
            <div className="blog-page">

                {/* ── Hero ─────────────────────────────────────── */}
                <section className="blog-hero">
                    <div className="blog-hero-blobs">
                        <div className="blob-a" />
                        <div className="blob-b" />
                    </div>
                    <div className="blog-hero-inner">
                        <div className="blog-hero-eyebrow">✦ VTUwise Resource Hub</div>
                        <h1 className="blog-hero-title">
                            The VTUwise<br />
                            <span className="blog-hero-outline">Blog</span>
                        </h1>
                        <p className="blog-hero-sub">
                            Study strategies, university rules, and career insights — crafted for VTU engineering students.
                        </p>
                    </div>
                </section>

                {/* ── Content ──────────────────────────────────── */}
                <div className="blog-body">

                    {/* Featured */}
                    <Link href={`/blog/${featured.slug}`} className="blog-featured-link">
                        <div className="blog-featured-card">
                            <div className="blog-featured-thumb" style={{ background: featured.imageBg }}>
                                <div className="blog-thumb-grid" />
                                <span className="blog-thumb-emoji">{tagEmoji[featured.tag] ?? '📝'}</span>
                                <span
                                    className="blog-featured-badge"
                                    style={{ background: tagColor[featured.tag] ?? '#4f46e5' }}
                                >
                                    FEATURED
                                </span>
                            </div>
                            <div className="blog-featured-content">
                                <div className="blog-featured-meta">
                                    <span
                                        className="blog-tag-pill"
                                        style={{ color: tagColor[featured.tag] ?? '#4f46e5', background: `${tagColor[featured.tag] ?? '#4f46e5'}15` }}
                                    >
                                        {featured.tag}
                                    </span>
                                    <span className="blog-meta-date">{featured.date} · {featured.readTime}</span>
                                </div>
                                <h2 className="blog-featured-title">{featured.title}</h2>
                                <p className="blog-featured-desc">{featured.description}</p>
                                <span className="blog-read-more">Read Article →</span>
                            </div>
                        </div>
                    </Link>

                    {/* More Articles label */}
                    <div className="blog-section-label">
                        <span>More Articles</span>
                        <div className="blog-section-line" />
                    </div>

                    {/* Grid */}
                    <div className="blog-grid">
                        {rest.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                                <div className="blog-card-thumb" style={{ background: post.imageBg }}>
                                    <div className="blog-thumb-grid" />
                                    <span className="blog-card-emoji">{tagEmoji[post.tag] ?? '📝'}</span>
                                </div>
                                <div className="blog-card-body">
                                    <span
                                        className="blog-tag-pill"
                                        style={{ color: tagColor[post.tag] ?? '#4f46e5', background: `${tagColor[post.tag] ?? '#4f46e5'}15` }}
                                    >
                                        {post.tag}
                                    </span>
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    <p className="blog-card-desc">{post.description}</p>
                                    <div className="blog-card-footer">
                                        <span className="blog-card-time">{post.readTime}</span>
                                        <span className="blog-card-cta">Read Post →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Coming Soon */}
                        <div className="blog-card blog-card-soon">
                            <div className="blog-card-thumb blog-soon-thumb">
                                <span className="blog-card-emoji">✍️</span>
                            </div>
                            <div className="blog-card-body">
                                <span className="blog-tag-pill blog-soon-tag">Coming Soon</span>
                                <h3 className="blog-card-title blog-soon-title">Mastering Engineering Maths (M1 &amp; M2)</h3>
                                <p className="blog-card-desc">Our complete guide to conquering the toughest subjects in the P &amp; C cycle is on the way.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="blog-cta-banner">
                        <div className="blog-cta-blob" />
                        <div className="blog-cta-inner">
                            <div className="blog-cta-icon">💬</div>
                            <h3 className="blog-cta-title">Join the VTUwise Community</h3>
                            <p className="blog-cta-desc">Get instant updates on results, notes, exam schedules, and more.</p>
                            <a
                                href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="blog-cta-btn"
                            >
                                Join WhatsApp Channel →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .blog-page { background: var(--background); }

                /* hero */
                .blog-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 60%, #312e81 100%);
                    padding: 5rem 1.5rem;
                }
                .blog-hero-blobs { position: absolute; inset: 0; pointer-events: none; }
                .blob-a {
                    position: absolute; top: -8rem; right: -8rem;
                    width: 400px; height: 400px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(129,140,248,0.25), transparent 70%);
                }
                .blob-b {
                    position: absolute; bottom: -6rem; left: -6rem;
                    width: 300px; height: 300px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%);
                }
                .blog-hero-inner {
                    position: relative; z-index: 1;
                    max-width: 760px; margin: 0 auto;
                }
                .blog-hero-eyebrow {
                    color: rgba(165,180,252,0.9); font-size: 0.8rem;
                    font-weight: 700; letter-spacing: 0.15em;
                    text-transform: uppercase; margin-bottom: 1.25rem;
                }
                .blog-hero-title {
                    font-size: clamp(2.5rem, 8vw, 5rem);
                    font-weight: 900; letter-spacing: -0.04em;
                    line-height: 1; color: #fff; margin-bottom: 1.25rem;
                }
                .blog-hero-outline {
                    -webkit-text-stroke: 2px rgba(165,180,252,0.6);
                    color: transparent;
                }
                .blog-hero-sub {
                    color: rgba(199,210,254,0.8);
                    font-size: 1.1rem; max-width: 480px; line-height: 1.7;
                }

                /* body wrapper */
                .blog-body {
                    max-width: 760px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem 5rem;
                }

                /* featured */
                .blog-featured-link { display: block; text-decoration: none; margin-bottom: 3rem; }
                .blog-featured-card {
                    border-radius: 1.5rem;
                    overflow: hidden;
                    border: 1px solid var(--surface-border);
                    box-shadow: var(--card-shadow);
                    background: var(--surface);
                    transition: box-shadow 0.3s, transform 0.3s;
                }
                .blog-featured-link:hover .blog-featured-card {
                    box-shadow: var(--hover-shadow);
                    transform: translateY(-3px);
                }
                .blog-featured-thumb {
                    position: relative; height: 260px;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden;
                }
                .blog-thumb-grid {
                    position: absolute; inset: 0; opacity: 0.08;
                    background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 36px 36px;
                }
                .blog-thumb-emoji { font-size: 5rem; filter: drop-shadow(0 4px 16px rgba(0,0,0,0.3)); position: relative; z-index: 1; }
                .blog-card-emoji  { font-size: 3.5rem; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3)); position: relative; z-index: 1; }
                .blog-featured-badge {
                    position: absolute; top: 1rem; left: 1rem;
                    color: #fff; font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 0.1em; padding: 0.3rem 0.8rem;
                    border-radius: 999px;
                }
                .blog-featured-content { padding: 1.75rem 2rem; }
                .blog-featured-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
                .blog-meta-date { font-size: 0.82rem; color: var(--text-muted); }
                .blog-featured-title {
                    font-size: 1.6rem; font-weight: 900; letter-spacing: -0.03em;
                    color: var(--text); line-height: 1.25; margin-bottom: 0.75rem;
                    transition: color 0.2s;
                }
                .blog-featured-link:hover .blog-featured-title { color: var(--primary); }
                .blog-featured-desc { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 1rem; }
                .blog-read-more { font-size: 0.875rem; font-weight: 700; color: var(--primary); }

                /* tag pill */
                .blog-tag-pill {
                    display: inline-block;
                    font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 0.08em; text-transform: uppercase;
                    padding: 0.25rem 0.75rem; border-radius: 999px;
                }

                /* section label */
                .blog-section-label {
                    display: flex; align-items: center; gap: 1rem;
                    margin-bottom: 1.5rem;
                    font-size: 1.1rem; font-weight: 900; color: var(--text);
                }
                .blog-section-line { flex: 1; height: 1px; background: var(--surface-border); }

                /* grid */
                .blog-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.25rem;
                    margin-bottom: 3rem;
                }
                .blog-card {
                    display: flex; flex-direction: column;
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.25rem; overflow: hidden;
                    text-decoration: none;
                    box-shadow: var(--card-shadow);
                    transition: box-shadow 0.3s, transform 0.3s;
                }
                .blog-card:hover { box-shadow: var(--hover-shadow); transform: translateY(-3px); }
                .blog-card-thumb {
                    height: 160px;
                    display: flex; align-items: center; justify-content: center;
                    position: relative; overflow: hidden;
                }
                .blog-card-body { flex: 1; padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
                .blog-card-title {
                    font-size: 1rem; font-weight: 800; letter-spacing: -0.02em;
                    color: var(--text); line-height: 1.35;
                    transition: color 0.2s;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .blog-card:hover .blog-card-title { color: var(--primary); }
                .blog-card-desc {
                    font-size: 0.82rem; color: var(--text-muted); line-height: 1.65;
                    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
                    flex: 1;
                }
                .blog-card-footer {
                    display: flex; align-items: center; justify-content: space-between;
                    padding-top: 0.75rem; border-top: 1px solid var(--surface-border);
                    margin-top: auto;
                }
                .blog-card-time { font-size: 0.75rem; color: var(--text-muted); }
                .blog-card-cta  { font-size: 0.75rem; font-weight: 700; color: var(--primary); }

                /* soon card */
                .blog-card-soon { opacity: 0.5; pointer-events: none; }
                .blog-soon-thumb { background: var(--surface-border); }
                .blog-soon-tag { background: var(--surface-border) !important; color: var(--text-muted) !important; }
                .blog-soon-title { color: var(--text-muted); }

                /* cta */
                .blog-cta-banner {
                    position: relative; overflow: hidden;
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    border-radius: 1.75rem; padding: 3rem 2rem; text-align: center; color: #fff;
                }
                .blog-cta-blob {
                    position: absolute; top: -3rem; right: -3rem;
                    width: 200px; height: 200px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
                    pointer-events: none;
                }
                .blog-cta-inner { position: relative; z-index: 1; }
                .blog-cta-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
                .blog-cta-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem; }
                .blog-cta-desc { color: rgba(199,210,254,0.85); font-size: 0.95rem; margin-bottom: 1.5rem; }
                .blog-cta-btn {
                    display: inline-block;
                    background: #fff; color: #4f46e5;
                    padding: 0.75rem 1.75rem; border-radius: 999px;
                    font-weight: 800; font-size: 0.9rem; text-decoration: none;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .blog-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
            `}</style>
        </>
    );
}
