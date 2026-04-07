---
# MoneyCode-r30q
title: Add privacy policy page
status: completed
type: feature
priority: normal
created_at: 2026-04-07T13:54:22Z
updated_at: 2026-04-07T19:45:50Z
---

Add a privacy policy (Datenschutzerklärung) page to the app, accessible from the main UI.

## Analytics Disclosure (for privacy policy)\n\nThe site uses Umami Cloud for anonymous analytics. The privacy policy should cover:\n- Umami Cloud (cloud.umami.is) is used for anonymous page view and event tracking\n- No cookies are set, no personal data is collected, no IP addresses are stored\n- Data is aggregated and cannot identify individual users\n- Events tracked: page views (automatic), QR code generations, settings saves/clears, new transfers\n- No financial data (amounts, IBANs, etc.) is ever sent to analytics


## Summary of Changes

- Created `privacy.html` with full GDPR-compliant privacy policy covering:
  - Local-only data processing (no server transmission)
  - GitHub Pages hosting disclosure
  - jsDelivr/Fontsource font CDN disclosure
  - Umami Cloud anonymous analytics (no cookies, no personal data, no IP storage)
  - Tracked events listed (page views, QR generations, settings saves/clears, new transfers)
  - No cookies used
  - GDPR rights section
  - Contact information
- Added "Privacy" link to footer on all pages (index.html, how.html, imprint.html, privacy.html)
- Added privacy.html to service worker cache and bumped cache version to v7

branch: feature/privacy-policy
