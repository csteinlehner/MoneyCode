---
# MoneyCode-0skb
title: Fix stale cache / reload problem with PWA service worker
status: todo
type: bug
created_at: 2026-04-07T20:19:27Z
updated_at: 2026-04-07T20:19:27Z
---

When the site is updated and deployed, browsers keep serving the old cached version instead of fetching the latest. The service worker cache is not invalidated properly on new deployments, so users don't see changes until they manually clear cache or hard-reload. Need to implement a proper cache-busting / update strategy (e.g. skipWaiting + clients.claim, or prompt user to reload when a new SW version is detected).
