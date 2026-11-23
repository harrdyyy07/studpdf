import React from 'react';
import { Metadata } from 'next';
import ModelPapers2025Client from './ModelPapers2025Client';

export const metadata: Metadata = {
    title: '2025 Scheme Model Question Papers | VTUwise',
    description: 'Download official VTU 2025 Scheme Model Question Papers for 1st & 2nd Semester B.E./B.Tech. Direct PDF links for Mathematics, Physics, Chemistry, C, and Python.',
    keywords: ['VTU 2025 scheme model question papers', 'VTU 1st year model papers 2025', 'VTU 1BMATC101 model paper', 'VTU 1BPHYS102 model paper', 'VTU 2025 CBCS question papers']
};

export default function ModelPapers2025Page() {
    return <ModelPapers2025Client />;
}
