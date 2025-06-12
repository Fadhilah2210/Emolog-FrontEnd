// Elemen penting
const calendarTitle = document.querySelector(".calendar-title");
const calendarGrid = document.querySelector(".calendar-grid");
const prevBtn = document.querySelectorAll(".nav-btn")[0];
const nextBtn = document.querySelectorAll(".nav-btn")[1];
const journalDate = document.getElementById("journal-date");
const diaryText = document.getElementById("diaryText");
const noDiaryText = document.getElementById("noDiaryText");
const moodDisplay = document.getElementById("moodDisplay");

let currentDate = new Date(); // waktu saat ini

// Simulasi data diary
const diaryData = {
  "2025-06-02": {
    mood: "😊",
    text: "Hari ini adalah hari yang menyenangkan..."
  },
  "2025-06-03": {
    mood: "😔",
    text: "Hari ini cukup melelahkan..."
  }
};

// Fungsi render kalender
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1).getDay(); // Minggu = 0
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Nama bulan
  const monthName = currentDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
  calendarTitle.textContent = `${monthName}`;

  // Bersihkan semua hari lama
  const days = calendarGrid.querySelectorAll(".calendar-day");
  days.forEach(day => day.remove());

  // Hitung offset hari pertama (agar mulai dari Senin)
  let startDay = (firstDay === 0) ? 6 : firstDay - 1;

  // Tambah tanggal bulan sebelumnya
  const prevLastDate = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const day = createDayButton(prevLastDate - i, "other-month");
    calendarGrid.appendChild(day);
  }

  // Tanggal bulan ini
  for (let i = 1; i <= lastDate; i++) {
    const dateStr = formatDate(year, month + 1, i); // yyyy-mm-dd
    const day = createDayButton(i, "current-month", dateStr);
    calendarGrid.appendChild(day);
  }

  // Tambah tanggal bulan depan
  const totalCells = startDay + lastDate;
  const nextDays = 42 - totalCells; // total 6 minggu (6x7 = 42)
  for (let i = 1; i <= nextDays; i++) {
    const day = createDayButton(i, "other-month");
    calendarGrid.appendChild(day);
  }
}

// Buat tombol hari
function createDayButton(dayNum, className, dateStr = null) {
  const btn = document.createElement("button");
  btn.textContent = dayNum;
  btn.classList.add("calendar-day", className);
  if (dateStr) {
    btn.addEventListener("click", () => {
      selectDate(btn, dateStr);
    });
  }
  return btn;
}

// Saat tanggal diklik
function selectDate(btn, dateStr) {
  // Hapus class 'selected' dari yang lain
  document.querySelectorAll(".calendar-day.selected").forEach(el => {
    el.classList.remove("selected");
  });
  btn.classList.add("selected");

  const dateObj = new Date(dateStr);
  journalDate.textContent = dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const diary = diaryData[dateStr];
  if (diary) {
    diaryText.textContent = diary.text;
    diaryText.style.display = "block";
    noDiaryText.style.display = "none";
    moodDisplay.textContent = diary.mood;
  } else {
    diaryText.style.display = "none";
    noDiaryText.style.display = "block";
    moodDisplay.textContent = "😐";
  }
}

// Format jadi yyyy-mm-dd
function formatDate(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Navigasi bulan
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});
nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Render pertama
renderCalendar();
