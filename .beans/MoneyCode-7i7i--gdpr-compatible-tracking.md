---
# MoneyCode-7i7i
title: GDPR-compatible tracking
status: completed
type: feature
priority: normal
created_at: 2026-04-07T13:54:01Z
updated_at: 2026-04-07T19:26:53Z
---

Implement privacy-friendly, GDPR-compliant analytics/tracking for the app. Must work without cookies or personal data collection, and should not require a consent banner.

## Summary of Changes\n\n- Added Umami Cloud script tag to all HTML pages (index.html, how.html, imprint.html)\n- Added custom event tracking in app.js: qr-generated, settings-saved, settings-cleared, new-transfer\n- All tracking calls guarded with `typeof umami !== 'undefined'` for offline resilience\n- Bumped service worker cache version to v5\n- Updated privacy policy bean (MoneyCode-r30q) with analytics disclosure requirements
