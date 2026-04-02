'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileCalcOpen, setIsMobileCalcOpen] = useState(false);
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

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
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
                        ⏳ June/July Exams are near! Prepare well!
                    </span>
                    <button className="top-bar-close" onClick={closeTopBar} aria-label="Close Announcement">&times;</button>
                </div>
            )}
            
            <div className="container nav-content">
                <button 
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
                    aria-label="Open Menu"
                    onClick={toggleMenu}
                >
                    <span className="hamburger"></span>
                </button>
                
                <Link href="/" className="logo">VTU<span> wise.</span></Link>
                
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-drawer-header">
                        <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>VTU<span> wise.</span></Link>
                        <button className="drawer-close" onClick={toggleMenu}>&times;</button>
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
                        </div>
                    </li>
                    
                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScKC-kBx14KBBDuFFzf2vltOMgVUz1L8mSDospLws4R2AOZJg/viewform" target="_blank" rel="noopener noreferrer">Upload</a></li>
                    <li><a href="https://results.vtu.ac.in/" target="_blank" rel="noopener noreferrer">Results</a></li>
                    <li><a href="https://vtu.ac.in/en/category/examination/" target="_blank" rel="noopener noreferrer">Academics</a></li>
                    <li><Link href="/legal" onClick={() => setIsMenuOpen(false)}>Legal</Link></li>
                    
                    <li className="mobile-only-action">
                        <div className="theme-switch" role="button" aria-label="Toggle Theme" onClick={toggleTheme}>
                            <svg className="icon-moon-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            <div className="switch-knob"></div>
                            <svg className="icon-sun-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        </div>
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

                    <div className="theme-switch" role="button" aria-label="Toggle Theme" onClick={toggleTheme}>
                        <svg className="icon-moon-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        <div className="switch-knob"></div>
                        <svg className="icon-sun-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </div>
                    
                    <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" rel="noopener noreferrer" className="btn-join">Join Us</a>
                </div>
            </div>
            {isMenuOpen && <div className="mobile-overlay active" onClick={toggleMenu}></div>}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;
