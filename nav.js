/**
 * Centralized Navigation for StudPDF
 */

// Theme Initialization (Immediate)
(function () {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
})();

const Navigation = {
    init: () => {
        const nav = document.getElementById('navbar');
        if (!nav) return;

        // Detect depth to adjust relative paths
        // This is a simple heuristic based on the number of slashes in the path
        const path = window.location.pathname;
        const depth = (path.match(/\//g) || []).length;

        // For local file testing (file:///...), path logic is different
        // We can check the number of levels relative to the project root
        // If we serve from root, we can use absolute paths like /index.html
        // But for static local files, we need relative markers ../

        // Let's rely on a data attribute on the body or script if we want real robustness,
        // or just calculate based on how many folders deep we are.
        // Assuming root is /studpdf/index.html or similar.

        // Simpler approach: Check how many "../" we need based on directory hierarchy
        let prefix = "";
        const href = window.location.href;
        if (href.includes('/first-year/semester-1/mathematics-for-cse/')) prefix = "../../../";
        else if (href.includes('/first-year/semester-1/')) prefix = "../../";
        else if (href.includes('/first-year/')) prefix = "../";
        else if (href.includes('/cse-computer-science/')) prefix = "../";
        else if (href.includes('/ece-electronics-communication/')) prefix = "../";
        else if (href.includes('/eee-electrical-electronics/')) prefix = "../";
        else if (href.includes('/mechanical-engineering/')) prefix = "../";
        else if (href.includes('/civil-engineering/')) prefix = "../";
        else if (href.includes('/calculators/')) prefix = "../";
        else if (href.includes('/legal/')) prefix = "../";

        const showTopBar = sessionStorage.getItem('hideTopBar') !== 'true';
        const topBarSection = showTopBar ? `
            <div class="top-bar" id="announcement-bar">
                <span>Free VTU Study Materials, Subject wise notes and Question Papers</span>
                <button class="top-bar-close" id="close-top-bar" aria-label="Close Announcement">&times;</button>
            </div>
        ` : '';

        const navHtml = `
            ${topBarSection}
            <div class="container nav-content">
                <button class="menu-toggle" aria-label="Open Menu">
                    <span class="hamburger"></span>
                </button>
                
                <a href="${prefix}index.html" class="logo">StudPDF</a>
                
                <ul class="nav-links">
                    <li><a href="${prefix}index.html">Home</a></li>
                    
                    <li class="dropdown">
                        <span class="dropdown-toggle">Calculator</span>
                        <div class="dropdown-menu">
                            <a href="${prefix}calculators/sgpa.html">SGPA Calculator</a>
                            <a href="${prefix}calculators/cgpa.html">CGPA Calculator</a>
                        </div>
                    </li>
                    
                    <li><a href="${prefix}upload.html">Upload</a></li>
                    <li><a href="${prefix}results.html">Results</a></li>
                    <li><a href="${prefix}academics.html">Academics</a></li>
                    <li><a href="${prefix}legal/index.html">Legal</a></li>

                    <!-- Mobile Specific Actions -->
                    <li class="mobile-only-action">
                        <div class="theme-switch" role="button" aria-label="Toggle Theme">
                            <svg class="icon-moon-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            <div class="switch-knob"></div>
                            <svg class="icon-sun-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        </div>
                    </li>
                    <li class="mobile-only-action">
                        <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" class="btn-join-mobile">Join Us</a>
                    </li>
                </ul>

                <div class="nav-actions">
                    <button class="nav-search-btn" aria-label="Search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                    
                    <div class="nav-separator"></div>

                    <div class="theme-switch" role="button" aria-label="Toggle Theme">
                        <svg class="icon-moon-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        <div class="switch-knob"></div>
                        <svg class="icon-sun-side" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </div>

                    <a href="https://whatsapp.com/channel/0029Vav2A1CEwEk0N2paBj3X" target="_blank" class="btn-join">Join Us</a>
                </div>
            </div>

            <!-- Full Page Search Overlay -->
            <div id="search-overlay" class="search-overlay">
                <div class="search-overlay-content">
                    <button class="search-close-btn">✕</button>
                    <h2>What are you looking for?</h2>
                    <div class="search-box-large">
                        <span class="search-icon-large">🔍</span>
                        <input type="text" id="site-search" placeholder="Type subject or code..." autocomplete="off">
                    </div>
                    <div class="quick-tags">
                        <span class="tag-label">Quick Search:</span>
                        <button class="search-tag" data-query="Semester 3">Semester 3</button>
                        <button class="search-tag" data-query="Mat">Mathematics</button>
                        <button class="search-tag" data-query="CSE">CSE Notes</button>
                    </div>
                    <div id="search-results-container">
                        <div id="search-results"></div>
                    </div>
                </div>
            </div>

            <div class="mobile-overlay"></div>
        `;

        nav.innerHTML = navHtml;

        // Navigation Logic
        const menuToggle = nav.querySelector('.menu-toggle');
        const navLinks = nav.querySelector('.nav-links');
        const mobileOverlay = nav.querySelector('.mobile-overlay');
        const searchBtn = nav.querySelector('.nav-search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = nav.querySelector('.search-close-btn');
        const themeSwitches = nav.querySelectorAll('.theme-switch');

        // Top Bar Close Logic
        const closeTopBarBtn = nav.querySelector('#close-top-bar');
        if (closeTopBarBtn) {
            closeTopBarBtn.addEventListener('click', () => {
                const topBar = nav.querySelector('#announcement-bar');
                if (topBar) {
                    topBar.style.display = 'none';
                }
                sessionStorage.setItem('hideTopBar', 'true');
            });
        }

        // Theme Logic
        themeSwitches.forEach(sw => {
            sw.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            });
        });

        // Drawer
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        // Search Overlay
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.getElementById('site-search').focus();
            document.body.style.overflow = 'hidden';
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Tag clicks
        nav.querySelectorAll('.search-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const input = document.getElementById('site-search');
                input.value = tag.dataset.query;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });

        // Mobile Dropdown Logic
        const dropdowns = nav.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Initialize footer
        Navigation.initFooter(prefix);

        // Initialize search logic after nav is ready
        if (typeof Search !== 'undefined' && Search.init) {
            Search.init();
        }
    },

    initFooter: (prefix) => {
        let footer = document.querySelector('footer');
        if (!footer) {
            footer = document.createElement('footer');
            document.body.appendChild(footer);
        }

        const footerHtml = `
            <div class="container footer-content">
                <div class="footer-column brand-column">
                    <a href="${prefix}index.html" class="logo">StudPDF <span class="logo-accent">wise.</span></a>
                    <p class="footer-desc">
                        StudPDF: Your comprehensive academic companion. 📚 Prepare effectively with expertly curated resources, thoughtfully created by students to support student success.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-icon whatsapp" aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                        <a href="#" class="social-icon telegram" aria-label="Telegram">
                            <svg viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.447-15.447L14.98 19.34c-.161.73-.591.91-1.222.556l-3.738-2.754-1.803 1.734c-.2.199-.368.366-.754.366l.268-3.803 6.923-6.25c.3-.268-.066-.416-.466-.148L5.65 14.975l-3.682-1.15c-.803-.25-.818-.803.167-1.189L16.4 7.221c.662-.25 1.242.148 1.047 1.332z"/></svg>
                        </a>
                        <a href="#" class="social-icon instagram" aria-label="Instagram">
                            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12c0 3.259.012 3.667.072 4.947.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558 1.28.059 1.688.073 4.947.073s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.059-1.28.073-1.688.073-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0m0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324M12 16a4 4 0 110-8 4 4 0 010 8m6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881"/></svg>
                        </a>
                    </div>
                    <a href="${prefix}upload.html" class="btn-upload">Upload Notes</a>
                </div>
                
                <div class="footer-column">
                    <h4>POLICY DETAILS</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}legal/about.html">About</a></li>
                        <li><a href="${prefix}legal/terms.html">Terms and Conditions</a></li>
                        <li><a href="${prefix}legal/privacy.html">Privacy Policy</a></li>
                        <li><a href="${prefix}legal/disclaimer.html">Disclaimer</a></li>
                        <li><a href="${prefix}legal/faqs.html">FAQs</a></li>
                        <li><a href="${prefix}legal/contact.html">Contact Us</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>UNIVERSITY LINKS</h4>
                    <ul class="footer-links">
                        <li><a href="#">Academic Calendar</a></li>
                        <li><a href="#">VTU Result</a></li>
                        <li><a href="#">VTU Model Paper</a></li>
                        <li><a href="#">VTU Examination</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="container">
                    <p>© 2026 StudPDF. All Rights Reserved.</p>
                    <p class="footer-tagline">A student-focused initiative for educational resources.</p>
                </div>
            </div>
        `;
        footer.innerHTML = footerHtml;
    }
};

document.addEventListener('DOMContentLoaded', Navigation.init);
