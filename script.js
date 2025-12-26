document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const buttons = document.querySelectorAll("nav button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const pageId = button.getAttribute("data-page");

            // Hide all pages
            pages.forEach(page => page.classList.remove("active"));

            // Show selected page
            document.getElementById(pageId).classList.add("active");

            // Update active button
            buttons.forEach(btn => btn.classList.remove("active-link"));
            button.classList.add("active-link");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // CONTACT FORM
    const form = document.getElementById("contactForm");
    const response = document.getElementById("formResponse");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                name: name.value,
                email: email.value,
                message: message.value
            };

            try {
                const res = await fetch("http://localhost:5000/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                response.textContent = result.message || "Message sent!";
                form.reset();
            } catch {
                response.textContent = "Failed to send message ❌";
            }
        });
    }
    function showSponsorForm() {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("sponsor-form").classList.add("active");

    function logout() {
    localStorage.removeItem("user");
    location.reload();
}

}

});
