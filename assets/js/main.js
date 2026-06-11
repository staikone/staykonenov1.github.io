/**
 * Julie Portfolio - Main JavaScript
 * Напълно оптимизиран и защитен от Runtime грешки
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Селектори за навигация
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    const navLinks = document.querySelectorAll(".nav__link");

    /*===== ПОКАЗВАНЕ / СКРИВАНЕ НА МЕНЮТО =====*/
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

    /*===== ЗАТВАРЯНЕ НА МЕНЮТО ПРИ КЛИК НА МОБИЛЕН ЛИНК =====*/
    function linkAction() {
        if (navMenu) navMenu.classList.remove("show-menu");
    }
    navLinks.forEach((link) => link.addEventListener("click", linkAction));

    /*===== АКОРДЕОН (SKILLS) =====*/
    const skillsHeaders = document.querySelectorAll(".skills__header");
    const skillsContent = document.getElementsByClassName("skills__content");

    function toggleSkills() {
        const parent = this.parentNode;
        if (!parent) return;

        // Използваме classList.contains вместо стриктно сравнение на стрингове
        const isOpen = parent.classList.contains("skills__open");

        // Затваряме всички секции
        for (let i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = "skills__content skills__close";
        }

        // Ако кликнатият не е бил отворен, го отваряме
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

    /*===== СВЕТЛА / ТЪМНА ТЕМА (ПЪЛНА СИНХРОНИЗАЦИЯ) =====*/
    const themeButton = document.getElementById("theme-button");
    const darkTheme = "dark-theme";
    const iconTheme = "uil-sun"; // иконата за слънце при тъмна тема

    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () => themeButton && themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

    // Валидация на последно избраната тема
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

    /*===== ИНИЦИАЛИЗАЦИЯ НА ТЕКСТ ЕФЕКТИТЕ (SPLIT LETTERS) =====*/
    function initTextFx() {
        const textFxElements = document.querySelectorAll('.txt-fx');
        
        textFxElements.forEach(element => {
            const text = element.textContent.trim();
            element.textContent = ''; // Изчистване на оригиналния текст
            
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

    // Извикваме цепенето на текста само ЕДНОКРАТНО
    initTextFx();

    /*===== INTERSECTION OBSERVER ЗА АНИМАЦИИТЕ =====*/
    const revealElements = document.querySelectorAll('.reveal-top, .txt-fx');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                    observer.unobserve(entry.target); // Изпълнение веднъж
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
        // Fallback за по-стари браузъри
        revealElements.forEach(el => el.classList.add('active-reveal'));
    }

    /*===== ОПТИМИЗИРАН СКРОЛ (ОБЕДИНЕНА ЛОГИКА ЧРЕЗ REQUESTANIMATIONFRAME) =====*/
    const sections = document.querySelectorAll("section[id]");
    const headerNav = document.getElementById("header");
    const scrollUpBtn = document.getElementById("scroll-up");

    function handleScrollCalculations() {
        const scrollY = window.pageYOffset || window.scrollY;

        // 1. Активен линк при скрол (с добавена Null-защита)
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute("id");
            
            // Ескейпваме селектора, за да не гърми при специални символи
            const menuLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
            
            if (menuLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    menuLink.classList.add("active-link");
                } else {
                    menuLink.classList.remove("active-link");
                }
            }
        });

        // 2. Бекграунд на хедъра
        if (headerNav) {
            if (scrollY >= 80) headerNav.classList.add("scroll-header");
            else headerNav.classList.remove("scroll-header");
        }

        // 3. Показване на Scroll Up бутона
        if (scrollUpBtn) {
            if (scrollY >= 560) scrollUpBtn.classList.add("show-scroll");
            else scrollUpBtn.classList.remove("show-scroll");
        }
    }

    // Тротлинг чрез requestAnimationFrame за перфектна производителност без насичане
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

});
