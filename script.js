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
      dosen: "Diana",
      rooms: [R("G236")],
    },
    {
      n: "Informatika Kesehatan",
      s: "11:30",
      e: "13:30",
      jam: "5/6",
      dosen: "Ika",
      rooms: [R("G236")],
    },
    {
      n: "Pengantar Sains Data**",
      s: "13:30",
      e: "15:30",
      jam: "7/8",
      dosen: "Pipit",
      rooms: [R("G216")],
    },
  ],
  2: [
    {
      n: "Legal Aspek Produk TI & Komunikasi",
      s: "07:30",
      e: "09:30",
      jam: "1/2",
      dosen: "Intan",
      rooms: [R("E441")],
    },
    {
      n: "Organisasi Sistem Komputer */**",
      s: "09:30",
      e: "11:30",
      jam: "3/4",
      dosen: "Sandhi",
      rooms: [R("E441")],
    },
    {
      n: "Matematika Lanjut 1",
      s: "13:30",
      e: "16:30",
      jam: "7/8/9",
      dosen: "Maria",
      rooms: [R("E345")],
    },
  ],
  3: [
    {
      n: "Matematika Informatika 3",
      s: "07:30",
      e: "10:30",
      jam: "1/2/3",
      dosen: "Aini",
      rooms: [R("E314")],
    },
    {
      n: "Algoritma & Pemrograman 3*",
      s: "11:30",
      e: "13:30",
      jam: "5/6",
      dosen: "Lilis",
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
// ---------- Kelas Web Programming (sesi 4, 3 kelas paralel) ----------
// Kode kelas menentukan hari & ruang. Dosen belum tercantum di data.
const WEB = {
  "1IWPR271234K": { day: 1, room: "F4111" }, // Selasa
  "1IWPR271334K": { day: 2, room: "F4111" }, // Rabu
  "1IWPR271414K": { day: 3, room: "F491" }, // Kamis
};
// [npm, nama, kode kelas]
const PEOPLE = [
  ["51425400", "AHMAD KHAFID KURNIA", "1IWPR271234K"],
  ["51425385", "FACHRI AHSANUL ALFAN", "1IWPR271234K"],
  ["50425342", "FADLAN HAKIM", "1IWPR271234K"],
  ["50425446", "HADITYA ADAM NURPRATAMA", "1IWPR271234K"],
  ["50425464", "HASBI ALI RAMADAN", "1IWPR271234K"],
  ["50425485", "IHSAN FADLURRAHMAN", "1IWPR271234K"],
  ["50425503", "IRFAN RIVAI", "1IWPR271234K"],
  ["50425520", "JOHAN ANDREAS SIHOTANG", "1IWPR271234K"],
  ["50425559", "KHANSA NAILATUL HIDAYAH", "1IWPR271334K"],
  ["50425587", "M. ANANDA CAHYA RAMADHANI", "1IWPR271334K"],
  ["50425593", "M. RASHYA IBRAHIM", "1IWPR271334K"],
  ["50425596", "M.DAFFA KURNIA ATHALA", "1IWPR271334K"],
  ["50425600", "MAHARDIEKA YUSUF NUGRAHA", "1IWPR271334K"],
  ["50425605", "MARCELYNO DWI PURWA SAPUTRA", "1IWPR271334K"],
  ["50425649", "MOHAMMAD SYAHRU RAMADHAN", "1IWPR271334K"],
  ["50425654", "MUAMMAR KHADAFI", "1IWPR271334K"],
  ["50425716", "MUHAMMAD ARDY NANSYAH", "1IWPR271334K"],
  ["50425810", "MUHAMMAD NAWAWI", "1IWPR271414K"],
  ["50425960", "NI KETUT AYU SRI FAJARWATI", "1IWPR271414K"],
  ["51425062", "RAJA DENATA", "1IWPR271414K"],
  ["51425081", "RANGGA DHARMA PUTRA", "1IWPR271414K"],
  ["51425094", "RAYANDRA ANANDAWIDANI YUSUF", "1IWPR271414K"],
  ["51425154", "RIZKY DWI HANGGORO", "1IWPR271414K"],
  ["51425187", "SALSABILA IBTISA", "1IWPR271414K"],
  ["51425289", "VIRGI CAHYA KUSTARI", "1IWPR271414K"],
  ["51425293", "WARIH BAYU PAMUNGKAS", "1IWPR271414K"],
  ["51425306", "WISNU PANJI NUGROHO", "1IWPR271414K"],
];

// Kelas Web Programming yang jatuh di hari i, lengkap dengan daftar namanya
function extraFor(i) {
  return Object.entries(WEB)
    .filter(([, w]) => w.day === i)
    .map(([kode, w]) => ({
      n: "Introduction to Web Programming Language",
      s: "18:30",
      e: "21:00",
      jam: "Sesi 4",
      dosen: "",
      kode,
      rooms: [R(w.room)],
      names: PEOPLE.filter((p) => p[2] === kode).map((p) => ({
        npm: p[0],
        nama: p[1],
      })),
    }));
}

// Jadwal umum + kelas Web Programming milik orang terpilih, urut jam mulai
const itemsFor = (i) =>
  [...(S[i] || []), ...extraFor(i)].sort((a, b) => toM(a.s) - toM(b.s));

// " · Nama Dosen" kalau ada, kosong kalau belum tercantum
const dp = (c) => (c.dosen ? ` · ${c.dosen}` : "");

// ---------- Jam & hari sekarang, selalu WIB (Asia/Jakarta) ----------
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
const isLive = (i, c) =>
  i === todayIdx && mins >= toM(c.s) && mins < toM(c.e);

function fmtRemain(m) {
  const h = Math.floor(m / 60),
    r = m % 60;
  return (h ? h + " jam " : "") + r + " menit";
}

// E342 -> Kampus E · Gedung 3 · Lantai 4 · Ruang 2
// Kampus F4 pakai pola lain: F4 + lantai + ruang, selalu Gedung 1
// F491 -> Kampus F4 · Gedung 1 · Lantai 9 · Ruang 1
// F4111 -> Kampus F4 · Gedung 1 · Lantai 11 · Ruang 1
function loc(code) {
  const f4 = /^F4(\d{1,2})(\d)$/.exec(code || "");
  if (f4) return `Kampus F4 · Gedung 1 · Lantai ${f4[1]} · Ruang ${f4[2]}`;
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
    .join(", ");
}

function roomDetail(c) {
  return c.rooms
    .map(
      (r) =>
        `<div class="loc"><b>${r.label || "Ruang " + r.code}${r.mode ? " · " + r.mode : ""}</b>${r.p ? `<span>Pertemuan ${r.p}</span><br>` : ""}${r.code ? `<span>Ruang ${r.code} = ${loc(r.code)}</span>` : ""}</div>`,
    )
    .join("");
}

// ---------- Status "sekarang" untuk panel atas ----------
function getStatus() {
  const today = itemsFor(todayIdx);
  const live = today.find((c) => isLive(todayIdx, c));
  if (live) return { kind: "live", dayIdx: todayIdx, item: live };

  const next = today.find((c) => toM(c.s) > mins);
  if (next) return { kind: "next", dayIdx: todayIdx, item: next };

  for (let k = 1; k <= 6; k++) {
    const di = (todayIdx + k) % 7;
    if (di > 5) continue; // Minggu: tidak ada kelas terjadwal
    const its = itemsFor(di);
    if (its.length) return { kind: "later", dayIdx: di, item: its[0] };
  }
  return { kind: "none" };
}

function renderNow() {
  const st = getStatus();
  const el = document.getElementById("now");
  if (st.kind === "none") {
    el.innerHTML = `<p class="now-empty">Tidak ada kelas terjadwal untuk minggu ini.</p>`;
    return;
  }
  const c = st.item;
  if (st.kind === "live") {
    const remain = toM(c.e) - mins;
    el.innerHTML = `
      <p class="now-status is-live">Sedang berlangsung</p>
      <p class="now-name">${c.n}</p>
      <div class="now-time">${c.s}<span class="arrow">–</span>${c.e}</div>
      <p class="now-meta"><b>${roomBrief(c)}</b>${dp(c)} · berakhir dalam ${fmtRemain(remain)}</p>`;
  } else if (st.kind === "next") {
    const remain = toM(c.s) - mins;
    el.innerHTML = `
      <p class="now-status">Kelas berikutnya hari ini</p>
      <p class="now-name">${c.n}</p>
      <div class="now-time">${c.s}<span class="arrow">–</span>${c.e}</div>
      <p class="now-meta"><b>${roomBrief(c)}</b>${dp(c)} · mulai dalam ${fmtRemain(remain)}</p>`;
  } else {
    el.innerHTML = `
      <p class="now-status">Kelas berikutnya</p>
      <p class="now-name">${c.n}</p>
      <div class="now-time">${c.s}<span class="arrow">–</span>${c.e}</div>
      <p class="now-meta"><b>${roomBrief(c)}</b>${dp(c)} · ${D[st.dayIdx]}</p>`;
  }
}

// ---------- Tab hari & daftar kelas ----------
const tabs = document.getElementById("tabs"),
  out = document.getElementById("out");
let sel = todayIdx < 6 ? todayIdx : "all";
let manual = false; // true kalau pengguna sudah memilih tab sendiri

function dayHTML(i) {
  const items = itemsFor(i);
  let h = `<section class="day"><h2>${D[i]}</h2>`;
  if (!items.length) h += '<div class="empty">Tidak ada mata kuliah</div>';
  items.forEach((c, k) => {
    const live = isLive(i, c);
    h += `<details data-key="${i}-${k}" class="row${live ? " row-live" : ""}"><summary>
      <span class="row-time">${c.s}<small>${c.e}</small></span>
      <span>
        <span class="row-name">${c.n}</span>
        <span class="row-meta">${roomBrief(c)}${live ? ' · <span class="tag-live">sedang berlangsung</span>' : `${dp(c)}`}</span>
      </span>
      <span class="row-chev" aria-hidden="true"></span>
    </summary>
    <div class="detail"><dl>
      <dt>Waktu</dt><dd>${c.s} – ${c.e} WIB (${dur(c)})</dd>
      ${c.jam ? `<dt>Jam kuliah</dt><dd>${jamText(c.jam)}</dd>` : ""}
      ${c.dosen ? `<dt>Dosen</dt><dd>${c.dosen}</dd>` : ""}
      <dt>Lokasi</dt><dd>${roomDetail(c)}</dd>
      ${c.names ? `<dt>Peserta (${c.names.length})</dt><dd><ol class="names">${c.names.map((x) => `<li>${x.nama}<span>${x.npm}</span></li>`).join("")}</ol></dd>` : ""}
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
  const active = tabs.querySelector('[aria-selected="true"]');
  if (active) active.scrollIntoView({ block: "nearest", inline: "nearest" });
  opened.forEach((k) => {
    const d = out.querySelector(`details[data-key="${k}"]`);
    if (d) d.open = true;
  });
  renderNow();
}

tabs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  manual = true;
  sel = b.dataset.k === "all" ? "all" : +b.dataset.k;
  render();
});

// ---------- Perbarui otomatis tiap 30 detik ----------
const signature = () =>
  todayIdx +
  "|" +
  D.map((_, i) =>
    itemsFor(i)
      .map((c, k) => (isLive(i, c) ? i + "-" + k : ""))
      .join(""),
  ).join("");

let lastSig = "",
  lastDay = todayIdx;
function tick() {
  readNow();
  if (todayIdx !== lastDay) {
    lastDay = todayIdx;
    if (!manual) sel = todayIdx < 6 ? todayIdx : "all";
  }
  const sig = signature();
  if (sig !== lastSig) {
    lastSig = sig;
    render();
  } else {
    renderNow(); // tetap perbarui hitungan mundur tiap tick
  }
}
tick();
setInterval(tick, 30000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) tick();
});
