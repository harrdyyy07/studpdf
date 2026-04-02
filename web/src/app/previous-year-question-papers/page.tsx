import React from 'react';
import { Metadata } from 'next';
import PYQPClient from './PYQPClient';

export const metadata: Metadata = {
    title: 'Previous Year Question Papers | VTUwise',
    description: 'Download official VTU previous year question paper bundles for all branches and schemes from VTUwise.'
};

export default function PYQPPage() {
    return <PYQPClient />;
}
