[OPEN] Debug Session: google-third-party-errors

# Problem
- Browser console shows:
  - `net::ERR_CONNECTION_TIMED_OUT https://www.google.com/recaptcha/api2/aframe`
  - `net::ERR_ABORTED https://www.google-analytics.com/g/collect?...`

# Scope
- Affects preview access path and browser console cleanliness.
- Need to determine whether the requests come from this project or the preview/tunnel layer.

# Hypotheses
1. The errors are injected by the `loca.lt` preview interstitial rather than this project.
2. The project includes Google Analytics / gtag / GTM and triggers `google-analytics.com/g/collect`.
3. The project includes reCAPTCHA or a third-party dependency that triggers `recaptcha/api2/aframe`.
4. The preview tunnel adds third-party scripts before the site loads, so fixing requires changing the preview path rather than app code.

# Evidence Plan
- Search codebase for GA / GTM / reCAPTCHA references.
- Inspect runtime HTML entry points for external script tags.
- Compare project source with preview request origin.
- If needed, switch preview method or remove project-side third-party injections.

# Status
- Root cause confirmed: the old `loca.lt` preview path injected/served a tunnel interstitial and later became `503 Tunnel Unavailable`.
- Evidence:
  - `index.html` in this project contains no GA / GTM / reCAPTCHA script tags.
  - CSP uses `script-src 'self'`, ruling out project-side Google script loading.
  - `curl -I -L https://four-islands-deny.loca.lt` returned `503 Service Unavailable` with `x-localtunnel-status: Tunnel Unavailable`.
  - New `tunnelmole` preview initially failed with Vite host blocking, then succeeded after allowlisting `.tunnelmole.net`.
- Fix applied:
  - Switched preview path away from `loca.lt`.
  - Added `server.allowedHosts` and `preview.allowedHosts` for `.tunnelmole.net` in `vite.config.ts`.
- Current preview:
  - `https://sgrqj3-ip-203-10-99-77.tunnelmole.net`
- Awaiting user verification before cleanup.
