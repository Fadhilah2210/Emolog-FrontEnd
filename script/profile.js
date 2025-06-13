const token = localStorage.getItem("token");

if (!token) {
  alert("Token tidak ditemukan, silakan login kembali.");
  window.location.href = "../login/login.html";
}

fetch("http://localhost:3000/api/profile", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  document.getElementById("fullname").value = data.fullname;
  document.getElementById("username").value = data.username;
  document.getElementById("email").value = data.email;
})
.catch(err => {
  alert("Terjadi kesalahan saat mengambil data profil.");
  console.error(err);
});
