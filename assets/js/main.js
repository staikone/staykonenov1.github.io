/**
 * Оптимизиран main.js
 */

// Селектори за глобални елементи
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== МЕНЮ (SHOW / HIDDEN) =====*/
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose && navMenu) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*===== ПРЕМАХВАНЕ НА МЕНЮТО ПРИ КЛИК НА МОБИЛЕН ЛИНК =====*/
const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
    if (navMenu) {
        navMenu.classList.remove("show-menu");
    }
}
navLinks.forEach((link) => link.addEventListener("click", linkAction));

/*===== АКОРДЕОН (SKILLS) =====*/
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeaders = document.querySelectorAll(".skills__header");

function toggleSkills() {
    const parent = this.parentNode;
    if (!parent) return;

    const isOpen = parent.classList.contains("skills__open");

    // Затваряне на всички елементи
    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }

    // Ако текущият не е бил отворен, отваряме го
    if (!isOpen) {
        parent.className = "skills__content skills__open";
    }
}

skillsHeaders.forEach((header) => {
    header.addEventListener("click", toggleSkills);
});

/*===== ТАБОВЕ (QUALIFICATION) =====*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);
        if (!target) return;

        tabContents.forEach((content) => {
            content.classList.remove("qualification__active");
        });
        target.classList.add("qualification__active");

        tabs.forEach((t) => {
            t.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});

/*===== МОДАЛНИ ПРОЗОРЦИ (SERVICES) =====*/
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

const openModal = (index) => {
    if (modalViews[index]) {
        modalViews[index].classList.add("active-modal");
    }
};

modalBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => openModal(index));
});

modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        modalViews.forEach((view) => {
            view.classList.remove("active-modal");
        });
    });
});

/*===== SWIPER ИНИЦИАЛИЗАЦИЯ =====*/
if (document.querySelector(".portfolio__container")) {
    new Swiper(".portfolio__container", {
        cssMode: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

if (document.querySelector(".testimonial__container")) {
    new Swiper(".testimonial__container", {
        loop: true,
        grabCursor: true,
        spaceBetween: 48,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            568: {
                slidesPerView: 2,
            },
        },
    });
}

/*===== ЛОГИКА ПРИ СКРОЛИРАНЕ (ОПТИМИЗИРАНА) =====*/
const sections = document.querySelectorAll("section[id]");
const headerNav = document.getElementById("header");
const scrollUpBtn = document.getElementById("scroll-up");

function handleScrollCalculations() {
    const scrollY = window.pageYOffset || window.scrollY;

    // 1. Активни линкове в менюто
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        
        const menuLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        
        if (menuLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                menuLink.classList.add("active-link");
            } else {
                menuLink.classList.remove("active-link");
            }
        }
    });

    // 2. Смяна на бекграунд на хедъра
    if (headerNav) {
        if (scrollY >= 80) headerNav.classList.add("scroll-header");
        else headerNav.classList.remove("scroll-header");
    }

    // 3. Показване на бутона за Scroll Up
    if (scrollUpBtn) {
        if (scrollY >= 560) scrollUpBtn.classList.add("show-scroll");
        else scrollUpBtn.classList.remove("show-scroll");
    }
}

// Throttle функция за ограничаване на тежките изчисления при скрол
let isScrolling = false;
window.addEventListener("scroll", () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScrollCalculations();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

/*===== ТЕМНА / СВЕТЛА ТЕМА =====*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => (themeButton && themeButton.classList.contains(iconTheme)) ? "uil-moon" : "uil-sun";

if (selectedTheme && themeButton) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem("selected-theme", getCurrentTheme());
        localStorage.setItem("selected-icon", getCurrentIcon());
    });
}

/*===== ANIMATION & TEXT FX (LETTER SPLIT) =====*/
function initTextFx() {
    const textFxElements = document.querySelectorAll('.txt-fx');
    
    textFxElements.forEach(element => {
        const text = element.textContent.trim();
        element.textContent = ''; // Изчистване
        
        // Използване на DocumentFragment за по-добра DOM производителност
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            
            if (text[i] === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = text[i];
            }
            
            span.classList.add('letter');
            span.style.transitionDelay = `${i * 35}ms`;
            fragment.appendChild(span);
        }
        element.appendChild(fragment);
    });
}

// Единичен DOMContentLoaded Listener за контрол на всичко свързано с жизнения цикъл
document.addEventListener('DOMContentLoaded', () => {
    initTextFx();
    
    const revealElements = document.querySelectorAll('.reveal-top, .txt-fx');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback за много стари браузъри, които нямат поддръжка на IntersectionObserver
        revealElements.forEach(el => el.classList.add('active-reveal'));
    }
});
