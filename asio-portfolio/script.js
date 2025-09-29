document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded");

  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    try { form.reset(); } catch (e) {}

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formDataObj = {
        name: form.querySelector("[name='name']").value.trim(),
        email: form.querySelector("[name='email']").value.trim(),
        message: form.querySelector("[name='message']").value.trim()
      };

      if (!formDataObj.name || !formDataObj.email || !formDataObj.message) {
        if (messageBox) {
          messageBox.textContent = "⚠️ Please fill out ALL fields before sending.";
          messageBox.style.color = "red";
        } else {
          alert("Please fill out ALL fields before sending.");
        }
        return;
      }

      try {
        const resp = await fetch("https://formspree.io/f/mqayejll", {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if (resp.ok) {
          if (messageBox) {
            messageBox.textContent = `✅ Thanks, ${formDataObj.name}! Your message has been sent.`;
            messageBox.style.color = "green";
          } else {
            alert(`Thanks, ${formDataObj.name}! Your message has been sent.`);
          }
          form.reset();
        } else {
          if (messageBox) {
            messageBox.textContent = "❌ Oops! Something went wrong. Please try again later.";
            messageBox.style.color = "red";
          } else {
            alert("Oops! Something went wrong. Please try again later.");
          }
        }
      } catch (err) {
        if (messageBox) {
          messageBox.textContent = "❌ Network error. Please try again later.";
          messageBox.style.color = "red";
        } else {
          alert("Network error. Please try again later.");
        }
      }
    });
  } else {
    console.log("contact form not found on this page.");
  }
});