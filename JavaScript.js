/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const thumbnails = document.querySelectorAll('.thumb');
    const caption = document.querySelector('.caption');
    const description = document.querySelector('.description');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let interval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            thumbnails[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');

        const currentSlide = slides[index];
        caption.textContent = currentSlide.dataset.caption;
        description.textContent = currentSlide.dataset.description;

        clearInterval(interval);
        autoSlide();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    };

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            showSlide(index);
        });
    });

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    const autoSlide = () => {
        interval = setInterval(nextSlide, 3000);
    };

    const enableSwipe = () => {
        let startX;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        });
    };

    showSlide(currentIndex);
    enableSwipe();
    autoSlide();
});

