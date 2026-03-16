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

    // Load the ad
    (adsbygoogle = window.adsbygoogle || []).push({});

    const skipBtn = document.getElementById("ad-skip-btn");
    const countdownEl = document.getElementById("ad-countdown");
    let targetUrl = "";
    let countdownInterval;

    // 2. Function to show ad and start countdown
    function showAd(url) {
        targetUrl = url;
        adOverlay.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
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
            window.location.href = targetUrl;
        }
    }

    skipBtn.addEventListener("click", closeAd);

    // 4. Intercept clicks on any .btn-preview links
    // Use event delegation for dynamically loaded content
    document.addEventListener("click", (e) => {
        // Find closest .btn-preview in case of nested elements
        const previewBtn = e.target.closest(".btn-preview");
        if (previewBtn && previewBtn.tagName === "A") {
            e.preventDefault();
            const href = previewBtn.href;
            if (href) {
                showAd(href);
            }
        }
    });
});
