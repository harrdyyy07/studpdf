'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const pyqpData = [
    {
        name: "Artificial Intelligence and Data Science",
        papers: [
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/AI-DS-JAN-2025.zip" }
        ]
    },
    {
        name: "Computer Science and Engineering",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/CS-JULY-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/CSE-IS-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/CS-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-JULY2023.zip" },
            { label: "FEB 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-FEB2023.zip" },
            { label: "AUG 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-AUG2022.zip" },
            { label: "MAR 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CS-MAR2022.zip" }
        ]
    },
    {
        name: "Electronics and Communication Engineering",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/ECE-July-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/ECE-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/ECE-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-JULY2023.zip" },
            { label: "FEB 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-FEB2023.zip" },
            { label: "AUG 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-AUG2022.zip" },
            { label: "MAR 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ECE-MAR2022.zip" }
        ]
    },
    {
        name: "Mechanical Engineering",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/ME-JULY-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/ME-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/MECH-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JULY2023.zip" },
            { label: "JAN 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JAN2023.zip" },
            { label: "JULY 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-JULY2022.zip" },
            { label: "FEB 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/ME-FEB2022.zip" }
        ]
    },
    {
        name: "Civil Engineering",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/Civil-July-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/CIVIL-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/CIVIL-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-JULY2023.zip" },
            { label: "FEB 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-FEB2023.zip" },
            { label: "AUG 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-AUG2022.zip" },
            { label: "MAR 2022", link: "https://epcet.edu.in/wp-content/uploads/2024/06/CV-MAR2022.zip" }
        ]
    },
    {
        name: "First Year",
        papers: [
            { label: "JULY 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/09/FIRST-YEAR-QUESTION-PAPER-July-2025.zip" },
            { label: "JAN 2025", link: "https://epcet.edu.in/wp-content/uploads/2025/06/FIRST-YEAR-JAN-2025.zip" },
            { label: "JULY 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/11/FIRST-YR-JULY-2024.zip" },
            { label: "JAN 2024", link: "https://epcet.edu.in/wp-content/uploads/2024/07/First-Year-JAN2024.zip" },
            { label: "JULY 2023", link: "https://epcet.edu.in/wp-content/uploads/2024/07/First-Year-JULY2023.zip" }
        ]
    }
];

const PYQPClient = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="container py-24 mt-16 max-w-4xl mx-auto px-4">
            <header className="mb-12">
                <div className="breadcrumb flex items-center gap-2 text-sm opacity-60 mb-8">
                    <Link href="/">🏠</Link>
                    <span>/</span>
                    <span>Previous Year Question Papers</span>
                </div>
                
                <div className="badge bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">Resources</div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 dark:text-white mb-2">VTUwise Previous Year Question Papers</h1>
                <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
                <p className="text-slate-500">Download official VTU question paper bundles for all branches and schemes from VTUwise.</p>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-gray-200">Under Graduate</h2>
                
                {pyqpData.map((item, index) => (
                    <div key={index} className="border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden glass transition-all">
                        <button 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <span className="font-bold text-lg text-slate-700 dark:text-gray-300">{item.name}</span>
                            <svg 
                                className={`w-6 h-6 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        
                        <div 
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                            style={{ maxHeight: activeIndex === index ? '1000px' : '0' }}
                        >
                            <div className="p-6 pt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {item.papers.map((paper, i) => (
                                    <a 
                                        key={i} 
                                        href={paper.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary transition-all hover:translate-y-[-2px] group"
                                    >
                                        <div className="text-2xl group-hover:scale-110 transition-transform">📄</div>
                                        <span className="text-xs font-bold text-slate-600 dark:text-gray-400">{paper.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default PYQPClient;
