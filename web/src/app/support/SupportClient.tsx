'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';

const SupportClient: React.FC = () => {
    return (
        <div className="w-full min-h-[85vh] bg-slate-50/60 dark:bg-[#0b0f19] flex flex-col justify-center items-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 transition-colors duration-200">
            {/* Centered Main Container */}
            <div className="w-full max-w-[540px] sm:max-w-[560px] flex flex-col items-center">

                {/* Top Badge */}
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs mb-4">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Student-Powered Community ❤️</span>
                </span>

                {/* Top Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight text-center mb-4">
                    Help Us Keep VTUwise Running
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
                    Keep the platform 100% free for every VTU engineering student. Your contributions directly fund fast cloud servers, database hosting, and high-speed bandwidth.
                </p>

                {/* Main Card */}
                <div className="w-full bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 sm:p-10 md:p-12 shadow-sm transition-all duration-200 text-center">

                    {/* Icon & Heading */}
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center text-3xl shadow-xs">
                        ☕
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                        Support VTUwise
                    </h2>

                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
                        Contribute any amount of your choice via UPI, Google Pay, PhonePe, Paytm, Cards, or NetBanking.
                    </p>

                    {/* Primary Large CTA Button */}
                    <a
                        href="https://payments.cashfree.com/forms/vtuwise"
                        target="_parent"
                        className="w-full h-14 sm:h-15 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-[0.99] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer no-underline select-none mb-7"
                    >
                        <span>Click Here to Pay</span>
                        <span className="text-xl">➔</span>
                    </a>

                    {/* Official Cashfree Badge Widget */}
                    <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-3">
                            Or open directly via Cashfree:
                        </span>

                        <form className="m-0">
                            <a
                                href="https://payments.cashfree.com/forms/vtuwise"
                                target="_parent"
                                className="no-underline block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                                title="Click here to pay on Cashfree"
                            >
                                <div
                                    className="button-container"
                                    style={{
                                        background: '#000000',
                                        border: '1px solid #1e293b',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '9px 18px',
                                        width: 'fit-content',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src="https://cashfree-checkoutcartimages-prod.cashfree.com/favicon2hbc7621o2efg_prod.png"
                                            alt="Cashfree logo"
                                            className="logo-container"
                                            style={{ width: '36px', height: '36px', display: 'block' }}
                                        />
                                    </div>
                                    <div
                                        className="text-container"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            marginLeft: '12px',
                                            justifyContent: 'center',
                                            marginRight: '8px'
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: 'Tahoma, system-ui, sans-serif',
                                                color: '#ffffff',
                                                marginBottom: '3px',
                                                fontSize: '13.5px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            Support vtuwise
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: 'Tahoma, system-ui, sans-serif',
                                                color: '#94a3b8',
                                                fontSize: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <span>Powered By Cashfree</span>
                                            <img
                                                src="https://cashfreelogo.cashfree.com/assets_images/cfbrand/cf_logo.svg"
                                                alt="Cashfree brand logo"
                                                className="seconday-logo-container"
                                                style={{ width: '14px', height: '14px', verticalAlign: 'middle' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </form>
                    </div>

                    {/* Supported Payment Mode Badges */}
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">PhonePe</span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">Google Pay</span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">Paytm</span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">UPI</span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">Cards</span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">NetBanking</span>
                        </div>

                        {/* Trust Footnote */}
                        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4 flex items-center justify-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 11.37a8 8 0 1111.458 1.135 3 3 0 00-4.605 1.05 1.5 1.5 0 01-2.083.08 3 3 0 00-4.77-2.265zm13.72-2.738a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                            </svg>
                            <span>100% Encrypted &amp; Secured by Cashfree Payments</span>
                        </p>
                    </div>

                </div>

                {/* Back to Home Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <span>← Back to VTUwise</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SupportClient;
