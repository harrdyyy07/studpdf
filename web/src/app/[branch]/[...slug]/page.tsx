import { siteData, Subject, Semester, Cycle } from '@/data/notesData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BranchCard from '@/components/BranchCard';
import SubjectView from '@/components/SubjectView';
import Breadcrumbs from '@/components/Breadcrumbs';

const subjectColors = [
    'var(--s1-bg)', 'var(--s2-bg)', 'var(--s3-bg)', 'var(--s4-bg)',
    'var(--s5-bg)', 'var(--s6-bg)', 'var(--s7-bg)', 'var(--s8-bg)'
];

export async function generateMetadata({ params }: { params: Promise<{ branch: string, slug: string[] }> }): Promise<Metadata> {
    const { branch, slug } = await params;
    const branchData = siteData[branch];
    if (!branchData) return { title: 'Not Found | VTUwise' };

    // Case 1: Branch/Semester or Branch/Scheme
    if (slug.length === 1) {
        const isNumeric = /^\d+$/.test(slug[0]);
        if (isNumeric) {
            const semNum = parseInt(slug[0]);
            const title = `Semester ${semNum} - ${branch.toUpperCase()} | VTUwise`;
            const description = `Download free VTU notes, question papers, and syllabus for ${branch.toUpperCase()} Semester ${semNum}. Focus entirely on exams with curated premium materials.`;
            return { 
                title, description,
                openGraph: { title, description }
            };
        }
        const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
        if (scheme) {
            const title = `${scheme.name} - ${branch.toUpperCase()} | VTUwise`;
            const description = `Explore VTU resources, notes, and previous year question papers for ${branch.toUpperCase()} - ${scheme.name}.`;
            return { title, description, openGraph: { title, description } };
        }
    }

    // Case 2: Branch/Semester/Subject or Branch/Scheme/Cycle
    if (slug.length === 2) {
        const isNumeric = /^\d+$/.test(slug[0]);
        if (isNumeric) {
            const semNum = parseInt(slug[0]);
            const semester = branchData.semesters?.find((s) => s.sem === semNum);
            const subject = semester?.subjects.find((s) => s.slug === slug[1]);
            if (subject) {
                const title = `${subject.name} - ${subject.code} | VTUwise`;
                const description = `Download ${subject.name} (${subject.code}) VTU notes, past question papers, models and syllabus for ${branch.toUpperCase()} Sem ${semNum}.`;
                return { title, description, openGraph: { title, description } };
            }
        } else {
            const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
            const cycle = scheme?.cycles.find((c) => c.slug === slug[1]);
            if (cycle) {
                const title = `${cycle.name} - ${scheme?.name} | VTUwise`;
                const description = `VTU Notes and resources for First Year ${cycle.name} under ${scheme?.name} scheme.`;
                return { title, description, openGraph: { title, description } };
            }
        }
    }

    // Case 3: First Year Subject Detail
    if (slug.length === 3) {
        const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
        const cycle = scheme?.cycles.find((c) => c.slug === slug[1]);
        const subject = cycle?.subjects.find((s) => s.slug === slug[2]);
        if (subject) {
            const title = `${subject.name} - ${subject.code} | VTUwise`;
            const description = `Download ${subject.name} (${subject.code}) VTU notes and question papers for First Year ${cycle?.name} (${scheme?.name}).`;
            return { title, description, openGraph: { title, description } };
        }
    }

    return { title: `VTUwise | Engineering Resources` };
}

