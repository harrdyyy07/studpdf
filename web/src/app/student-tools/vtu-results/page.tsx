import React from 'react';
import { Metadata } from 'next';
import VtuResultsClient from './VtuResultsClient';

export const metadata: Metadata = {
    title: 'VTU Results Portal | VTUwise',
    description: 'Check your Visvesvaraya Technological University (VTU) semester results instantly. Fetch live results, view detailed marksheets, and analyze your GPA trends.'
};

export default function VtuResultsPage() {
    return <VtuResultsClient />;
}
