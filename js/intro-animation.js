
/* =========================================
   GALAXY INTRO EXPERIENCE
   First Visit Welcome Animation
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Create intro overlay
    const intro = document.createElement("div");
    intro.className = "galaxy-intro";

    intro.innerHTML = `
        <div class="intro-galaxy">
            <div class="intro-nebula"></div>
            <div class="intro-core"></div>
            <div class="intro-stars"></div>
        </div>

        <div class="intro-welcome">
            <span class="intro-small">A NEW JOURNEY BEGINS</span>
            <h1>Welcome to My Digital Universe</h1>
            <p>Explore my world of creativity, technology and dreams.</p>
            <span class="intro-signature">— Fasiha</span>
        </div>
    `;

    document.body.appendChild(intro);

    // Create stars
    const stars = intro.querySelector(".intro-stars");

    for (let i = 0; i < 100; i++) {
        const star = document.createElement("span");

        star.className = "intro-star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 1.5 + "s";

        stars.appendChild(star);
    }

    // Start intro animation
    document.body.classList.add("intro-running");

    setTimeout(() => {
        intro.classList.add("intro-finish");
    }, 3800);

    // Remove intro after animation
    setTimeout(() => {
        intro.remove();
        document.body.classList.remove("intro-running");
    }, 5200);

});
