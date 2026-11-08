
/* =========================================
   SCROLL PROGRESS INDICATOR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Create progress track
    const track = document.createElement("div");
    track.className = "scroll-progress-track";

    // Create progress bar
    const bar = document.createElement("div");
    bar.className = "scroll-progress-bar";

    track.appendChild(bar);
    document.body.appendChild(track);

    // Update progress while scrolling
    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        bar.style.height = `${progress}%`;
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);

    updateScrollProgress();

    console.log("Scroll progress indicator initialized.");

});
