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

All images are in the project root — reference them by filename. Only assets actually used by `index.html`/`privacy-policy.html`/`terms-of-service.html` are kept in the repo (unused dev artifacts and reference-only files were removed on 2026-08-06):

- `Pareto Partners Cropped Logo Image.png` — nav/footer logo (height 36px)
- `favicon.png` — browser favicon
- `og-image.png` — social share preview image
- `blue_icon_location.png`, `blue_icon_target.png`, `blue_icon_people.png`, `blue_icon_analysis.png` — proof block icons (28×28px)
- `blue_icon_analysis.png`, `blue_icon_crm.png`, `blue_icon_Leadgen.png`, `blue_icon_AIcolleague.png` — service card icons (28×28px)
- `Jilles_en_Rob_Foto.jpeg` — "Wie wij zijn" founder photo
- `Sjef_En_Rob_cropped.png`, `Jilles_en_Rob_foto2.jpeg` — waren de foto's in de projectkaarten; sinds 2026-11-11 niet meer gebruikt (alle zes kaarten hebben een schermvoorbeeld in HTML/CSS)
- `logos/` — klant- en partnerlogo's; `logos/tools/` — tool-iconen

## Page sections (top → bottom)

1. **Header/nav** — logo, nav links, "Contact" pill CTA
2. **Hero** — full-viewport-height, centered headline + subtext + CTA button
3. **Proof block** — 4-column trust signals with icons
4. **Logo-carrousel** — "Opdrachtgevers & partners", doorlopende strip (CSS-animatie, lijst wordt in JS één keer verdubbeld via `data-marquee`). Logo's in `logos/`, als zwarte silhouetten via CSS-filter.
5. **Aanpak (How it works)** — 4 dark navy cards + Skin in the Game callout
6. **Wie wij zijn** — text left, photo right
7. **Diensten (Services)** — light gray bg, 2×2 service cards + custom callout
8. **Tools (`#tools`)** — "Waar wij mee bouwen", 4 groepen met tool-chips. Iconen in `logos/tools/` (Simple Icons of eigen site van de tool); zonder icoon een letterbadge (`.tool-mono`).
9. **Projecten (`#werk`)** — dark navy, 6 cases in een doorlopende carrousel (JS, `data-case-carousel`): loopt vanzelf, pauzeert bij hover/focus/buiten beeld, pijlen en slepen/swipen. Klik op een kaart opent het case-venster (`#case-modal`); de volledige tekst staat per case in `<template id="case-…">`, de tools in `data-tools`. Cases zijn anoniem (sector + regio, geen klantnaam).
10. **Contact** — CTA banner
11. **Footer**

Blokken schuiven in bij scrollen: zet `data-reveal` (optioneel `data-reveal-delay="100"`) op een element. Werkt alleen met JS (`.js`-class op `<html>`) en staat uit bij `prefers-reduced-motion`.

Several sections are commented out in the HTML (`<!-- ... -->`) and should remain commented unless the user asks to restore them.

## Rules

- Do not add features, sections, or content not present in the reference image
- Match the reference exactly — do not "improve" the design
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px")
- All copy is in Dutch — do not translate or alter text content
