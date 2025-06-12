// profile.js

// Ambil semua elemen DOM yang diperlukan
const changePasswordBtn = document.getElementById("changePasswordBtn");
const changeEmailBtn = document.getElementById("changeEmailBtn");
const modalPassword = document.getElementById("changePasswordModal");
const modalEmail = document.getElementById("changeEmailModal");
const closePasswordModalBtn = document.getElementById("closeModalBtn");
const closeEmailModalBtn = document.getElementById("closeEmailModalBtn");
const saveEmailBtn = document.getElementById("saveEmailBtn");
const cancelEmailBtn = document.getElementById("cancelEmailBtn");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
const logoutBtn = document.querySelector(".logout-btn button");

// Tampilkan modal email
changeEmailBtn.addEventListener("click", () => {
  modalEmail.style.display = "flex";
});

// Tampilkan modal password
changePasswordBtn.addEventListener("click", () => {
  modalPassword.style.display = "flex";
});

// Tutup modal email
closeEmailModalBtn.addEventListener("click", () => {
  modalEmail.style.display = "none";
});

cancelEmailBtn.addEventListener("click", () => {
  modalEmail.style.display = "none";
});

// Tutup modal password
closePasswordModalBtn.addEventListener("click", () => {
  modalPassword.style.display = "none";
});

cancelPasswordBtn.addEventListener("click", () => {
  modalPassword.style.display = "none";
});

// Save perubahan email
saveEmailBtn.addEventListener("click", () => {
  // Logic validasi bisa ditambahkan di sini
  alert("Email successfully changed!");
  modalEmail.style.display = "none";
});

// Save perubahan password
savePasswordBtn.addEventListener("click", () => {
  // Logic validasi bisa ditambahkan di sini
  alert("Password successfully changed!");
  modalPassword.style.display = "none";
});

// Toggle password visibility
// Cari semua elemen toggle-password
document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const inputId = toggle.dataset.target;
    const passwordField = document.getElementById(inputId);
    const eyeIcon = document.getElementById(`eye-icon-${inputId}`);

    if (passwordField && eyeIcon) {
      const isHidden = passwordField.type === "password";
      passwordField.type = isHidden ? "text" : "password";
      eyeIcon.src = isHidden ? "/assets/eyeopen.png" : "/assets/eyeclose.png";
    }
  });
});


// Event untuk menutup modal jika klik di luar modal
window.addEventListener("click", (event) => {
  if (event.target === modalPassword) {
    modalPassword.style.display = "none";
  }
  if (event.target === modalEmail) {
    modalEmail.style.display = "none";
  }
});

// Event untuk tombol logout
logoutBtn.addEventListener("click", () => {
  // Bersihkan data login jika perlu
  // localStorage.removeItem('authToken');
  window.location.href = "../login/login.html";
});
