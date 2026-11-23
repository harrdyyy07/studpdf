import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import StepItem from './StepItem';

export const ScoreStrategy: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      title: 'Analyze High-Yield Topics',
      description: 'Compare the model question paper with your VTU syllabus copy. Identify which theorems, algorithms, and numerical types appear repeatedly in Modules 1 through 5.',
    },
    {
      stepNumber: 2,
      title: 'Attempt Without Solutions',
      description: 'Solve the complete 100-mark paper under strict exam conditions. Practice writing structured derivations, block diagrams, and step-by-step calculus proofs.',
    },
    {
      stepNumber: 3,
      title: 'Combine with Past 3 Years PYQs',
      description: 'Combine model papers with past year examination papers. 70% to 80% of actual exam questions share identical problem structures with university model sets.',
    },
  ];

  return (
    <div
      className="mp-strategy-card rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 md:p-12 shadow-soft"
      style={{ boxSizing: 'border-box' }}
    >
      <SectionHeader
        eyebrow="Study Strategy"
        title="How to Score High Using Model Papers"
        subtitle="Follow this 3-stage strategic framework to maximize your Semester End Examination (SEE) scores."
        align="left"
        className="mb-10"
      />

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepItem
            key={index}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreStrategy;
