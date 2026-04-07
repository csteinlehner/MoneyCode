# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TransferSnap — a static PWA that generates EPC QR codes (v002) for SEPA credit transfers. No build step, no bundler, no framework. Everything runs client-side with data stored in `localStorage`.

## Architecture

- **`index.html`** — the entire app: HTML, CSS (`<style>`), and JS (`<script>`) in a single file. Uses the QRCode.js library via `qrcode.min.js`.
- **`sw.js`** — service worker for offline caching (cache name: `transfersnap-v1`). When adding/removing files, update the `FILES` array here and bump the cache version.
- **`manifest.json`** — PWA manifest.
- **`icon-192.png` / `icon-512.png`** — app icons.

## Development

No install or build commands. Open `index.html` in a browser or serve with any static server:

```
python3 -m http.server 8000
```

Service worker requires HTTPS or `localhost` to activate.

## Deployment

Deployed to GitHub Pages via `.github/workflows/pages.yml` on push to `main`. The workflow uploads the entire repo root as the site artifact. Live at **transfersnap.com**.

## Key Constraints

- EPC QR payload must not exceed **331 bytes** (UTF-8 encoded).
- EPC encoding field is `1` (UTF-8) per EPC QR Code Guidelines v3.0.
- Amount max: EUR 999,999,999.99; reason max: 140 characters; beneficiary name max: 70 characters.
- IBAN regex: `^[A-Z]{2}[A-Z0-9]{13,32}$`; BIC regex: `^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$`.

## Workflow

See `DEVELOPMENT-STRATEGY.md` for branching, commit conventions, and PR workflow. Key points:

- Never commit directly to `main` — use `feature/*` branches and PRs.
- Commit types: `feat:`, `fix:`, `tidy:`, `docs:`, `chore:` — tidy commits are always separate from behavior changes.
- No external dependencies beyond `qrcode.min.js` — keep all code in `index.html` unless complexity demands splitting.
