
/* =========================================
   MAGICAL MOONLIGHT CURSOR EFFECT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Disable effect on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Add cursor styles
    const style = document.createElement("style");

    style.textContent = `
        .magic-cursor-glow {
            position: fixed;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            background: radial-gradient(
                circle,
                rgba(190, 205, 255, 0.45),
                rgba(140, 160, 255, 0.12),
                transparent 75%
            );
            transform: translate(-50%, -50%);
            transition: width 0.2s ease, height 0.2s ease;
        }

        .magic-cursor-star {
            position: fixed;
            pointer-events: none;
            z-index: 99998;
            color: #dce4ff;
            font-size: 12px;
            text-shadow: 0 0 8px #aabaff;
            animation: magicStarFade 0.8s ease-out forwards;
        }

        @keyframes magicStarFade {
            0% {
                opacity: 1;
                transform: scale(0.5) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: scale(1.5) rotate(90deg);
            }
        }
    `;

    document.head.appendChild(style);

    // Create glowing cursor
    const glow = document.createElement("div");
    glow.className = "magic-cursor-glow";
    document.body.appendChild(glow);

    let lastStarTime = 0;

    // Follow mouse and create tiny stars
    document.addEventListener("mousemove", (event) => {

        const x = event.clientX;
        const y = event.clientY;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;

        const now = Date.now();

        if (now - lastStarTime < 90) return;

        lastStarTime = now;

        const star = document.createElement("span");

        star.className = "magic-cursor-star";
        star.textContent = "✦";

        star.style.left = `${x + (Math.random() * 16 - 8)}px`;
        star.style.top = `${y + (Math.random() * 16 - 8)}px`;

        document.body.appendChild(star);

        star.addEventListener("animationend", () => {
            star.remove();
        });

    });

    console.log("Magical cursor effect initialized.");

});
