'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

const slides = [
    {
        id: 1,
        title: "Download VTU wise. App",
        desc: "Get instant access to VTU Notes, Papers, and updates on your phone.",
        btnText: "GET APP",
        btnLink: null, // handled by PWA install
        bg: "linear-gradient(135deg, #0B1120, #1E293B)",
        bgText: "APP",
        isInstall: true,
    },
    {
        id: 2,
        title: "Calculate Your SGPA",
        desc: "Easily calculate your Semester Grade Point Average with our modern calculator.",
        btnText: "CALCULATE SGPA",
        btnLink: "/sgpa-calculator",
        bg: "linear-gradient(135deg, #4F46E5, #4338ca)",
        bgText: "SGPA",
        isInstall: false,
    },
    {
        id: 3,
        title: "Previous Year Question Papers",
        desc: "Practice with officially solved previous year question papers to score high in exams.",
        btnText: "EXPLORE PAPERS",
        btnLink: "/previous-year-question-papers",
        bg: "linear-gradient(135deg, #2D3748, #1A202C)",
        bgText: "PYQP",
        isInstall: false,
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const router = useRouter();

    // Capture the PWA install prompt event
    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);

        // Detect if already installed
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setInstallStatus('installed');
            setInstallPrompt(null);
        });

        // Check display mode
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
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const handleInstall = async (e: React.MouseEvent) => {
        e.stopPropagation(); // don't trigger slide click
        if (!installPrompt) {
            // Fallback: inform user to use browser's install option
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
        if (slide.isInstall) {
            // Simulate click on the install button instead
            return;
        }
        if (slide.btnLink) {
            router.push(slide.btnLink);
        }
    };

    // Touch/drag support for swipe
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
        return 'GET APP';
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
                                    {slide.bgText || slide.title.split(' ').slice(-1)}
                                </div>
                                <div className="slide-content-wrapper">
                                    <div className="slide-main-content">
                                        <h1>{slide.title.split(' ').slice(0, -1).join(' ')} <br/><span>{slide.title.split(' ').slice(-1)}</span></h1>
                                        <p>{slide.desc}</p>
                                        {slide.isInstall ? (
                                            <button
                                                className={`btn-download-slider btn-install-pwa ${installStatus === 'installed' || isInstalled ? 'installed' : ''}`}
                                                onClick={handleInstall}
                                                disabled={installStatus === 'installing' || installStatus === 'installed' || isInstalled}
                                                aria-label="Install VTUwise as a desktop app"
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
                                            <span className="btn-download-slider">{slide.btnText}</span>
                                        )}
                                    </div>
                                    <div className="slide-footer-meta">WWW.VTUWISE.IN</div>
                                </div>
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

// Extend Window interface for TypeScript
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default HeroSlider;
