import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Hero from '@/components/model-papers/Hero';
import SchemeSelector from '@/components/model-papers/SchemeSelector';
import WhyEssential from '@/components/model-papers/WhyEssential';
import ScoreStrategy from '@/components/model-papers/ScoreStrategy';
import PyqBanner from '@/components/model-papers/PyqBanner';

export const metadata: Metadata = {
    title: 'VTU Model Question Papers (2025 & 2022 Schemes) | VTUwise',
    description: 'Download official VTU Model Question Papers for 2025 & 2022 schemes. All engineering streams, 1st to 8th semesters, direct official PDF links from VTU Belagavi.',
    keywords: ['VTU model question papers', 'VTU 2025 scheme model papers', 'VTU 2022 scheme model papers', 'VTU question paper blueprint', 'VTU model papers PDF download']
};

export default function ModelPapersPage() {
    return (
        <div className="w-full">
            {/* Top Breadcrumb */}
            <Container className="pt-6 md:pt-8 pb-2">
                <Breadcrumbs items={[{ label: 'Model Question Papers', href: '/model-papers' }]} />
            </Container>

            {/* Hero Section */}
            <Section className="py-4 md:py-6">
                <Container>
                    <Reveal>
                        <Hero />
                    </Reveal>
                </Container>
            </Section>

            {/* Select Scheme Section */}
            <Section className="py-8 md:py-12">
                <Container>
                    <Reveal delay={100}>
                        <SchemeSelector />
                    </Reveal>
                </Container>
            </Section>

            {/* Why Model Papers Are Essential Section */}
            <Section className="py-8 md:py-12">
                <Container>
                    <Reveal delay={150}>
                        <WhyEssential />
                    </Reveal>
                </Container>
            </Section>

            {/* How to Score High Section */}
            <Section className="py-8 md:py-12">
                <Container>
                    <Reveal delay={200}>
                        <ScoreStrategy />
                    </Reveal>
                </Container>
            </Section>

            {/* PYQ Banner Section */}
            <Section className="pt-8 pb-20 md:pt-12 md:pb-24">
                <Container>
                    <Reveal delay={250}>
                        <PyqBanner />
                    </Reveal>
                </Container>
            </Section>
        </div>
    );
}
