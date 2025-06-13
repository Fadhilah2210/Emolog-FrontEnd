document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Email dan password harus diisi.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Login gagal: " + (data.message || "Email atau password salah."));
        return;
      }

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || "Guest");
      localStorage.setItem("email", data.email || email);

      // Simpan juga ke localStorage sebagai 1 objek user (opsional)
      const userData = {
        username: data.username || "Guest",
        email: data.email || email
      };
      localStorage.setItem("user", JSON.stringify(userData));

      alert("Login berhasil!");
      window.location.href = "../home/homepage.html";

    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan: " + error.message);
    }
  });

  // Toggle password visibility
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");

  if (passwordInput && toggleIcon) {
    toggleIcon.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      toggleIcon.src = isHidden ? "/assets/eyeopen.png" : "/assets/eyes.png";
    });
  }

  
});
