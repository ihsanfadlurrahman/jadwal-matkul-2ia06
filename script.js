const D = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
const S = {
  0: [["Komputasi Big Data", "10:00", "11:30", "", "UGTV / Team Teaching"]],
  1: [
    ["Struktur Data**", "07:30", "10:30", "1/2/3", "Ruang G236 · Diana"],
    ["Informatika Kesehatan", "11:30", "13:30", "5/6", "Ruang G236 · Ika"],
    ["Pengantar Sains Data**", "13:30", "15:30", "7/8", "Ruang G216 · Pipit"],
  ],
  2: [
    [
      "Legal Aspek Produk TI & Komunikasi",
      "07:30",
      "09:30",
      "1/2",
      "Ruang E441 · Intan",
    ],
    [
      "Organisasi Sistem Komputer */**",
      "09:30",
      "11:30",
      "3/4",
      "Ruang E441 · Sandhi",
    ],
    ["Matematika Lanjut 1", "13:30", "16:30", "7/8/9", "Ruang E345 · Maria"],
  ],
  3: [
    [
      "Matematika Informatika 3",
      "07:30",
      "10:30",
      "1/2/3",
      "Ruang E314 · Aini",
    ],
    [
      "Algoritma & Pemrograman 3*",
      "11:30",
      "13:30",
      "5/6",
      "Ruang E139 · Lilis",
    ],
    ["Statistika 1", "14:30", "17:30", "8/9/10", "Ruang E441 · Intan"],
  ],
  4: [
    [
      "Praktikum Komputasi Big Data",
      "07:30",
      "09:30",
      "Sesi 1",
      "V-Class & DGX",
    ],
  ],
  5: [],
};
const now = new Date(),
  todayIdx = (now.getDay() + 6) % 7,
  mins = now.getHours() * 60 + now.getMinutes();
const toM = (t) => {
  const [h, m] = t.split(":");
  return +h * 60 + +m;
};
const tabs = document.getElementById("tabs"),
  out = document.getElementById("out");
let sel = todayIdx < 6 ? todayIdx : "all";
function dayHTML(i) {
  const items = S[i];
  let h = `<section class="day"><h2>${D[i]}${i === todayIdx ? '<span class="badge">Hari ini</span>' : ""}</h2>`;
  if (!items.length) h += '<div class="empty">Tidak ada mata kuliah</div>';
  items.forEach((c) => {
    const live = i === todayIdx && mins >= toM(c[1]) && mins < toM(c[2]);
    h += `<div class="item${live ? " live" : ""}"><div class="time">${c[1]}<small>sampai ${c[2]}</small></div><div><div class="name">${c[0]}${live ? ' <span class="badge">Berlangsung</span>' : ""}</div><div class="meta">${c[4]}</div>${c[3] ? `<div class="tags"><span class="tag">${/^\d/.test(c[3]) ? "Jam ke-" : ""}${c[3]}</span></div>` : ""}</div></div>`;
  });
  return h + "</section>";
}
function render() {
  tabs.innerHTML = ["all", 0, 1, 2, 3, 4, 5]
    .map(
      (k) =>
        `<button role="tab" aria-selected="${k === sel}" class="${k === todayIdx ? "today" : ""}" data-k="${k}">${k === "all" ? "Semua" : D[k]}</button>`,
    )
    .join("");
  out.innerHTML =
    sel === "all" ? D.map((_, i) => dayHTML(i)).join("") : dayHTML(sel);
}
tabs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  sel = b.dataset.k === "all" ? "all" : +b.dataset.k;
  render();
});
render();
