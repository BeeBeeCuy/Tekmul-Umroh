# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tekmul-Umroh is a static, client-side-only Indonesian-language interactive learning app that teaches the rules and procedures of Ihram and Umroh (Islamic pilgrimage rites). It is built with vanilla HTML, CSS, and JavaScript — no framework, no bundler, no package manager, no build step.

## Running the app

There is no build/lint/test tooling. Because screens are loaded at runtime via `fetch()`, the app **must be served over HTTP** — opening [index.html](index.html) directly via `file://` will fail (browsers block `fetch` on `file://`). Use VS Code Live Server, `python -m http.server`, or `npx serve` from the project root.

## Architecture

Code is split by role: a slim HTML shell, per-screen HTML partials, sectioned CSS, and per-concern JS modules.

- **[index.html](index.html)** — a slim "app shell" only: splash (`#splash`), topbar, an empty `.main-content#screensContainer`, and the bottom nav. It loads all `css/*.css` and `js/*.js` files.
- **[screens/](screens/)** — one HTML partial per screen (`home.html`, `module1.html`–`module4.html`, `quiz.html`, `certificate.html`). Each is the `<div class="screen" id="screen...">` block for that view.
- **[js/main.js](js/main.js)** — bootstrap. On `DOMContentLoaded` it `fetch()`es every partial listed in the `SCREENS` array (in order), injects them into `#screensContainer`, then calls `updateProgressUI()`. Adding/removing a screen means editing both `screens/` and the `SCREENS` array.
- **[js/](js/)** — logic split into [state.js](js/state.js) (state + XP + `updateProgressUI`/`addXP`), [navigation.js](js/navigation.js) (screen/tab switching), [quiz.js](js/quiz.js) (quiz engine + `shuffleArr`), [audio.js](js/audio.js) (player), [interactions.js](js/interactions.js) (larangan/case-study/timeline), plus [js/data/](js/data/) (`quiz-data.js`, `larangan-data.js`).
- **[css/](css/)** — one file per section (`base`, `splash`, `layout`, `home`, `lesson`, `quiz`, `certificate`, `components`). `base.css` holds the `:root` custom properties (green/gold palette). The `<link>` order in `index.html` mirrors the original cascade — preserve it when adding rules.

### Scripts are classic (non-module) globals

All `js/*.js` are loaded as plain `<script>` tags, **not** ES modules. Every top-level `function`/`const` (e.g. `state`, `quizData`, `showScreen`, `playAudio`) is a shared global, which is what lets inline `onclick="..."` handlers in the partials resolve. Do **not** convert these to `type="module"` without also exposing the handlers on `window` — inline handlers would break. `main.js` must stay last so its bootstrap runs after every other file has defined its globals; `updateProgressUI()` must only run after partials are injected (main.js handles this), never at file-load time.

### Navigation model (SPA-style, no router)

Screen switching is done by toggling the `active` CSS class, not by changing the URL:
- `showScreen(id)` hides all `.screen` elements and activates the one with the given id, then scrolls to top.
- `goHome()`, `navTo(idx, screenId)`, `goModule(n)`, `goQuiz()`, `showSertifikat()` are the entry points that call `showScreen` and also update the bottom nav indicator via `updateNavActive(idx)`.
- Within a module screen, `showTab(mod, tab)` toggles `.tab-content`/`.lesson-tab` active classes for sub-pages inside that module (e.g. `m1-t1`, `m1-t2`, `m1-t3`).

### State & progression

All state lives in a single in-memory `state` object in [js/state.js](js/state.js) (no persistence/localStorage — state resets on reload):
- `state.xp`, `state.modulesDone[4]`, `state.tabsDone[...]`, `state.quizScore`, `state.quizDone`.
- Modules are gated sequentially: Module 3 and 4 cards start with the `locked` class in [screens/home.html](screens/home.html); `doneModule(n)` removes `locked` from `card(n+1)` and awards XP, unlocking the next module.
- `addXP(n)` → `updateProgressUI()` recomputes and writes XP totals, progress bar widths, module-card `done` state, and the final-evaluation badge directly into the DOM by element id (e.g. `prog1`, `card1`, `xpText`, `xpBarHome`, `evalBadge`). When adding new progress-affecting actions, route them through `addXP`/`updateProgressUI` rather than mutating the DOM ad hoc.

### Quiz engine

`quizData` is a flat array of question objects (`{ q, opts, ans, explain }`) shared by both per-module mini-quizzes and the final evaluation:
- `startQuiz(moduleNum)` shuffles `quizData` (`shuffleArr`, Fisher–Yates) and takes 5 questions for a module quiz; `goQuiz()` (final evaluation) requires `state.modulesDone.every(Boolean)` before calling `startQuiz(0)`.
- `renderQuiz` → `showQuestion` renders one question at a time into `#quizWrap` via template-literal HTML injection (`innerHTML`), wiring `onclick="answerQuiz(i)"` inline.
- `answerQuiz(i)` locks further answers via the module-level `answered` flag, highlights correct/wrong options, shows an explanation, and awards XP (`+15` per correct answer, `+100` bonus for passing, `+50` per completed module, `+10` per completed tab, `+20` for the Module 3 case-study).
- Passing threshold is 70% (`pct >= 70` in `nextQuestion`). Passing the final evaluation while all modules are done unlocks the certificate screen (`showSertifikat`).

### Other interactive content

- **Module 3 (Larangan/prohibitions)**: `laranganData` array + `showLarangan(idx)` populates a detail panel; a separate hardcoded case-study question uses `kasusJawab(idx, 'benar'|'salah')`.
- **Module 4 (Umroh stages)**: timeline items expand/collapse via `toggleTL(idx)`, tracked in the `tlOpen` array.
- **Audio**: `playAudio(btn, audioSrc)` plays/pauses/toggles a single `Audio` instance at a time (tracked via `currentAudio`/`currentAudioBtn`), resetting UI text/dot state via `resetAudioUI`. Audio files live in [assets/audio/](assets/audio/) (`niat-umroh.mp3`, `talbiyah.mp3`); partials reference them by relative path `assets/audio/...`.

## Conventions to follow when editing

- New DOM-driving logic should go in the relevant `js/*.js` module (create a new one for a new concern) and be wired via inline `onclick="..."` handlers in the `screens/*.html` partials, matching the existing pattern — there is no event-delegation layer.
- Adding a screen: create `screens/<name>.html`, add `<name>` to the `SCREENS` array in [js/main.js](js/main.js), and follow the existing `.screen` + `showScreen(id)` pattern rather than introducing routing.
- Element ids are the binding contract between HTML and JS (e.g. `prog{n}`, `card{n}`, `screenM{n}`, `tl{idx}`); keep id naming consistent with existing numeric-suffix schemes when adding modules/tabs/timeline items.
- Content is entirely in Indonesian (Bahasa Indonesia) with Arabic religious text; keep new user-facing copy consistent in language and tone with existing content.
