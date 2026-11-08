
/* =========================================
   THE SECRET OF THE STARS
   Interactive Easter Egg Popup
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Create star button
    const starButton = document.createElement("button");
    starButton.className = "secret-star-button";
    starButton.type = "button";
    starButton.textContent = "✦";
    starButton.setAttribute("aria-label", "Discover a secret");
    starButton.title = "Discover something special";

    // Create popup overlay
    const overlay = document.createElement("div");
    overlay.className = "secret-popup-overlay";
    overlay.setAttribute("aria-hidden", "true");

    // Create popup
    const popup = document.createElement("div");
    popup.className = "secret-popup";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    popup.setAttribute("aria-labelledby", "secret-popup-title");

    // Popup close button
    const closeButton = document.createElement("button");
    closeButton.className = "secret-popup-close";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close popup");

    // Popup star decoration
    const decoration = document.createElement("div");
    decoration.className = "secret-popup-star";
    decoration.textContent = "✧";

    // Popup heading
    const heading = document.createElement("h2");
    heading.id = "secret-popup-title";
    heading.textContent = "A Little Secret";

    // Popup message
    const message = document.createElement("p");
    message.textContent =
        "Every great journey begins with curiosity. ";

    // Popup footer
    const footer = document.createElement("span");
    footer.className = "secret-popup-footer";
    footer.textContent = "Keep exploring. Keep shining.";

    // Build popup
    popup.append(
        closeButton,
        decoration,
        heading,
        message,
        footer
    );

    overlay.appendChild(popup);

    document.body.append(starButton, overlay);

    // Open popup
    function openPopup() {
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("popup-open");
        closeButton.focus();
    }

    // Close popup
    function closePopup() {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("popup-open");
        starButton.focus();
    }

    starButton.addEventListener("click", openPopup);
    closeButton.addEventListener("click", closePopup);

    // Close when clicking outside popup
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closePopup();
        }
    });

    // Close with Escape key
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            overlay.classList.contains("active")
        ) {
            closePopup();
        }
    });

    console.log("Secret of the Stars initialized.");

});
