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

Rolex und Smart Fridge laufen bewusst **ohne** Sonderbehandlung über diese normale Skala (6/10 bzw. 7/10) – kein Troll-/Spaß-Badge mehr.

### 4.2 Badges (pro Wunsch frei kombinierbar)

- 👑 **Höchste Priorität** – nur Claude-Gutschein
- 🏠 **11/10** – nur Homeserver
- 👨‍👩‍👧‍👦 **Für die ganze Familie** – DJI-Zubehör, O2-Upgrade
- 🤝 **Auch für Freunde** – O2-Upgrade
- ⏳ **Nur solange ich bis Weihnachten noch spiele** – Guild Wars 2

Badges werden als kleine farbige Pillen über oder unter dem Namen angezeigt, unabhängig von der Wichtigkeits-Skala.

## 5. Die 16 Wünsche

Alle Preise und Links wurden recherchiert, nicht erfunden. Für 14 von 16 Wünschen liegt ein echtes Produktfoto vor (von der jeweiligen Hersteller-/Markenseite heruntergeladen, siehe `assets/images/<id>/`); Claude-Gutschein und o2-Upgrade bleiben als Dienstleistung/Gutschein ohne Foto. Alle Preise wurden live direkt auf der jeweiligen offiziellen Shop-Seite (bzw. bei zwei Posten auf einer verlässlichen Händlerseite) abgelesen – Stand der Recherche, Preise können sich seitdem geändert haben.

