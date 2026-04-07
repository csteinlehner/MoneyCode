---
# MoneyCode-3u3z
title: Split index.html into separate CSS, JS, and page files
status: in-progress
type: task
priority: normal
created_at: 2026-04-07T19:03:35Z
updated_at: 2026-04-07T19:08:22Z
---

## Plan

Split the monolithic `index.html` into focused files:

### Extract shared assets
- [x] **`styles.css`** — all CSS from the `<style>` block
- [x] **`app.js`** — all JS from the `<script>` block

### Extract static content pages into standalone HTML files
- [x] **`imprint.html`** — Impressum page (static legal content, no app JS needed)
- [x] **`how.html`** — "How it works" page (static explainer, no app JS needed)

### Keep in `index.html`
- App shell (nav, footer)
- Transfer view (form + QR result) — core interactive functionality
- Settings view — tightly coupled to app state (localStorage)

### Housekeeping
- [x] Update `sw.js` — add new files to `FILES` cache array and bump cache version
- [x] Update navigation links to point to new file-based pages
- [x] Verify print styles still work
- [x] Ensure shared nav/footer across all pages

## Notes

- Static pages (imprint, how) become real HTML files with their own `<head>`, shared CSS via `styles.css`, and consistent nav/footer
- Interactive pages (transfer, settings) stay in `index.html` since they share JS state
- No build step or bundler — just plain file references
