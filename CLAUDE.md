# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page Dutch-language marketing website for **Pareto Partners** — an AI & automation consultancy based in Breda, Netherlands (founders: Rob & Jilles). The entire site lives in `index.html` (eigen `<style>` en `<script>` voor animaties en interacties) plus Tailwind-klassen uit het gebouwde `styles.css`.

## CSS bouwen (belangrijk)

Tailwind laadt **niet meer van een CDN**. `styles.css` wordt gebouwd en moet mee in git (GitHub Pages bouwt niets).

- Eenmalig: `npm install`
- Na elke wijziging aan klassen of tekst in een pagina: `npm run build:css` (of `npm run watch:css` tijdens het werken)
- Bron: `src/tailwind.css` (Inter-`@font-face` + Tailwind-lagen), config: `tailwind.config.js` (kleuren, `content` = de drie pagina's)
- `styles.css` staat bewust ná de eigen `<style>` in de `<head>`, zoals de CDN vroeger deed. Niet verplaatsen.
- Alle animaties en interacties zitten in de pagina zelf, niet in Tailwind.
- Inter wordt zelf gehost (`fonts/`, OFL-licentie erbij). Geen Google Fonts meer (AVG).
- Calendly laadt pas bij hover, focus of klik op een afspraakknop (`loadCalendly` in `index.html`); terugval is de gewone Calendly-pagina.
- Deelplaatje opnieuw maken: pas `og/og.html` aan en draai `npm run build:og` (schrijft `og-image.png`). Doe dit weer na de copy-ronde als de hero-tekst verandert.

## Screenshot workflow

Take a Puppeteer screenshot for visual comparison:

```powershell
node -e "const p=require('puppeteer');(async()=>{const b=await p.launch();const pg=await b.newPage();await pg.setViewport({width:1440,height:900});await pg.goto('file:///C:/Users/robro/Desktop/Pareto Partners Website - V5 (nieuw ontwerp)/index.html');await pg.screenshot({path:'screenshot.png',fullPage:true});await b.close();})()"
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
| Off-white (chips, kleine vlakken) | `#F7F7F5` |
| Lichte sectie-achtergrond | `#F1F3F7` |
| Icon bg (light blue) | `#EBF3FF` |
| Font | Inter (zelf gehost, variabel, `fonts/`), weights 400–800 |

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

## Versie 2 (branch `v2-ontwerp`, map "Pareto Partners Website - V5 (nieuw ontwerp)")

Tweede versie van de site, gestart 2026-11-12, geïnspireerd op autogrowth.nl (speels en visueel), maar met onze huisstijl, inhoud en werkwijze. Basis was de live versie (`origin/main` @ 730e461). Niet live; niets pushen of live zetten zonder akkoord van Rob.

Keuzes van Rob: geen prijsbedragen op de site (model uitleggen), cases anoniem, alleen Rob & Jilles als team, maatwerk hoog op de pagina.

## Page sections (top → bottom) — stand na feedbackronde 1 (2026-11-12)

1. **Header** — sticky, volledig wit; links Strategie · Maatwerk · Resultaten · Aanpak · Dataveiligheid · Wie wij zijn; CTA "Plan een kennismaking" (Calendly-popup).
2. **Hero** — kop "Van groeiplan naar processen die zichzelf afhandelen." (Pareto-lijn onder het blauwe deel). Rechts **"Een week van je team"** (`data-week`, JS): weekagenda ma–vr × 4 blokken van 2 uur. Grijze handwerk-blokken (14 u) worden groen "✓ automatisch" (op één na: 80/20) en daarna blauwe tijd voor klanten en groei; teller 14 u handwerk → +12 uur terug per week. Fases Zo gaat het nu → Automatiseren → Tijd terug, lus van ±11,5 s, stopt buiten beeld (eindstand). Vervangt de Pareto-grafiek uit ronde 2 (was niet in één oogopslag te snappen). Labels "80/20" en "Betaald uit wat het oplevert" zweven erbij.
3. **Logo-carrousel** — grijs silhouet, **kleur bij hover**: `.logo-swap` met `img.mono` + `img.color` (strip-*.png en `cijferwijs-kleur.png`); Vermeulen en Senss zijn `single` (filter valt weg); Fraanje is inline SVG en kleurt via CSS.
4. **Strategie (`#strategie`)** — lichtgrijze achtergrond (`#F1F3F7`) om de witte bovenkant op te breken; kop + foto-placeholder; 3 tabbladen (Waar wil je naartoe? = het eerste gesprek / De 20% vinden / Eén dashboard) die vanzelf doorlopen: de Pareto-lijn in het tabblad loopt vol (7 s) en dan volgt het volgende. Klikken zet het doorlopen uit (`.is-manual`). Elk paneel heeft een eigen animatie (gespreksnotities van de kennismaking, uren-balken, dashboard dat optelt).
5. **Maatwerk (`#maatwerk`)** — 4 kaarten + "Waar wij mee bouwen" (incl. Notion, Google Workspace, KvK API, Legalesign, Simplicate, MijnKantoor, Voys en de regel "Staat jouw pakket er niet tussen?"). Tool-iconen staan in `logos/tools/` en worden als zwart silhouet getoond (`filter: brightness(0)`), dus een icoon moet een transparante achtergrond hebben. Rob's kleurbestanden (`*_logo.*`, `Mijnkantoorlogo.png`) zijn de bron; `kvk.png`, `voys.png`, `mijnkantoor.png`, `legalesign.png` zijn daarvan afgeleid, `google.svg` komt van Simple Icons.
6. **Resultaten (`#werk`)** — case-carrousel. Elke kaart: foto-placeholder bovenaan (zonder tekst; omschrijving staat in de HTML-opmerking `FOTO:`), groot cijfer onderaan (`.case-metric`). Het schermvoorbeeld (`.case-visual[data-mock]`) staat verborgen in de kaart en verschijnt in het case-venster onder "Wat we bouwden".
7. **Aanpak (`#aanpak`)** — tijdlijn + skin in the game (ongewijzigd, Rob vond hem top).
8. **Dataveiligheid (`#dataveiligheid`)** — 6 kaarten + link (dikgedrukt, `#1e5bff`) naar `zo-gaan-wij-met-jouw-data-om.pdf`.
9. **Wie wij zijn (`#wie-wij-zijn`)** — foto + tekst + twee founder-kaartjes.
10. **CTA** — navy kaart met foto-placeholder en "Na het eerste gesprek weet je…".
11. **Footer**.

Labels boven koppen zijn `.kicker` (hoofdletters + korte Pareto-lijn eronder), op navy `.kicker.dark`. Geen pil-labels meer.

Foto-placeholders zijn `.ph`-vlakken met een omschrijving van de gewenste foto (zoek op `FOTO`). Vervang ze door `<img>` met `object-fit: cover`. Let op: cases zijn anoniem, dus geen herkenbare klant op de foto zonder toestemming.

## Open punten vóór livegang

- **Cijfers op de projectkaarten** (`.case-metric`: grijs vlak met per KPI een rij, cijfer links en uitleg rechts; kwalitatieve punten staan als vinkjes in `.case-checks`) zijn op 2026-11-13 door Rob aangeleverd: showroom 0 leads verloren en 1,5 u per dag; leads 75 per week; uren 1 u per week; scrapers ±20 leads per week (was ±10) en ±2 u per dag; jaarrekening 5 min; contracten 2–3 u per plaatsing. Cijfers komen van Rob, niet uit het portaal.
- **Uren-case (Vermeulen) vóór livegang:** het urenportaal is nog in ontwikkeling, maar kaart en case-venster staan als behaald resultaat (Rob's keuze, site nog niet online). Pas live zetten als het zo draait, of de tekst terugzetten naar verwachting. Bevestigen of "1 u per week" per medewerker of in totaal is (TODO-opmerking bij de kaart).
- **Dataveiligheid, kaart Tweestapsverificatie:** klopt pas als Jilles 2FA aan heeft op Google, Make, GitHub, Vercel en Supabase (claim-checklist C04/C13). Anders de kaart weghalen.
- **Datadocument-PDF:** `zo-gaan-wij-met-jouw-data-om.pdf` is op 2026-11-14 vervangen door de nieuwste website-versie uit `Pareto Partners/Dataveiligheid/` (met de alinea "AI-koppelingen met een rem"). Rob: de claims staan zo en worden pas bij livegang gemaakt; 2FA is volgens Rob bij Jilles aan.
- **Privacyverklaring en voorwaarden:** voorstellen voor aanpassing staan klaar, nog niet toegepast (juridische tekst eerst door Rob en Jilles).
- **Nog te doen later:** Lighthouse, Safari en echte telefoon; titel/beschrijving en deelplaatje na de copy-ronde nalopen. FAQ en klantcitaten: bewust niet (bezoekers kennen ons al).
- **Foto's:** 8 placeholders (6 cases, strategiesessie, kennismaking).

Blokken schuiven in bij scrollen: zet `data-reveal` (optioneel `data-reveal-delay="100"`). Alle animaties staan uit bij `prefers-reduced-motion`.

Sectie-achtergronden wisselen: wit → navy → wit → `#F1F3F7` → navy → wit → `#F1F3F7` → wit → `#F1F3F7` (met navy kaart) → navy footer.

## Rules

- Pas alleen de sectie aan waar het gesprek over gaat en toon het resultaat (screenshot) voordat je verder gaat.
- Niet pushen of live zetten zonder akkoord van Rob. Deze branch heeft bewust geen upstream.
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px")
- All copy is in Dutch — do not translate or alter text content
