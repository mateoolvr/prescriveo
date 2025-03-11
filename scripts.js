// Header scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav ul');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Section visibility
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });
document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Testimonials
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length > 0) {
    let current = 0;
    setInterval(() => {
        testimonials[current].classList.remove('active');
        current = (current + 1) % testimonials.length;
        testimonials[current].classList.add('active');
    }, 5000);
}

// Chatbot
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotOptions = document.getElementById('chatbot-options');
const responses = {
    'tarifs': 'Gratuit : 0€ | Pro : 129€ | Entreprise : dès 299€.',
    'fonctionnalités': 'Solutions premium pour médecins, pharmacies et patients.',
    'contact': 'mateo.olvr@icloud.com | 07 67 41 68 76.',
    'au revoir': 'À bientôt, prenez soin de vous !'
};

chatbotToggle.addEventListener('click', () => {
    chatbot.style.display = 'flex';
    chatbotToggle.style.display = 'none';
    chatbotBody.innerHTML = '<div class="message">Bonjour, comment puis-je vous aider aujourd’hui ?</div>';
    chatbotOptions.innerHTML = '';
    ['Tarifs', 'Fonctionnalités', 'Contact', 'Au revoir'].forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'chatbot-option';
        btn.textContent = option;
        btn.addEventListener('click', () => {
            const msg = document.createElement('div');
            msg.className = 'message';
            msg.textContent = responses[option.toLowerCase()];
            chatbotBody.appendChild(msg);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            if (option.toLowerCase() === 'au revoir') {
                setTimeout(() => {
                    chatbot.style.display = 'none';
                    chatbotToggle.style.display = 'flex';
                }, 1500);
            }
        });
        chatbotOptions.appendChild(btn);
    });
});
