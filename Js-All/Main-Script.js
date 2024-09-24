const sliderContainer = document.querySelector('.slider-container');
const cards = document.querySelectorAll('.slider-card');
const cardWidth = cards[0].getBoundingClientRect().width + 20; // Include gap in card width
const visibleCards = 3; // Number of visible cards
let currentIndex = visibleCards; // Start from the first non-cloned card

// Set fixed width for the slider container to ensure dimensions don't change
sliderContainer.style.width = `${cardWidth * visibleCards}px`;

// Clone cards
const firstClone = [...cards].slice(0, visibleCards).map(card => card.cloneNode(true));
const lastClone = [...cards].slice(-visibleCards).map(card => card.cloneNode(true));

// Add clones to the beginning and end of the slider
firstClone.forEach(clone => sliderContainer.appendChild(clone));
lastClone.forEach(clone => sliderContainer.insertBefore(clone, sliderContainer.firstChild));

// Update total card count
const totalCards = cards.length + firstClone.length + lastClone.length;

// Position the slider to the original cards
sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
sliderContainer.style.transition = 'transform 0.5s ease'; // Make the transition smooth

// Adjust container height to maintain consistent height
sliderContainer.style.height = `${cards[0].getBoundingClientRect().height}px`;

document.querySelector('.right-arrow').addEventListener('click', () => {
    // Move smoothly to the first card when reaching the end of the original cards
    if (currentIndex >= totalCards - visibleCards) return;

    currentIndex++;
    sliderContainer.style.transition = 'transform 0.5s ease'; // Ensure smooth transition
    sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});

document.querySelector('.left-arrow').addEventListener('click', () => {
    // Move smoothly to the last card when reaching the start of the original cards
    if (currentIndex <= 0) return;

    currentIndex--;
    sliderContainer.style.transition = 'transform 0.5s ease'; // Ensure smooth transition
    sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});

// Use transitionend to reset smoothly
sliderContainer.addEventListener('transitionend', () => {
    if (currentIndex === totalCards - visibleCards) {
        sliderContainer.style.transition = 'none'; // Temporarily stop transition
        currentIndex = visibleCards; // Reset to the first original card
        sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        setTimeout(() => {
            sliderContainer.style.transition = 'transform 0.5s ease'; // Re-enable smooth transition
        }, 0); // Re-enable transition after reset
    } else if (currentIndex === 0) {
        sliderContainer.style.transition = 'none'; // Temporarily stop transition
        currentIndex = totalCards - visibleCards * 2; // Reset to the last original card
        sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        setTimeout(() => {
            sliderContainer.style.transition = 'transform 0.5s ease'; // Re-enable smooth transition
        }, 0); // Re-enable transition after reset
    }
});