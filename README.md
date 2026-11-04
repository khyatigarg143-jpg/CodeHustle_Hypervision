# Code Hustle 11.0 — Authentication & Registration Portal

Mr. Robot themed, cinematic hacker portal for **Code Hustle 11.0 / UPES Hypervision**.

## Scope & Routes

- `/userlogin` — Student Login (SAP ID + password verification)
- `/team-login` — Team Squad Login (Team identifier + password)
- `/admin-login` — Sysadmin Root Gateway (Administrator email + password)
- `/create-team` — New Team Registration (Squad formation + leader info)
- `/Indiregi` — Individual Registration (Solo participant enrollment)

## Visual Identity (Mr. Robot Aesthetic)

- **Palette**: Deep Obsidian Black (`#060606`), Crimson Red (`#dc2626`, `#991b1b`), Warm Off-White (`#ece9e4`), Surveillance Slate (`#78716c`).
- **Typography**: Custom `MrRobot` font (`frontend/public/fonts/mr-robot.ttf`) for display headings; `Share Tech Mono` for labels, technical inputs, and status readouts.
- **Atmosphere**: Subtle CRT scanlines, analog film grain, surveillance telemetry, corner brackets, and terminal blinking prompt.
- **Interactions**: Focus-responsive inputs with crimson indicators, password reveal toggles, loading state transitions, shake animations on invalid inputs.

## Quickstart

```bash
cd frontend
npm install
npm run dev
```

Server will run at `http://localhost:5173`.
