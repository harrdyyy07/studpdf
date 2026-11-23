import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureCard from './FeatureCard';

export const WhyEssential: React.FC = () => {
  const features = [
    {
      icon: <span>🧩</span>,
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      title: 'Module-Wise Internal Choices',
      description: 'SEE exam papers follow a strict 5-module structure with internal "OR" choices. Model papers show which concepts pair together in each module.',
    },
    {
      icon: <span>🎯</span>,
      iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      title: "Bloom's Taxonomy Levels",
      description: 'Each question is tagged with cognitive levels: L1 (Remember), L2 (Understand), and L3/L4 (Apply/Analyze), clarifying theory vs. numerical weightage.',
    },
    {
      icon: <span>⏱️</span>,
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      title: '3-Hour Exam Simulation',
      description: 'Solving official model papers within a timed 3-hour window helps pace derivation steps and prevents running out of time during final exams.',
    },
    {
      icon: <span>📐</span>,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      title: 'Sub-Question Marks Split',
      description: 'Model papers clearly specify subdivision mark splits (e.g. 6M + 7M + 7M = 20M), revealing the exact depth required to secure full university marks.',
    },
  ];

  return (
    <div>
      <SectionHeader
        eyebrow="Exam Blueprint Architecture"
        title="Why Model Papers Are Essential for SEE"
        subtitle="Formulated by the VTU Board of Studies to establish the official pattern for semester end university examinations."
        align="center"
        className="mb-10"
      />

      <div className="mp-features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {features.map((feat, index) => (
          <FeatureCard
            key={index}
            icon={feat.icon}
            iconBg={feat.iconBg}
            title={feat.title}
            description={feat.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyEssential;
