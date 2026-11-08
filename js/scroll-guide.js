/* =========================================
   ANIMATED SCROLL GUIDE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const guide = document.createElement("div");
    guide.className = "animated-scroll-guide";

    guide.innerHTML = `
        <div class="scroll-guide-mouse">
            <span class="scroll-guide-wheel"></span>
        </div>
        <span class="scroll-guide-text">SCROLL TO EXPLORE</span>
        <span class="scroll-guide-arrow">↓</span>
    `;

    document.body.appendChild(guide);

    function updateScrollGuide() {
        if (window.scrollY > 100) {
            guide.classList.add("scroll-guide-hidden");
        } else {
            guide.classList.remove("scroll-guide-hidden");
        }
    }

    window.addEventListener("scroll", updateScrollGuide, {
        passive: true
    });

    updateScrollGuide();

    console.log("Animated Scroll Guide initialized.");

});