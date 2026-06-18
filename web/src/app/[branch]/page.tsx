import React from 'react';
import { siteData } from '@/data/notesData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BranchCard from '@/components/BranchCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getBranchBlog } from '@/data/subjectBlogsData';

const semColors: { [key: number]: string } = {
    1: 'var(--s1-bg)', 2: 'var(--s2-bg)', 3: 'var(--s3-bg)', 4: 'var(--s4-bg)',
    5: 'var(--s5-bg)', 6: 'var(--s6-bg)', 7: 'var(--s7-bg)', 8: 'var(--s8-bg)'
};

export async function generateMetadata({ params }: { params: Promise<{ branch: string }> }): Promise<Metadata> {
    const { branch } = await params;
    const data = siteData[branch];
    
    if (!data) return { title: 'Not Found | VTUwise' };
    
    const blog = getBranchBlog(branch, data.title, data.semesters, data.schemes);
    return {
        title: blog.title,
        description: blog.description,
        openGraph: { title: blog.title, description: blog.description }
    };
}

export default async function BranchPage({ params }: { params: Promise<{ branch: string }> }) {
    const { branch } = await params;
    const data = siteData[branch];

    if (!data) {
        notFound();
    }

    const blog = getBranchBlog(branch, data.title, data.semesters, data.schemes);

    const breadcrumbs = [
        { label: branch.toUpperCase(), href: '#' }
    ];

    return (
        <div className="container py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="section-title text-left border-l-8 border-primary pl-6 mb-12">{data.title}</h1>
            
            {data.semesters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.semesters.map((sem) => (
                        <BranchCard 
                            key={sem.sem}
                            title={`Semester ${sem.sem}`}
                            slug={`/${branch}/${sem.sem}`}
                            badge="Notes"
                            bg={semColors[sem.sem] || 'var(--primary)'}
                            thumbText={sem.sem.toString()}
                        />
                    ))}
                </div>
            )}

            {data.schemes && (
                <div className="flex flex-col gap-12 mt-12">
                    {data.schemes.map((scheme) => (
                        <div key={scheme.slug}>
                            <h2 className="text-2xl font-bold mb-8 text-left border-l-4 border-primary pl-4">{scheme.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {scheme.cycles.map((cycle, idx) => (
                                    <BranchCard 
                                        key={cycle.slug}
                                        title={cycle.name}
                                        slug={`/${branch}/${scheme.slug}/${cycle.slug}`}
                                        badge="Cycle"
                                        bg={idx % 2 === 0 ? 'var(--s1-bg)' : 'var(--s2-bg)'}
                                        thumbText={cycle.name.charAt(0)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {blog && (
                <div className="subject-blog-section mt-16 pt-12 border-t border-surface-border">
                    <div className="subject-blog-card">
                        <div className="subject-blog-badge">🎓 DEPARTMENT PROFILE</div>
                        <h2 className="subject-blog-title">{blog.title}</h2>
                        <div className="subject-blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {blog.faqs && blog.faqs.length > 0 && (
                        <div className="subject-faq-section mt-16">
                            <h2 className="section-title text-left mb-8">Frequently Asked Questions</h2>
                            <div className="faq-list">
                                {blog.faqs.map((faq, idx) => (
                                    <details key={idx} className="faq-item-details group">
                                        <summary className="faq-question-summary">
                                            <span>{faq.question}</span>
                                            <span className="faq-icon-summary">▼</span>
                                        </summary>
                                        <div className="faq-answer-details">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {blog.faqs && blog.faqs.length > 0 && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "FAQPage",
                                    "mainEntity": blog.faqs.map(faq => ({
                                        "@type": "Question",
                                        "name": faq.question,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": faq.answer
                                        }
                                    }))
                                })
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export async function generateStaticParams() {
    return Object.keys(siteData).map((branch) => ({
        branch,
    }));
}
