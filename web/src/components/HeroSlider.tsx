'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const slides = [
    {
        id: 1,
        tag: "✨ OFFICIAL VTU PORTAL",
        title: "Check VTU Semester Results",
        desc: "Instant result lookup with detailed grade breakdowns and verified marksheets.",
        btnText: "CHECK RESULTS NOW",
        btnLink: "/student-tools/vtu-results",
        bg: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4338ca 100%)",
        bgText: "RESULTS",
        isInstall: false,
        type: "marksheet"
    },
    {
        id: 2,
        tag: "📱 MOBILE APP AVAILABLE",
        title: "Download VTU wise App",
        desc: "Get instant access to notes, papers, and result updates on your phone.",
        btnText: "GET APP NOW",
        btnLink: null,
        bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        bgText: "APP",
        isInstall: true,
        type: "phone"
    },
    {
        id: 3,
        tag: "📊 ACCURATE GRADE CALCULATOR",
        title: "Calculate Your SGPA & CGPA",
        desc: "Easily calculate your semester grades with 2022 & 2025 scheme support.",
        btnText: "CALCULATE SGPA",
        btnLink: "/sgpa-calculator",
        bg: "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)",
        bgText: "SGPA",
        isInstall: false,
        type: "calculator"
    },
    {
        id: 4,
        tag: "🧠 PLACEMENT PREPARATION",
        title: "Placement Aptitude Test",
        desc: "Master quantitative, logical, and verbal aptitude with timed mock tests.",
        btnText: "TAKE APTITUDE TEST",
        btnLink: "/student-tools/aptitude-test",
        bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        bgText: "TEST",
        isInstall: false,
        type: "aptitude"
    },
    {
        id: 5,
        tag: "📄 CAREER BUILDER",
        title: "AI Resume Builder",
        desc: "Build professional, ATS-friendly engineering resumes with instant PDF export.",
        btnText: "BUILD YOUR RESUME",
        btnLink: "/student-tools/resume-builder",
        bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #3730a3 100%)",
        bgText: "RESUME",
        isInstall: false,
        type: "resume"
    },
    {
        id: 6,
        tag: "📚 EXAM PREPARATION ARCHIVE",
        title: "Previous Question Papers",
        desc: "Practice with officially solved VTU semester papers to score high in exams.",
        btnText: "EXPLORE PAPERS",
        btnLink: "/previous-year-question-papers",
        bg: "linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #4c1d95 100%)",
        bgText: "PYQP",
        isInstall: false,
        type: "papers"
    }
];

const MarksheetIllustration = () => (
    <div className="hero-illustration marksheet-illustration">
        <div className="glass-card marksheet-card">
            <div className="marksheet-header">
                <div className="marksheet-logo">
                    <span className="logo-dot"></span>
                    <span>VTU OFFICIAL MARKSHEET</span>
                </div>
                <span className="marksheet-badge-live">LIVE</span>
            </div>
            
            <div className="marksheet-body">
                <div className="marksheet-student-info">
                    <div className="info-bar name">STUDENT: VTU CANDIDATE</div>
                    <div className="info-bar usn">USN: 1VT22CS001</div>
                </div>
                
                <div className="marksheet-table">
                    <div className="table-row head">
                        <span>CODE</span>
                        <span>SUBJECT</span>
                        <span>GRADE</span>
                    </div>
                    <div className="table-row">
                        <span className="sub-code">21CS61</span>
                        <span>Software Engg</span>
                        <span className="grade-pill grade-o">O</span>
                    </div>
                    <div className="table-row">
                        <span className="sub-code">21CS62</span>
                        <span>Fullstack Dev</span>
                        <span className="grade-pill grade-o">S+</span>
                    </div>
                    <div className="table-row">
                        <span className="sub-code">21CS63</span>
                        <span>Computer Nets</span>
                        <span className="grade-pill grade-a">A+</span>
                    </div>
                </div>
            </div>

            <div className="floating-sgpa-badge">
                <div className="badge-sparkle">✨</div>
                <div className="badge-val">9.82</div>
                <div className="badge-lbl">SGPA DISTINCTION</div>
            </div>
            
            <div className="marksheet-stamp">
                ✓ VERIFIED
            </div>
        </div>
    </div>
);

