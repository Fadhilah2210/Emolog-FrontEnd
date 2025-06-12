document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const registeredUser = {
      username: "cobatest",
      password: "12345"
    };

    if (username === registeredUser.username && password === registeredUser.password) {
      localStorage.setItem("username", username);
      localStorage.setItem("token", "dummy-token"); // Simulasi token
      window.location.href = "../home/homepage.html";
    } else {
      alert("Login gagal. Cek kembali username/password.");
    }
  });

  // ✅ Toggle password logic
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
