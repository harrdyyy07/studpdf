document.addEventListener("DOMContentLoaded", () => {
    // 1. Create the ad overlay UI dynamically
    const adOverlay = document.createElement("div");
    adOverlay.id = "ad-overlay";
    adOverlay.innerHTML = `
        <div class="ad-modal">
            <div class="ad-header">
                <h3>Advertisement</h3>
                <span id="ad-countdown">5</span>
            </div>
            <div class="ad-content">
                <!-- Google AdSense Code -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-5780720681894064"
                     data-ad-slot="7758281762" /* USER WILL NEED TO UPDATE THIS */
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
            <div class="ad-footer">
                <button id="ad-skip-btn" class="btn-primary" disabled>Please wait...</button>
            </div>
        </div>
    `;
    document.body.appendChild(adOverlay);

    // Flag to ensure we only push once or handle multiple pushes correctly
    let adPushed = false;
    let skipBtn, countdownEl, targetUrl, countdownInterval;

    // Wait until elements are in DOM
    skipBtn = document.getElementById("ad-skip-btn");
    countdownEl = document.getElementById("ad-countdown");
    targetUrl = "";
    countdownInterval = null;

    // 2. Function to show ad and start countdown
    function showAd(url) {
        targetUrl = url;
        adOverlay.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
        console.log("Ad modal shown. Preparing to request ad...");

        // Trigger Google Ad push ONLY when visible
        if (!adPushed) {
            setTimeout(() => {
                try {
                    if (window.adsbygoogle) {
                        console.log("Pushing ad request to Google...");
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        adPushed = true;
                    } else {
                        console.warn("Google AdSense script (adsbygoogle.js) is not loaded or is blocked by an AdBlocker.");
                    }
                } catch (e) {
                    console.error("Adsbygoogle push error:", e);
                }
            }, 500); // 500ms delay to ensure full visibility
        }
        
        let timeLeft = 5;
        countdownEl.textContent = timeLeft;
        skipBtn.disabled = true;
        skipBtn.textContent = "Please wait...";

        countdownInterval = setInterval(() => {
            timeLeft--;
            countdownEl.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                skipBtn.disabled = false;
                skipBtn.textContent = "Skip Ad \u00BB";
                // Optionally auto-redirect: window.location.href = targetUrl;
            }
        }, 1000);
    }

    // 3. Close Ad / Skip
    function closeAd() {
        clearInterval(countdownInterval);
        adOverlay.style.display = "none";
        document.body.style.overflow = ""; // Restore scrolling
        
        if (targetUrl) {
            // Trigger the existing iframe preview from nav.js
            const modal = document.getElementById('pdf-preview-modal');
            const iframe = document.getElementById('pdf-preview-iframe');
            const spinner = document.getElementById('pdf-loading-spinner');
            const titleEl = document.querySelector('.pdf-modal-title');

            if (modal && iframe) {
                let link = targetUrl;
                // Format Google Drive links
                if (link.includes('drive.google.com/file/d/')) {
                    link = link.replace(/\/view.*?$/, '/preview');
                }

                if (titleEl && originalTitle) {
                    titleEl.textContent = originalTitle;
                }

                iframe.src = link;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                if (spinner) {
                    spinner.style.display = 'block';
                    iframe.onload = () => {
                        spinner.style.display = 'none';
                    };
                }
            } else {
                // Fallback if modal isn't initialized yet
                window.location.href = targetUrl;
            }
        }
    }

    let originalTitle = "";

    skipBtn.addEventListener("click", closeAd);

    // 4. Intercept clicks on any .btn-preview links
    document.addEventListener("click", (e) => {
        const previewBtn = e.target.closest(".btn-preview");
        if (previewBtn && previewBtn.tagName === "A") {
            e.preventDefault();
            e.stopImmediatePropagation(); // Prevent nav.js from showing the iframe modal immediately
            
            const href = previewBtn.href;
            
            // Capture original title from module card if available
            const card = previewBtn.closest('.module-card');
            if (card) {
                const title = card.querySelector('h3');
                originalTitle = title ? title.textContent : "Document Preview";
            } else {
                originalTitle = "Document Preview";
            }

            if (href) {
                showAd(href);
            }
        }
    }, true); // Use capture to intercept before nav.js
});
