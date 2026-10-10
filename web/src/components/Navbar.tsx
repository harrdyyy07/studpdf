'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileCalcOpen, setIsMobileCalcOpen] = useState(false);
    const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
    const [isMobileLegalOpen, setIsMobileLegalOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [showTopBar, setShowTopBar] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        const hideTopBar = sessionStorage.getItem('hideTopBar') === 'true';
        setShowTopBar(!hideTopBar);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle body scroll locking when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeTopBar = () => {
        setShowTopBar(false);
        sessionStorage.setItem('hideTopBar', 'true');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            {showTopBar && (
                <div className="top-bar" id="announcement-bar">
                    <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
                        📢 VTU Semester Results & SGPA/CGPA Calculators Updated — <Link href="/student-tools/vtu-results" style={{ color: '#fbbf24', textDecoration: 'underline', fontWeight: 800, marginLeft: '4px' }}>Check Yours Now ➔</Link>
                    </span>
                    <button className="top-bar-close" onClick={closeTopBar} aria-label="Close Announcement">&times;</button>
                </div>
            )}
            
            <div className="container nav-content">
                <button 
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    onClick={toggleMenu}
                >
                    <span className="hamburger"></span>
                </button>
                
                <Link href="/" className="logo">VTU<span> wise.</span></Link>
                
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-drawer-header">
                        <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>VTU<span> wise.</span></Link>
                        <button className="drawer-close" onClick={toggleMenu} aria-label="Close Menu">&times;</button>
                    </div>
                    <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                    
                    <li className={`dropdown ${isMobileCalcOpen ? 'mobile-open' : ''}`}>
                        <span className="dropdown-toggle" onClick={() => setIsMobileCalcOpen(!isMobileCalcOpen)}>
                            Calculator <span className="dropdown-arrow">▾</span>
                        </span>
                        <div className="dropdown-menu">
                            <Link href="/sgpa-calculator" onClick={() => setIsMenuOpen(false)}>SGPA Calculator</Link>
                            <Link href="/cgpa-calculator" onClick={() => setIsMenuOpen(false)}>CGPA Calculator</Link>
                            <Link href="/student-tools/vtu-results" onClick={() => setIsMenuOpen(false)}>VTU Results</Link>
                        </div>
                    </li>

                    <li className={`dropdown ${isMobileToolsOpen ? 'mobile-open' : ''}`}>
                        <span className="dropdown-toggle" onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}>
                            Tools <span className="dropdown-arrow">▾</span>
                        </span>
                        <div className="dropdown-menu">
                            <a 
                                href="https://seal-pdf.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => setIsMenuOpen(false)}
                                style={{ 
                                    fontWeight: 800, 
                                    color: '#4f46e5',
                                    background: 'rgba(79, 70, 229, 0.08)',
                                    borderRadius: '8px'
                                }}
                            >
                                🦭 Seal PDF Suite (Free) 🔥
                            </a>
                            <Link href="/student-tools" onClick={() => setIsMenuOpen(false)}>All Tools</Link>
                            <Link href="/student-tools/resume-builder" onClick={() => setIsMenuOpen(false)}>Resume Builder</Link>
                            <Link href="/student-tools/code-practice" onClick={() => setIsMenuOpen(false)}>Code Practice</Link>
                            <Link href="/student-tools/quiz" onClick={() => setIsMenuOpen(false)}>Quiz Arena</Link>
                            <Link href="/student-tools/typing-test" onClick={() => setIsMenuOpen(false)}>Typing Test</Link>
                        </div>
                    </li>
                    
                    <li><Link href="/upload" onClick={() => setIsMenuOpen(false)}>Upload</Link></li>
                    <li><Link href="/student-tools/vtu-results" onClick={() => setIsMenuOpen(false)}>Results</Link></li>
                    <li><a href="https://vtu.ac.in/en/category/examination/" target="_blank" rel="noopener noreferrer">Academics</a></li>
                    <li className={`dropdown ${isMobileLegalOpen ? 'mobile-open' : ''}`}>
                        <span className="dropdown-toggle" onClick={() => setIsMobileLegalOpen(!isMobileLegalOpen)}>
                            Legal <span className="dropdown-arrow">▾</span>
                        </span>
                        <div className="dropdown-menu">
                            <Link href="/legal/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                            <Link href="/legal/privacy" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
                            <Link href="/legal/terms" onClick={() => setIsMenuOpen(false)}>Terms &amp; Conditions</Link>
                            <Link href="/legal/disclaimer" onClick={() => setIsMenuOpen(false)}>Disclaimer</Link>
                            <Link href="/legal/faqs" onClick={() => setIsMenuOpen(false)}>FAQs</Link>
                            <Link href="/legal/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                        </div>
                    </li>
                    
                    <li className="mobile-only-action">
                        <button className="theme-switch" aria-label="Toggle Theme" onClick={toggleTheme}>
                            <svg className="icon-moon-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            <div className="switch-knob"></div>
                            <svg className="icon-sun-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        </button>
                    </li>
                    <li className="mobile-only-action">
                        <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" rel="noopener noreferrer" className="btn-join-mobile">Join Us</a>
                    </li>
                </ul>

                <div className="nav-actions">
                    <button className="nav-search-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                    
                    <div className="nav-separator"></div>

                    <button className="theme-switch" aria-label="Toggle Theme" onClick={toggleTheme}>
                        <svg className="icon-moon-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        <div className="switch-knob"></div>
                        <svg className="icon-sun-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </button>
                    
                    <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" rel="noopener noreferrer" className="btn-join">Join Us</a>
                </div>
            </div>
            {isMenuOpen && <div className="mobile-overlay active" onClick={toggleMenu}></div>}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;
