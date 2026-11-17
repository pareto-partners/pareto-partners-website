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

### Versies terugpakken
- Tag `v2-voor-copy` = de stand vóór de copy-ronde (2026-11-14, commit 232a1cc). Terug: `git checkout v2-voor-copy`.
- Branch `v2-copy` = waar de copy-ronde gebeurt (sectie voor sectie, met Rob). Alleen lokaal; geen upstream, dus niet per ongeluk pushen.
- Copy-ronde: toon per sectie de huidige tekst naast een voorstel, pas pas toe na akkoord van Rob, bouw daarna `npm run build:css` en toon een screenshot.
- Gedaan: hero (knoppen, vinkjes, zwevende labels; kop blijft). Onderkop: Rob koos optie 4 ("Eerst de strategie: welke 20% kost 80% van je tijd? Dan automatiseren wij die, met AI waar het past."). **Goede tweede keus, bewaard:** "Strategie, automatisering en AI voor de 20% die 80% van je tijd kost." (ook als HTML-opmerking boven de onderkop). Rob wil de kop laten staan (Jilles vindt hem mooi) en de 30 minuten niet noemen.
- Gedaan: Strategie-sectie. Kop "Eerst kiezen wat telt. Dan pas bouwen.", inleiding van Rob, tab 1 (eerste gesprek, zonder 30 minuten), tab 2 ongewijzigd, tab 3 is nu "Meten en bijsturen" (nazorg met dashboard; voorbeeld Offerte-automatisering week 6, 12 u bespaard past bij de hero). Overlap met Aanpak stap 4 "Meten & meegroeien": die later inkorten. Let op: hero zegt "Eerste versie in 2 weken", Aanpak zegt implementatie week 2–4; bij de Aanpak gelijktrekken.
- Gedaan: Maatwerk. Kop "Geen standaardpakket. Wij bouwen wat jij nodig hebt.", inleiding "Jouw proces bepaalt wat we bouwen. Alles wat we maken moet iets opleveren: tijd, geld of gemak.", kaart 1 "Meer uit je huidige systemen" (tekst: functies inzetten én systemen met elkaar verbinden). Plaatje bij kaart 1 = animatie "één bron van waarheid" (`.sot-*` in `index.html`, alleen CSS, lus 6 s): CRM voert in, stipje naar "Eén bron", die stuurt naar Boekhouding, Mail en Planning, overal vinkje. Eindstand = standaardstijl (reduced motion), kaart 2 "Een systeem op maat" (verlengstuk + gebruiksgemak), kaart 3 en 4 herschreven. Toollijst: nieuwe groepen, Lovable erbij (icoon = favicon, `logos/tools/lovable.png`), regel "Staat jouw pakket er niet tussen?" bewust weggehaald. Rob: dit is zijn skill, geen klantproject.
- Gedaan: Maatwerk-kaarten 2 en 3 opnieuw, kaart 4 vervallen. Kaart 2 = klikken door "Jouw portaal" (`.por-*`, 10 s), kaart 3 = binnenkomende mail wordt gelezen, AI-paneel (sterretje) levert Samenvatting, Taak aangemaakt en Concept klaar (`.asst-*`, 9 s; eerdere robot-versie afgekeurd als te kinderlijk). Per kaart een label i.p.v. nummer: Verbinden / Bouwen / Slimmer maken (`.mw-tag`); 3 kolommen (`lg:grid-cols-3`). Oude kaart 4 ("Geen koppeling?") herhaalde kaart 1; een leadgeneratie-kaart met animatie (`.fnd-*`) is bewust weggehaald omdat het een dienst is, geen vorm van maatwerk. Leadgeneratie hoort bij Resultaten. Bij vertraagde animaties `backwards` fill-mode gebruiken als de basisstand de eindstand is.
- Gedaan: foto van Sjef en Rob (`Sjef_En_Rob.jpg`, 85 KB; origineel `Sjef_En_Rob_cropped.png` blijft staan) staat nu bij de Resultaten-kaart "Van plaatsing naar getekend contract, zonder overtypen" (`.case-photo.has-img`); wordt automatisch ook in het case-venster getoond. Op de oude site stond de foto bij de leadscraper-kaart.
- Gedaan: placeholder bij Resultaten = het schermpje van de oplossing (`.case-visual[data-mock]`) i.p.v. het lege camera-vlak. Kaarten zonder foto hebben `use-mock` (toont mock, verbergt `.case-photo.ph`). Zodra een kaart een echte foto krijgt: `use-mock` weghalen en de `.case-photo` een `has-img` met `<img>` geven (zoals de contractenkaart). Het label "In ontwikkeling" van de Uren-mock is op de kaart verborgen (Rob: schrijf als behaald); in het case-venster staat het nog, nog beslissen.
- Gedaan: bij Strategie staat tijdelijk de park-foto van Jilles en Rob (`Jilles_en_Rob_park.jpg`, 340 KB, gemaakt van `Jilles_en_Rob_foto2.jpeg`) in plaats van het fotovlak "strategiesessie". Vervangen zodra er een foto is van Rob en Jilles met een klant aan tafel (whiteboard/laptop met cijfers). Nog een lege placeholder: foto in het CTA-blok onderaan (`.ph` bij "Plan een kennismakingsgesprek"), en de fotovlakken in het case-venster.
- Gedaan: foto's. Strategie = `Jilles_en_Rob_strategie.jpg` (bijsnijding 4:3 van `IMG_0060.JPG`), CTA-blok onderaan = `Jilles_en_Rob_cta.jpg` (16:9 van `IMG_0059.JPG`), Wie wij zijn = `Jilles_en_Rob_Foto.jpeg` (Grote Kerk), contractenkaart = `Sjef_En_Rob.jpg`. Originelen (IMG_0059/0060, foto2) blijven staan. De Strategie-foto is geen strategiesessie; eventueel later vervangen door Rob en Jilles met een klant aan tafel. Placeholder-tekst in het CTA-blok was "Rob en Jilles aan de keukentafel bij een klant". Resterend leeg: fotovlak in het case-venster (camera-icoon).

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

