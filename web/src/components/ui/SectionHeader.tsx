import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';
  return (
    <div className={`mb-10 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className="mb-3">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary dark:text-indigo-400 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
