import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

/* ─── Types ─────────────────────────────────────────────────────────── */
interface LegalPage {
    title: string;
    intro: string;
    sections: { heading: string; content: React.ReactNode }[];
}

/* ─── Content ───────────────────────────────────────────────────────── */
const legalContent: Record<string, LegalPage> = {
    'privacy': {
        title: 'Privacy Policy',
        intro: 'At VTUwise, your privacy is a top priority. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.',
        sections: [
            {
                heading: '1. Definitions',
                content: (
                    <ul>
                        <li><strong>Website</strong>: Refers to <strong>vtuwise.in</strong>.</li>
                        <li><strong>Service</strong>: All content, features, and functionalities offered on <strong>vtuwise.in</strong>.</li>
                        <li><strong>User</strong> ("You"): Any person accessing or using our Website.</li>
                        <li><strong>Company</strong> ("We", "Us", "Our"): Refers to <strong>vtuwise.in</strong>.</li>
                    </ul>
                )
            },
            {
                heading: '2. Information We Collect',
                content: (
                    <p>We collect information you voluntarily provide when contacting us, such as your name, email address, and academic details (branch, semester). We also collect limited non-personal data automatically, including browser type, pages visited, and time spent on pages, to help improve our service.</p>
                )
            },
            {
                heading: '3. How We Use Your Information',
                content: (
                    <ul>
                        <li>To provide, operate, and maintain our platform.</li>
                        <li>To improve and personalize your experience on VTUwise.</li>
                        <li>To send service notifications or academic updates you have opted into.</li>
                        <li>To analyze usage patterns and develop new features.</li>
                        <li>To comply with any applicable legal obligations.</li>
                    </ul>
                )
            },
            {
                heading: '4. Cookies',
                content: (
                    <p>Like most websites, VTUwise uses cookies to store your preferences (such as dark/light mode) and to understand how visitors navigate the site. You can disable cookies in your browser settings at any time without losing access to the core service.</p>
                )
            },
            {
                heading: '5. Third-Party Services',
                content: (
                    <p>We may use third-party services such as Google Analytics and Google AdSense. These services collect data independently under their own privacy policies. We encourage you to review them at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>
                )
            },
            {
                heading: '6. Data Security',
                content: (
                    <p>We implement commercially reasonable technical and organisational measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
                )
            },
            {
                heading: '7. Contact Us',
                content: (
                    <p>If you have any questions about this Privacy Policy, please email us at <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a>.</p>
                )
            },
        ]
    },
    'terms': {
        title: 'Terms and Conditions',
        intro: 'Welcome to vtuwise.in! By using our website, you agree to comply with the following terms and conditions. Please read them carefully.',
        sections: [
            {
                heading: '1. Definitions',
                content: (
                    <ul>
                        <li><strong>Website</strong>: Refers to <strong>vtuwise.in</strong>.</li>
                        <li><strong>Service</strong>: All content, features, and functionalities offered on <strong>vtuwise.in</strong>.</li>
                        <li><strong>User</strong> ("You"): Any person accessing or using our Website.</li>
                        <li><strong>Company</strong> ("We", "Us", "Our"): Refers to <strong>vtuwise.in</strong>.</li>
                    </ul>
                )
            },
            {
                heading: '2. Acceptance of Terms',
                content: (
                    <p>By accessing or using <strong>vtuwise.in</strong>, You agree to abide by these Terms and Conditions. If You do not agree with any part of these Terms, please do not use our Website.</p>
                )
            },
            {
                heading: '3. License to Use',
                content: (
                    <>
                        <p>We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use VTUwise solely for personal, non-commercial academic purposes. You may not:</p>
                        <ul>
                            <li>Sell, sublicense, or commercially redistribute any content from this Website.</li>
                            <li>Modify or create derivative works based on our content without permission.</li>
                            <li>Use any automated system (bots, scrapers) to access the Website.</li>
                        </ul>
                    </>
                )
            },
            {
                heading: '4. Intellectual Property',
                content: (
                    <p>All original content on VTUwise — including but not limited to our interface design, branding, tools, and curated structural data — is owned by or licensed to VTUwise. Academic notes contributed by students remain the intellectual property of their respective creators.</p>
                )
            },
            {
                heading: '5. User Conduct',
                content: (
                    <ul>
                        <li>You will not upload harmful, false, or copyright-infringing material.</li>
                        <li>You will not impersonate VTUwise or any affiliated individual.</li>
                        <li>You will not attempt to disrupt, hack, or interfere with our service.</li>
                        <li>You will comply with all applicable laws while using this Website.</li>
                    </ul>
                )
            },
            {
                heading: '6. Disclaimer of Warranties',
                content: (
                    <p>VTUwise is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without any warranties, express or implied. We do not guarantee that the platform will be error-free, uninterrupted, or always accurate.</p>
                )
            },
            {
                heading: '7. Limitation of Liability',
                content: (
                    <p>To the fullest extent permitted by law, VTUwise shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use the Website or its content.</p>
                )
            },
            {
                heading: '8. Governing Law',
                content: (
                    <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Karnataka, India.</p>
                )
            },
            {
                heading: '9. Changes to Terms',
                content: (
                    <p>We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised date. Continued use of the Website after changes constitutes your acceptance of the updated Terms.</p>
                )
            },
        ]
    },
    'disclaimer': {
        title: 'Disclaimer',
        intro: 'Please read this disclaimer carefully before using VTUwise. This page explains the nature and limitations of the content provided on our platform.',
        sections: [
            {
                heading: '1. Independent Platform',
                content: (
                    <p><strong>VTUwise is an independent educational platform.</strong> We are <strong>NOT</strong> affiliated with, endorsed by, or an official representative of Visvesvaraya Technological University (VTU) or any government body. For official university communications, please visit <a href="https://vtu.ac.in" target="_blank" rel="noopener noreferrer"><strong>vtu.ac.in</strong></a>.</p>
                )
            },
            {
                heading: '2. Accuracy of Information',
                content: (
                    <p>All information on VTUwise is provided in good faith for general informational purposes only. We make no representations or warranties regarding the accuracy, completeness, or reliability of any content. Use all resources as supplementary study aids and verify critical information with your official syllabus and lecturers.</p>
                )
            },
            {
                heading: '3. Student-Contributed Content',
                content: (
                    <p>Most academic notes and study materials on VTUwise are <strong>uploaded and shared by students</strong> from VTU-affiliated colleges across Karnataka. While we review submissions for quality, we do not independently verify all content. VTUwise is not responsible for inaccuracies in student-contributed materials.</p>
                )
            },
            {
                heading: '4. Copyright Policy',
                content: (
                    <>
                        <p>If you are the copyright owner of any material hosted on VTUwise and wish to have it removed, please contact us with the following:</p>
                        <ul>
                            <li>Your full name and contact details.</li>
                            <li>URL(s) of the content in question.</li>
                            <li>Proof of copyright ownership.</li>
                            <li>A formal request for removal.</li>
                        </ul>
                        <p>Email your request to <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a>. We will take immediate action upon verification.</p>
                    </>
                )
            },
            {
                heading: '5. Limitation of Liability',
                content: (
                    <p>VTUwise shall not be held liable for any academic outcomes, exam results, or decisions made based on content found on this platform. All resources are used at the student&apos;s own risk.</p>
                )
            },
        ]
    },
    'about': {
        title: 'About VTUwise',
        intro: 'VTUwise is a free academic resource platform built by students, for students — designed to make VTU exam preparation smarter, faster, and more accessible for everyone.',
        sections: [
            {
                heading: '1. Who We Are',
                content: (
                    <p>VTUwise is a community-driven educational platform that centralizes high-quality study materials for students of Visvesvaraya Technological University (VTU). We understand the challenges of engineering education and strive to make learning resources more accessible to every student, regardless of their college or location.</p>
                )
            },
            {
                heading: '2. Our Mission',
                content: (
                    <p>To provide free, premium-quality, syllabus-aligned notes, previous year question papers, and academic tools for every VTU student across every branch and semester — helping them prepare effectively and achieve their academic goals.</p>
                )
            },
            {
                heading: '3. Our Vision',
                content: (
                    <p>To become the #1 academic resource platform for engineering students in Karnataka, making VTU preparation smarter, faster, and more accessible for every student, from any college.</p>
                )
            },
            {
                heading: '4. What We Offer',
                content: (
                    <ul>
                        <li><strong>Module-wise Notes:</strong> Structured, syllabus-aligned notes for all branches and semesters.</li>
                        <li><strong>Previous Year Question Papers:</strong> Organized by branch and semester for targeted practice.</li>
                        <li><strong>SGPA & CGPA Calculators:</strong> Tools to track your academic performance under the VTU 2022 scheme.</li>
                        <li><strong>Blog & Updates:</strong> Study tips, university rules, and career guidance articles.</li>
                    </ul>
                )
            },
            {
                heading: '5. Why VTUwise?',
                content: (
                    <ul>
                        <li><strong>100% Free:</strong> All notes and question papers are free for every student — no subscription, no login required.</li>
                        <li><strong>Community Driven:</strong> Content is contributed and curated by students across Karnataka&apos;s top colleges.</li>
                        <li><strong>Mobile Optimized:</strong> Designed for students who study on the go — fast, clean, and responsive.</li>
                        <li><strong>Always Growing:</strong> New content is added regularly based on community contributions.</li>
                    </ul>
                )
            },
            {
                heading: '6. Contact',
                content: (
                    <p>Have feedback or want to collaborate? Reach us at <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a> or join our <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" rel="noopener noreferrer"><strong>WhatsApp community</strong></a> for the latest updates.</p>
                )
            },
        ]
    },
    'contact': {
        title: 'Contact Us',
        intro: "We'd love to hear from you — whether you have a question, feedback, or want to contribute to VTUwise.",
        sections: [
            {
                heading: '1. General Enquiries',
                content: (
                    <p>For general questions about VTUwise, its features, or content, please email us at <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a>. We typically respond within 24–48 hours on working days.</p>
                )
            },
            {
                heading: '2. Copyright Removal Requests',
                content: (
                    <>
                        <p>If you believe any material on VTUwise infringes your copyright, please email <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a> with:</p>
                        <ul>
                            <li>Your full name and contact details.</li>
                            <li>The URL(s) of the content in question.</li>
                            <li>Proof of copyright ownership.</li>
                            <li>A formal removal request.</li>
                        </ul>
                        <p>We take copyright seriously and will act immediately upon verifying your claim.</p>
                    </>
                )
            },
            {
                heading: '3. Content Contributions',
                content: (
                    <p>Want to share your notes with thousands of VTU students? Use the <strong>&quot;Upload&quot;</strong> button in the navigation bar to submit your materials via our Upload page. Our team will review and publish high-quality submissions.</p>
                )
            },
            {
                heading: '4. WhatsApp Community',
                content: (
                    <p>Join our WhatsApp channel for instant updates on notes, exam schedules, and university announcements: <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" rel="noopener noreferrer"><strong>Join VTUwise WhatsApp Channel →</strong></a></p>
                )
            },
            {
                heading: '5. Feature Requests & Bug Reports',
                content: (
                    <p>Found a bug or have an idea? Send your thoughts to <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a> with the subject line <em>&quot;Feature Request&quot;</em> or <em>&quot;Bug Report&quot;</em>.</p>
                )
            },
        ]
    },
    'faqs': {
        title: 'Frequently Asked Questions',
        intro: 'Find quick answers to the most common questions from VTU students about using VTUwise.',
        sections: [
            {
                heading: '1. How do I download notes?',
                content: (
                    <p>Navigate to your branch from the homepage, select your semester, choose a subject, and click on a module card. The notes will open in Google Drive, where you can view or download them for free.</p>
                )
            },
            {
                heading: '2. Are these materials official from VTU?',
                content: (
                    <p>No. The notes and study materials on VTUwise are uploaded by students and faculty from VTU-affiliated colleges across Karnataka. They are not official VTU publications. Always verify content against your official syllabus.</p>
                )
            },
            {
                heading: '3. Is VTUwise completely free?',
                content: (
                    <p>Yes. Every note, question paper, and tool on VTUwise is 100% free for all students — with no subscription, no login, and no hidden fees required to browse or access any content.</p>
                )
            },
            {
                heading: '4. How do I contribute my notes?',
                content: (
                    <p>Click the <strong>&quot;Upload&quot;</strong> button in the navigation bar and fill in the form on our Upload page with your details and files. Our moderators will review and publish high-quality submissions.</p>
                )
            },
            {
                heading: '5. I found outdated or incorrect content. What should I do?',
                content: (
                    <p>Please email us at <a href="mailto:vtuwisenotes@gmail.com"><strong>vtuwisenotes@gmail.com</strong></a> mentioning the specific subject and the inaccuracy. We will review and update it promptly.</p>
                )
            },
            {
                heading: '6. Does VTUwise support the 2022 VTU scheme?',
                content: (
                    <p>Yes. Our notes, question papers, and SGPA/CGPA calculators are updated to support both the 2022 scheme (CBCS 2022) and previous schemes.</p>
                )
            },
            {
                heading: '7. Does VTUwise have a mobile app?',
                content: (
                    <p>We do not have a dedicated native app yet. However, our website is fully optimized for mobile devices. You can add <strong>vtuwise.in</strong> to your phone&apos;s home screen for an app-like experience.</p>
                )
            },
            {
                heading: '8. Why do you add watermarks to PDF study materials and notes?',
                content: (
                    <p>Watermarks are added to study materials and notes on VTUwise to safeguard content integrity, prevent unauthorized commercial redistribution or piracy, credit original student &amp; faculty contributors, and maintain academic authenticity across our platform. If you wish to protect or watermark your personal study files and PDFs, you can use tools like <a href="https://seal-pdf.com/" target="_blank" rel="noopener noreferrer"><strong>Seal PDF</strong></a>.</p>
                )
            },
        ]
    }
};

