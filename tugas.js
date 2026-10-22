// ---------- Data tugas ----------
// Tambah tugas baru dengan menyalin satu blok { ... } di bawah.
//   matkul   = nama mata kuliah
//   judul    = judul / nama tugas
//   deadline = "TTTT-BB-HH JJ:MM" (waktu WIB)
//   ket      = keterangan tambahan (boleh kosong "")
//   link     = tautan pengumpulan / soal (boleh kosong "")
//
// Contoh:
//   {
//     matkul: "Statistika 1",
//     judul: "Tugas 2 - Distribusi Peluang",
//     deadline: "2026-10-30 23:59",
//     ket: "Dikumpulkan lewat V-Class, format PDF.",
//     link: "",
//   },
const TUGAS = [
  {
    matkul: "Statistika 1",
    judul: "Tugas tabel distribusi frekuensi",
    deadline: "2026-10-28 23:59",
    ket:"Menghitung Mean Median Modus dari data yang sudah di buat, apakah data normal atau tidak normal, dan sertakan konklusi dari hasil nya",
    link: "",
  },
  {
    matkul: "Praktikum Organisasi Sistem Komputer (Ilab)",
    judul: "Topik 1 - Topik 3",
    deadline: "2026-11-08 23:59",
    ket: "",
    link: "https://praktikum.gunadarma.ac.id/my/",
  },
  {
    matkul: "Praktikum Struktur Data (Ilab)",
    judul: "Topik 1 - Topik 2",
    deadline: "2026-11-08 23:59",
    ket: "",
    link: "https://praktikum.gunadarma.ac.id/my/",
  },
  {
    matkul: "Praktikum Komputasi Big Data",
    judul: "Pre-test, Post-test, dan pengumpulan tugas",
    deadline: "2026-10-24 23:59",
    ket: "Moda Self Study Pertemuan ke-4",
    link: "https://v-class.gunadarma.ac.id/course/view.php?id=24",
  },
];

// ---------- Tampilan ----------
const BULAN = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];
const HARI_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

// "2026-10-30 23:59" dibaca sebagai WIB (+07:00) di perangkat mana pun
const toDate = (t) => new Date(t.replace(" ", "T") + ":00+07:00");

// Tanggal tampilan juga dipaksa ke WIB
function fmtDeadline(d) {
  const p = {};
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(d)
    .forEach((x) => (p[x.type] = x.value));
  const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
  return `${HARI_ID[wd]}, ${p.day} ${BULAN[+p.month - 1]} · ${p.hour}:${p.minute} WIB`;
}

function remain(ms) {
  const m = Math.floor(Math.abs(ms) / 60000);
  const d = Math.floor(m / 1440),
    h = Math.floor((m % 1440) / 60),
    mi = m % 60;
  if (d) return `${d} hari ${h} jam`;
  if (h) return `${h} jam ${mi} menit`;
  return `${mi} menit`;
}

const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

const box = document.getElementById("tasks");

function render() {
  const now = Date.now();
  const list = TUGAS.map((t) => ({ ...t, at: toDate(t.deadline) })).sort(
    (a, b) => a.at - b.at,
  );
  const open = list.filter((t) => t.at - now >= 0);
  const done = list.filter((t) => t.at - now < 0);

  if (!list.length) {
    box.innerHTML = '<div class="empty">Belum ada info tugas</div>';
    return;
  }

  const row = (t, late) => {
    const left = t.at - now;
    const urgent = !late && left < 24 * 3600 * 1000;
    return `<article class="task${late ? " task-late" : ""}${urgent ? " task-urgent" : ""}">
      <p class="task-course">${esc(t.matkul)}</p>
      <h3 class="task-title">${esc(t.judul)}</h3>
      <p class="task-due">${fmtDeadline(t.at)}
        <span class="task-left">${late ? "lewat " + remain(left) : "sisa " + remain(left)}</span></p>
      ${t.ket ? `<p class="task-note">${esc(t.ket)}</p>` : ""}
      ${t.link ? `<a class="task-link" href="${esc(t.link)}" target="_blank" rel="noopener">Buka tautan</a>` : ""}
    </article>`;
  };

  box.innerHTML =
    `<section class="day"><h2>Belum lewat tenggat</h2>${
      open.length
        ? open.map((t) => row(t, false)).join("")
        : '<div class="empty">Tidak ada tugas aktif</div>'
    }</section>` +
    (done.length
      ? `<section class="day"><h2>Sudah lewat</h2>${done
          .slice()
          .reverse()
          .map((t) => row(t, true))
          .join("")}</section>`
      : "");
}

render();
setInterval(render, 60000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});
