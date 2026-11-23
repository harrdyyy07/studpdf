import React from 'react';

export interface StepItemProps {
  stepNumber: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export const StepItem: React.FC<StepItemProps> = ({
  stepNumber,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div className="relative flex flex-col items-start">
      {/* Step Circle & Desktop Connecting Line */}
      <div className="relative flex items-center w-full mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/25 z-10 select-none">
          {stepNumber}
        </div>

        {/* Thin connecting line to the next circle on desktop */}
        {!isLast && (
          <div
            className="hidden md:block absolute left-10 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-slate-700 z-0"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default StepItem;
