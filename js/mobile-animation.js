
/* =========================================
   MOBILE PHONE ANIMATION
   Portrait → Content Scroll → Landscape → Zoom Out
========================================= */

function initializeMobileAnimation() {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        console.warn("GSAP or ScrollTrigger is not available.");
        return;
    }

    const section = document.querySelector("#mobile-section");
    const mobile = document.querySelector(".mobile-device");
    const screen = document.querySelector(".mobile-screen");
    const content = document.querySelector(".mobile-preview-content");
    const navbar = document.querySelector(".mobile-preview-navbar");

    if (!section || !mobile || !screen || !content) {
        console.warn("Mobile animation elements not found.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initial phone position: Portrait
    gsap.set(mobile, {
        rotation: 0,
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        transformOrigin: "center center"
    });

    // Website content starts from the top
    gsap.set(content, {
        y: 0
    });

    // Calculate how much website content needs to move
    function getMobileContentDistance() {

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

    // Main scroll-controlled animation
    const mobileTimeline = gsap.timeline({

        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=5000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }

    });

    // PHASE 1: Smooth zoom in while phone stays portrait
    mobileTimeline.to(mobile, {
        scale: 1.3,
        rotation: 0,
        ease: "none",
        duration: 1.5
    });

    // PHASE 2: Scroll the complete website inside the portrait phone
    mobileTimeline.to(content, {
        y: () => -getMobileContentDistance(),
        ease: "none",
        duration: 4
    });

    // PHASE 3: After the complete content, rotate to landscape
    mobileTimeline.to(mobile, {
        rotation: 90,
        scale: 1.2,
        ease: "power1.inOut",
        duration: 1.5
    });

    // PHASE 4: Keep landscape position zoomed briefly
    mobileTimeline.to(mobile, {
        scale: 1.2,
        rotation: 90,
        ease: "none",
        duration: 0.8
    });

    // PHASE 5: Smoothly zoom out in landscape position
    mobileTimeline.to(mobile, {
        scale: 0.8,
        rotation: 90,
        ease: "power1.inOut",
        duration: 1.5
    });

    // Refresh animation after page assets are loaded
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

    console.log("Mobile portrait-to-landscape animation initialized.");
}
