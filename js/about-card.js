
/* =========================================
   ABOUT ME - MOUSE SPOTLIGHT & 3D TILT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".about-glass-card");

    if (!card) return;

    // Disable tilt on touch devices
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";

            card.style.setProperty("--mouse-x", "50%");
            card.style.setProperty("--mouse-y", "50%");

        });

    }

});
