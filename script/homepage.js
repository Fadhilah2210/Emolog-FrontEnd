document.addEventListener("DOMContentLoaded", () => {
  // Ambil username dari localStorage (setelah login)
  const username = localStorage.getItem("username");

  // Isi greeting
  if (username) {
    const greetingElement = document.querySelector(".greeting-text h1");
    if (greetingElement) {
      greetingElement.textContent = `Halo, ${username}!`;
    }
  } else {
    // Kalau tidak ada username, redirect ke login
    window.location.href = "../login/login.html";
    return;
  }

  // Event listener untuk tombol "Mulai Menulis"
  const startBtn = document.querySelector(".start-journaling-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      window.location.href = "../journaling/journaling.html";
    });
  }

  // TODO: Fetch latest diary, streak, etc dari backend
});
