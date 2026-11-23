import React from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const PyqBanner: React.FC = () => {
  return (
    <div
      className="mp-pyq-banner relative rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white px-6 py-8 sm:px-8 sm:py-10 md:px-12 shadow-2xl border border-indigo-500/20 overflow-hidden"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left side */}
        <div className="max-w-2xl">
          <Badge variant="indigo" className="mb-4 bg-white/10 text-indigo-200 border-white/20">
            Complete Exam Archive
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-2 text-white">
            Looking for Previous Year Question Papers (PYQs)?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Download complete semester-wise ZIP bundles for previous university exam sessions across all engineering branches.
          </p>
        </div>

        {/* Right side: buttons row (stack on mobile, full width) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <Button
            href="/previous-year-question-papers"
            variant="white"
            className="w-full sm:w-auto"
          >
            <span>Browse PYQ Bundles</span>
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

          <Button
            href="/sgpa-calculator"
            variant="ghost"
            className="w-full sm:w-auto"
          >
            SGPA Calculator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PyqBanner;
