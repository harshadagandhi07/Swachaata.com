const imageContainer = document.getElementById('imageContainer');
const dotNavigation = document.getElementById('dotNavigation');
const images = document.querySelectorAll('.polaroid');
const totalImages = images.length;

let currentIndex = 0;

// Create dots for each image
for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToImage(i));
    dotNavigation.appendChild(dot);
}

function scrollToImage(index) {
    currentIndex = index;
    const offset = -index * (images[0].clientWidth + 20); // 20px is the total horizontal margin
    imageContainer.style.transform = `translateX(${offset}px)`;
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Clone the first and last images for infinite loop effect
const firstImageClone = images[0].cloneNode(true);
const lastImageClone = images[totalImages - 1].cloneNode(true);

imageContainer.appendChild(firstImageClone);
imageContainer.insertBefore(lastImageClone, images[0]);

// Update the total images count
const updatedImages = document.querySelectorAll('.polaroid');

// Adjust the initial position to the first image
imageContainer.style.transform = `translateX(${-1 * (images[0].clientWidth + 20)}px)`;

function startAutoScroll() {
    setInterval(() => {
        currentIndex++;
        imageContainer.style.transition = 'transform 0.5s ease-in-out';
        const offset = -currentIndex * (images[0].clientWidth + 20);
        imageContainer.style.transform = `translateX(${offset}px)`;

        if (currentIndex === totalImages) {
            setTimeout(() => {
                imageContainer.style.transition = 'none';
                currentIndex = 0;
                const resetOffset = -currentIndex * (images[0].clientWidth + 20);
                imageContainer.style.transform = `translateX(${resetOffset}px)`;
            }, 500);
        }

        updateDots();
    }, 3000);
}

startAutoScroll();
