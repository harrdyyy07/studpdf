import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import SchemeCard from './SchemeCard';

export const SchemeSelector: React.FC = () => {
  return (
    <div>
      <SectionHeader
        eyebrow="Scheme Regulations"
        title="Select Scheme Regulations"
        subtitle="Choose your enrolled syllabus scheme to access subject-wise model question papers and official examination blueprints."
        align="left"
        className="mb-10"
      />

      <div className="mp-schemes-grid grid md:grid-cols-2 gap-6 items-stretch">
        {/* 2025 Scheme Card */}
        <SchemeCard
          badgeLabel="Newly Revised 2025"
          badgeVariant="green"
          badgeDot
          icon={<span>📘</span>}
          title="2025 Scheme Model Papers"
          description="Formulated for 1st and 2nd Semester students enrolled under the newly revised 2025 CBCS guidelines. Covers Physics and Chemistry cycles with updated question distribution."
          checklist={[
            { label: '15 Core Subjects: Mathematics, Physics, Chemistry, C, Python' },
            { label: 'Cycle-Wise: P-Cycle & C-Cycle specific paper structure' },
            { label: 'Official PDFs: Direct downloads from VTU Belagavi Board of Studies' },
          ]}
          ctaLabel="Access 2025 Model Papers"
          ctaHref="/model-papers/2025-scheme"
          accentColor="emerald"
        />

        {/* 2022 Scheme Card */}
        <SchemeCard
          badgeLabel="Core Curriculum (1st–8th Sem)"
          badgeVariant="indigo"
          badgeDot
          icon={<span>📚</span>}
          title="2022 Scheme Model Papers"
          description="Complete repository of model question papers across all engineering departments (CSE, ISE, ECE, EEE, Mech, Civil, AIML & more) spanning 1st through 8th semesters."
          checklist={[
            { label: '204 Subjects: All branches & departmental electives' },
            { label: '909 Question Paper Sets: Multiple sets per subject (Set 1, 2, 3)' },
            { label: 'Instant Filter: Quick search by Subject Code or Title' },
          ]}
          ctaLabel="Access 2022 Model Papers"
          ctaHref="/model-papers/2022-scheme"
          accentColor="indigo"
        />
      </div>
    </div>
  );
};

export default SchemeSelector;
