/* ==============================
   EMAILJS CONTACT FORM
================================ */

function initializeContactForm() {

    const contactForm = document.querySelector("#contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formMessage = document.querySelector("#formMessage");
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const serviceID = "service_7lupav9";
        const templateID = "template_r1cfm89";
        const publicKey = "tUsclxa6XkOOOoVt9";

        const templateParams = {
            name: contactForm.querySelector("#name").value,
            email: contactForm.querySelector("#email").value,
            subject: "New Portfolio Contact Message",
            message: contactForm.querySelector("#message").value
        };

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {

            await emailjs.send(
                serviceID,
                templateID,
                templateParams,
                { publicKey: publicKey }
            );

            formMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            formMessage.textContent =
                "Message could not be sent. Please try again.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        }

    });

}