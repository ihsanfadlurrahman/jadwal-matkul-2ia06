(function () {
  var dayMap = {
    1: "senin",
    2: "selasa",
    3: "rabu",
    4: "kamis",
    5: "jumat",
    6: "sabtu",
    0: null, // Minggu - tidak ada di jadwal
  };

  var today = new Date().getDay();
  var todayKey = dayMap[today];

  if (!todayKey) return;

  var cells = document.querySelectorAll('[data-day="' + todayKey + '"]');
  cells.forEach(function (cell) {
    cell.classList.add("today");
  });
})();
