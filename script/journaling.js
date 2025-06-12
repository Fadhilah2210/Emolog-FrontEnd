document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.querySelector(".save-btn");
  const titleInput = document.querySelector(".judul-area");
  const contentInput = document.querySelector(".journaling-textarea");
  const photoIcon = document.querySelector(".icon");

  saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const date = new Date().toISOString();

    if (!title || !content) {
      alert("Judul dan isi catatan tidak boleh kosong.");
      return;
    }

    // Simpan ke localStorage sementara
    const notes = JSON.parse(localStorage.getItem("journals") || "[]");
    notes.push({ title, content, date });
    localStorage.setItem("journals", JSON.stringify(notes));

    alert("Catatan berhasil disimpan!");
    // Optional: kosongkan field
    titleInput.value = "";
    contentInput.value = "";
  });

  // Navigasi ke folder / halaman upload gambar
  photoIcon.addEventListener("click", () => {
    // Misal ke halaman upload
    window.location.href = "../upload/upload.html"; 
    // atau bisa trigger <input type="file"> kalau pakai form
  });
});
