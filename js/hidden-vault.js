
/* =========================================
   THE HIDDEN VAULT EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const vaultButton = document.createElement("button");
    vaultButton.className = "hidden-vault-trigger";
    vaultButton.type = "button";
    vaultButton.innerHTML = "♙";
    vaultButton.title = "Discover the Hidden Vault";
    vaultButton.setAttribute("aria-label", "Open the Hidden Vault");

    const vaultOverlay = document.createElement("div");
    vaultOverlay.className = "hidden-vault-overlay";

    vaultOverlay.innerHTML = `
        <div class="vault-scene">

            <div class="vault-door">
                <div class="vault-door-inner">
                    <div class="vault-wheel"></div>
                    <span class="vault-door-title">CLASSIFIED</span>
                </div>
            </div>

            <div class="vault-content">

                <span class="vault-label">ACCESS GRANTED</span>

                <h1>THE HIDDEN VAULT</h1>

                <p class="vault-intro">
                    Beyond my projects lies a little more of my story.
                    Discover the ideas, experiences and dreams
                    that shape my journey.
                </p>

                <div class="vault-panels">

                    <button class="vault-panel" data-section="journey">
                        <span>01</span>
                        <strong>My Learning Journey</strong>
                        <small>Where my story began</small>
                    </button>

                    <button class="vault-panel" data-section="beyond">
                        <span>02</span>
                        <strong>Beyond the Screen</strong>
                        <small>Interests and curiosity</small>
                    </button>

                    <button class="vault-panel" data-section="philosophy">
                        <span>03</span>
                        <strong>My Personal Philosophy</strong>
                        <small>What inspires my growth</small>
                    </button>

                    <button class="vault-panel" data-section="vision">
                        <span>04</span>
                        <strong>Future Vision</strong>
                        <small>Where I hope to go</small>
                    </button>

                    <button class="vault-panel" data-section="thanks">
                        <span>05</span>
                        <strong>A Secret Thank-You Note</strong>
                        <small>A message for you</small>
                    </button>

                </div>

                <div class="vault-detail" aria-live="polite">
                    <span class="vault-detail-icon">✧</span>
                    <h2>Choose a Secret</h2>
                    <p>Select any vault panel to discover more.</p>
                </div>

                <button class="vault-close" type="button">
                    CLOSE THE VAULT
                </button>

            </div>
        </div>
    `;

    document.body.append(vaultButton, vaultOverlay);

    const detail = vaultOverlay.querySelector(".vault-detail");

    /* =====================================
       PERSONAL VAULT INFORMATION
    ===================================== */

    const sections = {

        journey: {
            title: "My Learning Journey",
            text: "My journey began with a strong interest in the medical field. Becoming a doctor was once my dream. However, as technology continued to grow, I gradually became interested in Computer Science. My curiosity about creating websites and understanding digital products inspired me to explore this field. With my father's encouragement and my own growing interest, I chose Computer Science. Today, I am pursuing BS Computer Science with a specialization in Cyber Security at Qarshi University. One of my biggest dreams is to become a Game Developer. I hope to turn my creativity and passion into something meaningful in the future, InshaAllah."
        },

        beyond: {
            title: "Beyond the Screen",
            text: "Beyond Computer Science, I have a strong interest in art and creative expression. I enjoy drawing, painting, and exploring different forms of visual creativity. I also love creating and editing videos, especially poetry-based videos that combine meaningful words with visuals and music. From capturing video clips to editing them into a complete creative piece, I enjoy the entire process. For me, creativity is another way to express ideas, explore imagination, and bring thoughts to life."
        },

        philosophy: {
            title: "My Personal Philosophy",
            text: "I believe that success begins with consistency and the determination to keep moving towards our goals. One of my biggest ambitions is to become independent, build my own identity, and create a meaningful future through hard work. I believe difficult times should never stop us from moving forward. With patience, courage, faith in Allah, and continuous effort, we can overcome challenges and keep growing. My philosophy is simple: Trust Allah, stay consistent, work hard, and never give up on your dreams."
        },

        vision: {
            title: "Future Vision",
            text: "My future vision is to build a career that combines creativity, technology, and digital security. I aspire to become a Game Developer and create engaging games that bring my ideas and imagination to life. At the same time, I want to establish a professional career in Cyber Security, particularly in cybercrime investigation. One of my ambitions is to work as an officer in the National Cyber Crime Investigation Agency (NCCIA) and contribute to making the digital world safer. I want to explore both fields, develop my skills, and build an independent professional identity through dedication and hard work, InshaAllah."
        },

        thanks: {
            title: "A Little Note for You",
            text: "Thank you for taking the time to explore my digital world. Every corner of this portfolio represents a little part of my learning, creativity, dreams, and ambitions. I truly appreciate your visit and hope you enjoyed discovering my journey. Remember, every great achievement begins with a dream, a little courage, and the determination to keep going. Stay curious, keep growing, and never stop believing in your dreams. With gratitude, Fasiha."
        }

    };

    /* =====================================
       OPEN AND CLOSE VAULT
    ===================================== */

    function openVault() {
        vaultOverlay.classList.add("vault-active");
        document.body.classList.add("vault-open");
        vaultOverlay.querySelector(".vault-close").focus();
    }

    function closeVault() {
        vaultOverlay.classList.remove("vault-active");
        document.body.classList.remove("vault-open");
        vaultButton.focus();
    }

    vaultButton.addEventListener("click", openVault);

    vaultOverlay.querySelector(".vault-close")
        .addEventListener("click", closeVault);

    /* =====================================
       REVEAL VAULT SECTIONS
    ===================================== */

    vaultOverlay.querySelectorAll(".vault-panel")
        .forEach((panel) => {

            panel.addEventListener("click", () => {

                const section = sections[panel.dataset.section];

                if (!section) return;

                detail.innerHTML = `
                    <span class="vault-detail-icon">✧</span>
                    <h2>${section.title}</h2>
                    <p>${section.text}</p>
                `;

                vaultOverlay.querySelectorAll(".vault-panel")
                    .forEach((item) => {
                        item.classList.remove("vault-panel-selected");
                    });

                panel.classList.add("vault-panel-selected");
            });

        });

    /* =====================================
       CLOSE ON OUTSIDE CLICK
    ===================================== */

    vaultOverlay.addEventListener("click", (event) => {
        if (event.target === vaultOverlay) {
            closeVault();
        }
    });

    /* =====================================
       CLOSE WITH ESCAPE KEY
    ===================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            vaultOverlay.classList.contains("vault-active")
        ) {
            closeVault();
        }

    });

    console.log("The Hidden Vault initialized.");

});
