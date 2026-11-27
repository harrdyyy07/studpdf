import React from 'react';
import Badge, { BadgeVariant } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export interface SchemeCheckItem {
  lead: string;
  label: string;
}

export interface SchemeCardProps {
  schemeYear: string;
  badgeLabel: string;
  badgeVariant?: BadgeVariant;
  badgeDot?: boolean;
  audienceTitle: string;
  audienceSubtitle: string;
  quickTags: string[];
  icon: React.ReactNode;
  title: string;
  description: string;
  checklist: SchemeCheckItem[];
  ctaLabel: string;
  ctaHref: string;
  accentColor?: 'emerald' | 'indigo';
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  schemeYear,
  badgeLabel,
  badgeVariant = 'indigo',
  badgeDot = false,
  audienceTitle,
  audienceSubtitle,
  quickTags,
  icon,
  title,
  description,
  checklist,
  ctaLabel,
  ctaHref,
  accentColor = 'indigo',
}) => {
  const isEmerald = accentColor === 'emerald';

  return (
    <div
      className={`mp-scheme-card group relative flex flex-col p-6 sm:p-8 rounded-2xl border-2 bg-white dark:bg-slate-900/85 shadow-soft hover:-translate-y-1 hover:shadow-hover transition-all duration-200 overflow-hidden ${
        isEmerald
          ? 'border-emerald-500/30 hover:border-emerald-500'
          : 'border-indigo-500/30 hover:border-indigo-500'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Top colored accent bar for instant visual distinction */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isEmerald
            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
            : 'bg-gradient-to-r from-indigo-600 to-violet-500'
        }`}
      />

      {/* Decorative background blob */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-35 transition-opacity group-hover:opacity-65 ${
            isEmerald ? 'bg-emerald-400/30' : 'bg-indigo-400/30'
          }`}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full pt-1">
        {/* Top row: Big Scheme Year + Status badge + Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-extrabold tracking-tight ${
                isEmerald
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                  : 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
              }`}
            >
              {schemeYear} Scheme
            </span>
            <Badge variant={badgeVariant} dot={badgeDot}>
              {badgeLabel}
            </Badge>
          </div>

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
              isEmerald
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
            }`}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          {title}
        </h3>

        {/* Clear "Who is this for?" callout box */}
        <div
          className={`rounded-xl px-4 py-3 mb-4 border ${
            isEmerald
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60'
              : 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-200/80 dark:border-indigo-800/60'
          }`}
        >
          <div
            className={`text-xs font-extrabold uppercase tracking-wider mb-0.5 ${
              isEmerald
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-indigo-700 dark:text-indigo-300'
            }`}
          >
            Best for: {audienceTitle}
          </div>
          <div className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            {audienceSubtitle}
          </div>
        </div>

        {/* Quick scannable tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Concise Description */}
        <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
          {description}
        </p>

        {/* Checklist */}
        <ul className="space-y-2.5 mb-7 text-sm text-slate-600 dark:text-slate-300">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <svg
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  isEmerald ? 'text-emerald-500' : 'text-primary dark:text-indigo-400'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="leading-snug">
                <strong className="font-semibold text-slate-900 dark:text-white">{item.lead}:</strong>{' '}
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Pinned to Bottom */}
        <div className="mt-auto pt-2">
          <Button
            href={ctaHref}
            fullWidth
            variant={isEmerald ? 'emerald' : 'primary'}
          >
            <span>{ctaLabel}</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
