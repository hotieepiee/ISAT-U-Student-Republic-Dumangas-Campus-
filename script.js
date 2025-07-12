// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Interactive demo functionality
function showDemo(program) {
    // Remove active class from all buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update content based on program
    const content = document.getElementById('demo-content');
    const programs = {
        stem: {
            title: 'STEM Excellence',
            description: 'Our STEM program features robotics labs, 3D printing, coding workshops, and science olympiad teams. Students engage in real-world problem solving and innovation challenges.'
        },
        arts: {
            title: 'Creative Arts',
            description: 'Our arts program includes visual arts, music, theater, and creative writing. Students showcase their talents in galleries, concerts, and theatrical performances throughout the year.'
        },
        sports: {
            title: 'Athletic Programs',
            description: 'We offer 15+ sports including soccer, basketball, swimming, and track. Our teams compete at regional and state levels with excellent coaching and facilities.'
        },
        languages: {
            title: 'World Languages',
            description: 'Students can study Spanish, French, Mandarin, and German. Our language immersion programs and cultural exchange opportunities provide authentic learning experiences.'
        }
    };
    
    content.innerHTML = `
        <h4>${programs[program].title}</h4>
        <p>${programs[program].description}</p>
    `;
}

// Add floating animation to hero background
let floatOffset = 0;
function animateHero() {
    floatOffset += 0.5;
    const hero = document.querySelector('.hero::before');
    requestAnimationFrame(animateHero);
}
animateHero();

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}