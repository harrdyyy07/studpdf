import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="flex mb-8 items-center text-sm font-medium text-text-muted overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"></path></svg>
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="mx-3 opacity-30 text-lg">/</span>
                    {index === items.length - 1 ? (
                        <span className="text-text font-bold">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
