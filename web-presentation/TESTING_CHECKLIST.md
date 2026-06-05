# Testing Checklist — Days 1–14

Use before a live bootcamp session or after major changes.

## Navigation & UI

- [ ] Keyboard: `→` / `←` (RTL reversed in Arabic UI), `Space`, `F`, `N`, `P`, `Q`, `Esc`
- [ ] Skip link focuses `#slide-container`
- [ ] Section sidebar opens/closes; section jumps work
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
- [ ] Slide index syncs between windows
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

- [ ] `npm run build` + `npm run preview` loads shell offline after first visit
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
