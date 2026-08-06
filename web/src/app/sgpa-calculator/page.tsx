import React from 'react';
import { Metadata } from 'next';
import SGPACalculatorClient from './SGPACalculatorClient';

export const metadata: Metadata = {
    title: 'VTU SGPA Calculator 2022 & 2025 Scheme | VTUwise',
    description: 'Calculate your VTU SGPA for 2022 scheme and 2025 scheme accurately. Free VTU SGPA calculator for all engineering branches and semesters with grade point analysis.',
    keywords: [
        'VTU SGPA calculator',
        'VTU SGPA calculator 2022 scheme',
        'VTU SGPA calculator 2025 scheme',
        'vtu sgpa cal',
        'vtu sgpa cal for 2022 scheme',
        'vtu sgpa cal for 2025 scheme',
        'vtu sgpa calculator 2022',
        'vtu sgpa calculator 2025',
        'vtu sgpa cal 2022 scheme',
        'vtu sgpa cal 2025 scheme',
        'vtu sgpa calculator 2022 scheme percentage',
        'VTU SGPA calculation',
        'VTU grade calculator',
        'VTU credit calculator',
        'VTUwise SGPA calculator'
    ],
    openGraph: {
        title: 'VTU SGPA Calculator 2022 & 2025 Scheme | VTUwise',
        description: 'Calculate your VTU SGPA for 2022 scheme and 2025 scheme accurately. Free VTU SGPA calculator for all engineering branches and semesters.',
        url: 'https://vtuwise.in/sgpa-calculator',
        siteName: 'VTUwise',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VTU SGPA Calculator 2022 & 2025 Scheme | VTUwise',
        description: 'Calculate your VTU SGPA for 2022 scheme and 2025 scheme accurately.',
    }
};

export default function SGPACalculatorPage() {
    return <SGPACalculatorClient />;
}
