document.addEventListener("DOMContentLoaded", () => {
  const calendarDays = document.querySelectorAll(".calendar-day");
  const journalDateDisplay = document.querySelector(".journal-header h3");
  const diaryText = document.querySelector(".diary-text");
  const diaryTitle = document.querySelector(".diary-title");
  const moodEmoji = document.querySelector(".mood-emoji");

  const token = localStorage.getItem("token");

  // Simpan semua entries setelah fetch agar tidak perlu request ulang
  let allEntries = [];

  // Fungsi untuk fetch semua entries dari server
  async function fetchEntries() {
    try {
      const response = await fetch("http://localhost:3000/api/entries", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data journaling.");
      }

      allEntries = await response.json();
    } catch (error) {
      console.error("Fetch entries error:", error.message);
    }
  }

  // Fungsi menampilkan entry berdasarkan tanggal
    function showEntryByDate(selectedDate) {
    const formattedDate = selectedDate.toISOString().split("T")[0];

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    journalDateDisplay.textContent = selectedDate.toLocaleDateString('id-ID', options);

    const entries = allEntries.filter(e => e.entry_date === formattedDate);

    const diaryContainer = document.querySelector(".diary-content");
    diaryContainer.innerHTML = ""; // kosongkan dulu

    if (entries.length > 0) {
      entries.forEach(entry => {
        const entryEl = document.createElement("div");
        entryEl.classList.add("diary-entry-block");

        entryEl.innerHTML = `
          <h4 class="diary-title">${entry.title || "Tanpa Judul"}</h4>
          <p class="diary-text">${entry.entry_text || "(Kosong)"}</p>
          <div class="mood-display">Mood: ${getEmojiByEmotion(entry.emotion_id)}</div>
          <hr/>
        `;

        diaryContainer.appendChild(entryEl);
      });
    } else {
      diaryContainer.innerHTML = `
        <p class="diary-text">Belum ada journaling di tanggal ini.</p>
      `;
    }
  }


  // Fungsi bantu: dapatkan emoji dari emotion_id (sementara)
  function getEmojiByEmotion(emotionId) {
    const emojiMap = {
      1: "😊", // Senang
      2: "😢", // Sedih
      3: "😠", // Marah
      4: "😨", // Takut
      5: "😐", // Netral
    };
    return emojiMap[emotionId] || "😐";
  }

  // Tambahkan event listener ke setiap tanggal
  calendarDays.forEach(day => {
    day.addEventListener("click", () => {
      // Ambil angka tanggal dari button
      const dayNumber = parseInt(day.textContent);
      if (isNaN(dayNumber)) return;

      // Asumsikan bulan = Juni 2025
      const selectedDate = new Date(2025, 5, dayNumber); // Bulan 5 = Juni
      showEntryByDate(selectedDate);

      // Highlight yang aktif
      calendarDays.forEach(d => d.classList.remove("selected"));
      day.classList.add("selected");
    });
  });

  // Fetch entries saat halaman dimuat, lalu tampilkan default hari ini
  fetchEntries().then(() => {
    const today = new Date();
    showEntryByDate(today);
  });
});
