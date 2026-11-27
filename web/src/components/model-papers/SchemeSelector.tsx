import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import SchemeCard from './SchemeCard';

export const SchemeSelector: React.FC = () => {
  return (
    <div>
      <SectionHeader
        eyebrow="Choose Your Scheme"
        title="Select Your Syllabus Scheme"
        subtitle="Pick the scheme matching your year of admission to access subject-wise official VTU model question papers."
        align="left"
        className="mb-10"
      />

      <div className="mp-schemes-grid grid md:grid-cols-2 gap-6 items-stretch">
        {/* 2025 Scheme Card */}
        <SchemeCard
          schemeYear="2025"
          badgeLabel="1st Year • New"
          badgeVariant="green"
          badgeDot
          audienceTitle="1st & 2nd Semester Students"
          audienceSubtitle="Students who joined engineering in 2025–26 (Physics & Chemistry Cycles)."
          quickTags={['15 Core Subjects', 'Sem 1 & 2', 'P-Cycle & C-Cycle']}
          icon={<span>📘</span>}
          title="2025 Scheme Model Papers"
          description="Official model papers under the newly revised 2025 CBCS guidelines for first-year engineering."
          checklist={[
            { lead: 'Subjects', label: 'Mathematics, Physics, Chemistry, C, Python & core courses' },
            { lead: 'Cycle-Wise', label: 'Organized by P-Cycle & C-Cycle paper structure' },
            { lead: 'Official PDFs', label: 'Direct downloads from VTU Belagavi Board of Studies' },
          ]}
          ctaLabel="Open 2025 Scheme Papers"
          ctaHref="/model-papers/2025-scheme"
          accentColor="emerald"
        />

        {/* 2022 Scheme Card */}
        <SchemeCard
          schemeYear="2022"
          badgeLabel="All Branches • 1st–8th Sem"
          badgeVariant="indigo"
          badgeDot
          audienceTitle="2nd, 3rd & 4th Year (Sem 1–8)"
          audienceSubtitle="Students admitted in 2022, 2023, or 2024 across all engineering branches."
          quickTags={['204 Subjects', '909 Paper Sets', 'All Branches']}
          icon={<span>📚</span>}
          title="2022 Scheme Model Papers"
          description="Complete repository for CSE, ISE, ECE, EEE, Mech, Civil, AIML & all departmental electives."
          checklist={[
            { lead: '204 Subjects', label: 'Covers all branches & departmental electives' },
            { lead: '909 Paper Sets', label: 'Multiple sets per subject (Set 1, Set 2, Set 3)' },
            { lead: 'Instant Filter', label: 'Quick search by Subject Code or Subject Title' },
          ]}
          ctaLabel="Open 2022 Scheme Papers"
          ctaHref="/model-papers/2022-scheme"
          accentColor="indigo"
        />
      </div>
    </div>
  );
};

export default SchemeSelector;
