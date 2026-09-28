const D = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

// Data jadwal. Tiap mata kuliah:
// n = nama, s = mulai, e = selesai, jam = kode jam/sesi,
// dosen = nama dosen, rooms = daftar lokasi
// (code = kode ruang, label = nama tampilan, p = pertemuan, mode = tatap muka/online)
const R = (c, x = {}) => ({ code: c, ...x });
const S = {
  0: [
    {
      n: "Komputasi Big Data",
      s: "10:00",
      e: "11:30",
      jam: "",
      dosen: "Team Teaching",
      rooms: [{ label: "UGTV" }],
    },
  ],
  1: [
    {
      n: "Struktur Data**",
      s: "07:30",
      e: "10:30",
      jam: "1/2/3",
      dosen: "Diana Tri Susetianingtias",
      rooms: [R("G236")],
    },
    {
      n: "Informatika Kesehatan",
      s: "11:30",
      e: "13:30",
      jam: "5/6",
      dosen: "Ika Satya Perdhana",
      rooms: [R("G236")],
    },
    {
      n: "Pengantar Sains Data**",
      s: "13:30",
      e: "15:30",
      jam: "7/8",
      dosen: "Pipit Dewi Arnesia",
      rooms: [R("G216")],
    },
  ],
  2: [
    {
      n: "Legal Aspek Produk TI & Komunikasi",
      s: "07:30",
      e: "09:30",
      jam: "1/2",
      dosen: "Intan Meutia Sari",
      rooms: [R("E441")],
    },
    {
      n: "Organisasi Sistem Komputer */**",
      s: "09:30",
      e: "11:30",
      jam: "3/4",
      dosen: "Sandhi Prajaka",
      rooms: [R("E441")],
    },
    {
      n: "Matematika Lanjut 1",
      s: "13:30",
      e: "16:30",
      jam: "7/8/9",
      dosen: "Maria Ta Dewi",
      rooms: [R("E345")],
    },
  ],
  3: [
    {
      n: "Matematika Informatika 3",
      s: "07:30",
      e: "10:30",
      jam: "1/2/3",
      dosen: "Aini Suri Talita",
      rooms: [R("E314")],
    },
    {
      n: "Algoritma & Pemrograman 3*",
      s: "11:30",
      e: "13:30",
      jam: "5/6",
      dosen: "Lilis Kusnitawati",
      rooms: [R("E139")],
    },
    {
      n: "Statistika 1",
      s: "14:30",
      e: "17:30",
      jam: "8/9/10",
      dosen: "Sri Rakhmawati",
      rooms: [R("E139")],
    },
  ],
  4: [
    {
      n: "Praktikum Komputasi Big Data",
      s: "07:30",
      e: "09:30",
      jam: "Sesi 1",
      dosen: "Tim Dosen",
      rooms: [
        R("F5601", {
          label: "Lab. F5601",
          p: "M1, M3, M5, M7",
          mode: "Tatap muka",
        }),
        { label: "V-Class", p: "M2, M4, M6, M8", mode: "Online" },
      ],
    },
  ],
  5: [],
};

// Hari & jam sekarang dalam WIB (Asia/Jakarta), apa pun zona waktu perangkat
const HARI = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
let todayIdx = 0,
  mins = 0;
function readNow() {
  const p = {};
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(new Date())
    .forEach((x) => (p[x.type] = x.value));
  todayIdx = HARI[p.weekday];
  mins = +p.hour * 60 + +p.minute;
}
readNow();
const toM = (t) => {
  const [h, m] = t.split(":");
  return +h * 60 + +m;
};

// E342 -> Kampus E · Gedung 3 · Lantai 4 · Ruang 2
function loc(code) {
  const m = /^([A-Z])(\d)(\d)(\d{1,2})$/.exec(code || "");
  return m
    ? `Kampus ${m[1]} · Gedung ${m[2]} · Lantai ${m[3]} · Ruang ${+m[4]}`
    : "";
}

// "1/2/3" -> "Jam ke-1 sampai 3", "Sesi 1" tetap
function jamText(j) {
  if (!j) return "";
  if (!/^\d/.test(j)) return j;
  const a = j.split("/");
  return a.length > 1
    ? `Jam ke-${a[0]} sampai ${a[a.length - 1]}`
    : `Jam ke-${a[0]}`;
}

