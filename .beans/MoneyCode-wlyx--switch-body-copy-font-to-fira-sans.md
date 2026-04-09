---
# MoneyCode-wlyx
title: Switch body copy font to Fira Sans
status: completed
type: task
priority: normal
created_at: 2026-04-09T17:52:29Z
updated_at: 2026-04-09T17:54:44Z
---

Change the main copy/body text font to Fira Sans for better readability. Keep Fira Code (Mono) for numerals, IBANs, BICs, and other technical/code-like content. Self-host Fira Sans like we already do for Fira Code.

## Summary of Changes\n\n- Downloaded and self-hosted Fira Sans (400, 500, 600, 700) woff2 files matching existing Fira Code strategy\n- Added @font-face declarations for Fira Sans in styles.css\n- Switched body font from Fira Code to Fira Sans for better readability\n- Kept Fira Code (monospace) for: logo, amount prefix, amount input, IBAN/BIC inputs, and QR summary values\n- Updated service worker cache (v8 → v9) with new font files\n- Updated privacy policy to mention both Fira Sans and Fira Code
