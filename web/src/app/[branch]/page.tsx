import React from 'react';
import { siteData } from '@/data/notesData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BranchCard from '@/components/BranchCard';
import Breadcrumbs from '@/components/Breadcrumbs';

const semColors: { [key: number]: string } = {
    1: 'var(--s1-bg)', 2: 'var(--s2-bg)', 3: 'var(--s3-bg)', 4: 'var(--s4-bg)',
    5: 'var(--s5-bg)', 6: 'var(--s6-bg)', 7: 'var(--s7-bg)', 8: 'var(--s8-bg)'
};

export async function generateMetadata({ params }: { params: Promise<{ branch: string }> }): Promise<Metadata> {
    const { branch } = await params;
    const data = siteData[branch];
    
    if (!data) return { title: 'Not Found | VTUwise' };
    
    return {
        title: `${data.title} | VTUwise`,
        description: `Access comprehensive engineering notes, previous year question papers, and study resources for ${data.title}.`
    };
}

export default async function BranchPage({ params }: { params: Promise<{ branch: string }> }) {
    const { branch } = await params;
    const data = siteData[branch];

    if (!data) {
        notFound();
    }

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
        </div>
    );
}

export async function generateStaticParams() {
    return Object.keys(siteData).map((branch) => ({
        branch,
    }));
}
