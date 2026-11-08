
/* =========================================
   DESKTOP SCROLL ZOOM + WEBSITE CONTENT
========================================= */

function initializeDesktopAnimation() {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        console.warn("GSAP or ScrollTrigger is not available.");
        return;
    }

    const section = document.querySelector("#desktop-section");
    const desktop = document.querySelector(".desktop-device");
    const screen = document.querySelector(".desktop-screen");
    const navbar = document.querySelector(".preview-navbar");
    const content = document.querySelector(".desktop-preview-content");

    if (!section || !desktop || !screen || !content) {
        console.warn("Desktop animation elements not found.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Reset previous animation transforms
    gsap.set(desktop, {
        scale: 1,
        y: 0,
        opacity: 1,
        transformOrigin: "center center"
    });

    gsap.set(content, {
        y: 0
    });

    // Calculate how much website content needs to move
    function getContentScrollDistance() {

        const navbarHeight = navbar
            ? navbar.offsetHeight
            : 0;

        const visibleHeight = Math.max(
            0,
            screen.clientHeight - navbarHeight
        );

        return Math.max(
            0,
            content.scrollHeight - visibleHeight
        );
    }

    // Main scroll-controlled timeline
    const desktopTimeline = gsap.timeline({

        scrollTrigger: {

            trigger: section,

            start: "top top",

            end: "+=3000",

            scrub: 1,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true
        }
    });

    // PHASE 1: Desktop zoom in
    desktopTimeline.to(desktop, {

        scale: 1.18,

        y: -5,

        ease: "none",

        duration: 1
    });

    // PHASE 2: Show the website content from top to bottom
    desktopTimeline.to(content, {

        y: () => -getContentScrollDistance(),

        ease: "none",

        duration: 3
    });

    // PHASE 3: Desktop zoom out after all content is shown
    desktopTimeline.to(desktop, {

        scale: 0.85,

        y: 15,

        ease: "none",

        duration: 1
    });

    // Refresh measurements after page layout is ready
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

    console.log(
        "Desktop zoom and website scrolling animation initialized."
    );
}
