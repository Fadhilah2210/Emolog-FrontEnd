document.addEventListener("DOMContentLoaded", () => {
  // Ambil username dari localStorage (setelah login)
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Cek apakah user sudah login
  if (!username || !token) {
    window.location.href = "../login/login.html";
    return;
  }

  // Tampilkan greeting
  const greetingElement = document.querySelector(".greeting-text h1");
  if (greetingElement) {
    greetingElement.textContent = `Halo, ${email}!`;
  }

  // Event listener tombol "Mulai Menulis"
  const startBtn = document.querySelector(".start-journaling-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      window.location.href = "../journaling/journaling.html";
    });
  }

  // Placeholder: Fetch data journaling terbaru (optional)
  fetchLatestDiary(token);
});

// Fungsi dummy untuk fetch data diary terbaru
async function fetchLatestDiary(token) {
  try {
    const response = await fetch("http://localhost:3000/api/diary/latest", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.warn("Gagal mengambil data diary terbaru");
      return;
    }

    const data = await response.json();
    console.log("Data diary terbaru:", data);

    // TODO: Tampilkan data diary terbaru ke elemen tertentu
    // Misalnya:
    // document.querySelector("#latest-diary").textContent = data.content;
  } catch (error) {
    console.error("Terjadi kesalahan saat fetch diary:", error.message);
  }
}
