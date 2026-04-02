import React from 'react';
import { Metadata } from 'next';
import CGPACalculatorClient from './CGPACalculatorClient';

export const metadata: Metadata = {
    title: 'CGPA Calculator | VTUwise',
    description: 'Calculate your cumulative grade point average (CGPA) accurately with VTUwise.'
};

export default function CGPACalculatorPage() {
    return <CGPACalculatorClient />;
}
