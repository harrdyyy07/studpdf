import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import RazorpayButton from '@/components/RazorpayButton';

export const metadata: Metadata = {
    title: 'Support Us | VTUwise',
    description: 'Support VTUwise by donating. Help us maintain servers, keep the platform ad-free, and continue providing free premium engineering resources for VTU students.',
    openGraph: {
        title: 'Support Us | VTUwise',
        description: 'Support VTUwise by donating. Help us maintain servers, keep the platform ad-free, and continue providing free premium engineering resources for VTU students.',
        url: 'https://vtuwise.in/support',
        type: 'website',
    }
};

export default function SupportPage() {
    return (
        <div className="support-page-wrapper">
            <div className="container max-w-5xl py-12 md:py-16">
                
                {/* breadcrumb */}
                <nav className="support-breadcrumb mb-8 text-sm text-text-muted flex gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-text font-medium">Support Us</span>
                </nav>

                <div className="support-header text-center mb-12">
                    <span className="support-badge font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full text-primary mb-4 inline-block">
                        Keep Us Running ❤️
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-text leading-tight">
                        Support <span className="text-primary">VTUwise</span>
                    </h1>
                    <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                        VTUwise is a free, student-focused initiative. Help us cover server costs, database hosting, and keep providing high-quality study materials for engineering students.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
                    {/* Why Support Card */}
                    <div className="support-card glass p-8 md:p-10 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-text mb-6 tracking-tight pb-3 border-b border-surface-border">Why Support Us?</h2>
                            <ul className="space-y-5">
                                <li className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-text mb-0.5">100% Free Resources</h4>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            Keeping engineering notes, solved question papers, and lab manuals free for everyone.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-text mb-0.5">Server & Maintenance</h4>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            Helping us fund hosting, backend databases, domains, and global CDN delivery.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-text mb-0.5">Ad-Free Initiative</h4>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            Minimizing dependency on intrusive advertisements for a faster, distraction-free study session.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-text mb-0.5">Fuel for Development</h4>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            Buying a coffee for the student developers who spend nights building and updating the platform.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-6 border-t border-surface-border mt-8">
                            <p className="text-xs text-text-muted italic leading-relaxed text-center">
                                "Any contribution, big or small, helps keep the platform online and thriving."
                            </p>
                        </div>
                    </div>

                    {/* Payment Card */}
                    <div className="support-card glass p-8 md:p-10 flex flex-col justify-between items-center text-center">
                        <div className="w-full">
                            <h2 className="text-2xl font-bold text-text mb-6 tracking-tight pb-3 border-b border-surface-border">Contribution</h2>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                Click the button below to contribute securely. We support UPI (PhonePe, GPay, Paytm), Cards, NetBanking, and Wallets.
                            </p>
                            <div className="my-8 flex justify-center items-center w-full min-h-[80px] p-4 rounded-xl bg-background border border-surface-border shadow-sm">
                                <RazorpayButton buttonId="pl_Rm25t9s2iYqB1t" />
                            </div>
                        </div>
                        <div className="w-full pt-6 border-t border-surface-border mt-8 text-xs text-text-muted flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 11.37a8 8 0 1111.458 1.135 3 3 0 00-4.605 1.05 1.5 1.5 0 01-2.083.08 3 3 0 00-4.77-2.265zm13.72-2.738a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"/>
                            </svg>
                            <span>Secure transaction powered by <strong>Razorpay</strong></span>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                .support-page-wrapper {
                    background: var(--background);
                    min-height: 80vh;
                    padding-bottom: 4rem;
                }
                .support-card {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
                }
                .support-card:hover {
                    transform: translateY(-6px);
                    box-shadow: var(--hover-shadow);
                }
                .support-badge {
                    background: rgba(79, 70, 229, 0.08);
                    border: 1px solid rgba(79, 70, 229, 0.15);
                }
            `}</style>
        </div>
    );
}
