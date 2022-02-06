import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorateSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);

            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName === 'BUTTON' &&  this.slides[2].tagName === 'BUTTON') {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[0]); // Btn
            this.container.appendChild(this.slides[0]); // Btn
            this.decorateSlides();
        } else if (this.slides[0].tagName === 'BUTTON') {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[0]); // Btn
            this.decorateSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorateSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorateSlides();
                    break;
                }
            }

            if (this.slides[1].tagName === 'BUTTON' &&  this.slides[2].tagName === 'BUTTON') {
                this.container.appendChild(this.slides[0]); // Slide
                this.container.appendChild(this.slides[0]); // Btn
                this.container.appendChild(this.slides[0]); // Btn
                this.decorateSlides();
            } else if (this.slides[0].tagName === 'BUTTON') {
                this.container.appendChild(this.slides[0]); // Slide
                this.container.appendChild(this.slides[0]); // Btn
                this.decorateSlides();
            } else {
                this.container.appendChild(this.slides[0]);
                this.decorateSlides();
            }

            let active = this.slides[this.slides.length -1];
            this.container.insertBefore(active, this.slides[0]);
            this.decorateSlides();
        });
    }

    activateSlideAutoplay() {
        this.nextSlideInterval = setInterval(() => this.nextSlide(), 5000);

        this.next.addEventListener('mouseenter', () => {
            clearInterval(this.nextSlideInterval);
        });
        this.next.addEventListener('mouseleave', () => {
            this.nextSlideInterval = setInterval(() => this.nextSlide(), 5000);
        });

        this.prev.addEventListener('mouseenter', () => {
            clearInterval(this.nextSlideInterval);
        });
        this.prev.addEventListener('mouseleave', () => {
            this.nextSlideInterval = setInterval(() => this.nextSlide(), 5000);
        });

        this.slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                clearInterval(this.nextSlideInterval);
            });
            slide.addEventListener('mouseleave', () => {
                this.nextSlideInterval = setInterval(() => this.nextSlide(), 5000);
            });
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorateSlides();


        if (this.autoplay) {
            this.activateSlideAutoplay();
        }
    }
}