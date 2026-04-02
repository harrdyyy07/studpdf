import React from 'react';
import { Metadata } from 'next';
import SGPACalculatorClient from './SGPACalculatorClient';

export const metadata: Metadata = {
    title: 'SGPA Calculator | VTUwise',
    description: 'Calculate your Semester Grade Point Average (SGPA) for VTU schemes accurately with VTUwise.'
};

export default function SGPACalculatorPage() {
    return <SGPACalculatorClient />;
}
