import React from 'react';
import { Metadata } from 'next';
import AptitudeClient from './AptitudeClient';

export const metadata: Metadata = {
    title: 'Placement Aptitude Test Tool for Engineering Students | VTUwise',
    description: 'Practice real company placement aptitude test questions for TCS, Infosys, Accenture, Wipro, Cognizant, and Amazon. Complete mock tests and automatically sync your score to Google Sheets.'
};

export default function AptitudePage() {
    return <AptitudeClient />;
}
