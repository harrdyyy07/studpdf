import React from 'react';
import { Metadata } from 'next';
import StudentToolsDashboard from './StudentToolsDashboard';

export const metadata: Metadata = {
    title: 'Student Tools Hub | VTUwise',
    description: 'Explore sleek, high-productivity engineering student tools including CGPA/SGPA calculators, ATS-optimized Resume Builder, Code Practice playground, and Quiz Arena.'
};

export default function StudentToolsPage() {
    return <StudentToolsDashboard />;
}
