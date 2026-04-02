import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: 'Not Found | VTUwise' };
    return {
        title: `${post.title} | VTUwise Blog`,
        description: post.description,
        openGraph: { title: post.title, description: post.description, type: 'article' }
    };
}

const tagColor: Record<string, string> = {
    'Career Guidance': '#7c3aed',
    'KCET Updates':    '#2563eb',
    'Study Tips':      '#d97706',
    'VTU Rules':       '#dc2626',
};

const tagEmoji: Record<string, string> = {
    'Career Guidance': '🎓',
    'KCET Updates':    '📄',
    'Study Tips':      '🎯',
    'VTU Rules':       '📖',
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    const accent = tagColor[post.tag] ?? '#4f46e5';
    const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <>
            <div className="post-page">

                {/* ── Hero ──────────────────────────────────────── */}
                <div className="post-hero" style={{ background: post.imageBg }}>
                    <div className="post-hero-grid" />
                    <div className="post-hero-vignette" />
                    <div className="post-hero-inner">
                        <nav className="post-breadcrumb">
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <Link href="/blog">Blog</Link>
                            <span>/</span>
                            <span>{post.tag}</span>
                        </nav>
                        <span className="post-hero-tag">{post.tag}</span>
                        <h1 className="post-hero-title">{post.title}</h1>
                        <div className="post-hero-meta">
                            <span className="post-author-badge">V</span>
                            <span>{post.author}</span>
                            <span>·</span>
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>⏱ {post.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* ── Body ─────────────────────────────────────── */}
                <div className="post-body">
                    <div className="post-layout">

                        {/* Article */}
                        <article className="post-article">
                            <div
                                className="post-content"
                                style={{ '--post-accent': accent } as React.CSSProperties}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* inline CTA */}
                            <div className="post-cta" style={{ borderColor: `${accent}30`, background: `${accent}0d` }}>
                                <div className="post-cta-icon">📚</div>
                                <h3 className="post-cta-title">Get premium VTU notes for free</h3>
                                <p className="post-cta-desc">Module-wise, syllabus-aligned notes for every branch and semester.</p>
                                <Link href="/#branches" className="post-cta-btn" style={{ background: accent }}>
                                    Explore Notes by Branch →
                                </Link>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="post-sidebar">
                            <div className="post-sidebar-sticky">
                                {/* Share */}
                                <div className="post-sidebar-card">
                                    <h4 className="post-sidebar-label">Share</h4>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - https://vtuwise.in/blog/' + post.slug)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="post-share-btn post-share-wa"
                                    >
                                        💬 Share on WhatsApp
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://vtuwise.in/blog/' + post.slug)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="post-share-btn post-share-tw"
                                    >
                                        🐦 Share on Twitter
                                    </a>
                                </div>

                                {/* Related */}
                                {relatedPosts.length > 0 && (
                                    <div className="post-sidebar-card">
                                        <h4 className="post-sidebar-label">More Articles</h4>
                                        {relatedPosts.map((rel) => (
                                            <Link key={rel.id} href={`/blog/${rel.slug}`} className="post-related-item">
                                                <div className="post-related-thumb" style={{ background: rel.imageBg }}>
                                                    {tagEmoji[rel.tag] ?? '📝'}
                                                </div>
                                                <div className="post-related-info">
                                                    <p className="post-related-title">{rel.title}</p>
                                                    <p className="post-related-time">{rel.readTime}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <style>{`
                .post-page { background: var(--background); }

                /* hero */
                .post-hero {
                    position: relative; overflow: hidden; min-height: 340px;
                    display: flex; align-items: flex-end;
                }
                .post-hero-grid {
                    position: absolute; inset: 0; opacity: 0.08;
                    background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .post-hero-vignette {
                    position: absolute; inset: 0;
                    background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%);
                }
                .post-hero-inner {
                    position: relative; z-index: 2;
                    max-width: 760px; margin: 0 auto; width: 100%;
                    padding: 3rem 1.5rem 2.5rem;
                }
                .post-breadcrumb {
                    display: flex; align-items: center; gap: 0.4rem;
                    font-size: 0.8rem; color: rgba(255,255,255,0.55); margin-bottom: 1.25rem;
                }
                .post-breadcrumb a { color: rgba(255,255,255,0.55); text-decoration: none; }
                .post-breadcrumb a:hover { color: #fff; }
                .post-hero-tag {
                    display: inline-block;
                    font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em;
                    text-transform: uppercase; padding: 0.3rem 0.9rem;
                    border-radius: 999px; margin-bottom: 1rem;
                    background: rgba(255,255,255,0.2); color: #fff;
                    border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(6px);
                }
                .post-hero-title {
                    font-size: clamp(1.5rem, 4vw, 2.75rem);
                    font-weight: 900; letter-spacing: -0.04em; line-height: 1.15;
                    color: #fff; max-width: 600px; margin-bottom: 1rem;
                    text-shadow: 0 2px 12px rgba(0,0,0,0.4);
                }
                .post-hero-meta {
                    display: flex; align-items: center; flex-wrap: wrap;
                    gap: 0.5rem 0.75rem; color: rgba(255,255,255,0.65);
                    font-size: 0.82rem; font-weight: 500;
                }
                .post-author-badge {
                    width: 22px; height: 22px; border-radius: 50%;
                    background: rgba(255,255,255,0.25); display: inline-flex;
                    align-items: center; justify-content: center;
                    font-size: 0.7rem; font-weight: 900;
                }

                /* body */
                .post-body {
                    max-width: 760px; margin: 0 auto;
                    padding: 2.5rem 1.5rem 5rem;
                }
                .post-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                }
                @media (min-width: 900px) {
                    .post-layout { grid-template-columns: 1fr 240px; }
                }

                /* article content */
                .post-content {
                    font-size: 1rem;
                    line-height: 1.85;
                    color: var(--text-muted);
                }
                .post-content p { margin-bottom: 1.1rem; }
                .post-content h2 {
                    font-size: 1.35rem; font-weight: 900;
                    color: var(--text); letter-spacing: -0.03em;
                    margin: 2.5rem 0 0.75rem;
                    padding-left: 0.75rem;
                    border-left: 3px solid var(--post-accent, var(--primary));
                }
                .post-content strong { color: var(--text); font-weight: 700; }
                .post-content a { color: var(--primary); text-decoration: none; font-weight: 600; }
                .post-content a:hover { text-decoration: underline; }
                .post-content ul {
                    list-style: none; padding: 0; margin: 0.5rem 0 1rem;
                }
                .post-content ul li {
                    position: relative; padding-left: 1.25rem; margin-bottom: 0.5rem;
                }
                .post-content ul li::before {
                    content: '•'; position: absolute; left: 0;
                    color: var(--post-accent, var(--primary)); font-weight: 900;
                }
                .post-content table {
                    width: 100%; border-collapse: collapse;
                    font-size: 0.875rem; margin: 1rem 0;
                }
                .post-content th, .post-content td {
                    padding: 0.6rem 0.75rem;
                    border-bottom: 1px solid var(--surface-border);
                    text-align: left;
                }
                .post-content th { background: var(--surface); color: var(--text); font-weight: 700; }

                /* cta box */
                .post-cta {
                    margin-top: 3rem; border-radius: 1.25rem;
                    padding: 2rem 1.75rem; text-align: center;
                    border: 1px solid; background: transparent;
                }
                .post-cta-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
                .post-cta-title { font-size: 1.25rem; font-weight: 900; color: var(--text); margin-bottom: 0.4rem; }
                .post-cta-desc { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem; }
                .post-cta-btn {
                    display: inline-block; color: #fff;
                    padding: 0.65rem 1.5rem; border-radius: 999px;
                    font-weight: 800; font-size: 0.875rem; text-decoration: none;
                    transition: opacity 0.2s, transform 0.2s;
                }
                .post-cta-btn:hover { opacity: 0.9; transform: translateY(-1px); }

                /* sidebar */
                .post-sidebar-sticky { position: sticky; top: 6rem; display: flex; flex-direction: column; gap: 1rem; }
                .post-sidebar-card {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1rem; padding: 1.25rem;
                }
                .post-sidebar-label {
                    font-size: 0.7rem; font-weight: 800;
                    letter-spacing: 0.12em; text-transform: uppercase;
                    color: var(--text-muted); margin-bottom: 0.75rem;
                }
                .post-share-btn {
                    display: flex; align-items: center; gap: 0.5rem;
                    width: 100%; padding: 0.6rem 0.85rem;
                    border-radius: 0.6rem; font-size: 0.82rem; font-weight: 700;
                    text-decoration: none; margin-bottom: 0.4rem; transition: opacity 0.2s;
                }
                .post-share-btn:hover { opacity: 0.85; }
                .post-share-wa { background: #dcfce7; color: #166534; }
                .post-share-tw { background: #e0f2fe; color: #0369a1; }
                [data-theme="dark"] .post-share-wa { background: rgba(22,101,52,0.25); color: #86efac; }
                [data-theme="dark"] .post-share-tw { background: rgba(3,105,161,0.25); color: #7dd3fc; }

                .post-related-item {
                    display: flex; gap: 0.75rem; align-items: flex-start;
                    text-decoration: none; padding: 0.5rem 0;
                    border-top: 1px solid var(--surface-border);
                }
                .post-related-item:first-of-type { border-top: none; }
                .post-related-thumb {
                    width: 48px; height: 48px; border-radius: 0.6rem;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.4rem; flex-shrink: 0;
                }
                .post-related-title {
                    font-size: 0.8rem; font-weight: 700; color: var(--text);
                    line-height: 1.35; transition: color 0.2s;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .post-related-item:hover .post-related-title { color: var(--primary); }
                .post-related-time { font-size: 0.72rem; color: var(--text-muted); margin-top: 0.2rem; }
            `}</style>
        </>
    );
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}
