
/* =========================================
   ANOTHER DIMENSION EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const portalButton = document.createElement("button");
    portalButton.className = "dimension-trigger";
    portalButton.type = "button";
    portalButton.innerHTML = "◎";
    portalButton.title = "Enter Another Dimension";
    portalButton.setAttribute("aria-label", "Enter Another Dimension");

    const dimension = document.createElement("div");
    dimension.className = "dimension-overlay";

    dimension.innerHTML = `
        <div class="dimension-universe">
            <div class="dimension-orbit orbit-one"></div>
            <div class="dimension-orbit orbit-two"></div>

            <div class="dimension-stars"></div>

            <div class="dimension-content">
                <span class="dimension-label">
                    YOU HAVE CROSSED THE UNKNOWN
                </span>
                <div class="dimension-welcome">
    <h2>Welcome to My Portfolio</h2>

    <h3>Thank You for Being Here!</h3>

    <p>
        Thank you for taking the time to explore my portfolio.
        Your visit truly means a lot. I hope you enjoy discovering
        my work, creativity, and journey.
    </p>

    <span>— Fasiha</span>
</div>

                <h1>ANOTHER<br>DIMENSION</h1>

                <p>
                    Beyond the ordinary, a universe of imagination
                    begins. Every new idea opens another possibility.
                </p>

                <div class="dimension-symbol">✧</div>

                <button class="dimension-return" type="button">
                    RETURN TO PORTFOLIO
                </button>
            </div>
        </div>
    `;

    document.body.append(portalButton, dimension);

    const returnButton = dimension.querySelector(".dimension-return");

    function enterDimension() {
        dimension.classList.add("dimension-active");
        document.body.classList.add("dimension-open");
        returnButton.focus();
    }

    function leaveDimension() {
        dimension.classList.remove("dimension-active");
        document.body.classList.remove("dimension-open");
        portalButton.focus();
    }

    portalButton.addEventListener("click", enterDimension);
    returnButton.addEventListener("click", leaveDimension);

    dimension.addEventListener("click", (event) => {
        if (event.target === dimension) {
            leaveDimension();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            dimension.classList.contains("dimension-active")
        ) {
            leaveDimension();
        }
    });

    console.log("Another Dimension initialized.");

});