function dur(c) {
  const d = toM(c.e) - toM(c.s);
  const h = Math.floor(d / 60),
    m = d % 60;
  return (h ? h + " jam" : "") + (h && m ? " " : "") + (m ? m + " menit" : "");
}

function roomBrief(c) {
  return c.rooms
    .map((r) => (r.label || r.code) + (r.p ? ` (${r.p.replace(/ /g, "")})` : ""))
    .join(" · ");
}

function roomDetail(c) {
  return c.rooms
    .map(
      (r) =>
        `<div class="loc"><b>${r.label || "Ruang " + r.code}${r.mode ? " · " + r.mode : ""}</b>${r.p ? `<span>Pertemuan ${r.p}</span><br>` : ""}${r.code ? `<span>Ruang ${r.code} = ${loc(r.code)}</span>` : ""}</div>`,
    )
    .join("");
}

const isLive = (i, c) =>
  i === todayIdx && mins >= toM(c.s) && mins < toM(c.e);

const tabs = document.getElementById("tabs"),
  out = document.getElementById("out");
let sel = todayIdx < 6 ? todayIdx : "all";
let manual = false; // true kalau pengguna sudah memilih tab sendiri

function dayHTML(i) {
  const items = S[i];
  let h = `<section class="day"><h2>${D[i]}${i === todayIdx ? '<span class="badge">Hari ini</span>' : ""}</h2>`;
  if (!items.length) h += '<div class="empty">Tidak ada mata kuliah</div>';
  items.forEach((c, k) => {
    const live = isLive(i, c);
    h += `<details data-key="${i}-${k}" class="item${live ? " live" : ""}"><summary><div class="time">${c.s}<small>sampai ${c.e}</small></div><div><div class="name">${c.n}${live ? ' <span class="badge">Berlangsung</span>' : ""}</div><div class="meta">${roomBrief(c)} · ${c.dosen}</div></div></summary>
    <div class="detail"><dl>
      <dt>Hari</dt><dd>${D[i]}</dd>
      <dt>Waktu</dt><dd>${c.s} – ${c.e} WIB (${dur(c)})</dd>
      ${c.jam ? `<dt>Jam kuliah</dt><dd>${jamText(c.jam)}</dd>` : ""}
      <dt>Dosen</dt><dd>${c.dosen}</dd>
      <dt>Lokasi</dt><dd>${roomDetail(c)}</dd>
    </dl></div></details>`;
  });
  return h + "</section>";
}

function render() {
  const opened = [...out.querySelectorAll("details[open]")].map(
    (d) => d.dataset.key,
  );
  tabs.innerHTML = ["all", 0, 1, 2, 3, 4, 5]
    .map(
      (k) =>
        `<button role="tab" aria-selected="${k === sel}" class="${k === todayIdx ? "today" : ""}" data-k="${k}">${k === "all" ? "Semua" : D[k]}</button>`,
    )
    .join("");
  out.innerHTML =
    sel === "all" ? D.map((_, i) => dayHTML(i)).join("") : dayHTML(sel);
  opened.forEach((k) => {
    const d = out.querySelector(`details[data-key="${k}"]`);
    if (d) d.open = true;
  });
}

tabs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  manual = true;
  sel = b.dataset.k === "all" ? "all" : +b.dataset.k;
  render();
});

// Tanda unik kondisi sekarang: hari + kuliah yang sedang berlangsung
const signature = () =>
  todayIdx +
  "|" +
  D.map((_, i) =>
    S[i].map((c, k) => (isLive(i, c) ? i + "-" + k : "")).join(""),
  ).join("");

let lastSig = "",
  lastDay = todayIdx;
function tick() {
  readNow();
  if (todayIdx !== lastDay) {
    lastDay = todayIdx;
    if (!manual) sel = todayIdx < 6 ? todayIdx : "all"; // ikut ganti hari
  }
  const sig = signature();
  if (sig !== lastSig) {
    lastSig = sig;
    render();
  }
}
tick();
setInterval(tick, 30000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) tick();
});
