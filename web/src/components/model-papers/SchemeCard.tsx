import React from 'react';
import Badge, { BadgeVariant } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export interface SchemeCheckItem {
  label: string;
}

export interface SchemeCardProps {
  badgeLabel: string;
  badgeVariant?: BadgeVariant;
  badgeDot?: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  checklist: SchemeCheckItem[];
  ctaLabel: string;
  ctaHref: string;
  accentColor?: 'emerald' | 'indigo';
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  badgeLabel,
  badgeVariant = 'indigo',
  badgeDot = false,
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
      className={`mp-scheme-card relative flex flex-col p-6 sm:p-8 rounded-2xl border bg-white dark:bg-slate-900/80 shadow-soft hover:-translate-y-1 hover:shadow-hover transition duration-200 ${
        isEmerald
          ? 'border-emerald-500/20 hover:border-emerald-500/40'
          : 'border-indigo-500/20 hover:border-indigo-500/40'
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Decorative background blob clipped safely */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-70 ${
            isEmerald ? 'bg-emerald-400/30' : 'bg-indigo-400/30'
          }`}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Top row: Status badge left, Icon right */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant={badgeVariant} dot={badgeDot}>
            {badgeLabel}
          </Badge>
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
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[65ch] mb-6">
          {description}
        </p>

        {/* Checklist */}
        <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-300">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
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
              <span className="leading-normal">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* CTA Pinned to Bottom with mt-auto, full width, h-12 inside card padding */}
        <div className="mt-auto pt-6">
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
