// this functionallty for the slider Section
const sliderContainer = document.querySelector('.slider-container');
const cards = document.querySelectorAll('.card');
const cardWidth = cards[0].getBoundingClientRect().width + 20; // Include gap in card width
const totalCards = cards.length;
let currentIndex = 0;

document.querySelector('.right-arrow').addEventListener('click', () => {
    if (currentIndex < totalCards - 3) {
        currentIndex++;
        sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});

document.querySelector('.left-arrow').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});