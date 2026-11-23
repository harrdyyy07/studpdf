import React from 'react';
import { Metadata } from 'next';
import ModelPapers2022Client from './ModelPapers2022Client';

export const metadata: Metadata = {
    title: '2022 Scheme Model Question Papers | VTUwise',
    description: 'Download official VTU 2022 Scheme Model Question Papers for all branches (CSE, ECE, MECH, CIVIL, AIML, etc.) from 1st to 8th semesters. Direct PDF links with multiple sets.',
    keywords: ['VTU 2022 scheme model question papers', 'VTU model papers PDF download', 'VTU 3rd sem model paper', 'VTU 4th sem model paper', 'VTU 5th sem model paper', 'VTU 6th sem model paper']
};

export default function ModelPapers2022Page() {
    return <ModelPapers2022Client />;
}
