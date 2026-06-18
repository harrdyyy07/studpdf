import { siteData, Subject, Semester, Cycle } from '@/data/notesData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BranchCard from '@/components/BranchCard';
import SubjectView from '@/components/SubjectView';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSubjectBlog, getSemesterBlog, getCycleBlog } from '@/data/subjectBlogsData';

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
            const semester = branchData.semesters?.find((s) => s.sem === semNum);
            const subjects = semester?.subjects || [];
            const blog = getSemesterBlog(branch, branchData.title, semNum, subjects);
            return { 
                title: blog.title, 
                description: blog.description,
                openGraph: { title: blog.title, description: blog.description }
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
                const blog = getSubjectBlog(subject.code, subject.name, subject.modules);
                const title = `${subject.name} (${subject.code}) Notes & Study Guide | VTUwise`;
                const description = blog.description;
                return { title, description, openGraph: { title, description } };
            }
        } else {
            const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
            const cycle = scheme?.cycles.find((c) => c.slug === slug[1]);
            if (cycle) {
                const blog = getCycleBlog(branch, branchData.title, scheme?.name || slug[0], cycle.name, cycle.subjects);
                return { 
                    title: blog.title, 
                    description: blog.description, 
                    openGraph: { title: blog.title, description: blog.description } 
                };
            }
        }
    }

    // Case 3: First Year Subject Detail
    if (slug.length === 3) {
        const scheme = branchData.schemes?.find((s) => s.slug === slug[0]);
        const cycle = scheme?.cycles.find((c) => c.slug === slug[1]);
        const subject = cycle?.subjects.find((s) => s.slug === slug[2]);
        if (subject) {
            const blog = getSubjectBlog(subject.code, subject.name, subject.modules);
            const title = `${subject.name} (${subject.code}) Notes & Study Guide | VTUwise`;
            const description = blog.description;
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

    const blog = getSemesterBlog(branch, branchTitle, semester.sem, semester.subjects);

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

            {blog && (
                <div className="subject-blog-section mt-16 pt-12 border-t border-surface-border">
                    <div className="subject-blog-card">
                        <div className="subject-blog-badge">📚 SEMESTER GUIDE</div>
                        <h2 className="subject-blog-title">{blog.title}</h2>
                        <div className="subject-blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {blog.faqs && blog.faqs.length > 0 && (
                        <div className="subject-faq-section mt-16">
                            <h2 className="section-title text-left mb-8">Frequently Asked Questions</h2>
                            <div className="faq-list">
                                {blog.faqs.map((faq, idx) => (
                                    <details key={idx} className="faq-item-details group">
                                        <summary className="faq-question-summary">
                                            <span>{faq.question}</span>
                                            <span className="faq-icon-summary">▼</span>
                                        </summary>
                                        <div className="faq-answer-details">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {blog.faqs && blog.faqs.length > 0 && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "FAQPage",
                                    "mainEntity": blog.faqs.map(faq => ({
                                        "@type": "Question",
                                        "name": faq.question,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": faq.answer
                                        }
                                    }))
                                })
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function CycleView({ branch, branchTitle, scheme, cycle }: { branch: string, branchTitle: string, scheme: string, cycle: Cycle }) {
    const breadcrumbs = [
        { label: branch.toUpperCase(), href: `/${branch}` },
        { label: cycle.name, href: '#' }
    ];

    const blog = getCycleBlog(branch, branchTitle, scheme, cycle.name, cycle.subjects);

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

            {blog && (
                <div className="subject-blog-section mt-16 pt-12 border-t border-surface-border">
                    <div className="subject-blog-card">
                        <div className="subject-blog-badge">📚 STUDY CYCLE GUIDE</div>
                        <h2 className="subject-blog-title">{blog.title}</h2>
                        <div className="subject-blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {blog.faqs && blog.faqs.length > 0 && (
                        <div className="subject-faq-section mt-16">
                            <h2 className="section-title text-left mb-8">Frequently Asked Questions</h2>
                            <div className="faq-list">
                                {blog.faqs.map((faq, idx) => (
                                    <details key={idx} className="faq-item-details group">
                                        <summary className="faq-question-summary">
                                            <span>{faq.question}</span>
                                            <span className="faq-icon-summary">▼</span>
                                        </summary>
                                        <div className="faq-answer-details">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {blog.faqs && blog.faqs.length > 0 && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "FAQPage",
                                    "mainEntity": blog.faqs.map(faq => ({
                                        "@type": "Question",
                                        "name": faq.question,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": faq.answer
                                        }
                                    }))
                                })
                            }}
                        />
                    )}
                </div>
            )}
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
