import { getAllEntries } from '../utils/db.js'; // sesuaikan path dan fungsi

document.addEventListener("DOMContentLoaded", async () => {
    const entries = await getAllEntries(); // Ambil semua data jurnal

    document.getElementById("total-entries").textContent = entries.length;

    const moodCounts = { happy: 0, neutral: 0, sad: 0 };
    const dayMoodMap = {};

    entries.forEach(entry => {
        const mood = entry.mood;
        moodCounts[mood]++;

        const day = new Date(entry.date).getDay(); // 0 = Minggu, ..., 6 = Sabtu
        dayMoodMap[day] = mood; // override dengan yang terbaru
    });

    // Mood dominan
    const dominantMood = Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    document.getElementById("dominant-mood").textContent = capitalize(dominantMood);

    // Hitung distribusi mood untuk bar (opsional - bisa atur width & teks)
    const total = moodCounts.happy + moodCounts.neutral + moodCounts.sad;
    document.querySelector('.bar-happy').style.width = `${(moodCounts.happy / total) * 100}%`;
    document.querySelector('.bar-neutral').style.width = `${(moodCounts.neutral / total) * 100}%`;
    document.querySelector('.bar-sad').style.width = `${(moodCounts.sad / total) * 100}%`;

    // Update emoji mingguan (misal diurut Senin sampai Minggu)
    const dayMap = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const moodImageMap = {
        happy: "/assets/happy.png",
        neutral: "/assets/netral.png",
        sad: "/assets/sad.png",
    };

    dayMap.forEach((_, i) => {
        const emojiEl = document.querySelectorAll('.trend-emoji img')[i];
        const mood = dayMoodMap[(i + 1) % 7]; // i=0 → Senin
        if (mood && emojiEl) {
            emojiEl.src = moodImageMap[mood];
            emojiEl.alt = `${capitalize(mood)} Mood`;
        }
    });
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
