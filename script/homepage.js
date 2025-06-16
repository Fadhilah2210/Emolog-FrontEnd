document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Redirect ke login jika tidak ada token/username
  if (!username || !token) {
    window.location.href = "../login/login.html";
    return;
  }

  // Ganti greeting dengan username
  const greetingElement = document.querySelector(".greeting-text h1");
  if (greetingElement) {
    greetingElement.textContent = `Halo, ${username}!`;
  }

  // Tombol "Mulai Menulis"
  const startBtn = document.querySelector(".start-journaling-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      window.location.href = "../journaling/journaling.html";
    });
  }

  // Ambil entri terbaru dan entri 7 hari terakhir
  fetchLatestDiary(token);
  fetchRecentEntries(token);
  renderWeeklyRecap(data);
});

async function fetchLatestDiary(token) {
  try {
    const response = await fetch("http://localhost:3000/api/entries", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.warn("Gagal mengambil data diary");
      return;
    }

    const entries = await response.json();

    // 🔥 Sort entries berdasarkan created_at DESC (jika ada), fallback ke id atau entry_date
    const sortedEntries = entries.sort((a, b) => {
      const timeA = new Date(a.created_at || a.entry_date || 0);
      const timeB = new Date(b.created_at || b.entry_date || 0);
      return timeB - timeA;
    });

    const latestEntry = sortedEntries[0]; // entri terakhir

    // 📝 Isi teks diary
    const diaryTextElement = document.querySelector(".diary-text");
    if (diaryTextElement) {
      if (latestEntry) {
        diaryTextElement.textContent = latestEntry.entry_text;
      } else {
        diaryTextElement.textContent = "Belum ada catatan.";
      }
    }

    // 😊 Emoji berdasarkan emotion_id
    const emojiImg = document.querySelector(".emoji-container img");
    if (emojiImg && latestEntry?.emotion_id) {
      switch (latestEntry.emotion_id) {
        case 1:
          emojiImg.src = "/assets/happy.png";
          break;
        case 2:
          emojiImg.src = "/assets/sad.png";
          break;
        case 3:
          emojiImg.src = "/assets/netral.png";
          break;
        default:
          emojiImg.src = "/assets/netral.png";
      }
    }

    // 🗓️ Tanggal diary terakhir
    const diaryDate = document.querySelector(".diary-date");
    if (diaryDate) {
      const rawDate = latestEntry?.created_at || latestEntry?.entry_date;
      if (rawDate) {
        const date = new Date(rawDate);
        const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const hariName = hari[date.getDay()];
        const tanggal = String(date.getDate()).padStart(2, "0");

        diaryDate.textContent = `${tanggal} ${hariName}`;
      } else {
        diaryDate.textContent = "";
      }
    }

  } catch (error) {
    console.error("Gagal fetch diary:", error.message);
  }
}

async function fetchRecentEntries(token) {
  try {
    const response = await fetch("http://localhost:3000/api/entries/recent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn("Gagal mengambil data recent entries");
      return;
    }

    const data = await response.json();
    renderRecentEntries(data);
  } catch (error) {
    console.error("Error fetch recent entries:", error);
  }
}

function renderWeeklyRecap(entries) {
  const container = document.querySelector(".recap-week-list");
  container.innerHTML = "";

  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(currentWeekStart);
    currentDate.setDate(currentDate.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0]; // format YYYY-MM-DD

    // Cari entry yang cocok berdasarkan tanggal YYYY-MM-DD
    const entry = entries.find(e => {
      const entryDateStr = new Date(e.entry_date).toISOString().split("T")[0];
      return entryDateStr === dateStr;
    });

    const hariText = hari[currentDate.getDay()];
    const tanggal = currentDate.getDate();
    const bulanText = bulan[currentDate.getMonth()];
    const tahun = currentDate.getFullYear();

    let emojiSrc = "/assets/netral.png";
    let desc = "Belum ada catatan.";

    if (entry) {
      if (entry.emotion_id === 1) emojiSrc = "/assets/happy.png";
      else if (entry.emotion_id === 2) emojiSrc = "/assets/sad.png";
      desc = entry.entry_text.substring(0, 100) + "...";
    }

    const item = document.createElement("div");
    item.classList.add("recap-item");
    item.innerHTML = `
      <div class="emoji-container">
        <img src="${emojiSrc}" alt="Emoji" />
      </div>
      <div class="recap-text">
        <div class="recap-date">${hariText}, ${tanggal} ${bulanText} ${tahun}</div>
        <div class="recap-desc">${desc}</div>
      </div>
    `;
    container.appendChild(item);
  }
}





let currentWeekStart = getStartOfWeek(new Date());

function getStartOfWeek(date) {
  const copied = new Date(date);
  copied.setHours(0, 0, 0, 0);
  const day = copied.getDay(); // Minggu = 0
  const diff = copied.getDate() - day; // Mundur ke hari Minggu
  return new Date(copied.setDate(diff));
}

function updateWeekRangeDisplay() {
  const endDate = new Date(currentWeekStart);
  endDate.setDate(endDate.getDate() + 6);

  const formatDate = (d) => {
    const tgl = d.getDate();
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${tgl} ${bulan[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
  };

  const rangeText = `${formatDate(currentWeekStart)} – ${formatDate(endDate)}`;
  document.querySelector(".date-range").textContent = rangeText;
}

async function fetchWeeklyEntries(token, startDate) {
  try {
    const start = startDate.toISOString().split("T")[0];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    const end = endDate.toISOString().split("T")[0];

    const response = await fetch(`http://localhost:3000/api/entries/range?start=${start}&end=${end}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Gagal ambil data minggu ini");

    const data = await response.json();
    renderWeeklyRecap(data);
  } catch (err) {
    console.error(err);
  }
}


document.getElementById("prev-week").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  updateWeekRangeDisplay();
  fetchWeeklyEntries(localStorage.getItem("token"), currentWeekStart);
});

document.getElementById("next-week").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  updateWeekRangeDisplay();
  fetchWeeklyEntries(localStorage.getItem("token"), currentWeekStart);
});

document.addEventListener("DOMContentLoaded", () => {
  updateWeekRangeDisplay();
  const token = localStorage.getItem("token");
  if (!token) return window.location.href = "/login.html";
  fetchWeeklyEntries(token, currentWeekStart);
});



