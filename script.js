// 1. CURTAIN REVEAL ON LOAD
window.addEventListener('load', () => {
    // Tunggu 2 detik untuk animasi teks selesai, lalu buka tirai
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger animasi hero text
        const heroTitles = document.querySelectorAll('.title-reveal .row');
        heroTitles.forEach((row, index) => {
            row.style.transform = 'translateY(100%)';
            row.style.opacity = '0';
            row.style.transition = `transform 1s cubic-bezier(0.19, 1, 0.22, 1) ${0.5 + (index * 0.2)}s, opacity 1s ease ${0.5 + (index * 0.2)}s`;
            
            // Force reflow
            setTimeout(() => {
                row.style.transform = 'translateY(0)';
                row.style.opacity = '1';
            }, 100);
        });
        
    }, 2200);
});

// 2. CUSTOM CURSOR
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot langsung ikut mouse
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// Animasi smooth untuk lingkaran
function animateCursor() {
    circleX += (mouseX - circleX) * 0.1;
    circleY += (mouseY - circleY) * 0.1;
    
    cursorCircle.style.left = `${circleX - 20}px`;
    cursorCircle.style.top = `${circleY - 20}px`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Efek hover pada link
const links = document.querySelectorAll('a, .btn-link, .p-image');
links.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
});

// 3. SCROLL ANIMATION (OBSERVER)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .reveal-image').forEach(el => {
    observer.observe(el);
});