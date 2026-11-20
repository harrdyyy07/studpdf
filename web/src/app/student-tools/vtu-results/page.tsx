import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'VTU Results Portal | VTUwise',
    description: 'Check your Visvesvaraya Technological University (VTU) semester results directly via the official VTU portal.'
};

export default function VtuResultsPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    🎓
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    VTU Examination Results
                </h1>
                <p className="text-slate-300 mb-8 leading-relaxed">
                    To ensure maximum server reliability, official result data is hosted directly on Visvesvaraya Technological University's official server.
                </p>
                <div className="space-y-4">
                    <a
                        href="https://results.vtu.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition duration-200 shadow-lg shadow-blue-500/25"
                    >
                        Open Official VTU Results Portal ↗
                    </a>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-slate-400 hover:text-white transition duration-200"
                    >
                        ← Back to VTUwise Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
