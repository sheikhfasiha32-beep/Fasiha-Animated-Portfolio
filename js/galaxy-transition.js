
/* =========================================
   GALAXY ZOOM TRANSITION
   Cinematic Section-to-Section Travel
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(
        "main > section"
    );

    if (sections.length < 2) return;

    // Respect reduced-motion accessibility settings
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Create Galaxy Overlay
    const galaxyOverlay = document.createElement("div");
    galaxyOverlay.className = "galaxy-transition-overlay";

    galaxyOverlay.innerHTML = `
        <div class="galaxy-scene">
            <div class="galaxy-nebula"></div>
            <div class="galaxy-core"></div>
            <div class="galaxy-stars"></div>
        </div>
    `;

    document.body.appendChild(galaxyOverlay);

    const starContainer = galaxyOverlay.querySelector(
        ".galaxy-stars"
    );

    // Create floating stars
    for (let i = 0; i < 75; i++) {

        const star = document.createElement("span");

        star.className = "galaxy-star";

        star.style.setProperty(
            "--star-x",
            `${Math.random() * 100}%`
        );

        star.style.setProperty(
            "--star-y",
            `${Math.random() * 100}%`
        );

        star.style.setProperty(
            "--star-size",
            `${Math.random() * 3 + 1}px`
        );

        star.style.setProperty(
            "--star-delay",
            `${Math.random() * 0.5}s`
        );

        starContainer.appendChild(star);
    }

    let currentSection = null;
    let transitionTimer = null;
    let isTransitioning = false;

    // Play Galaxy Transition
    function playGalaxyTransition() {

        if (isTransitioning) return;

        isTransitioning = true;

        galaxyOverlay.classList.remove("galaxy-active");

        // Restart animation
        void galaxyOverlay.offsetWidth;

        galaxyOverlay.classList.add("galaxy-active");

        clearTimeout(transitionTimer);

        transitionTimer = setTimeout(() => {

            galaxyOverlay.classList.remove("galaxy-active");

            isTransitioning = false;

        }, 1100);
    }

    // Detect section changes
    const sectionObserver = new IntersectionObserver(
        (entries) => {

            const visibleSection = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                )[0];

            if (!visibleSection) return;

            const newSection = visibleSection.target.id;

            if (currentSection === null) {

                currentSection = newSection;
                return;

            }

            if (newSection !== currentSection) {

                currentSection = newSection;

                playGalaxyTransition();

            }

        },
        {
            root: null,
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    console.log("Galaxy Zoom Transition initialized.");

});
