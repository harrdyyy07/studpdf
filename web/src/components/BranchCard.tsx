import React from 'react';
import Link from 'next/link';

interface BranchCardProps {
    title: string;
    slug: string;
    badge: string;
    bg: string;
    thumbText: string;
    isExternal?: boolean;
}

const BranchCard: React.FC<BranchCardProps> = ({ title, slug, badge, bg, thumbText, isExternal }) => {
    const content = (
        <>
            <div className="branch-thumb">
                <div className="branch-badge">{badge}</div>
                <div className="thumb-pattern"></div>
                <div 
                    className="thumb-overlay"
                    style={{ background: bg }}
                ></div>
                <div className="thumb-text">{thumbText}</div>
            </div>
            <div className="branch-info">
                <h3>{title}</h3>
            </div>
        </>
    );

    if (isExternal) {
        return <a href={slug} className="branch-card" target="_blank" rel="noopener noreferrer">{content}</a>;
    }

    return (
        <Link href={slug} className="branch-card">
            {content}
        </Link>
    );
};

export default BranchCard;
