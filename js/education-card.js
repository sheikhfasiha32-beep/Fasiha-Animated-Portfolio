
/* =========================================
   EDUCATION - INTERACTIVE 3D TILT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".education-card");

    if (!card) return;

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 7;
            const rotateX = ((centerY - y) / centerY) * 7;

            card.style.animation = "none";

            card.style.transform =
                `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";
            card.style.animation = "";

        });

    }

});
