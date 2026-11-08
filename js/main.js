
/* ==============================
   FASIHA PORTFOLIO - MAIN JS
================================ */

document.addEventListener("DOMContentLoaded", () => {

    // Register GSAP ScrollTrigger
    if (typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

        // Initialize all portfolio animations
        initializeGeneralAnimations();
        initializeDesktopAnimation();
        initializeMobileAnimation();

        console.log("Portfolio animations initialized.");

    } else {

        console.warn("GSAP libraries are not available.");

    }

    // Initialize contact form
    initializeContactForm();

    console.log("Fasiha's Portfolio Initialized.");

});
