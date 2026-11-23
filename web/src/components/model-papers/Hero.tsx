import React from 'react';
import Badge from '@/components/ui/Badge';

interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

const stats: StatItem[] = [
  { value: '2 Schemes', label: '2025 & 2022 CBCS' },
  { value: '220+ Courses', label: 'All Engg Branches' },
  { value: '900+ Sets', label: 'Multiple Paper Sets' },
  { value: '100% Free', label: 'Direct VTU PDFs', highlight: true },
];

export const Hero: React.FC = () => {
  return (
    <div
      className="mp-hero relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 md:p-12 lg:p-14 overflow-hidden shadow-2xl border border-indigo-500/20"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="mp-hero-grid relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <Badge variant="green" dot className="mb-5 bg-white/10 text-emerald-300 border-white/20">
            Official VTU Belagavi BOS Blueprints
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
            VTU Model Question Papers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Official question blueprints formulated by Visvesvaraya Technological University (VTU) Board of Studies. Understand exact module-wise internal choices, marks distribution, and question patterns for your Semester End Exams (SEE).
          </p>
        </div>

        {/* Right column (5 cols on desktop, 2x2 grid) */}
        <div className="mp-stats-grid lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="mp-stat-card p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
            >
              <div
                className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-1 ${
                  stat.highlight ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
