'use client';

import React, { useState } from 'react';

interface Education {
    school: string;
    degree: string;
    location: string;
    date: string;
    gpa: string;
}

interface Experience {
    company: string;
    role: string;
    location: string;
    date: string;
    bullets: string[];
}

interface Project {
    title: string;
    tech: string;
    link: string;
    bullets: string[];
}

interface Certification {
    name: string;
    issuer: string;
    date: string;
}

interface ResumeState {
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    website: string;
    education: Education[];
    skills: {
        languages: string;
        frameworks: string;
        tools: string;
        concepts: string;
    };
    experience: Experience[];
    projects: Project[];
    certifications: Certification[];
}

const DEMO_DATA: ResumeState = {
    name: 'Sidhu Kumar',
    headline: 'Computer Science & Engineering Student',
    email: 'sidhu.kumar@vtuwise.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    github: 'github.com/sidhukumar',
    linkedin: 'linkedin.com/in/sidhukumar',
    website: 'vtuwise.com',
    education: [
        {
            school: 'Visvesvaraya Technological University (VTU)',
            degree: 'Bachelor of Engineering in Computer Science & Engineering',
            location: 'Bangalore, India',
            date: 'Nov 2022 - Aug 2026',
            gpa: 'CGPA: 8.92 / 10.0'
        }
    ],
    skills: {
        languages: 'JavaScript, TypeScript, Python, C++, SQL, HTML5, CSS3',
        frameworks: 'React.js, Next.js, Node.js, Express, TailwindCSS',
        tools: 'Git, GitHub, VS Code, Vercel, Docker, PostgreSQL, MongoDB',
        concepts: 'Data Structures, Algorithms, OOPs, Database Management Systems, Computer Networks'
    },
    experience: [
        {
            company: 'Tech Solutions Inc.',
            role: 'Software Development Extern',
            location: 'Bangalore, India',
            date: 'Jun 2025 - Aug 2025',
            bullets: [
                'Developed and integrated client-side user dashboard pages using Next.js, optimizing initial bundle sizes by 22%.',
                'Collaborated with API engineers to integrate secure REST endpoints with standard JSON web token authentication schemes.',
                'Refactored database query loops using custom indexing, reducing database query latencies by 140ms on average.'
            ]
        }
    ],
    projects: [
        {
            title: 'VTUwise Study Resource Portal',
            tech: 'Next.js, TypeScript, CSS Variables, Vercel',
            link: 'github.com/vtuwise/portal',
            bullets: [
                'Engineered an interactive student resource directory hosting semester notes, previous year question papers, and calculators.',
                'Implemented customizable clients for calculating SGPA and CGPA in real-time, serving over 15,000+ engineering students.',
                'Designed responsive interfaces supporting instant light/dark mode triggers, yielding a 98/100 Lighthouse performance rating.'
            ]
        },
        {
            title: 'In-Browser Test compiler Playground',
            tech: 'React, Custom JS Sandbox, LocalStorage',
            link: 'github.com/vtuwise/sandbox',
            bullets: [
                'Built a robust client-side sandbox environment allowing instant validation of JavaScript code snippets against test suites.',
                'Rendered terminal logs for compilation outputs, detailing inputs, outputs, and compiler runtime assertions.'
            ]
        }
    ],
    certifications: [
        {
            name: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services',
            date: 'Jan 2025'
        },
        {
            name: 'Advanced Data Structures & Algorithms',
            issuer: 'Coursera (Princeton University)',
            date: 'Sep 2024'
        }
    ]
};

const EMPTY_DATA: ResumeState = {
    name: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
    education: [{ school: '', degree: '', location: '', date: '', gpa: '' }],
    skills: { languages: '', frameworks: '', tools: '', concepts: '' },
    experience: [{ company: '', role: '', location: '', date: '', bullets: [''] }],
    projects: [{ title: '', tech: '', link: '', bullets: [''] }],
    certifications: [{ name: '', issuer: '', date: '' }]
};