const PhoneIllustration = () => (
    <div className="hero-illustration phone-illustration">
        <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
                <div className="app-header">
                    <div className="app-logo">VTU<span>wise</span></div>
                    <div className="app-bell">🔔</div>
                </div>
                <div className="app-banner">
                    <div className="app-banner-title">VTU Notes & Papers</div>
                    <div className="app-banner-sub">Free PDF Downloads</div>
                </div>
                <div className="app-grid">
                    <div className="app-card-mini">
                        <div className="app-icon">📚</div>
                        <span>Notes</span>
                    </div>
                    <div className="app-card-mini">
                        <div className="app-icon">📝</div>
                        <span>PYQPs</span>
                    </div>
                    <div className="app-card-mini">
                        <div className="app-icon">📊</div>
                        <span>Results</span>
                    </div>
                    <div className="app-card-mini">
                        <div className="app-icon">🧮</div>
                        <span>SGPA</span>
                    </div>
                </div>
                <div className="app-cta-btn">
                    <span>GET APP INSTANTLY</span>
                </div>
            </div>
        </div>
        <div className="floating-app-badge float-item-1">
            <span>⚡ Instant PWA</span>
        </div>
        <div className="floating-app-badge float-item-2">
            <span>📥 Offline Notes</span>
        </div>
    </div>
);

const SGPACalculatorIllustration = () => (
    <div className="hero-illustration calc-illustration">
        <div className="glass-card calc-card">
            <div className="calc-header">
                <div className="calc-title">🧮 SGPA CALCULATOR</div>
                <div className="calc-scheme-pill">2022 SCHEME</div>
            </div>
            <div className="calc-inputs-demo">
                <div className="calc-row">
                    <span className="course-name">Maths - IV</span>
                    <span className="credit-pill">4 Cr</span>
                    <span className="grade-badge grade-o">O (10)</span>
                </div>
                <div className="calc-row">
                    <span className="course-name">OS & Unix</span>
                    <span className="credit-pill">4 Cr</span>
                    <span className="grade-badge grade-s">S (9)</span>
                </div>
                <div className="calc-row">
                    <span className="course-name">Python Lab</span>
                    <span className="credit-pill">1.5 Cr</span>
                    <span className="grade-badge grade-o">O (10)</span>
                </div>
            </div>
            
            <div className="calc-result-display">
                <div className="result-circle">
                    <div className="result-num">8.92</div>
                    <div className="result-lbl">YOUR SGPA</div>
                </div>
            </div>
        </div>
    </div>
);

const AptitudeTestIllustration = () => (
    <div className="hero-illustration aptitude-illustration">
        <div className="glass-card aptitude-card">
            <div className="aptitude-header">
                <div className="aptitude-title">🎯 PLACEMENT TEST</div>
                <div className="aptitude-timer">⏱️ 14:32 LEFT</div>
            </div>
            
            <div className="aptitude-question-box">
                <div className="q-num-tag">QUESTION 04 / 20</div>
                <div className="q-text-demo">Find next term: 2, 6, 12, 20, 30, ?</div>
            </div>
            
            <div className="aptitude-options">
                <div className="opt-row">
                    <span className="opt-key">A</span>
                    <span>36</span>
                </div>
                <div className="opt-row selected">
                    <span className="opt-key">B</span>
                    <span>42</span>
                    <span className="opt-check">✓</span>
                </div>
                <div className="opt-row">
                    <span className="opt-key">C</span>
                    <span>40</span>
                </div>
            </div>

            <div className="floating-aptitude-badge">
                <span>🔥 Score 95% | Top 1%</span>
            </div>
        </div>
    </div>
);

const ResumeBuilderIllustration = () => (
    <div className="hero-illustration resume-illustration">
        <div className="glass-card resume-card">
            <div className="resume-header">
                <div className="resume-avatar">👨‍💻</div>
                <div className="resume-user-details">
                    <div className="resume-name">VTU CANDIDATE</div>
                    <div className="resume-role">Software Engineer</div>
                </div>
                <span className="resume-ats-pill">98/100 ATS</span>
            </div>
            
            <div className="resume-section-mini">
                <div className="sec-title">CORE SKILLS</div>
                <div className="skills-tags">
                    <span className="skill-chip">React</span>
                    <span className="skill-chip">Python</span>
                    <span className="skill-chip">DSA</span>
                    <span className="skill-chip">SQL</span>
                </div>
            </div>
            
            <div className="resume-section-mini">
                <div className="sec-title">PROJECT PREVIEW</div>
                <div className="project-preview">
                    <div className="proj-dot"></div>
                    <span>VTU Results & SGPA Calculator</span>
                </div>
            </div>

            <div className="floating-resume-tag">
                📄 Instant PDF Export
            </div>
        </div>
    </div>
);

