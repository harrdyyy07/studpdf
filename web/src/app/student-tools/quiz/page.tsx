import React from 'react';
import { Metadata } from 'next';
import QuizClient from './QuizClient';

export const metadata: Metadata = {
    title: 'Quiz Arena | VTUwise',
    description: 'Test your engineering knowledge in our Quiz Arena. Try multiple topics, track your speed with live timers, and analyze explanations.'
};

export default function QuizPage() {
    return <QuizClient />;
}
