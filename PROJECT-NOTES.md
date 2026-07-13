# PROJECT-NOTES — Hairdesign Barbara Leitner

Projektspezifischer Kontext, befüllt aus `KUNDEN-BRIEFING-TEMPLATE.md`. Bei kleinen Änderungen an diesem Projekt immer zuerst hier nachsehen.

## Firma
- Hairdesign Barbara Leitner, Friseursalon, seit 1999
- Hauptplatz 9, 8670 Krieglach, Steiermark
- Tel: 03855 2337 · Mail: hairdesign@krieglach.net
- Alte Website (Referenz): https://www.hairdesign-leitner.at/

## Seitenstruktur
- `index.html` — Home
- `unser-salon.html` — Über uns, Werte, Salon-Galerie, Karte
- `leistungen.html` — Alle Services + Preisliste
- `team.html` — Team-Übersicht
- `kontakt.html` — Kontaktdaten, Karte, Kontaktformular
- `impressum.html`, `datenschutz.html`

## Design
- Farben: warmes Off-White (`#faf7f3`) als Basis, dunkles Warmgrau/Schwarz (`#2a2622`) als Text, Kupfer/Terrakotta (`#a8623a`) als Akzentfarbe — passend zu Bildern (helles Holz, warme Salonfotos) und Briefing-Wunsch "hell gehalten, Farbe kommt über die Bilder rein"
- Schrift: Sora (Headings) + Inter (Body), Google Fonts
- Scroll-Reveal-Animationen Standard (`.reveal`)
- **Header-Hintergrund (Hero):** Die Salon-Fotos sind mit max. 600×400px recht niedrig aufgelöst und wirkten als Vollflächen-Hintergrund gestreckt verschwommen. Auf Kundenwunsch verwenden jetzt alle Seiten (`index.html`, `unser-salon.html`, `leistungen.html`, `kontakt.html`, `team.html`) einen dunklen, animierten Farbverlauf mit „Blobs" (`.hero-blob`) statt Fotos.
- Falls künftig doch wieder Fotos im Header gewünscht sind: höher aufgelöste Originalfotos (mind. 1600px Breite) von Barbara anfragen, sonst wirkt es bei großen Screens wieder unscharf.

## Bilder-Mapping (`images/`)
- Logo: `Logo_Hairdesing Barbara Leitner.png`
- Team: `Barbara.jpg`, `Sabine.jpg`, `Selina.jpg`, `Erika.jpg`, `Jaqueline.jpg`, `Natalie.jpg`
- Salon: `Salon_1.jpg` – `Salon_7.jpg`

## Offene Punkte (bitte prüfen / ergänzen)
1. **Kontaktformular:** Aktuell mit Platzhalter-Endpoint `https://formspree.io/f/DEINE-FORMSPREE-ID` in `kontakt.html`. Bei formspree.io kostenloses Formular anlegen und die echte Form-ID einsetzen, sonst werden keine Mails verschickt.
2. **Preisliste** (`leistungen.html`): Preise sind sinnvolle Richtwerte, keine echten Kundenpreise — bitte mit Barbara abstimmen und anpassen.
3. **Öffnungszeiten:** Platzhalter (Di–Fr 8–18, Sa 8–12) — bitte mit den echten Öffnungszeiten abgleichen (steht aktuell im Footer aller Seiten + auf der Kontaktseite).
4. **Impressum:** Gewerbebehörde / UID-Nummer fehlen im Briefing — bitte ergänzen, sobald verfügbar.
5. **Social Media:** Keine Links im Briefing angegeben — aktuell nirgends verlinkt. Falls gewünscht, einfach sagen und ich baue Icons in den Footer ein.
