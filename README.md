# TransferSnap

A lightweight PWA for generating EPC QR codes for SEPA credit transfers. Scan the QR code with your banking app to pre-fill transfer details — no typing IBANs by hand.

## Live App

**[https://transfersnap.com](https://transfersnap.com)**

Works offline after the first visit. Install it as an app on your phone via "Add to Home Screen".

## How It Works

1. **Configure** your beneficiary details (name, IBAN, optional BIC) in Settings — stored locally on your device.
2. **Enter** an amount and optional reference text.
3. **Generate** the QR code and scan it with any banking app that supports EPC QR.

All data stays on your device. Nothing is sent to a server.

## Tech

- Single-page static app — no framework, no build step
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) for QR rendering
- Service worker for offline support
- Deployed to GitHub Pages via GitHub Actions

## EPC QR Standard

Generates payloads conforming to the [EPC QR Code Guidelines](https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation) v002 (UTF-8 encoding, SEPA Credit Transfer).
