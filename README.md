# Fermor — Homepage Concept
Next.js 14 (App Router) + plain CSS. No UI libraries.
## Setup
`npm install && npm run dev` → http://localhost:3000 · Deploy: import the repo on Vercel (zero config).
## Decisions
- **Show, don't tell:** each section is an interaction (net-worth orbit, health score, goal picker, SIP calculator, risk/return, future timeline) instead of feature cards.
- **Motion in layers:** slow ambient (globe) → hover → scroll (hero parallax) → click. Honors `prefers-reduced-motion`.
- **Palette:** Fermor's green identity (forest/green/mint), Georgia headlines, light + dark themes via CSS tokens.
- **Compliance:** every projection is labelled illustrative, not advice. All figures are mock data.
## Next
Real 3D globe asset, EMI/Tax/NPS calculators, article pages.

## v2 changes
Mouse-tilt hero, count-up numbers, Money Snapshot, computed health score (weakest dimension flagged), editable goal planner, SIP/EMI/Retirement calculators, 4-way invest playground, featured insight layout, mobile menu, theme toggle.

## v4
Logo fixed ("fermor" fully spelled; swap in the official SVG via components/Shell.jsx `Logo`). 3-layer hero parallax, richer phone UI, goal timeline, health hover insights, tool tabs, investment rows, animated projection, brand statement.

## Brand
Uses the official Fermor F mark (public/logo.png, favicon app/icon.png) and a lime palette sampled from it. The "o" in the wordmark is a pulsing dot (.od in globals.css).
