import React from 'react';
import { Metadata } from 'next';
import CodePracticeClient from './CodePracticeClient';

export const metadata: Metadata = {
    title: 'Code Practice | VTUwise',
    description: 'Solve engineering coding challenges directly in your browser. Write code, execute test suites, and prepare for interviews.'
};

export default function CodePracticePage() {
    return <CodePracticeClient />;
}