/* ─── Metadata ──────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = legalContent[slug];
    if (!data) return { title: 'Not Found | VTUwise' };
    return { title: `${data.title} | VTUwise` };
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = legalContent[slug];
    if (!data) notFound();

    return (
        <>
            <div className="legal-page-wrapper">
                <div className="legal-content-box">

                    {/* breadcrumb */}
                    <nav className="legal-breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span>{data.title}</span>
                    </nav>

                    {/* page title */}
                    <h1 className="legal-title">{data.title}</h1>

                    {/* intro */}
                    <p className="legal-intro">{data.intro}</p>

                    {/* sections */}
                    {data.sections.map((section, i) => (
                        <div key={i}>
                            <div className="legal-divider" />
                            <section className="legal-section">
                                <h2 className="legal-section-heading">{section.heading}</h2>
                                <div className="legal-section-body">
                                    {section.content}
                                </div>
                            </section>
                        </div>
                    ))}

                    <div className="legal-divider" />

                    {/* bottom page navigation */}
                    <div className="legal-nav-footer">
                        <p className="legal-nav-label">Other Legal Pages</p>
                        <div className="legal-nav-pills">
                            {Object.entries(legalContent).map(([s, d]) => (
                                <Link
                                    key={s}
                                    href={`/legal/${s}`}
                                    className={`legal-nav-pill${s === slug ? ' active' : ''}`}
                                >
                                    {d.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                /* ── wrapper ──────────────────────────────────── */
                .legal-page-wrapper {
                    background: var(--background);
                    min-height: 100vh;
                    padding: 4rem 1.5rem 6rem;
                }

                .legal-content-box {
                    max-width: 760px;
                    margin: 0 auto;
                }

                /* ── breadcrumb ───────────────────────────────── */
                .legal-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    margin-bottom: 2.5rem;
                }
                .legal-breadcrumb a {
                    color: var(--text-muted);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .legal-breadcrumb a:hover { color: var(--primary); }
                .legal-breadcrumb span { opacity: 0.6; }

                /* ── title ────────────────────────────────────── */
                .legal-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    text-align: center;
                    color: var(--text);
                    margin-bottom: 1.5rem;
                }

                /* ── intro ────────────────────────────────────── */
                .legal-intro {
                    font-size: 1rem;
                    line-height: 1.8;
                    color: var(--text-muted);
                    margin-bottom: 0;
                }

                /* ── divider ──────────────────────────────────── */
                .legal-divider {
                    width: 80px;
                    height: 1px;
                    background: var(--surface-border);
                    margin: 2.25rem auto;
                }

                /* ── section ──────────────────────────────────── */
                .legal-section-heading {
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    color: var(--text);
                    margin-bottom: 1rem;
                }

                .legal-section-body {
                    font-size: 0.975rem;
                    line-height: 1.85;
                    color: var(--text-muted);
                }

                .legal-section-body p {
                    margin-bottom: 0.85rem;
                }

                .legal-section-body ul {
                    list-style: none;
                    padding: 0;
                    margin: 0.5rem 0;
                }

                .legal-section-body ul li {
                    position: relative;
                    padding-left: 1.25rem;
                    margin-bottom: 0.6rem;
                }

                .legal-section-body ul li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: var(--primary);
                    font-weight: 900;
                }

                .legal-section-body a {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: 600;
                }

                .legal-section-body a:hover {
                    text-decoration: underline;
                }

                .legal-section-body strong {
                    color: var(--text);
                    font-weight: 700;
                }

                /* ── footer nav ───────────────────────────────── */
                .legal-nav-footer {
                    padding-top: 2rem;
                    border-top: 1px solid var(--surface-border);
                    text-align: center;
                }

                .legal-nav-label {
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    margin-bottom: 1rem;
                }

                .legal-nav-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                }

                .legal-nav-pill {
                    padding: 0.4rem 1rem;
                    border-radius: 999px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    border: 1px solid var(--surface-border);
                    color: var(--text-muted);
                    text-decoration: none;
                    transition: all 0.2s ease;
                    background: transparent;
                }

                .legal-nav-pill:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .legal-nav-pill.active {
                    background: var(--primary);
                    border-color: var(--primary);
                    color: #fff;
                }
            `}</style>
        </>
    );
}

export async function generateStaticParams() {
    return Object.keys(legalContent).map((slug) => ({ slug }));
}
