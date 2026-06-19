# Testing Checklist — Days 1–14 + Bootcamp Upgrade (2026-06-19)

Use before a live bootcamp session or after major changes.

## Bootcamp upgrade — deck scope & labs (2026-06-19)

| Check | Status | Notes |
|-------|--------|-------|
| `npm run build` (tsc + vite) | ✅ Pass | 2026-06-19 — exit 0, PWA precache 121 entries |
| Week calendar: 4 weeks in `courseWeeks`, `bootcampMap`, README | ✅ Pass | S13–S16 in Week 4; no Week 5 references |
| S14 labeled alt NLP track in map + README | ✅ Pass | `#day1-nlp-slides`; not main Week 3 path |
| Settings: deck scope presets (`all`, `week1-ml` … `week4-genai`, `day1`) | ✅ Code | Hash sync: `#week1-ml`, `#week2-dl`, `#week3-nlp`, `#week4-genai`, `#day1-nlp-slides` |
| `week4-genai` excludes S14 (S13, S15, S16 only) | ✅ Code | `deckScopeConfig.ts` |
| Section 7 phase jumps in sidebar (Phase 1–4) | ✅ Code | `section7Phases.ts` + `SectionSidebar` when S7 active |
| Lab links in sidebar (S1–S7, S14) | ✅ Code | `sectionLabs.ts` → GitHub `code/` + DL topics |
| Global resource links in sidebar | ✅ Code | code/, roadmap, `deep-learning-topics.md` |
| `deep-learning-topics.md` lab mapping table (labs 1–7) | ✅ Pass | Appendix table links to `code/15- Deep Learning/` |

**Manual before live session:** open each hash route, confirm slide count and first/last screen; test S7 phase jumps and S7 lab links in sidebar.

---

## Navigation & UI

- [ ] Keyboard: `→` / `←` (RTL reversed in Arabic UI), `Space`, `F`, `N`, `P`, `Q`, `Esc`
- [ ] Skip link focuses `#slide-container`
- [ ] Section sidebar opens/closes; section jumps work
- [ ] Deck scope change in Settings filters sections correctly
- [ ] Slide number jump prompt accepts valid range
- [ ] RTL/LTR toggle in Settings updates `dir` on presentation chrome
- [ ] Arabic UI: nav arrows and hints match RTL mapping

## Intro & section identity (Days 11–12)

- [ ] Slide 1: title typewriter animation on first visit
- [ ] Slide 2: four week cards render; hover lift on desktop
- [ ] Slide 3: timeline W1–W4 columns align
- [ ] Section dividers show color, large number, icon, key topics

## Progress & quiz

- [ ] Trainee progress ring updates on forward navigation
- [ ] Quiz opens on last slide of section (or `Q` key)
- [ ] Quiz results persist in `localStorage` after refresh

## Presenter mode

- [ ] `P` opens presenter window (`?presenter=1`)
- [ ] Slide index syncs between windows (including scoped decks)
- [ ] Speaker note edits auto-save per slide

## Print / PDF

- [ ] Download PDF waits for full deck load
- [ ] One slide per printed page
- [ ] Intro slides and dividers readable in print preview

## Performance

- [ ] Slide change feels instant (< 16ms perceived; virtual window = 5 DOM slides)
- [ ] No layout jank during bullet reveal or slide transitions
- [ ] Lazy section chunks load without blocking navigation

## Offline / PWA

- [x] `npm run build` + `npm run preview` loads shell offline after first visit (build verified 2026-06-19)

## AI assistant (optional, Day 13)

- [ ] API key saves in Settings (localStorage only)
- [ ] Explain / Q&A tabs return responses with valid key
- [ ] Graceful error when key missing or offline

## Browsers

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | Primary | Full feature set |
| Safari | Required | Presenter sync, print, PWA |
| Firefox | Required | Keyboard nav |

## GitHub Pages

- [ ] Push to `main` triggers deploy workflow
- [ ] Live URL: https://iksasa15.github.io/AI-ML/web-presentation/
- [ ] Assets load with `/AI-ML/web-presentation/` base path