| # | Name (kurz) | Foto | Wichtigkeit | Badges | Preis (Stand der Recherche) | Link |
|---|---|---|---|---|---|---|
| 1 | Homeserver (GMKtec NucBox M5 Ultra, 1 TB / 32 GB RAM) | ✅ | 11/10 | 🏠 11/10 | **559,99 €** (offizieller GMKtec-DE-Shop) | [GMKtec offizieller Shop](https://de.gmktec.com/products/gmktec-nucbox-m5-ultra-amd-ryzen-7-7730u) |
| 2 | Claude-Gutschein „Könnte nicht ohne leben" (3 Monate Claude-Abo) | Claude-Icon statt Foto | Höchste Stufe (über allem) | 👑 Höchste Priorität | Kein Shop-Preis – persönlicher Gutschein | Kein Produktlink (siehe unten) |
| 3 | iPhone 15 Pro | ✅ (Apple-Pressefoto) | 8,8/10 | – | Offen – Apple führt es nicht mehr regulär, Preis je nach Amazon-Angebot/Restbestand | [Amazon.de Produktsuche „iPhone 15 Pro"](https://www.amazon.de/s?k=iPhone+15+Pro) *(ASIN beim Kauf eintragen)* |
| 4 | DJI Osmo Action 4 (+ ca. 30 € Zubehör) | ✅ | 8,8/10 (Sehr wichtig) | 👨‍👩‍👧‍👦 Für die ganze Familie | **189,00 €** (Standard-Combo, Angebotspreis im offiziellen DJI-Store; regulär 239 €) | [DJI offizieller Shop](https://www.dji.com/de/osmo-action-4) |
| 5 | AYN Thor Pro (12 GB / 256 GB) | ✅ | 7/10 | – | **409,00 $** (offizieller US-Preis bei ayntec.com; EUR kann abweichen) | [AYN offizieller Shop](https://www.ayntec.com/products/ayn-thor) |
| 6 | Raspberry Pi 4 (4 GB RAM) | ✅ | 8/10 | – | ca. 40–110 € (Preisvergleich zeigt stark schwankende Händlerpreise, kein eindeutiger Einzelpreis auffindbar) | [Raspberry Pi offizieller Shop](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) |
| 7 | O2 Internet-Upgrade auf 150 Mbit/s | – (Dienstleistung) | Extrem hoch (10/10) | 👨‍👩‍👧‍👦 Für die ganze Familie, 🤝 Auch für Freunde | Kein Aufpreis erfunden – monatlicher Mehrpreis muss bei o2 erfragt werden | [o2 Mein o2 / Tarif-Upgrade](https://www.o2online.de/dsl-internet/) |
| 8 | 256-GB-microSD-Karte (SanDisk Extreme microSDXC 256 GB) | ✅ | 6/10 | – | **69,99 $** (offizieller SanDisk-US-Shop; EUR-Preis bei Amazon.de kann abweichen) | [Amazon.de Produktsuche „SanDisk Extreme microSDXC 256GB"](https://www.amazon.de/s?k=SanDisk+Extreme+microSDXC+256GB) *(ASIN beim Kauf eintragen)* |
| 9 | Guild Wars 2: Heart of Thorns + Path of Fire | ✅ | Noch nicht festgelegt – entfällt ggf. vor Weihnachten | ⏳ Nur solange ich bis Weihnachten noch spiele | **30,00 €** (Expansion Starter Pack, offizieller Bundle-Preis) | [Guild Wars 2 offizieller Shop](https://www.guildwars2.com/de/shop/) |
| 10 | PS5 Controller (DualSense) | ✅ | 6/10 | – | **74,99 €** (Standardfarbe, laut Händlerpreis/UVP-Spanne) | [PlayStation offizielle Produktseite](https://www.playstation.com/de-de/accessories/dualsense-wireless-controller/) |
| 11 | Gaming-Headset (Attack Shark L80) | ✅ | 8/10 | – | **29,95 €** (offizieller DE-Shop; MSRP 32,95 €) | [Attack Shark offizieller DE-Shop](https://attackshark.de/products/l80-wireless-gaming-headset-noise-canceling) |
| 12 | 3D-Drucker (Bambu Lab A1 mini) | ✅ | 4/10 | – | **179,00 €** (Solo, Angebotspreis im offiziellen EU-Store; regulär 189 €) | [Bambu Lab offizieller Shop](https://eu.store.bambulab.com/collections/a1-series/products/a1-mini) |
| 13 | Webcam (Anker PowerConf C200) | ✅ | 7,5/10 | – | **54,72 €** (Galaxus.de, Live-Preis; Anker selbst zeigt keinen EUR-Preis) | [Anker Japan offizieller Shop](https://www.ankerjapan.com/products/a3369) *(für DE-Kauf Amazon.de/Galaxus.de nutzen)* |
| 14 | AirTags (4er-Pack) | ✅ | 6/10 | – | **119,00 €** (offizieller Apple.de-Shop) | [Apple.de Shop](https://www.apple.com/de/shop/buy-airtag/airtag) |
| 15 | Smart Fridge (Samsung Family Hub RS90F67BETEF) | ✅ | 7/10 | – | **1.999,00 €** (offizieller samsung.com/de-Shop) | [Samsung Family Hub Serie](https://www.samsung.com/de/refrigerators/side-by-side/refrigerator-sbs-family-hub-614l-silver-rs90f67betef/) |
| 16 | Rolex Yacht-Master II Gold | ✅ | 6/10 | – | **ca. 57.800 $** (Gelbgold-Modell, offizielle rolex.com-Preisangabe) | [Rolex offizielle Seite](https://www.rolex.com/de-de/watches/yacht-master-ii) |

Rolex und Smart Fridge laufen jetzt beide als ganz normale, ernst dargestellte Wünsche ohne Spaß-/Troll-Badge und ohne Sonderbehandlung in der Wichtigkeits-Skala.

### Claude-Gutschein – Sonderbehandlung

Kein Amazon-/Shop-Link, da es sich um einen persönlichen Gutschein handelt. Darstellung:
- Eigene, optisch auffällige Kartenvariante (z. B. andere Hintergrundfarbe/-verzierung statt Produktfoto).
- Kleines offizielles Claude-Icon (von claude.ai, `assets/images/claude-gutschein/icon.svg`) als Badge unten links im Bildbereich.
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

## 11. Offene Punkte (müssen vor dem Launch geklärt werden)

**Produktbilder:** Für 14 von 16 Wünschen liegt jetzt ein echtes Foto von der jeweiligen Hersteller-/Markenseite vor (`assets/images/<id>/1.*`, mit Zustimmung heruntergeladen). Claude-Gutschein und o2-Upgrade bleiben bewusst ohne Foto (Dienstleistung/Gutschein, Emoji-Platzhalter reicht). Das Rolex-Foto ist ein generisches Kollektionsbild (nicht exakt das Gelbgold-Modell) und beim Homeserver sowie bei der SD-Karte zeigt das Foto eine Beispiel-Variante (32 GB RAM bzw. 32 GB Kapazität des gleichen Kartendesigns) – optisch aber repräsentativ.

**Alle Preise wurden jetzt live recherchiert** (Abschnitt 5 zeigt jeden Wert mit Quelle). Trotzdem bleiben ein paar Einschränkungen bestehen, da bewusst nichts erfunden wurde, wo keine verlässliche Zahl auffindbar war:
- Raspberry Pi 4 (4 GB): kein eindeutiger Einzelpreis auffindbar, daher als Spanne (ca. 40–110 €) angegeben statt einer geratenen Einzelzahl.
- AYN Thor Pro und SD-Karte: offizieller Preis nur in USD auffindbar (ayntec.com bzw. sandisk.com US-Shop) – der tatsächliche EUR-Preis beim Kauf kann abweichen.
- iPhone 15 Pro: Apple führt es nicht mehr regulär, daher weiterhin "Noch nicht festgelegt" und Link auf Amazon.de-Angebot statt Apple Shop.
- o2-Upgrade: monatlicher Mehrpreis muss weiterhin direkt bei o2/Mein o2 erfragt werden, da online nicht einsehbar.
- DJI Osmo Action 4 Zubehör (~30 €) ist weiterhin eine Nutzerangabe, nicht recherchiert.
- Anker PowerConf C200: Preis stammt von Galaxus.de (Live-Preis), nicht von Anker selbst, da dort kein EUR-Preis auffindbar war.
- Alle übrigen Preise (Homeserver, DJI, Gaming-Headset, 3D-Drucker, PS5-Controller, AirTags, Smart Fridge, Guild Wars 2) wurden direkt auf der jeweiligen offiziellen Shop-Seite abgelesen – Stand der Recherche, vor dem eigentlichen Launch trotzdem nochmal prüfen, da sich auch offizielle Preise ändern können.

**Konzeptionelle offene Punkte (aus der ersten Planungsrunde, weiterhin offen):**
- Ob „Nein"-Wünsche irgendwo einsehbar/rückgängig machbar sein sollen (aktuell: ja, über Zurück-Navigation).
- Feintuning der Wichtigkeits-Visualisierung (Sterne vs. Balken vs. Badges) und der Sonderstufe für den Claude-Gutschein.
- Exakte ASIN je Amazon-Produkt (erst ablesbar, sobald echte Produktseiten-Links/ASINs final bestätigt sind).

## 12. Nächste Schritte

Die Website ist implementiert (siehe `index.html`, `css/`, `js/`) und nur für Desktop ausgelegt. Vor dem Launch auf GitHub Pages sollten noch die in Abschnitt 11 gelisteten Live-Preise/ASINs geprüft werden.