const QuestionPapersIllustration = () => (
    <div className="hero-illustration paper-illustration">
        <div className="paper-stack">
            <div className="paper-sheet paper-layer-3"></div>
            <div className="paper-sheet paper-layer-2"></div>
            <div className="paper-sheet paper-layer-1">
                <div className="paper-header">
                    <div className="paper-vtulogo">VTU QUESTION PAPER</div>
                    <span className="paper-year-badge">2025 SOLVED</span>
                </div>
                <div className="paper-title-demo">CSE / ISE - 6th SEMESTER</div>
                <div className="paper-questions-demo">
                    <div className="q-item">Q1. (a) Operating System Architecture [10M]</div>
                    <div className="q-item">Q1. (b) Paging vs Segmentation [10M]</div>
                </div>
                <div className="paper-footer-badge">
                    <span className="pdf-badge">📄 SOLVED PDF ANSWER KEY</span>
                </div>
            </div>
            <div className="floating-paper-tag">
                🔥 100% Solved Papers
            </div>
        </div>
    </div>
);

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const router = useRouter();

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);

        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setInstallStatus('installed');
            setInstallPrompt(null);
        });

        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            setInstallStatus('installed');
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const handleInstall = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!installPrompt) {
            alert('To install: open your browser menu and tap "Install App" or "Add to Home Screen".');
            return;
        }
        setInstallStatus('installing');
        const promptEvent = installPrompt as BeforeInstallPromptEvent;
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
            setInstallStatus('installed');
            setIsInstalled(true);
        } else {
            setInstallStatus('idle');
        }
        setInstallPrompt(null);
    };

    const handleSlideClick = (slide: typeof slides[0]) => {
        if (isDragging.current) return;
        if (slide.isInstall) return;
        if (slide.btnLink) {
            router.push(slide.btnLink);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = false;
        dragStartX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (Math.abs(e.clientX - dragStartX.current) > 10) {
            isDragging.current = true;
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const diff = e.clientX - dragStartX.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0) nextSlide();
            else prevSlide();
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = false;
        dragStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - dragStartX.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0) nextSlide();
            else prevSlide();
        }
    };

    const getInstallBtnText = () => {
        if (installStatus === 'installed' || isInstalled) return '✓ APP INSTALLED';
        if (installStatus === 'installing') return 'INSTALLING...';
        return 'GET APP NOW';
    };

    return (
        <section className="hero-section">
            <div className="container">
                <header className="hero-slider">
                    <div
                        className="slider-track"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`hero-slide ${index === currentSlide ? 'active' : ''} ${!slide.isInstall ? 'slide-clickable' : ''}`}
                                style={{ background: slide.bg }}
                                onClick={() => handleSlideClick(slide)}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                role={!slide.isInstall ? 'link' : undefined}
                                tabIndex={index === currentSlide && !slide.isInstall ? 0 : -1}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !slide.isInstall && slide.btnLink) {
                                        router.push(slide.btnLink);
                                    }
                                }}
                            >
                                <div className="slide-blobs">
                                    <div className="blob blob-1"></div>
                                    <div className="blob blob-2"></div>
                                    <div className="blob blob-3"></div>
                                </div>
                                <div className="slide-pattern"></div>
                                <div className="slide-overlay"></div>
                                <div className="slide-bg-text">
                                    {slide.bgText}
                                </div>
                                
                                <div className="slide-content-grid">
                                    <div className="slide-main-content">
                                        <div className="slide-pill-tag">{slide.tag}</div>
                                        <h2 className="hero-title">{slide.title}</h2>
                                        <p className="hero-desc">{slide.desc}</p>
                                        
                                        <div className="hero-btn-group">
                                            {slide.isInstall ? (
                                                <button
                                                    className={`btn-download-slider btn-install-pwa ${installStatus === 'installed' || isInstalled ? 'installed' : ''}`}
                                                    onClick={handleInstall}
                                                    disabled={installStatus === 'installing' || installStatus === 'installed' || isInstalled}
                                                    aria-label="Install VTUwise app"
                                                >
                                                    <span className="btn-install-icon">
                                                        {(installStatus === 'installed' || isInstalled)
                                                            ? '✓'
                                                            : installStatus === 'installing'
                                                            ? '⏳'
                                                            : '⬇'}
                                                    </span>
                                                    {getInstallBtnText()}
                                                </button>
                                            ) : (
                                                <span className="btn-download-slider">
                                                    {slide.btnText} <span className="arrow-icon">➔</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="slide-illustration-col">
                                        {slide.type === 'marksheet' && <MarksheetIllustration />}
                                        {slide.type === 'phone' && <PhoneIllustration />}
                                        {slide.type === 'calculator' && <SGPACalculatorIllustration />}
                                        {slide.type === 'aptitude' && <AptitudeTestIllustration />}
                                        {slide.type === 'resume' && <ResumeBuilderIllustration />}
                                        {slide.type === 'papers' && <QuestionPapersIllustration />}
                                    </div>
                                </div>

                                <div className="slide-footer-meta">WWW.VTUWISE.IN</div>
                            </div>
                        ))}
                    </div>

                    <button className="slider-arrow prev" onClick={(e) => { e.stopPropagation(); prevSlide(); }} aria-label="Previous Slide">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className="slider-arrow next" onClick={(e) => { e.stopPropagation(); nextSlide(); }} aria-label="Next Slide">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>

                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </header>
            </div>
        </section>
    );
};

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default HeroSlider;
