
/* ==============================
   GENERAL PORTFOLIO ANIMATIONS
================================ */

function initializeGeneralAnimations() {

    if (typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined") {
        return;
    }

    // Reveal elements when they enter the screen
    gsap.utils.toArray(".reveal").forEach((element) => {

        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true
            }
        });

    });

    // Fade-in animations
    gsap.utils.toArray(".fade-in").forEach((element) => {

        gsap.to(element, {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true
            }
        });

    });

}
