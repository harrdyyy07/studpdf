import React from 'react';
import { Metadata } from 'next';
import TypingTestClient from './TypingTestClient';

export const metadata: Metadata = {
    title: 'Typing Speed Test | VTUwise',
    description: 'Test your typing speed and accuracy online. Type engineering quotes, code comments, and technical texts. Track your real-time WPM scores!'
};

export default function TypingTestPage() {
    return <TypingTestClient />;
}
