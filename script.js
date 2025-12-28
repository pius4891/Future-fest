document.addEventListener("DOMContentLoaded", () => {
    // PAGE NAVIGATION
    const pages = document.querySelectorAll(".page");
    const buttons = document.querySelectorAll("nav button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const pageId = button.getAttribute("data-page");
            if (!pageId) return;

            pages.forEach(page => page.classList.remove("active"));
            document.getElementById(pageId)?.classList.add("active");

            buttons.forEach(btn => btn.classList.remove("active-link"));
            button.classList.add("active-link");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // ==========================
    // CONTACT FORM HANDLER
    // ==========================
    const form = document.getElementById("contactForm");
    const response = document.getElementById("formResponse");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // GET INPUT VALUES SAFELY
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const data = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            response.textContent = "Sending message... ⏳";

            try {
                const res = await fetch("http://localhost:5000/api/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.error || "Server error");
                }

                response.textContent = "Message sent successfully ✅";
                response.style.color = "lightgreen";
                form.reset();

            } catch (err) {
                response.textContent = "Failed to send message ❌";
                response.style.color = "red";
                console.error(err);
            }
        });
    }
});
// ==========================
// SPONSOR FORM HANDLER
// ==========================
const sponsorForm = document.getElementById("sponsorForm");

   if (sponsorForm) {
        sponsorForm.addEventListener("submit", async (e) => {
         e.preventDefault();

        const formData = new FormData(sponsorForm);

          const data = {
            name: formData.get("Name"),
            email: formData.get("Email"),
            phone: formData.get("Phone"),
            supportType: formData.get("Support Type"),
            message: formData.get("Message")
        };

            try {
              const res = await fetch("http://localhost:5000/api/sponsor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

              const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Submission failed");
            }

            alert("Sponsorship request submitted successfully ✅");
            sponsorForm.reset();

            } catch (error) {
            alert("Failed to submit sponsorship request ❌");
            console.error(error);
        }
    });
}

/* ==========================
   GLOBAL FUNCTIONS
   ========================== */

function showSponsorForm() {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("sponsor-form")?.classList.add("active");
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}
