/* =========================================
   REALITY GLITCH EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const glitchButton = document.createElement("button");
    glitchButton.className = "reality-glitch-trigger";
    glitchButton.type = "button";
    glitchButton.innerHTML = "◈";
    glitchButton.setAttribute("aria-label", "Discover a hidden message");
    glitchButton.title = "Something unusual is waiting...";

    const overlay = document.createElement("div");
    overlay.className = "reality-glitch-overlay";

    overlay.innerHTML = `
        <div class="reality-glitch-lines"></div>

        <div class="reality-glitch-content">
            <span class="glitch-system-label">UNKNOWN SIGNAL DETECTED</span>

            <h2 class="glitch-heading" data-text="REALITY SHIFTED">
                REALITY SHIFTED
            </h2>

            <p class="glitch-message">
                Behind every screen is a universe of possibilities.
               
            </p>

            <button class="glitch-close-button" type="button">
                RETURN TO REALITY
            </button>
        </div>
    `;

    document.body.append(glitchButton, overlay);

    const closeButton = overlay.querySelector(".glitch-close-button");

    let glitchTimer;

    function openGlitch() {
        overlay.classList.add("glitch-active");
        document.body.classList.add("reality-glitch-open");

        clearTimeout(glitchTimer);

        glitchTimer = setTimeout(() => {
            overlay.classList.add("glitch-revealed");
        }, 900);

        closeButton.focus();
    }

    function closeGlitch() {
        clearTimeout(glitchTimer);

        overlay.classList.remove(
            "glitch-active",
            "glitch-revealed"
        );

        document.body.classList.remove("reality-glitch-open");

        glitchButton.focus();
    }

    glitchButton.addEventListener("click", openGlitch);
    closeButton.addEventListener("click", closeGlitch);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeGlitch();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            overlay.classList.contains("glitch-active")
        ) {
            closeGlitch();
        }
    });

    console.log("Reality Glitch Experience initialized.");

});