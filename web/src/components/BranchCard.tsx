import React from 'react';
import Link from 'next/link';

interface BranchCardProps {
    title: string;
    slug: string;
    badge: string;
    bg: string;
    thumbText: string;
    secondaryText?: string;
    isExternal?: boolean;
}

const BranchCard: React.FC<BranchCardProps> = ({ title, slug, badge, bg, thumbText, secondaryText, isExternal }) => {
    const cardContent = (
        <>
            <div className="branch-card-visual" style={{ background: bg }}>
                {/* Premium Background Layers */}
                <div className="branch-pattern-grid"></div>
                <div className="branch-card-blobs">
                    <div className="card-blob blob-1"></div>
                    <div className="card-blob blob-2"></div>
                    <div className="card-blob blob-3"></div>
                </div>
                
                <div className="branch-badge-v2">{badge}</div>
                <div className="branch-card-content">
                    <div className="branch-main-text">{thumbText}</div>
                    {secondaryText && <div className="branch-secondary-text">{secondaryText}</div>}
                </div>
            </div>
            <div className="branch-card-title">{title}</div>
        </>
    );

    if (isExternal) {
        return (
            <a href={slug} className="branch-card-wrapper" target="_blank" rel="noopener noreferrer">
                {cardContent}
            </a>
        );
    }

    return (
        <Link href={slug} className="branch-card-wrapper">
            {cardContent}
        </Link>
    );
};

export default BranchCard;
