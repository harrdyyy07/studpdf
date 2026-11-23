import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconBg = 'bg-primary/10 text-primary dark:text-indigo-400',
  title,
  description,
}) => {
  return (
    <div
      className="mp-feature-card p-6 h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-soft hover:shadow-hover transition duration-200 flex flex-col"
      style={{ boxSizing: 'border-box' }}
    >
      {/* 48px rounded-xl tile for icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}>
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
        {title}
      </h3>

      <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
