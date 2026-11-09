# Weihnachts-Wunschliste – Projektkonzept

Status: Planungsphase. Es wurde noch kein Code geschrieben. Dieses Dokument hält das Konzept fest, bevor mit der Umsetzung begonnen wird. Alle 16 konkreten Wünsche sind jetzt integriert (Abschnitt 5).

## 1. Grundidee

Eine interaktive Wunschlisten-Website. Besucher bekommen Geschenkideen nacheinander präsentiert (wie Karten/Slides), können sich jeweils ein Bild, einen Namen, eine Wichtigkeit und optional den Preis ansehen und mit „Ja" oder „Nein" bewerten. „Ja"-Wünsche landen in einem persönlichen Warenkorb, der per LocalStorage erhalten bleibt und am Ende gesammelt auf Amazon geöffnet werden kann.

Das Referenzbild (aus einem Stream) dient **nur** als Stil-Inspiration (dunkles Blau, helle Karte in der Mitte, große runde Buttons). Webcam, Chat, Umfrage-Balken etc. werden **nicht** übernommen.

## 2. Seitenaufbau

```
┌─────────────────────────────────────────┐
│   🎄 Meine Weihnachtswunschliste 2026     │
│   Kurzer Hinweistext zur Bedienung        │
│                                           │
│        ┌───────────────────────┐         │
│        │                       │         │
│        │   Produktkarte        │         │
│        │   (Bild-Slider,       │         │
│        │    Name, Wichtigkeit, │         │
│        │    Badges, Preis-     │         │
│        │    Button, Ja/Nein)   │         │
│        │                       │         │
│        └───────────────────────┘         │
│          ◀  3 / 16  ▶                     │
│                                           │
│  🛒 2 Artikel · 49,98 €   (unten links,   │
│                            immer sichtbar)│
└─────────────────────────────────────────┘
```

