import React from 'react';
import { Metadata } from 'next';
import SupportClient from './SupportClient';

export const metadata: Metadata = {
    title: 'Support Us | VTUwise',
    description: 'Support VTUwise by donating. Help us maintain servers, keep the platform free, and continue providing premium engineering resources for VTU students.',
    keywords: ['support VTUwise', 'donate VTUwise', 'VTU notes donation', 'support student initiative', 'pay vtuwise cashfree'],
    openGraph: {
        title: 'Support Us | VTUwise',
        description: 'Support VTUwise by donating. Help us maintain servers, keep the platform free, and continue providing premium engineering resources for VTU students.',
        url: 'https://vtuwise.in/support',
        type: 'website',
    }
};

export default function SupportPage() {
    return <SupportClient />;
}
