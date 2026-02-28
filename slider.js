class HeroSlider {
    constructor() {
        this.slider = document.querySelector('.hero-slider');
        this.track = document.querySelector('.slider-track');
        this.slides = Array.from(document.querySelectorAll('.hero-slide'));
        this.nextBtn = document.querySelector('.slider-arrow.next');
        this.prevBtn = document.querySelector('.slider-arrow.prev');

        this.currentIndex = 0;
        this.autoplayInterval = 1500; // 1.5s as observed on vtusync.in
        this.autoplayTimer = null;
        this.isPaused = false;

        this.init();
    }

    init() {
        if (!this.slider || !this.track || this.slides.length === 0) return;

        // Event Listeners
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());

        // Auto-play control
        this.slider.addEventListener('mouseenter', () => this.pause());
        this.slider.addEventListener('mouseleave', () => this.play());

        // Initial setup
        this.updateSlider();
        this.play();

        // Responsive handling
        window.addEventListener('resize', () => this.updateSlider());
    }

    updateSlider() {
        const slideWidth = this.slides[0].offsetWidth;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    play() {
        this.isPaused = false;
        if (this.autoplayTimer) clearInterval(this.autoplayTimer);
        this.autoplayTimer = setInterval(() => {
            if (!this.isPaused) {
                this.next();
            }
        }, this.autoplayInterval);
    }

    pause() {
        this.isPaused = true;
        if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
