import React from 'react';
import { Metadata } from 'next';
import ResumeBuilderClient from './ResumeBuilderClient';

export const metadata: Metadata = {
    title: 'ATS Resume Builder | VTUwise',
    description: 'Build a professional, single-page, ATS-friendly technical resume. Fill out forms, check live previews, and export cleanly to PDF.'
};

export default function ResumeBuilderPage() {
    return <ResumeBuilderClient />;
}