Zentrale Produktkarte, darunter Navigation zwischen Wünschen (Pfeile + Zähler „x / n"), und permanent sichtbarer Mini-Warenkorb unten links.

## 3. Pro Wunsch dargestellte Informationen

| Element | Verhalten |
|---|---|
| Bildergalerie | 1–n Bilder, Pfeile zum Durchblättern (auch per Touch-Swipe) |
| Name | Kurzer Titel, z. B. „Homeserver" |
| Wichtigkeit | Immer sichtbare visuelle Skala (siehe Abschnitt 4) |
| Badges | Optionale Zusatz-Hinweise wie „Für die ganze Familie", „Spaßwunsch" etc. (siehe Abschnitt 4) |
| Preis | Standardmäßig verborgen. Button „💶 Preis aufdecken" deckt ihn auf. Bewertung ist davon unabhängig möglich. Falls Preis unbekannt: „Noch nicht festgelegt". |
| Bewertung | Zwei große Buttons: ✓ Ja (grün) / ✕ Nein (rot) |
| Produktlink | Button „Auf Amazon ansehen" bzw. „Beim Anbieter ansehen" (abhängig vom Shop-Typ, siehe Abschnitt 6) – entfällt bei persönlichen Gutscheinen |

Nach einer Bewertung (Ja oder Nein) wechselt die Karte automatisch zum nächsten Wunsch. Bereits bewertete Wünsche sind über die Pfeil-Navigation weiterhin änderbar (z. B. Ja → Nein nachträglich korrigierbar).

### Kopfbereich

Oberhalb der Produktkarte steht eine kurze Begrüßungssektion: Überschrift (z. B. „Meine Weihnachtswunschliste 2026") plus ein bis zwei Sätze Hinweistext zur Bedienung (Ja/Nein, Preis aufdecken, Warenkorb). Bleibt beim Durchklicken der Wünsche fix stehen, nimmt aber nur wenig vertikalen Platz ein.

## 4. Wichtigkeitssystem & Badges

### 4.1 Skala

Die Wichtigkeit wird als Zahl (Basis: /10) plus Textstufe und Balkenanzeige dargestellt. Die Reihenfolge der Wünsche auf der Seite hat **keinen** Zusammenhang mit dieser Skala (siehe Abschnitt 5 zur Zufallsreihenfolge).

| Wert | Stufentext |
|---|---|
| 4/10 | Eher unwichtig |
| 6/10 | Nett zu haben |
| 7–8/10 | Ziemlich wichtig |
| 8,8/10 | Sehr wichtig |
| 10/10 | Extrem hoch |
| 11/10 | Extrem wichtig |
| „Oberhalb der Skala" | Absolute Top-Priorität – eigene, optisch herausgehobene Sonderstufe (ausschließlich für den Claude-Gutschein, kein numerischer Wert, kein Vergleich mit den übrigen Balken) |
| Sonderfall | Troll-/Spaßwunsch – zeigt statt der Skala ein humorvolles Badge statt einer ernsten Wichtigkeitsangabe (Rolex) |

### 4.2 Badges (pro Wunsch frei kombinierbar)

- 👑 **Höchste Priorität** – nur Claude-Gutschein
- 🏠 **11/10** – nur Homeserver
- 👨‍👩‍👧‍👦 **Für die ganze Familie** – DJI-Zubehör, O2-Upgrade
- 🤝 **Auch für Freunde** – O2-Upgrade
- ⏳ **Nur solange ich bis Weihnachten noch spiele** – Guild Wars 2
- 😂 **Nur Spaß / Troll-Wunsch** – Rolex

Badges werden als kleine farbige Pillen über oder unter dem Namen angezeigt, unabhängig von der Wichtigkeits-Skala.

## 5. Die 16 Wünsche

Alle Preise und Links wurden recherchiert, nicht erfunden. Wo aktuell kein verlässlicher, stabiler Preis/Link auffindbar war, steht das explizit als offener Punkt (Abschnitt 9) – lieber „noch zu prüfen" als eine geratene Zahl.

| # | Name (kurz) | Wichtigkeit | Badges | Preis-Status | Link |
|---|---|---|---|---|---|
| 1 | Homeserver (GMKtec NucBox M5 Ultra, 1 TB / 32 GB RAM) | 11/10 | 🏠 11/10 | Offen – Preis schwankt stark je Händler | [GMKtec offizieller Shop](https://de.gmktec.com/products/gmktec-nucbox-m5-ultra-amd-ryzen-7-7730u) |
| 2 | Claude-Gutschein „Könnte nicht ohne leben" (3 Monate Claude-Abo) | Höchste Stufe (über allem) | 👑 Höchste Priorität | Kein Shop-Preis – persönlicher Gutschein | Kein Produktlink (siehe unten) |
| 3 | iPhone 15 Pro | 8,8/10 | – | Offen – Preis je nach Amazon-Angebot/Restbestand | [Amazon.de Produktsuche „iPhone 15 Pro"](https://www.amazon.de/s?k=iPhone+15+Pro) *(ASIN beim Kauf eintragen)* |
| 4 | DJI Osmo Action 4 (+ ca. 30 € Zubehör) | 8,8/10 (Sehr wichtig) | 👨‍👩‍👧‍👦 Für die ganze Familie | Offen – Amazon-Deal-Preis schwankt stark (zuletzt ca. 170–230 €) | [DJI offizieller Shop](https://www.dji.com/de/osmo-action-4) |
| 5 | AYN Thor Pro (12 GB / 256 GB) | 7/10 | – | Offen – mehrere Preiserhöhungen 2026, aktueller Preis im Shop zu prüfen | [AYN offizieller Shop](https://ayn.gg) |
| 6 | Raspberry Pi 4 (4 GB RAM) | 8/10 | – | Offen – aktueller Preis im Shop zu prüfen | [Raspberry Pi offizieller Shop](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) |
| 7 | O2 Internet-Upgrade auf 150 Mbit/s | Extrem hoch (10/10) | 👨‍👩‍👧‍👦 Für die ganze Familie, 🤝 Auch für Freunde | Kein Aufpreis erfunden – monatlicher Mehrpreis muss bei o2 erfragt werden | [o2 Mein o2 / Tarif-Upgrade](https://www.o2online.de/dsl-internet/) |
| 8 | 256-GB-microSD-Karte (SanDisk Extreme microSDXC 256 GB) | 6/10 | – | Offen – Amazon-Preis schwankt stark (zuletzt zwischen ca. 30 € und 70 € gesehen) | [Amazon.de Produktsuche „SanDisk Extreme microSDXC 256GB"](https://www.amazon.de/s?k=SanDisk+Extreme+microSDXC+256GB) *(ASIN beim Kauf eintragen)* |
| 9 | Guild Wars 2: Heart of Thorns + Path of Fire | Noch nicht festgelegt – entfällt ggf. vor Weihnachten | ⏳ Nur solange ich bis Weihnachten noch spiele | ca. 30 € (Expansion Starter Pack, offizieller Bundle-Preis) | [Guild Wars 2 offizieller Shop](https://www.guildwars2.com/de/shop/) |
| 10 | PS5 Controller (DualSense) | 6/10 | – | Offen – Listenpreis zuletzt ca. 75 €, Angebote schwanken | [PlayStation Direct](https://direct.playstation.com/de-de/) |
| 11 | Gaming-Headset (Attack Shark L80) | 8/10 | – | ca. 28–30 € (Herstellerangabe), Amazon-Preis zusätzlich zu prüfen | [Attack Shark offizieller Shop](https://attackshark.com/products/l80-wireless-gaming-headset-noise-canceling) |
| 12 | 3D-Drucker (Bambu Lab A1 mini) | 4/10 | – | Offen – Preis abhängig von Bundle (Solo vs. Combo mit AMS Lite) | [Bambu Lab offizieller Shop](https://eu.store.bambulab.com/collections/a1-series/products/a1-mini) |
| 13 | Webcam (Anker PowerConf C200) | 7,5/10 | – | Offen – Preis schwankt je nach Angebot | [Anker offizieller Shop](https://www.anker.com/de-de) *(Produktseite verifizieren)* |
| 14 | AirTags | 6/10 | – | Offen – aktueller Preis auf Apple-Seite zu prüfen | [Apple.de Shop](https://www.apple.com/de/shop/buy-airtag/airtag) |
| 15 | Smart Fridge (Samsung Family Hub, z. B. RS6HA8891SL/EG) | 7/10 | – | Offen – je nach Händler ca. 2.000–3.000 € | [Samsung Family Hub Serie](https://www.samsung.com/de/refrigerators/side-by-side/refrigerator-sbs-family-hub-614l-silver-rs90f67betef/) |
| 16 | Rolex Yacht-Master II Gold | Spaßwunsch (keine ernste Skala) | 😂 Nur Spaß / Troll-Wunsch | Offen – Referenz-Preis laut rolex.com Gelbgold-Modell ca. 57.800 USD, Preis auf rolex.de zu verifizieren | [Rolex offizielle Seite](https://www.rolex.com/de-de/watches/yacht-master-ii) |

**Hinweis zu #15 (Smart Fridge):** Auf ausdrücklichen Wunsch wird dieser Eintrag auf der Website wie ein ganz normaler, ernst gemeinter Wunsch dargestellt – ohne Troll-Badge, ohne humorvollen Unterton. Nur hier in der internen Projektdokumentation ist festgehalten, dass es sich eigentlich ähnlich wie bei der Rolex um einen augenzwinkernden Wunsch handelt.

### Claude-Gutschein – Sonderbehandlung

Kein Amazon-/Shop-Link, da es sich um einen persönlichen Gutschein handelt. Darstellung:
- Eigene, optisch auffällige Kartenvariante (z. B. andere Hintergrundfarbe/-verzierung statt Produktfoto).
- Statt „Auf Amazon ansehen" entfällt der Link-Button komplett.
- Statt Preis: Direkt sichtbarer Text „Persönlicher Gutschein – 3 Monate Claude-Abo".
- Badge 👑 „Höchste Priorität", oberhalb der normalen Wichtigkeits-Skala positioniert.

## 6. Produktlinks – Regeln

- Amazon-Produkte: echter `amazon.de/dp/<ASIN>`-Link, sobald die ASIN bekannt ist.
- Herstellerprodukte ohne sinnvollen Amazon-Link (DJI, Raspberry Pi, Bambu Lab, Apple, Rolex, AYN, Guild Wars 2, o2, PlayStation): Link zum offiziellen Hersteller-/Anbieter-Shop (siehe Tabelle oben).
- Persönliche Gutscheine: kein Link.
- Button-Beschriftung passt sich dem Linktyp an: „Auf Amazon ansehen" vs. „Beim Anbieter ansehen".
- Kein Preis und kein Link wird erfunden – unsichere Fälle sind in Abschnitt 9 aufgeführt und müssen vor dem Launch final geprüft/bestätigt werden (Preise ändern sich zudem laufend, z. B. bei Amazon-Deals).

## 7. Zufällige Reihenfolge (pro Besucher individuell, aber stabil)

Anforderung: keine Sortierung nach Preis/Wichtigkeit, jeder Besucher bekommt seine eigene zufällige Reihenfolge, die beim Neuladen gleich bleibt.

Ablauf:
1. Beim ersten Seitenaufruf wird geprüft, ob im `localStorage` bereits ein gespeicherter Reihenfolge-Schlüssel existiert (z. B. `wunschliste_order`).
2. Existiert er nicht: Die IDs aus `wishes-data.js` werden per Fisher-Yates-Shuffle (echter Zufall über `Math.random()`, clientseitig, ohne Server) einmalig gemischt und als Array von IDs in `localStorage` gespeichert.
3. Existiert er bereits: Die gespeicherte Reihenfolge wird unverändert verwendet – die Anzeige bleibt bei jedem erneuten Besuch gleich.
4. Die Reihenfolge in `wishes-data.js` selbst ist **nur Verwaltungs-Reihenfolge** (z. B. nach Hinzufüge-Datum) und hat keinerlei Einfluss auf die Anzeige-Reihenfolge.
5. Kommen später neue Wünsche hinzu, werden deren IDs ans Ende der gespeicherten Reihenfolge angehängt (kein Neumischen bestehender Besucher-Reihenfolgen).

Das ist komplett unabhängig vom Warenkorb-Key (`wunschliste_cart`) und benötigt keinerlei Server/Cookies – reines `localStorage`, pro Browser individuell.

## 8. Warenkorb & Amazon-Sammel-Link

(Unverändert zum bisherigen Konzept, hier nochmal im Überblick:)

- Fixiert unten links, zeigt Artikelanzahl + Summe der **aufgedeckten** Preise (nicht aufgedeckte zählen nicht in die Summe, werden aber als „+ x Geschenke ohne sichtbaren Preis" ausgewiesen). Wünsche ohne Shop-Preis (Gutschein, o2-Upgrade) zählen nie in die Summe.
- Klick öffnet eine Übersicht/Modal mit allen „Ja"-Wünschen, dort einzeln entfernbar.
- Aktionen im Warenkorb:
  1. **„Alle zu Amazon hinzufügen"** – baut automatisch den offiziellen Amazon-Multi-ASIN-Link (`amazon.de/gp/aws/cart/add.html?ASIN.1=...&Quantity.1=1&ASIN.2=...`) aus allen „Ja"-Wünschen mit ASIN und öffnet ihn in neuem Tab. Legt die Artikel in den Amazon-Warenkorb **des Besuchers** (dessen eigener, eingeloggter Account) – rein clientseitig, kostenlos, keine API nötig.
  2. Pro Position zusätzlich der individuelle Produktlink als Fallback (Amazon oder Hersteller-Shop, je nach Wunsch).
- Wünsche ohne ASIN (Hersteller-Links, Gutschein, o2) werden beim Sammel-Link automatisch übersprungen; nur ihr individueller Link wird angezeigt.
- Daten liegen in `localStorage` unter einem Projekt-eigenen Key (z. B. `wunschliste_cart`) als Array von Wunsch-IDs. Bleibt beim Reload erhalten.

## 9. Design

- Dunkelblauer Hintergrund (z. B. `#1a2744`-Ton), helle Produktkarte mit Schatten und abgerundeten Ecken.
- Große, pillenförmige Buttons mit dezenter Hover-/Klick-Animation (leichtes Skalieren, Farbwechsel).
- Ruhige, klare Typografie, viel Weißraum auf der Karte, keine überladenen Icons.
- Badges als kleine, farblich abgesetzte Pillen, dezent genug, um nicht zu überladen zu wirken.
- Responsive: Karte skaliert, Navigation/Warenkorb rücken auf Mobile zusammen (Warenkorb z. B. als Leiste am unteren Bildschirmrand).

## 10. Technik & Projektstruktur

Nur HTML/CSS/Vanilla-JS, kostenlos hostbar auf GitHub Pages. Keine Build-Tools, keine bezahlten Dienste.

```
Weinachtswunschliste website/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js            # Haupt-Logik: Kartenwechsel, Bewertung, Badges/Wichtigkeits-Anzeige
│   ├── order.js           # Zufalls-Shuffle + localStorage-Persistenz der Anzeige-Reihenfolge
│   ├── cart.js            # LocalStorage-Handling, Summenberechnung
│   ├── amazon-link.js     # Baut Einzel- und Sammel-Amazon-Links aus ASINs
│   └── wishes-data.js     # Array der Wunsch-Objekte (vom Nutzer gepflegt, siehe unten)
├── assets/
│   └── images/
│       └── <wunsch-id>/   # 1..n Bilder je Wunsch
└── PROJECT.md
```

### Datenmodell pro Wunsch (in `wishes-data.js`)

Bewusst so gestaltet, dass neue Wünsche, geänderte Preise/Bilder/Links/Wichtigkeiten oder gelöschte Wünsche nur eine Änderung in dieser einen Datei erfordern – keine Anpassung an Layout/Logik nötig.

```js
{
  id: "homeserver",
  name: "Homeserver",
  images: ["assets/images/homeserver/1.jpg", "assets/images/homeserver/2.jpg"],

  importanceValue: 11,        // Zahl (Basis /10), rein informativ – KEIN Einfluss auf Anzeige-Reihenfolge
  importanceLabel: "Extrem wichtig",
  specialTier: null,          // z.B. "top" für Claude-Gutschein (oberhalb der Skala), sonst null
  isGagGift: false,           // true = Troll-/Spaßwunsch wie Rolex, zeigt kein ernstes Wichtigkeits-UI

  badges: ["11/10"],          // frei kombinierbare Badge-Keys, siehe Abschnitt 4.2

  priceKnown: false,          // false = "Noch nicht festgelegt" wird angezeigt statt einer Zahl
  price: null,                // in Euro, erst wenn priceKnown = true und Nutzer den Preis einträgt
  conditional: false,          // true = Wunsch kann vor Weihnachten noch entfallen (z.B. Guild Wars 2)
  conditionalNote: null,       // Hinweistext, z.B. "Nur solange ich bis Weihnachten noch spiele"

  linkType: "manufacturer",   // "amazon" | "manufacturer" | "retailer" | "none"
  asin: null,                 // nur bei linkType "amazon"
  url: "https://de.gmktec.com/products/gmktec-nucbox-m5-ultra-amd-ryzen-7-7730u",

  groupGift: { family: false, friends: false }, // steuert die Familie/Freunde-Badges

  description: "1 TB Speicher, 36 GB RAM"
}
```

Diese Liste wird mit den Daten aus Abschnitt 5 befüllt, sobald Bilder vorliegen und die offenen Punkte (Abschnitt 11) geklärt sind.

## 11. Offene Punkte (müssen vor der Umsetzung/dem Launch geklärt werden)

**Fehlende Produktbilder:** Für alle 16 Wünsche fehlen noch die tatsächlichen Produktfotos.

**Preise, die aktuell nicht verlässlich/aktuell recherchierbar waren** (Amazon-/Marktpreise schwanken ständig, hier wurde bewusst nichts erfunden; alle Modell-/Variantenfragen sind inzwischen geklärt – offen ist nur noch der jeweils aktuelle Kauf-Preis bzw. die ASIN kurz vor dem Launch):
- Homeserver (GMKtec NucBox M5 Ultra, 1 TB / 32 GB RAM – festgelegt)
- iPhone 15 Pro (Link zeigt auf Amazon.de-Angebot statt Apple Shop – festgelegt)
- DJI Osmo Action 4 Zubehör (die genannten ~30 € sind vom Nutzer vorgegeben, nicht recherchiert)
- AYN Thor Pro, 12 GB / 256 GB (Variante festgelegt)
- Raspberry Pi 4, 4 GB RAM (Variante festgelegt)
- o2-Upgrade – monatlicher Mehrpreis muss direkt bei o2/Mein o2 erfragt werden, da online nicht einsehbar
- PS5 Controller, Bambu Lab A1 mini, Anker PowerConf C200, AirTags, Rolex – Richtwerte in Abschnitt 5 genannt, aber vor Launch im jeweiligen Shop zu bestätigen
- 256-GB-microSD-Karte (SanDisk Extreme), Gaming-Headset (Attack Shark L80), Smart Fridge (Samsung Family Hub) – Modelle festgelegt, genauer Kauf-Preis/ASIN aber noch offen (siehe Abschnitt 5)

**Konzeptionelle offene Punkte (aus der ersten Planungsrunde, weiterhin offen):**
- Ob „Nein"-Wünsche irgendwo einsehbar/rückgängig machbar sein sollen (aktuell: ja, über Zurück-Navigation).
- Feintuning der Wichtigkeits-Visualisierung (Sterne vs. Balken vs. Badges) und der Sonderstufe für den Claude-Gutschein.
- Exakte ASIN je Amazon-Produkt (erst ablesbar, sobald echte Produktseiten-Links vom Nutzer vorliegen oder die Produktbilder/Links final bestätigt sind).

## 12. Nächste Schritte

Alle Modell-/Variantenfragen sind geklärt. Es fehlen jetzt nur noch: Produktbilder und die final im jeweiligen Shop geprüften Preise/ASINs (siehe Abschnitt 11). Sobald diese vorliegen, kann mit der vollständigen Programmierung gemäß diesem Konzept begonnen werden.