- Resultaten-kaarten: één getal per kaart zonder grijs blok (`.case-card .case-metric`), kortere checkpunten (±6 woorden). Het venster (modal) houdt de grijze variant. Uren-kaart heeft geen getal maar het label "Wordt nu gebouwd" (`.case-metric-soon`, verborgen in de modal); modal-tekst heet daar "Doel". Vóór livegang: getal en tekst vervangen zodra het urenportaal draait.
- Case Contracten herschreven (titel "…in één veilig portaal", 4 checks, nieuwe modal-tekst). Beleid tools in het case-venster: alleen **gekoppelde systemen** noemen (klantsystemen als Carerix, Legalesign), niet het eigen gereedschap (Make, Vercel, Claude Code) — via `data-label="Gekoppelde systemen"` op `.case-tools`. Nog door te voeren bij de andere vijf cases zodra die aan de beurt zijn.
- Case Showroom/Silverspas herschreven: titel "Geen lead meer vergeten, van showroom tot handtekening", nieuwe animatie `.fup` (rij per contact: showroom → voicemail → gesprek → mail → getekend, elke stap met een nieuwe taak, 12 s lus; in de modal 1,6× geschaald), KPI "0 leads uit het oog verloren" i.p.v. 1,5 u. Tools in het venster: alleen Salesforce + Voys (gekoppelde systemen). Let op: Email Trigger staat gepauzeerd — mailtaken ontstaan alleen bij toegezegde mails, niet bij elke binnenkomende mail. Alles anoniem houden (geen klantnaam of "Esther" op de site).
- Case Leads herschreven: titel "Elke week verse leads uit de regio, in je eigen CRM-portaal", tag "Leadgeneratie & CRM", nieuwe animatie `.lp` (portaalvenster: nieuwe leads vallen binnen, KvK… → KvK ✓, status Nieuw → Connectieverzoek → Geaccepteerd, 12 s lus; in de modal 1,6×). Venstertekst legt het CRM-portaal uit (overzicht, zoeken/filteren, status per lead). Tools: alleen KvK. OPEN: KPI "75 leads per week" checken — in de projectnotities staat een wekelijkse vrijgave van ~20-30 leads.
- Case Uren herschreven: titel "Projectadministratie van bouwplaats tot boekhouding, in één portaal", checks (team schrijft uren op de telefoon / per project uren, voortgang, documenten / direct in Exact Online), tag "Projectportaal & ERP", nieuwe animatie `.pr` (telefoon → project met voortgang, team en goedkeuring voorman + directie → Exact-boeking, 12 s lus; modal 1,55×). Venster: "Wat we bouwden" beschrijft het hele portaal; "Doel" i.p.v. Resultaat; tools alleen Exact. KPI-blok in het venster: kolombreedte `auto` (was 104px, "75 leads" overlapte). OPEN: Exact-koppeling is nog niet gebouwd (portaal stap 5+); zodra het draait en live is: label "Wordt nu gebouwd" vervangen door een echt getal.
- Case Jaarrekening (accountancy): statische mock vervangen door animatie `.jr` (PDF wordt gescand → onepager bouwt zich op: balken Omzet/Kosten/Resultaat, dan Plus-/Aandachts-/Adviespunten, dan pill "Klaar in 5 minuten", 12 s lus; modal 1,5×). KPI-uitleg nu "gespreksvoorbereiding, in plaats van uren". Tools-rij weggelaten (geen gekoppelde klantsystemen). Oude `.mock-file/.mock-onepager/.op-*/.mock-arrow/.mock-h` CSS verwijderd. De cijfers in de animatie ("Omzet groeit" enz.) zijn voorbeeld.
- Pijlen in de Uren- (`.pr-ar1/.pr-ar2`) en Jaarrekening-animatie (`.jr-mid`): afgeronde lijn + chevron (::before/::after), tekenen zich pas wanneer de stap eraan toe is (lijn schaalt in, daarna kop, dan de bolletjes). Basisstand = zichtbaar (reduced motion). Pseudo-elementen staan in de reduced-motion-regel.
- Pijlen (Uren + Jaarrekening) vervangen door drie chevrons ">" die één voor één oplichten (`.pr-ar i`, `.jr-mid i`, keyframes `chA/chB/chJ`), met `rotate`/`translate` als losse CSS-eigenschappen.
- Aanpak: AI-zinnen eruit ("Geen open einde, geen verrassingen." in de ondertitel; "Geen verplichtingen, geen verkooppraatjes — gewoon kijken of er een match is." bij Kennismaking). Let op: in het contactblok staat nog "Geen verplichtingen. Aan het einde van het gesprek weet je wat er mogelijk is. De keuze is aan jou." (niet door Rob aangewezen).
- Case Vacaturescrapers (BO): animatie `.sc` (drie jobboards → chevrons → CRM "Opdrachten": rijen vallen binnen, "Contactpersoon zoeken…" → "✓ J. de Vries toegevoegd", status Nieuw → Gebeld / Gemaild, pill "±25 opdrachten per week, direct in je CRM", 12 s lus; modal 1,5×). Checks: ±25 per week / direct in CRM met juiste status / contactgegevens aangevuld / consultant belt en mailt. KPI 2 u per dag. Tag "Leadgeneratie & CRM"; tools: alleen Carerix. Alle zes Resultaten-cases zijn hiermee doorgenomen. Namen in de animaties zijn verzonnen.
- Scrapers-case: "kansen" i.p.v. "opdrachten" in check 1, CRM-venster ("CRM · Kansen"), pill en venstertekst (Rob: "opdrachten" klinkt alsof de opdracht al binnen is). De titel "Nooit meer handmatig zoeken naar opdrachten" blijft.
- Aanpak-kop: ondertitel direct onder de titel (zelfde structuur als Maatwerk: kicker, h2 mb-5, lead max-w-2xl).
- Dataveiligheid: ondertitel onder de titel (zelfde structuur als Maatwerk/Aanpak); 6 kaarten: Opgeslagen in de EU (nieuw, samengevoegd met "In jouw eigen omgeving"), Geen training op jouw data (icoon: afstudeerhoed doorgestreept i.p.v. chip), Wat we niet opslaan, kan niet lekken (icoon: stekker i.p.v. doorgestreepte database), Jouw data blijft van jou, Tweestapsverificatie, Versleuteld onderweg. LET OP in de HTML-commentaren: de EU-kaart klopt nu alleen voor Supabase (claim-checklist C27: Cijferwijs-leads in Notion en Make-datastores in de VS) en de 2FA-kaart klopt pas als Jilles 2FA overal aan heeft (C04/C13). Beide vóór livegang oplossen of beperken.
- Wie wij zijn: eerste zin zonder MKB ("…geloven dat ondernemers dé motor van Nederland zijn…"); volgorde Rob links, Jilles rechts (kaartjes en foto-alt; de kop blijft bewust "Wij zijn Jilles en Rob."). Alt-teksten van de Strategie- en CTA-foto nog "Jilles en Rob" (volgorde op die foto's niet gecontroleerd).
- Contactblok (CTA): AI-zin "Geen verkooppraatje — …" vervangen door "Een gesprek van 30 minuten. We luisteren, kijken samen waar de meeste winst zit en zeggen meteen of we iets voor je kunnen betekenen."; check 1 nu "Waar in je processen de meeste winst te halen valt".
- Hero-chip: "80/20: focus op waar de meeste winst te halen valt" (was "…wat het meest oplevert"; die zin eindigde net als de Aanpak-kop op "oplevert").
- Meta: title/og:title/twitter:title nu "Pareto Partners | Strategie en automatisering in Breda" (zonder "voor het MKB", past bij het besluit dat de focus niet op MKB ligt); description ongewijzigd. Deelplaatje `og-image.png` opnieuw gemaakt: onderregel "Breda en omgeving · paretopartners.nl" i.p.v. "MKB in en rond Breda · …" (oude versie zit in git, commit 232a1cc).
- BESLIST (Rob, 17-11): EU-claim ("Opgeslagen in de EU") blijft staan; Cijferwijs-leads gaan binnenkort naar een EU-database. Zorg dat dat vóór livegang van de site gebeurd is (Make-datastores staan nog in de VS, zie claim-checklist C27). "75 leads per week" (Cijferwijs) is bevestigd door Rob: komt overeen met de afspraak met Michiel.
- OPEN Uren-case: geen hard getal beschikbaar (verbetervoorstel Vermeulen noemt alleen kwalitatieve winst: geen papieren urenstaten, geen overtypen, uren vanzelf op het juiste project). Voorstel: label "Wordt nu gebouwd" laten staan; baseline meten (hoeveel uur per week gaan nu op aan papieren urenstaten verwerken?) en na livegang het echte getal invullen.
- Mobiele testronde (17-11) en fixes: (1) animaties in het case-venster op telefoon (≤640 px): niet vergroten maar `scale(.88)`, vlak met automatische hoogte, label "In ontwikkeling" boven de animatie i.p.v. eroverheen; (2) aanraakvlakken (`@media (pointer: coarse)`): menu- en footerlinks groter; (3) footer-juridische links mogen afbreken (geen 5 px overflow op 320 px); (4) kleurcontrast: subtiele tekst `#6b7aad` → `#5d6c9c`, footer `text-white/45→60`, `/30→50`, `/25→50`, label opdrachtgevers `/45→/70`. Lighthouse mobiel daarna: toegankelijkheid 100, best practices 100, SEO 100; LCP 0,6 s, CLS 0 (4× CPU-throttling, snel 4G). Modal gebruikt al `100dvh` (met 100vh als terugval): geen fix nodig. Nog niet getest: echte iPhone/Safari.
