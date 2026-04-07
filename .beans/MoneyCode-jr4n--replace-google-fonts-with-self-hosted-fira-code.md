---
# MoneyCode-jr4n
title: Replace Google Fonts with self-hosted Fira Code
status: completed
type: task
priority: normal
created_at: 2026-04-07T19:39:10Z
updated_at: 2026-04-07T19:41:22Z
---

Replace Google Fonts (Inter) with self-hosted Fira Code via Fontsource for GDPR compliance.

## Problem
Currently loading Inter from fonts.googleapis.com, which sends visitor IP addresses to Google — a GDPR violation (see CJEU/LG München ruling on Google Fonts).

## Solution
Use Fontsource to self-host Fira Code font files. Two options:

### Approach: Fontsource jsDelivr CDN
- Use `<link rel="preload">` + `@font-face` pointing to jsDelivr URLs
- jsDelivr is GDPR-compliant (EU-based infrastructure, no tracking)
- CDN URLs follow pattern: `https://cdn.jsdelivr.net/fontsource/fonts/fira-code@latest/latin-{weight}-normal.woff2`

## Files to modify
- `styles.css` — replace `font-family: 'Inter'` with `'Fira Code'`, add @font-face
- `index.html` — remove Google Fonts `<link>` tags
- `how.html` — remove Google Fonts `<link>` tags
- `imprint.html` — remove Google Fonts `<link>` tags
- `sw.js` — add font files to FILES array, bump cache version

## Notes
- Fira Code is a monospace font — UI may need visual adjustments
- Currently using Inter weights: 300, 400, 500, 600, 700, 800

## Summary of Changes\n\n- Removed Google Fonts (Inter) links from all HTML pages\n- Added Fontsource Fira Code via jsDelivr CDN with preload hints\n- Added @font-face declarations in styles.css for weights 400, 500, 600, 700\n- Replaced font-family 'Inter' with 'Fira Code', monospace\n- Downgraded font-weight: 800 to 700 (Fira Code max weight)\n- Bumped service worker cache to v6
