'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Subject } from '@/data/notesData';
import Breadcrumbs from '@/components/Breadcrumbs';

interface SubjectViewProps {
    branch: string;
    branchTitle: string;
    sem: number | string;
    subject: Subject;
    cycle?: string;
}

const typeLabels: Record<string, string> = {
    'Notes': 'Notes',
    'PYQP': 'Question Papers',
    'MQP': 'Model Papers',
    'scheme': 'Scheme of Evaluation'
};

const getPreviewLink = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
        return url.replace('/view', '/preview').split('?')[0];
    }
    return url;
};

const getDownloadLink = (url: string) => {
    const match = url.match(/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url;
};

const SubjectView: React.FC<SubjectViewProps> = ({ branch, branchTitle, sem, subject, cycle }) => {
    const availableTypes = Array.from(new Set(subject.modules.map(mod => mod.type)));
    const [activeFilter, setActiveFilter] = useState('All');
    const [previewContent, setPreviewContent] = useState<{url: string, title: string} | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);    // Sort filters to put 'Notes' and 'PYQP' early if they exist
    const filters = ['All', ...availableTypes.sort((a, b) => {
        if (a === 'Notes') return -1;
        if (b === 'Notes') return 1;
        if (a === 'PYQP') return -1;
        if (b === 'PYQP') return 1;
        return a.localeCompare(b);
    })];

    const filteredModules = activeFilter === 'All' 
        ? subject.modules 
        : subject.modules.filter(mod => mod.type === activeFilter);

    const breadcrumbItems = [
        { label: branch.toUpperCase(), href: `/${branch}` },
        { label: `Sem ${sem}`, href: `/${branch}/${sem}` },
        { label: subject.name, href: '#' }
    ];

    return (
        <div className="container py-8">
            <Breadcrumbs items={breadcrumbItems} />
            
            <div className="mb-12">
                <div className="flex flex-col gap-6">
                    <div>
                        <span className="pill pill-subject">SUBJECT</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-text">{subject.name}</h1>
                    <p className="text-lg text-text-muted max-w-2xl">Access module-wise notes and solved question papers.</p>
                </div>
                
                <div className="mt-6">
                    <div className="pill pill-dept">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
                        {branchTitle}
                    </div>
                </div>
            </div>

            <div className="chip-group">
                {filters.map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`chip ${activeFilter === filter ? 'active' : ''}`}
                    >
                        {typeLabels[filter] || filter}
                    </button>
                ))}
            </div>

            <div className="module-grid">
                {filteredModules.map((mod, idx) => (
                    <div key={`${mod.id}-${idx}`} className="module-card">
                        <div>
                            <div className="module-header">
                                <div className="module-icon-box">📄</div>
                                <span className="module-type-badge">{mod.type === 'PYQP' ? 'QUESTION PAPER' : 'NOTES'}</span>
                            </div>
                            <h3>{mod.name}</h3>
                            <p>{mod.desc}</p>
                        </div>
                        <div className="module-actions">
                            <button 
                                onClick={() => setPreviewContent({ url: getPreviewLink(mod.link), title: mod.name })} 
                                className="btn-preview cursor-pointer"
                            >
                                Preview
                            </button>
                            <a href={getDownloadLink(mod.link)} target="_blank" rel="noopener noreferrer" className="btn-download-solid">Download</a>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredModules.length === 0 && (
                <div className="text-center py-24 opacity-30 italic">No resources found for this category.</div>
            )}

            {mounted && previewContent && createPortal(
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-sm"
                    onClick={() => setPreviewContent(null)}>
                    
                    <div className="relative w-full max-w-6xl h-full max-h-[92vh] bg-[#222222] rounded-[12px] flex flex-col overflow-hidden shadow-2xl"
                         onClick={e => e.stopPropagation()}>
                         
                        <div className="flex items-center justify-between px-6 py-4 bg-[#282828] shrink-0 border-b border-white/5">
                            <h3 className="text-white font-bold text-[16px] m-0 tracking-wide truncate min-w-0 pr-4">{previewContent.title}</h3>
                            <button onClick={() => setPreviewContent(null)}
                                    className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
                                    title="Close">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        
                        <div className="flex-1 w-full relative bg-[#222222]">
                            <iframe 
                                src={previewContent.url} 
                                className="absolute inset-0 w-full h-full border-0"
                                allow="autoplay"
                                title={previewContent.title}
                            ></iframe>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default SubjectView;
