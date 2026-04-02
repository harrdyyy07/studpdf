'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: "Download VTU wise. App",
        desc: "Get instant access to VTU Notes, Papers, and updates on your phone.",
        btnText: "GET APP",
        btnLink: "/app",
        bg: "linear-gradient(135deg, #0B1120, #1E293B)",
        bgText: "APP"
    },
    {
        id: 2,
        title: "Calculate Your SGPA",
        desc: "Easily calculate your Semester Grade Point Average with our modern calculator.",
        btnText: "CALCULATE SGPA",
        btnLink: "/sgpa-calculator",
        bg: "linear-gradient(135deg, #4F46E5, #4338ca)",
        bgText: "SGPA"
    },
    {
        id: 3,
        title: "Previous Year Question Papers",
        desc: "Practice with officially solved previous year question papers to score high in exams.",
        btnText: "EXPLORE PAPERS",
        btnLink: "/previous-year-question-papers",
        bg: "linear-gradient(135deg, #2D3748, #1A202C)",
        bgText: "PYQP"
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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
                                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                                style={{ background: slide.bg }}
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
                                        <Link href={slide.btnLink} className="btn-download-slider">{slide.btnText}</Link>
                                    </div>
                                    <div className="slide-footer-meta">WWW.VTUWISE.IN</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous Slide">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className="slider-arrow next" onClick={nextSlide} aria-label="Next Slide">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                    
                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <button 
                                key={index} 
                                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </header>
            </div>
        </section>
    );
};

export default HeroSlider;
