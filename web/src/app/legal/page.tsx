import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Legal & Policies | VTUwise',
    description: 'Explore VTUwise terms of service, privacy policy, disclaimer, about us, FAQs, and contact information.',
    openGraph: {
        title: 'Legal & Policies | VTUwise',
        description: 'Explore VTUwise terms of service, privacy policy, disclaimer, about us, FAQs, and contact information.',
        url: 'https://vtuwise.in/legal',
        type: 'website',
    }
};

const legalPages = [
    {
        slug: 'about',
        title: 'About VTUwise',
        icon: '🎓',
        desc: 'Our mission, vision, and how we provide free academic engineering resources for VTU students.',
        badge: 'Organization'
    },
    {
        slug: 'privacy',
        title: 'Privacy Policy',
        icon: '🔒',
        desc: 'How we collect, protect, and handle your data and cookies on VTUwise.',
        badge: 'Privacy'
    },
    {
        slug: 'terms',
        title: 'Terms and Conditions',
        icon: '📜',
        desc: 'Terms of service, user rights, acceptable usage policy, and governing law.',
        badge: 'Terms'
    },
    {
        slug: 'disclaimer',
        title: 'Disclaimer',
        icon: '⚠️',
        desc: 'Important notice regarding student-contributed content and university affiliation.',
        badge: 'Policy'
    },
    {
        slug: 'faqs',
        title: 'Frequently Asked Questions',
        icon: '❓',
        desc: 'Quick answers about study materials, downloads, schemes, and watermarks.',
        badge: 'Support'
    },
    {
        slug: 'contact',
        title: 'Contact Us',
        icon: '📬',
        desc: 'Get in touch for questions, copyright removal requests, and material submissions.',
        badge: 'Contact'
    }
];

export default function LegalIndexPage() {
    return (
        <div className="legal-index-wrapper">
            <div className="container max-w-5xl py-12 md:py-16">
                
                {/* Breadcrumb */}
                <nav className="legal-breadcrumb mb-8 text-sm text-text-muted flex gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-text font-medium">Legal & Policies</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">
                        Compliance & Information
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-text leading-tight">
                        Legal, Policies & <span className="text-primary">Guidelines</span>
                    </h1>
                    <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                        Learn about our commitment to student privacy, educational content licensing, platform terms, and official disclaimers.
                    </p>
                </div>

                {/* Grid of Legal Pages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {legalPages.map((page) => (
                        <Link 
                            key={page.slug} 
                            href={`/legal/${page.slug}`} 
                            className="legal-card glass p-6 rounded-2xl border border-surface-border hover:border-primary transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl p-2.5 rounded-xl bg-background border border-surface-border group-hover:scale-110 transition-transform">
                                        {page.icon}
                                    </span>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-primary bg-primary/10">
                                        {page.badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                                    {page.title}
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed mb-6">
                                    {page.desc}
                                </p>
                            </div>
                            <div className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                <span>Read Document</span>
                                <span>➔</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

            <style>{`
                .legal-index-wrapper {
                    background: var(--background);
                    min-height: 85vh;
                    padding-bottom: 4rem;
                }
                .legal-card {
                    background: var(--surface);
                }
            `}</style>
        </div>
    );
}
