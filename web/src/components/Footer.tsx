'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-column brand-column">
                    <Link href="/" className="logo">VTU<span> wise.</span></Link>
                    <p className="footer-desc">
                        VTU wise. Your comprehensive academic companion. 📚 Prepare effectively with expertly curated resources, thoughtfully created by students to support student success.
                    </p>
                    <div className="social-links">
                        <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                        <a href="https://t.me/+QrJoht_peUs2YTBl" target="_blank" rel="noopener noreferrer" className="social-icon telegram" aria-label="Telegram">
                            <svg viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.447-15.447L14.98 19.34c-.161.73-.591.91-1.222.556l-3.738-2.754-1.803 1.734c-.2.199-.368.366-.754.366l.268-3.803 6.923-6.25c.3-.268-.066-.416-.466-.148L5.65 14.975l-3.682-1.15c-.803-.25-.818-.803.167-1.189L16.4 7.221c.662-.25 1.242.148 1.047 1.332z"/></svg>
                        </a>
                    </div>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScKC-kBx14KBBDuFFzf2vltOMgVUz1L8mSDospLws4R2AOZJg/viewform" target="_blank" rel="noopener noreferrer" className="btn-upload-footer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12"/></svg>
                        Upload Notes
                    </a>
                </div>
                
                <div className="footer-column footer-dropdown">
                    <h4 className="footer-dropdown-toggle">POLICY DETAILS <i>▾</i></h4>
                    <ul className="footer-links footer-dropdown-menu">
                        <li><Link href="/legal/about">About</Link></li>
                        <li><Link href="/legal/terms">Terms and Conditions</Link></li>
                        <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                        <li><Link href="/legal/disclaimer">Disclaimer</Link></li>
                        <li><Link href="/legal/faqs">FAQs</Link></li>
                        <li><Link href="/legal/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-column footer-dropdown">
                    <h4 className="footer-dropdown-toggle">UNIVERSITY LINKS <i>▾</i></h4>
                    <ul className="footer-links footer-dropdown-menu">
                        <li><a href="https://vtu.ac.in/academic-calendar/" target="_blank" rel="noopener noreferrer">Academic Calendar</a></li>
                        <li><a href="https://results.vtu.ac.in/" target="_blank" rel="noopener noreferrer">VTU Result</a></li>
                        <li><a href="https://vtu.ac.in/model-question-paper-b-e-b-tech-b-arch/" target="_blank" rel="noopener noreferrer">VTU Model Paper</a></li>
                        <li><a href="https://vtu.ac.in/en/category/examination/" target="_blank" rel="noopener noreferrer">VTU Examination</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="container">
                    <p>© {new Date().getFullYear()} VTU wise. All Rights Reserved.</p>
                    <p className="footer-tagline">A student-focused initiative for educational resources.</p>
                </div>
            </div>
            
            <button 
                id="back-to-top" 
                className={`back-to-top ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
                aria-label="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ 
                    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none'
                }}
            >
                ↑
            </button>
        </footer>
    );
};

export default Footer;
