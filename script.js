(function () {
    "use strict";

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");
    const currentYearSpan = document.getElementById("currentYear");

    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const THEME_KEY = "theme";
    const DARK_CLASS = "dark-theme";
    const LIGHT_CLASS = "light-theme";

    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY);
    }

    function setTheme(theme, persist = true) {
        document.body.classList.remove(DARK_CLASS, LIGHT_CLASS);
        document.body.classList.add(theme);
        if (persist) {
            localStorage.setItem(THEME_KEY, theme);
        }
    }

    function toggleTheme() {
        const currentTheme = document.body.classList.contains(LIGHT_CLASS) ? "light" : "dark";
        const newTheme = currentTheme === "light" ? DARK_CLASS : LIGHT_CLASS;
        setTheme(newTheme, true);
    }

    function initTheme() {
        const storedTheme = getStoredTheme();
        if (storedTheme === "light") {
            setTheme(LIGHT_CLASS, false);
        } else {
            setTheme(DARK_CLASS, false);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    initTheme();

    /* =====================================================
       SCROLL NAVBAR
    ===================================================== */

    function handleNavbarScroll() {
        const scrolled = window.scrollY > 100;
        navbar.classList.toggle("scrolled", scrolled);
    }

    window.addEventListener("scroll", handleNavbarScroll);

    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackToTop() {
        const visible = window.scrollY > 400;
        backToTop.classList.toggle("show", visible);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    if (backToTop) {
        window.addEventListener("scroll", handleBackToTop);
        backToTop.addEventListener("click", scrollToTop);
    }

    /* =====================================================
       NAV ACTIVE LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    function setActiveNav() {
        let index = sections.length;

        while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
        const id = sections[index] ? sections[index].getAttribute("id") : "home";
        const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
        if (activeLink) {
            navLinks.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"));
            activeLink.classList.add("active");
        }
    }

    const scrollHandler = () => {
        handleNavbarScroll();
        handleBackToTop();
        setActiveNav();
    };

    window.addEventListener("scroll", scrollHandler);

    /* =====================================================
       MENU TOGGLE (MOBILE)
    ===================================================== */

    function toggleMenu() {
        const isOpen = navLinks.classList.contains("open");
        navLinks.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    /* Close mobile menu when clicking a nav link */
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 720 && navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
                document.body.classList.remove("menu-open");
            }
        });
    });

    /* =====================================================
       REVEAL ANIMATION (Intersection Observer)
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    function revealCallback(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
    });

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* =====================================================
       INIT
    ===================================================== */

    setActiveNav();
})();
