document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.querySelector("input[placeholder='Name']");
  const emailInput = document.querySelector("input[placeholder='Email']");
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      window.location.href = "../login/login.html";
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  });

  // ✅ Toggle password visibility logic
  if (toggleIcon && passwordInput) {
    toggleIcon.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      toggleIcon.src = isHidden ? "/assets/eyeopen.png" : "/assets/eyeclose.png";
    });
  }
});