export default async function DynamicPage({ params }: { params: Promise<{ branch: string, slug: string[] }> }) {
    const { branch, slug } = await params;
    const branchData = siteData[branch];

    if (!branchData) notFound();

    // Case 1: Branch/Semester or Branch/Scheme
    if (slug.length === 1) {
        const isNumeric = /^\d+$/.test(slug[0]);
        if (isNumeric) {
            const semNum = parseInt(slug[0]);
            const semester = branchData.semesters?.find((s) => s.sem === semNum);
            if (!semester) notFound();
            return <SemesterView branch={branch} branchTitle={branchData.title} semester={semester} />;
        }
    }

    // Case 2: Branch/Semester/Subject or Branch/Scheme/Cycle
    if (slug.length === 2) {
        const isNumeric = /^\d+$/.test(slug[0]);
        if (isNumeric) {
            const semNum = parseInt(slug[0]);
            const semester = branchData.semesters?.find((s) => s.sem === semNum);
            const subject = semester?.subjects.find((s) => s.slug === slug[1]);
            if (!subject) notFound();
            return <SubjectView branch={branch} branchTitle={branchData.title} sem={semNum} subject={subject} />;
        } else {
            const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
            const cycle = scheme?.cycles.find((c) => c.slug === slug[1]);
            if (!cycle) notFound();
            return <CycleView branch={branch} branchTitle={branchData.title} scheme={slug[0]} cycle={cycle} />;
        }
    }

    // Case 3: First Year Subject Detail
    if (slug.length === 3) {
        const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
        const cycle = scheme?.cycles.find((c) => c.slug === slug[1]);
        const subject = cycle?.subjects.find((s) => s.slug === slug[2]);
        if (!subject) notFound();
        return <SubjectView branch={branch} branchTitle={branchData.title} sem={slug[0]} subject={subject} cycle={slug[1]} />;
    }

    notFound();
}

function SemesterView({ branch, branchTitle, semester }: { branch: string, branchTitle: string, semester: Semester }) {
    const breadcrumbs = [
        { label: branch.toUpperCase(), href: `/${branch}` },
        { label: `Sem ${semester.sem}`, href: '#' }
    ];

    return (
        <div className="container py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="section-title text-left border-l-8 border-primary pl-6 mb-12">Semester {semester.sem} <span className="opacity-30">/ {branch.toUpperCase()}</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {semester.subjects.map((subject, idx) => (
                    <BranchCard 
                        key={subject.code}
                        title={subject.name}
                        slug={`/${branch}/${semester.sem}/${subject.slug}`}
                        badge={subject.code}
                        bg={subjectColors[idx % subjectColors.length]}
                        thumbText={subject.code}
                    />
                ))}
            </div>
        </div>
    );
}

function CycleView({ branch, branchTitle, scheme, cycle }: { branch: string, branchTitle: string, scheme: string, cycle: Cycle }) {
    const breadcrumbs = [
        { label: branch.toUpperCase(), href: `/${branch}` },
        { label: cycle.name, href: '#' }
    ];

    return (
        <div className="container py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="section-title text-left border-l-8 border-primary pl-6 mb-12">{cycle.name} <span className="opacity-30">/ {scheme.toUpperCase()}</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cycle.subjects.map((subject, idx) => (
                    <BranchCard 
                        key={subject.code}
                        title={subject.name}
                        slug={`/${branch}/${scheme}/${cycle.slug}/${subject.slug}`}
                        badge={subject.code}
                        bg={subjectColors[idx % subjectColors.length]}
                        thumbText={subject.code}
                    />
                ))}
            </div>
        </div>
    );
}


export async function generateStaticParams() {
    // This is complex for catch-all, but we can generate them for known branches
    const params: { branch: string, slug: string[] }[] = [];
    
    Object.keys(siteData).forEach(branch => {
        const data = siteData[branch];
        
        if (data.semesters) {
            data.semesters.forEach(sem => {
                params.push({ branch, slug: [sem.sem.toString()] });
                sem.subjects.forEach(subject => {
                    params.push({ branch, slug: [sem.sem.toString(), subject.slug] });
                });
            });
        }
        
        if (data.schemes) {
            data.schemes.forEach(scheme => {
                scheme.cycles.forEach(cycle => {
                    params.push({ branch, slug: [scheme.slug, cycle.slug] });
                    cycle.subjects.forEach(subject => {
                        params.push({ branch, slug: [scheme.slug, cycle.slug, subject.slug] });
                    });
                });
            });
        }
    });

    return params;
}