export default function ResumeBuilderClient() {
    const [resume, setResume] = useState<ResumeState>(DEMO_DATA);
    const [activeSection, setActiveSection] = useState<string>('personal');

    const handleLoadDemo = () => {
        setResume(DEMO_DATA);
    };

    const handleClear = () => {
        if (window.confirm('Clear all fields to start from scratch?')) {
            setResume(EMPTY_DATA);
        }
    };

    // Generic state helpers
    const updatePersonal = (field: keyof ResumeState, value: string) => {
        setResume(prev => ({ ...prev, [field]: value }));
    };

    const updateSkill = (field: keyof ResumeState['skills'], value: string) => {
        setResume(prev => ({
            ...prev,
            skills: { ...prev.skills, [field]: value }
        }));
    };

    // Array state helpers
    const updateEducation = (idx: number, field: keyof Education, value: string) => {
        const arr = [...resume.education];
        arr[idx] = { ...arr[idx], [field]: value };
        setResume(prev => ({ ...prev, education: arr }));
    };

    const addEducation = () => {
        setResume(prev => ({
            ...prev,
            education: [...prev.education, { school: '', degree: '', location: '', date: '', gpa: '' }]
        }));
    };

    const removeEducation = (idx: number) => {
        const arr = resume.education.filter((_, i) => i !== idx);
        setResume(prev => ({ ...prev, education: arr.length > 0 ? arr : [{ school: '', degree: '', location: '', date: '', gpa: '' }] }));
    };

    const updateExperience = (idx: number, field: keyof Experience, value: any) => {
        const arr = [...resume.experience];
        arr[idx] = { ...arr[idx], [field]: value };
        setResume(prev => ({ ...prev, experience: arr }));
    };

    const updateExperienceBullet = (expIdx: number, bulletIdx: number, value: string) => {
        const arr = [...resume.experience];
        const bullets = [...arr[expIdx].bullets];
        bullets[bulletIdx] = value;
        arr[expIdx] = { ...arr[expIdx], bullets };
        setResume(prev => ({ ...prev, experience: arr }));
    };

    const addExperienceBullet = (expIdx: number) => {
        const arr = [...resume.experience];
        arr[expIdx] = { ...arr[expIdx], bullets: [...arr[expIdx].bullets, ''] };
        setResume(prev => ({ ...prev, experience: arr }));
    };

    const removeExperienceBullet = (expIdx: number, bulletIdx: number) => {
        const arr = [...resume.experience];
        const bullets = arr[expIdx].bullets.filter((_, bIdx) => bIdx !== bulletIdx);
        arr[expIdx] = { ...arr[expIdx], bullets: bullets.length > 0 ? bullets : [''] };
        setResume(prev => ({ ...prev, experience: arr }));
    };

    const addExperience = () => {
        setResume(prev => ({
            ...prev,
            experience: [...prev.experience, { company: '', role: '', location: '', date: '', bullets: [''] }]
        }));
    };

    const removeExperience = (idx: number) => {
        const arr = resume.experience.filter((_, i) => i !== idx);
        setResume(prev => ({ ...prev, experience: arr.length > 0 ? arr : [{ company: '', role: '', location: '', date: '', bullets: [''] }] }));
    };

    const updateProject = (idx: number, field: keyof Project, value: any) => {
        const arr = [...resume.projects];
        arr[idx] = { ...arr[idx], [field]: value };
        setResume(prev => ({ ...prev, projects: arr }));
    };

    const updateProjectBullet = (projIdx: number, bulletIdx: number, value: string) => {
        const arr = [...resume.projects];
        const bullets = [...arr[projIdx].bullets];
        bullets[bulletIdx] = value;
        arr[projIdx] = { ...arr[projIdx], bullets };
        setResume(prev => ({ ...prev, projects: arr }));
    };

    const addProjectBullet = (projIdx: number) => {
        const arr = [...resume.projects];
        arr[projIdx] = { ...arr[projIdx], bullets: [...arr[projIdx].bullets, ''] };
        setResume(prev => ({ ...prev, projects: arr }));
    };

    const removeProjectBullet = (projIdx: number, bulletIdx: number) => {
        const arr = [...resume.projects];
        const bullets = arr[projIdx].bullets.filter((_, bIdx) => bIdx !== bulletIdx);
        arr[projIdx] = { ...arr[projIdx], bullets: bullets.length > 0 ? bullets : [''] };
        setResume(prev => ({ ...prev, projects: arr }));
    };

    const addProject = () => {
        setResume(prev => ({
            ...prev,
            projects: [...prev.projects, { title: '', tech: '', link: '', bullets: [''] }]
        }));
    };

    const removeProject = (idx: number) => {
        const arr = resume.projects.filter((_, i) => i !== idx);
        setResume(prev => ({ ...prev, projects: arr.length > 0 ? arr : [{ title: '', tech: '', link: '', bullets: [''] }] }));
    };

    const updateCertification = (idx: number, field: keyof Certification, value: string) => {
        const arr = [...resume.certifications];
        arr[idx] = { ...arr[idx], [field]: value };
        setResume(prev => ({ ...prev, certifications: arr }));
    };

    const addCertification = () => {
        setResume(prev => ({
            ...prev,
            certifications: [...prev.certifications, { name: '', issuer: '', date: '' }]
        }));
    };

    const removeCertification = (idx: number) => {
        const arr = resume.certifications.filter((_, i) => i !== idx);
        setResume(prev => ({ ...prev, certifications: arr.length > 0 ? arr : [{ name: '', issuer: '', date: '' }] }));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="builder-page">
            <div className="builder-header no-print">
                <div className="container builder-header-inner">
                    <div>
                        <span className="builder-eyebrow">📄 Career Advancement Tool</span>
                        <h1 className="builder-title">ATS Resume Builder</h1>
                    </div>
                    <div className="builder-actions-group">
                        <button className="btn-builder-utility loading-demo" onClick={handleLoadDemo}>
                            ⚡ Load Engineering Demo
                        </button>
                        <button className="btn-builder-utility reset-clear" onClick={handleClear}>
                            ↺ Clear All
                        </button>
                        <button className="btn-download-pdf" onClick={handlePrint}>
                            🖨 Download PDF / Print
                        </button>
                    </div>
                </div>
            </div>

            <div className="builder-container">
                <div className="builder-layout">
                    {/* ── Left Form Inputs (Hidden on Print) ── */}
                    <div className="builder-forms no-print">
                        <div className="section-tabs-bar">
                            <button className={`tab-btn ${activeSection === 'personal' ? 'active' : ''}`} onClick={() => setActiveSection('personal')}>Personal</button>
                            <button className={`tab-btn ${activeSection === 'education' ? 'active' : ''}`} onClick={() => setActiveSection('education')}>Education</button>
                            <button className={`tab-btn ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setActiveSection('skills')}>Skills</button>
                            <button className={`tab-btn ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => setActiveSection('experience')}>Experience</button>
                            <button className={`tab-btn ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>Projects</button>
                            <button className={`tab-btn ${activeSection === 'certifications' ? 'active' : ''}`} onClick={() => setActiveSection('certifications')}>Certificates</button>
                        </div>

                        <div className="tab-content-panel">
                            {/* Personal Details */}
                            {activeSection === 'personal' && (
                                <div className="form-section-body">
                                    <h3 className="section-form-title">Personal Details</h3>
                                    <div className="form-grid">
                                        <div className="form-col-2">
                                            <label>Full Name</label>
                                            <input type="text" value={resume.name} onChange={e => updatePersonal('name', e.target.value)} placeholder="Sidhu Kumar" />
                                        </div>
                                        <div className="form-col-2">
                                            <label>Headline</label>
                                            <input type="text" value={resume.headline} onChange={e => updatePersonal('headline', e.target.value)} placeholder="Computer Science Student" />
                                        </div>
                                        <div className="form-col-1">
                                            <label>Email</label>
                                            <input type="email" value={resume.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="sidhu@example.com" />
                                        </div>
                                        <div className="form-col-1">
                                            <label>Phone</label>
                                            <input type="text" value={resume.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+91 99999 88888" />
                                        </div>
                                        <div className="form-col-1">
                                            <label>Location</label>
                                            <input type="text" value={resume.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="Bangalore, India" />
                                        </div>
                                        <div className="form-col-1">
                                            <label>GitHub Link (e.g. github.com/username)</label>
                                            <input type="text" value={resume.github} onChange={e => updatePersonal('github', e.target.value)} placeholder="github.com/sidhukumar" />
                                        </div>
                                        <div className="form-col-1">
                                            <label>LinkedIn Link</label>
                                            <input type="text" value={resume.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/sidhu" />
                                        </div>
                                        <div className="form-col-1">
                                            <label>Portfolio / Website</label>
                                            <input type="text" value={resume.website} onChange={e => updatePersonal('website', e.target.value)} placeholder="vtuwise.com" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Education Details */}
                            {activeSection === 'education' && (
                                <div className="form-section-body">
                                    <h3 className="section-form-title">Education Records</h3>
                                    {resume.education.map((edu, idx) => (
                                        <div key={idx} className="array-item-card">
                                            <div className="array-card-header">
                                                <span>Education #{idx + 1}</span>
                                                <button className="btn-remove-array" onClick={() => removeEducation(idx)}>Delete</button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-col-2">
                                                    <label>Institution / University Name</label>
                                                    <input type="text" value={edu.school} onChange={e => updateEducation(idx, 'school', e.target.value)} placeholder="Visvesvaraya Technological University" />
                                                </div>
                                                <div className="form-col-2">
                                                    <label>Degree & Branch</label>
                                                    <input type="text" value={edu.degree} onChange={e => updateEducation(idx, 'degree', e.target.value)} placeholder="B.E. in Computer Science & Engineering" />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Location</label>
                                                    <input type="text" value={edu.location} onChange={e => updateEducation(idx, 'location', e.target.value)} placeholder="Bangalore, India" />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Timeline / Dates</label>
                                                    <input type="text" value={edu.date} onChange={e => updateEducation(idx, 'date', e.target.value)} placeholder="Nov 2022 - Aug 2026" />
                                                </div>
                                                <div className="form-col-2">
                                                    <label>GPA / CGPA / Percentage</label>
                                                    <input type="text" value={edu.gpa} onChange={e => updateEducation(idx, 'gpa', e.target.value)} placeholder="CGPA: 8.92 / 10.0" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="btn-add-array" onClick={addEducation}>+ Add Education Record</button>
                                </div>
                            )}

                            {/* Skills Section */}
                            {activeSection === 'skills' && (
                                <div className="form-section-body">
                                    <h3 className="section-form-title">Skills Inventory</h3>
                                    <div className="form-grid">
                                        <div className="form-col-2">
                                            <label>Languages (Comma-separated)</label>
                                            <input type="text" value={resume.skills.languages} onChange={e => updateSkill('languages', e.target.value)} placeholder="C++, Java, Python, JavaScript" />
                                        </div>
                                        <div className="form-col-2">
                                            <label>Frameworks / Libraries</label>
                                            <input type="text" value={resume.skills.frameworks} onChange={e => updateSkill('frameworks', e.target.value)} placeholder="React.js, Next.js, Node.js, Express" />
                                        </div>
                                        <div className="form-col-2">
                                            <label>Developer Tools / Technologies</label>
                                            <input type="text" value={resume.skills.tools} onChange={e => updateSkill('tools', e.target.value)} placeholder="Git, Docker, Vercel, MySQL" />
                                        </div>
                                        <div className="form-col-2">
                                            <label>Core Subject Concepts</label>
                                            <input type="text" value={resume.skills.concepts} onChange={e => updateSkill('concepts', e.target.value)} placeholder="Data Structures, OOPs, DBMS, OS" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Work Experience */}
                            {activeSection === 'experience' && (
                                <div className="form-section-body">
                                    <h3 className="section-form-title">Work Experience</h3>
                                    {resume.experience.map((exp, idx) => (
                                        <div key={idx} className="array-item-card">
                                            <div className="array-card-header">
                                                <span>Experience Entry #{idx + 1}</span>
                                                <button className="btn-remove-array" onClick={() => removeExperience(idx)}>Delete</button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-col-1">
                                                    <label>Company / Organization</label>
                                                    <input type="text" value={exp.company} onChange={e => updateExperience(idx, 'company', e.target.value)} placeholder="Tech Solutions Inc." />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Role / Position</label>
                                                    <input type="text" value={exp.role} onChange={e => updateExperience(idx, 'role', e.target.value)} placeholder="Software Development Extern" />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Location</label>
                                                    <input type="text" value={exp.location} onChange={e => updateExperience(idx, 'location', e.target.value)} placeholder="Bangalore, India" />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Timeline / Dates</label>
                                                    <input type="text" value={exp.date} onChange={e => updateExperience(idx, 'date', e.target.value)} placeholder="Jun 2025 - Aug 2025" />
                                                </div>
                                                
                                                <div className="form-col-2">
                                                    <label>Description Points (ATS Impact Bullets)</label>
                                                    {exp.bullets.map((bullet, bIdx) => (
                                                        <div key={bIdx} className="bullet-row-field">
                                                            <input type="text" value={bullet} onChange={e => updateExperienceBullet(idx, bIdx, e.target.value)} placeholder="Developed student dashboard features using Next.js, reducing load times..." />
                                                            <button className="btn-bullet-del" onClick={() => removeExperienceBullet(idx, bIdx)}>×</button>
                                                        </div>
                                                    ))}
                                                    <button className="btn-bullet-add" onClick={() => addExperienceBullet(idx)}>+ Add Bullet Description</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="btn-add-array" onClick={addExperience}>+ Add Work Experience Entry</button>
                                </div>
                            )}

                            {/* Projects */}
                            {activeSection === 'projects' && (
                                <div className="form-section-body">
                                    <h3 className="section-form-title">Academic & Personal Projects</h3>
                                    {resume.projects.map((proj, idx) => (
                                        <div key={idx} className="array-item-card">
                                            <div className="array-card-header">
                                                <span>Project Entry #{idx + 1}</span>
                                                <button className="btn-remove-array" onClick={() => removeProject(idx)}>Delete</button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-col-1">
                                                    <label>Project Title</label>
                                                    <input type="text" value={proj.title} onChange={e => updateProject(idx, 'title', e.target.value)} placeholder="VTUwise Study Resource Portal" />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Technologies Used</label>
                                                    <input type="text" value={proj.tech} onChange={e => updateProject(idx, 'tech', e.target.value)} placeholder="Next.js, TypeScript, TailwindCSS" />
                                                </div>
                                                <div className="form-col-2">
                                                    <label>Project Link / GitHub URL</label>
                                                    <input type="text" value={proj.link} onChange={e => updateProject(idx, 'link', e.target.value)} placeholder="github.com/vtuwise/portal" />
                                                </div>
                                                
                                                <div className="form-col-2">
                                                    <label>Project Details / Key Accomplishments</label>
                                                    {proj.bullets.map((bullet, bIdx) => (
                                                        <div key={bIdx} className="bullet-row-field">
                                                            <input type="text" value={bullet} onChange={e => updateProjectBullet(idx, bIdx, e.target.value)} placeholder="Designed interactive calculator clients using React, fetching over 10k users..." />
                                                            <button className="btn-bullet-del" onClick={() => removeProjectBullet(idx, bIdx)}>×</button>
                                                        </div>
                                                    ))}
                                                    <button className="btn-bullet-add" onClick={() => addProjectBullet(idx)}>+ Add Project Description</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="btn-add-array" onClick={addProject}>+ Add Project Entry</button>
                                </div>
                            )}

                            {/* Certifications */}
                            {activeSection === 'certifications' && (
                                <div className="form-section-body">
                                    <h3 className="section-form-title">Certifications & Achievements</h3>
                                    {resume.certifications.map((cert, idx) => (
                                        <div key={idx} className="array-item-card">
                                            <div className="array-card-header">
                                                <span>Certificate #{idx + 1}</span>
                                                <button className="btn-remove-array" onClick={() => removeCertification(idx)}>Delete</button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-col-1">
                                                    <label>Certificate Title</label>
                                                    <input type="text" value={cert.name} onChange={e => updateCertification(idx, 'name', e.target.value)} placeholder="AWS Certified Cloud Practitioner" />
                                                </div>
                                                <div className="form-col-1">
                                                    <label>Issuing Organization</label>
                                                    <input type="text" value={cert.issuer} onChange={e => updateCertification(idx, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
                                                </div>
                                                <div className="form-col-2">
                                                    <label>Date Earned / Year</label>
                                                    <input type="text" value={cert.date} onChange={e => updateCertification(idx, 'date', e.target.value)} placeholder="Jan 2025" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="btn-add-array" onClick={addCertification}>+ Add Certification Record</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Right Pane ATS Preview (Printed Layer) ── */}
                    <div className="builder-preview">
                        <h2 className="preview-label no-print">ATS Single Page Preview (A4 Page Scaling)</h2>
                        
                        <div className="resume-a4-page-frame">
                            <div className="resume-sheet">
                                {/* ATS Header */}
                                <header className="r-header">
                                    <h1 className="r-name">{resume.name || 'Your Full Name'}</h1>
                                    <p className="r-headline">{resume.headline || 'Your Professional Sub-Headline'}</p>
                                    
                                    <div className="r-contacts">
                                        {resume.email && <span>{resume.email}</span>}
                                        {resume.phone && <span>{resume.phone}</span>}
                                        {resume.location && <span>{resume.location}</span>}
                                        {resume.website && <span>{resume.website}</span>}
                                        {resume.github && <span>{resume.github}</span>}
                                        {resume.linkedin && <span>{resume.linkedin}</span>}
                                    </div>
                                </header>

                                {/* Education Section */}
                                {resume.education.some(e => e.school || e.degree) && (
                                    <section className="r-section">
                                        <h2 className="r-section-title">EDUCATION</h2>
                                        <div className="r-divider" />
                                        {resume.education.map((edu, idx) => (
                                            <div key={idx} className="r-block">
                                                <div className="r-block-row">
                                                    <span className="r-bold">{edu.school || 'University Name'}</span>
                                                    <span className="r-normal">{edu.location}</span>
                                                </div>
                                                <div className="r-block-row subtitle-row">
                                                    <span className="r-italic">{edu.degree || 'Degree details'}</span>
                                                    <span className="r-italic">{edu.date}</span>
                                                </div>
                                                {edu.gpa && <div className="r-detail-text">GPA / CGPA Metric: {edu.gpa}</div>}
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {/* Skills Section */}
                                {(resume.skills.languages || resume.skills.frameworks || resume.skills.tools || resume.skills.concepts) && (
                                    <section className="r-section">
                                        <h2 className="r-section-title">TECHNICAL SKILLS</h2>
                                        <div className="r-divider" />
                                        <div className="r-skills-list">
                                            {resume.skills.languages && (
                                                <div><strong>Languages:</strong> {resume.skills.languages}</div>
                                            )}
                                            {resume.skills.frameworks && (
                                                <div><strong>Frameworks & Libraries:</strong> {resume.skills.frameworks}</div>
                                            )}
                                            {resume.skills.tools && (
                                                <div><strong>Developer Tools & Database Systems:</strong> {resume.skills.tools}</div>
                                            )}
                                            {resume.skills.concepts && (
                                                <div><strong>Core Engineering Areas:</strong> {resume.skills.concepts}</div>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* Work Experience Section */}
                                {resume.experience.some(x => x.company || x.role) && (
                                    <section className="r-section">
                                        <h2 className="r-section-title">WORK EXPERIENCE</h2>
                                        <div className="r-divider" />
                                        {resume.experience.map((exp, idx) => (
                                            <div key={idx} className="r-block">
                                                <div className="r-block-row">
                                                    <span className="r-bold">{exp.company || 'Company Name'}</span>
                                                    <span className="r-normal">{exp.location}</span>
                                                </div>
                                                <div className="r-block-row subtitle-row">
                                                    <span className="r-italic">{exp.role || 'Job Role'}</span>
                                                    <span className="r-italic">{exp.date}</span>
                                                </div>
                                                <ul className="r-bullets">
                                                    {exp.bullets.map((b, bIdx) => (
                                                        b ? <li key={bIdx}>{b}</li> : null
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {/* Projects Section */}
                                {resume.projects.some(p => p.title) && (
                                    <section className="r-section">
                                        <h2 className="r-section-title">ACADEMIC & PERSONAL PROJECTS</h2>
                                        <div className="r-divider" />
                                        {resume.projects.map((proj, idx) => (
                                            <div key={idx} className="r-block">
                                                <div className="r-block-row">
                                                    <div>
                                                        <span className="r-bold">{proj.title || 'Project Name'}</span>
                                                        {proj.tech && <span className="r-muted"> ({proj.tech})</span>}
                                                    </div>
                                                    {proj.link && <span className="r-normal">{proj.link}</span>}
                                                </div>
                                                <ul className="r-bullets">
                                                    {proj.bullets.map((b, bIdx) => (
                                                        b ? <li key={bIdx}>{b}</li> : null
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {/* Certifications Section */}
                                {resume.certifications.some(c => c.name) && (
                                    <section className="r-section">
                                        <h2 className="r-section-title">CERTIFICATIONS & ACHIEVEMENTS</h2>
                                        <div className="r-divider" />
                                        <div className="r-certifications">
                                            {resume.certifications.map((cert, idx) => (
                                                <div key={idx} className="r-cert-row">
                                                    <span><strong>{cert.name || 'Certification Name'}</strong> — {cert.issuer}</span>
                                                    <span>{cert.date}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .builder-page {
                    background: var(--background);
                    min-height: 90vh;
                }

                .builder-header {
                    background: linear-gradient(135deg, #311055 0%, #1a103c 100%);
                    padding: 2.5rem 1.5rem 2rem;
                    color: white;
                }

                .builder-header-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                @media (min-width: 860px) {
                    .builder-header-inner {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }

                .builder-eyebrow {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.15em;
                    color: rgba(196, 181, 253, 0.9);
                    text-transform: uppercase;
                    margin-bottom: 0.4rem;
                    display: block;
                }

                .builder-title {
                    font-size: 2rem;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                }

                .builder-actions-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .btn-builder-utility {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1.5px solid rgba(255, 255, 255, 0.15);
                    color: white;
                    padding: 0.6rem 1.1rem;
                    border-radius: 0.75rem;
                    font-size: 0.82rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-builder-utility:hover {
                    background: rgba(255, 255, 255, 0.16);
                }

                .btn-download-pdf {
                    background: var(--gradient);
                    color: white;
                    border: none;
                    padding: 0.65rem 1.4rem;
                    border-radius: 0.75rem;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .btn-download-pdf:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
                }

                .builder-container {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 2.5rem 1.5rem 5rem;
                }

                .builder-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                    align-items: start;
                }

                @media (min-width: 1024px) {
                    .builder-layout {
                        grid-template-columns: 1.1fr 1fr;
                    }
                }

                /* Left pane input forms styling */
                .builder-forms {
                    background: var(--surface);
                    border: 1px solid var(--surface-border);
                    border-radius: 1.5rem;
                    box-shadow: var(--card-shadow);
                    overflow: hidden;
                }

                .section-tabs-bar {
                    display: flex;
                    flex-wrap: wrap;
                    background: var(--background);
                    border-bottom: 1px solid var(--surface-border);
                    padding: 0.5rem;
                    gap: 0.25rem;
                }

                .tab-btn {
                    padding: 0.55rem 0.95rem;
                    border: none;
                    background: none;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    font-weight: 700;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: background 0.2s, color 0.2s;
                }

                .tab-btn:hover {
                    color: var(--text);
                    background: rgba(0, 0, 0, 0.03);
                }

                .tab-btn.active {
                    background: var(--surface);
                    color: var(--primary);
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                }

                .tab-content-panel {
                    padding: 2rem;
                }

                .section-form-title {
                    font-size: 1.2rem;
                    font-weight: 850;
                    color: var(--text);
                    margin-bottom: 1.5rem;
                    border-bottom: 2px solid var(--background);
                    padding-bottom: 0.5rem;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.25rem;
                }

                .form-col-1 {
                    grid-column: span 1;
                }

                .form-col-2 {
                    grid-column: span 2;
                }

                .form-grid label {
                    display: block;
                    font-size: 0.78rem;
                    font-weight: 800;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    margin-bottom: 0.4rem;
                }

                .form-grid input {
                    width: 100%;
                    background: var(--background);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 0.6rem;
                    padding: 0.55rem 0.8rem;
                    font-size: 0.92rem;
                    font-weight: 700;
                    color: var(--text);
                    outline: none;
                    transition: border-color 0.2s;
                }

                .form-grid input:focus {
                    border-color: var(--primary);
                }

                /* Array Items */
                .array-item-card {
                    background: var(--background);
                    border: 1.5px solid var(--surface-border);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .array-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: var(--text);
                    margin-bottom: 1.25rem;
                    border-bottom: 1px solid var(--surface-border);
                    padding-bottom: 0.6rem;
                }

                .btn-remove-array {
                    background: none;
                    border: none;
                    color: #ef4444;
                    font-size: 0.78rem;
                    font-weight: 800;
                    cursor: pointer;
                    text-transform: uppercase;
                }

                .btn-add-array {
                    width: 100%;
                    background: none;
                    border: 1.5px dashed var(--surface-border);
                    color: var(--primary);
                    padding: 0.75rem;
                    border-radius: 0.9rem;
                    font-weight: 800;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                }

                .btn-add-array:hover {
                    border-color: var(--primary);
                    background: rgba(79, 70, 229, 0.03);
                }

                /* Bullet Point Lists */
                .bullet-row-field {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .btn-bullet-del {
                    background: none;
                    border: none;
                    color: #ef4444;
                    font-size: 1.2rem;
                    font-weight: 900;
                    cursor: pointer;
                    padding: 0 0.4rem;
                }

                .btn-bullet-add {
                    background: none;
                    border: none;
                    color: var(--primary);
                    font-size: 0.78rem;
                    font-weight: 800;
                    cursor: pointer;
                    margin-top: 0.4rem;
                    display: block;
                }

                /* Right ATS Preview pane */
                .builder-preview {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .preview-label {
                    font-size: 0.9rem;
                    font-weight: 850;
                    color: var(--text);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .resume-a4-page-frame {
                    background: #f1f5f9;
                    border: 1.5px solid var(--surface-border);
                    border-radius: 1.25rem;
                    padding: 2rem 1rem;
                    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.04);
                    display: flex;
                    justify-content: center;
                    overflow: auto;
                }

                .resume-sheet {
                    background: #ffffff;
                    width: 794px; /* A4 Ratio Standard Dimensions */
                    min-height: 1123px;
                    padding: 40px 50px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
                    font-family: 'Times New Roman', Times, serif; /* ATS Standard clean serif font */
                    color: #111111;
                    line-height: 1.35;
                    font-size: 11pt;
                    text-align: left;
                    box-sizing: border-box;
                    transform-origin: top center;
                }

                /* Zoom preview slightly for laptop responsiveness */
                @media (max-width: 1200px) {
                    .resume-sheet {
                        transform: scale(0.85);
                    }
                    .resume-a4-page-frame {
                        max-height: 980px;
                    }
                }

                @media (max-width: 860px) {
                    .resume-sheet {
                        transform: scale(0.68);
                    }
                    .resume-a4-page-frame {
                        max-height: 780px;
                    }
                }

                /* Clean ATS Typography rules */
                .r-header {
                    text-align: center;
                    margin-bottom: 12pt;
                }

                .r-name {
                    font-size: 19pt;
                    font-weight: bold;
                    margin-bottom: 2pt;
                    letter-spacing: -0.2px;
                    font-family: inherit;
                    color: #111111;
                }

                .r-headline {
                    font-size: 11pt;
                    font-style: italic;
                    color: #444444;
                    margin-bottom: 6pt;
                }

                .r-contacts {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 6pt 10pt;
                    font-size: 9.5pt;
                    color: #333333;
                }

                .r-contacts span:not(:last-child)::after {
                    content: " • ";
                    margin-left: 10pt;
                    color: #888888;
                }

                .r-section {
                    margin-bottom: 11pt;
                }

                .r-section-title {
                    font-size: 11pt;
                    font-weight: bold;
                    letter-spacing: 0.5px;
                    color: #111111;
                    margin: 0;
                }

                .r-divider {
                    height: 1px;
                    background: #111111;
                    margin: 2pt 0 6pt;
                }

                .r-block {
                    margin-bottom: 8pt;
                }

                .r-block-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    font-size: 10.5pt;
                }

                .r-block-row.subtitle-row {
                    font-size: 9.5pt;
                    margin-top: 1pt;
                }

                .r-bold {
                    font-weight: bold;
                }

                .r-italic {
                    font-style: italic;
                }

                .r-muted {
                    color: #555555;
                    font-style: italic;
                    font-size: 9.5pt;
                }

                .r-normal {
                    font-size: 9.5pt;
                }

                .r-detail-text {
                    font-size: 9.5pt;
                    margin-top: 2pt;
                    color: #333333;
                }

                .r-skills-list {
                    font-size: 9.5pt;
                    display: flex;
                    flex-direction: column;
                    gap: 3pt;
                }

                .r-skills-list div {
                    line-height: 1.4;
                }

                .r-bullets {
                    padding-left: 14pt;
                    margin: 3pt 0 0;
                    font-size: 9.5pt;
                    list-style-type: disc;
                }

                .r-bullets li {
                    margin-bottom: 2.5pt;
                    line-height: 1.35;
                }

                .r-certifications {
                    display: flex;
                    flex-direction: column;
                    gap: 3pt;
                    font-size: 9.5pt;
                }

                .r-cert-row {
                    display: flex;
                    justify-content: space-between;
                }

                /* ── Print Specific Stylesheets ── */
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    
                    /* Reset workspace containers */
                    body, .builder-page, .builder-container, .builder-layout {
                        background: #ffffff !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        min-height: 0 !important;
                        box-shadow: none !important;
                    }

                    footer, .navbar, .top-bar, .back-to-top {
                        display: none !important;
                    }

                    .builder-preview {
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    .resume-a4-page-frame {
                        background: #ffffff !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        overflow: visible !important;
                        max-height: none !important;
                        display: block !important;
                    }

                    .resume-sheet {
                        transform: scale(1) !important;
                        width: 100% !important;
                        min-height: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        font-size: 10.5pt !important;
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
}
