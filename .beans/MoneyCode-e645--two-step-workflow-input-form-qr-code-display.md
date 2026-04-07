---
# MoneyCode-e645
title: 'Two-step workflow: input form → QR code display'
status: completed
type: feature
priority: normal
created_at: 2026-04-07T13:52:59Z
updated_at: 2026-04-07T18:40:05Z
---

Separate the app into two distinct views instead of showing everything on one screen:

1. **Input view** — User enters amount and reason (and selects beneficiary)
2. **QR code view** — Shows the generated EPC QR code after submitting the form

The current single-page layout shows the form and QR code together, which is cluttered. A clearer step-by-step flow improves usability, especially on mobile.

## Summary of Changes\n\nSplit the transfer view into a two-step workflow:\n1. **Step 1 (Input)**: Shows hero card + centered form card (max-width 480px) for amount and reference input\n2. **Step 2 (QR Result)**: Shows the generated QR code with transfer summary and a "New Transfer" button to return to step 1\n\nRemoved the side-by-side grid layout and QR placeholder in favor of a cleaner sequential flow. Updated print styles accordingly.
