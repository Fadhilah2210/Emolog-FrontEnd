document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.querySelector(".save-btn");
  const titleInput = document.querySelector(".judul-area");
  const entryInput = document.querySelector(".journaling-textarea");
  const dateInput = document.getElementById("journal-date");

  // Set default tanggal ke hari ini
  const today = new Date().toISOString().split("T")[0];
  if (dateInput) dateInput.value = today;

  saveButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const title = titleInput.value.trim();
    const entry_text = entryInput.value.trim(); // sesuai backend
    const entry_date = dateInput ? dateInput.value : today; // sesuai backend
    const emotion_id = 1; // default sementara

    if (!title || !entry_text) {
      alert("Judul dan catatan tidak boleh kosong!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          entry_text,
          emotion_id,
          entry_date
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan journaling.");
      }

      alert("Journaling berhasil disimpan!");
      titleInput.value = "";
      entryInput.value = "";

    } catch (error) {
      console.error("Error saat menyimpan journaling:", error.message);
      alert("Gagal menyimpan journaling: " + error.message);
    }
  });
});
