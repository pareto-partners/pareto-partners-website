# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page Dutch-language marketing website for **Pareto Partners** — an AI & automation consultancy based in Breda, Netherlands (founders: Rob & Jilles). The entire site lives in `index.html` using Tailwind CSS via CDN.

## Screenshot workflow

Take a Puppeteer screenshot for visual comparison:

```powershell
node -e "const p=require('puppeteer');(async()=>{const b=await p.launch();const pg=await b.newPage();await pg.setViewport({width:1440,height:900});await pg.goto('file:///C:/Users/robro/Desktop/Pareto Partners Website/index.html');await pg.screenshot({path:'screenshot.png',fullPage:true});await b.close();})()"
```

Always do **at least 2 comparison rounds** before stopping. Check spacing (px), font sizes/weights, colors (exact hex), alignment, border radii, shadows.

## Brand tokens

| Token | Value |
|-------|-------|
| Dark navy (primary text/bg) | `#0f2a4a` |
| Blue (CTA, accents) | `#1e5bff` |
| Blue hover | `#1a4ee0` |
| Muted blue (secondary text) | `#6b7aad` |
| Icon blue | `#185FA5` / `#378ADD` |
| Off-white section bg | `#F7F7F5` |
| Icon bg (light blue) | `#EBF3FF` |
| Font | Inter (Google Fonts), weights 400–800 |

## Local assets

All images are in the project root — reference them by filename:

- `Pareto Partners Cropped Logo Image.png` — nav logo (height 36px)
- `Pareto Partners.png` — full logo
- `Local_icon_darkblue.png` — "Lokaal en persoonlijk" icon (28×28px)
- `Target_icon_darkblue.png` — "80/20-filter" icon (28×28px)
- `Stats_icon_darkblue.png` — "Geen woorden maar daden" icon (28×28px)
- `Skin in the game Icon.png` — skin-in-the-game icon
- `8020 Icon.png` — 80/20 icon
- `Geen Woorden Maar Daden ICon.png` — icon
- `LeftClick Hero section.png` — reference screenshot of hero section
- `Pareto_Partners_Presentatie.pptx.pdf` — original pitch deck (brand reference)

## Page sections (top → bottom)

1. **Header/nav** — logo, nav links, "Plan QuickScan" pill CTA
2. **Hero** — full-viewport-height, centered headline + subtext + CTA button
3. **Proof block** — 3-column trust signals with icons (white bg, dividers)
4. **Aanpak (How it works)** — 3 dark navy cards (Week 1/2–4/Doorlopend) + Skin in the Game callout
5. **Wie wij zijn** — text left, photo placeholder right
6. **Diensten (Services)** — light gray bg, 2×2 service cards + custom callout
7. **Bewezen werk (Case studies)** — dark navy bg, 3 white project cards
8. **Contact** — contact form / CTA section
9. **Footer**

Several sections are commented out in the HTML (`<!-- ... -->`) and should remain commented unless the user asks to restore them.

## Rules

- Do not add features, sections, or content not present in the reference image
- Match the reference exactly — do not "improve" the design
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px")
- All copy is in Dutch — do not translate or alter text content
