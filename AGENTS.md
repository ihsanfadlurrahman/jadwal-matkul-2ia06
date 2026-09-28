# AGENTS.md

## Project overview

A single static page displaying a weekly university class schedule ("Jadwal Perkuliahan Semester 3 Kelas 2IA06"), Monday through Saturday. Built to replicate the layout and content of a schedule photo provided by the user.

## Architecture

- Plain static site: `index.html`, `styles.css`, `script.js`. No build step, no framework, no backend.
- `netlify.toml` sets `publish = "."` so the root is deployed as-is.
- No database or persistence is used — the schedule data is fully static content embedded in the HTML.

## Key files

- `index.html` — the schedule table markup. Each `<td>` has a `data-day` attribute (`senin`, `selasa`, `rabu`, `kamis`, `jumat`, `sabtu`) and a `data-day-label` attribute used for the mobile card view (`::before` content).
- `styles.css` — navy/blue theme matching the source schedule image; switches from a table layout to stacked cards under 720px via `data-day-label`.
- `script.js` — adds a `.today` class to every cell matching the current JS `Date().getDay()`, which `styles.css` highlights.

## Conventions / non-obvious decisions

- Course cells use nested spans (`course-name`, `course-time`, `course-room`) rather than free text, so styling and the mobile stacking both target consistent structure.
- Empty slots use `<td class="empty">(Tidak ada matkul)</td>` — keep this literal text/class if adding new empty cells so the muted/centered styling applies.
- The schedule is single-class/single-semester data entered directly in markup; there is no admin UI or data file. If this needs to support multiple classes/semesters in the future, that would require introducing a data layer (see general-database skill) and is out of scope for this build.
