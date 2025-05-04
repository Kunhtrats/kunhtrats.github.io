// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');
const currentLang = document.getElementById('current-lang');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Toggle
let isDarkMode = true; // Default to dark mode

// Theme is now set in the HTML by default (data-theme="dark")
// We don't need to set it on load, but we do need to update the icon
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
localStorage.setItem('darkMode', 'enabled');

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Language Toggle
let isEnglish = true; // Default to English

// Language is now set to English by default in the HTML
// We don't need to set it on load
currentLang.textContent = 'EN';
localStorage.setItem('language', 'en');

languageToggle.addEventListener('click', () => {
    isEnglish = !isEnglish;
    if (isEnglish) {
        setLanguage('en');
        currentLang.textContent = 'EN';
        localStorage.setItem('language', 'en');
    } else {
        setLanguage('es');
        currentLang.textContent = 'ES';
        localStorage.setItem('language', 'es');
    }
});

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-' + lang + ']');
    elements.forEach(element => {
        const translation = element.getAttribute('data-' + lang);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
}

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide mobile menu if it's open
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Set active link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add animations on scroll
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Set language on page load (now English by default)
window.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
});