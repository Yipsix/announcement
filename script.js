// Set countdown to 10 seconds from page load
const announcementDate = new Date(Date.now() + 10000); // 10 seconds from now

// Confetti configuration
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

// Set canvas size
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Confetti particle class
class ConfettiParticle {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.size = Math.random() * 8 + 4;
        this.colors = ['#FF69B4', '#FFB6C1', '#87CEEB', '#98FB98', '#F0E68C', '#DDA0DD'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.gravity = 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        
        if (this.y > confettiCanvas.height + 10) {
            this.y = -10;
            this.x = Math.random() * confettiCanvas.width;
            this.vy = Math.random() * 3 + 2;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

// Initialize confetti
function createConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

// Animation loop for confetti
let confettiActive = false;
function animateConfetti() {
    if (!confettiActive) return;
    
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

// Countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = announcementDate.getTime() - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Time's up! Show the announcement
        showAnnouncement();
    }
}

// Show the big announcement
function showAnnouncement() {
    const countdownContainer = document.getElementById('countdownContainer');
    const revealMessage = document.getElementById('revealMessage');
    const title = document.querySelector('.title');
    
    // Hide countdown and title
    countdownContainer.style.display = 'none';
    title.style.display = 'none';
    
    // Show announcement with animation
    revealMessage.style.display = 'block';
    revealMessage.classList.add('revealed');
    
    // Start confetti
    confettiActive = true;
    createConfetti();
    animateConfetti();
    
    // Stop the countdown timer
    clearInterval(countdownTimer);
    
    // Play celebration sound effect (optional)
    // You can add audio here if desired
}

// Start the countdown
const countdownTimer = setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for early reveal (for testing)
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        if (clickCount >= 5) {
            showAnnouncement();
        }
    });
});