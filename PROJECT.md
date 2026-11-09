# Weihnachts-Wunschliste – Projektkonzept

Status: Planungsphase. Es wurde noch kein Code geschrieben. Dieses Dokument hält das Konzept fest, bevor mit der Umsetzung begonnen wird.

## 1. Grundidee

Eine interaktive Wunschlisten-Website. Besucher bekommen Geschenkideen nacheinander präsentiert (wie Karten/Slides), können sich jeweils ein Bild, einen Namen, eine Wichtigkeit und optional den Preis ansehen und mit „Ja" oder „Nein" bewerten. „Ja"-Wünsche landen in einem persönlichen Warenkorb, der per LocalStorage erhalten bleibt und am Ende gesammelt auf Amazon geöffnet werden kann.

Das Referenzbild (aus einem Stream) dient **nur** als Stil-Inspiration (dunkles Blau, helle Karte in der Mitte, große runde Buttons). Webcam, Chat, Umfrage-Balken etc. werden **nicht** übernommen.

## 2. Seitenaufbau

```
┌─────────────────────────────────────────┐
│              (Kopfbereich, optional)      │
│                                           │
│        ┌───────────────────────┐         │
│        │                       │         │
│        │   Produktkarte        │         │
│        │   (Bild-Slider,       │         │
│        │    Name, Wichtigkeit, │         │
│        │    Preis-Button,      │         │
│        │    Ja/Nein)           │         │
│        │                       │         │
│        └───────────────────────┘         │
│          ◀  3 / 20  ▶                     │
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
| Wichtigkeit | Visuelle Skala, 5 Stufen: „Eher unwichtig" → „Nice to have" → „Wichtig" → „Sehr wichtig" → „Sehr, sehr, sehr wichtig" (z. B. als gefüllte Balken/Sterne + Text) |
| Preis | Standardmäßig verborgen. Button „💶 Preis aufdecken" deckt ihn auf. Bewertung ist davon unabhängig möglich. |
| Bewertung | Zwei große Buttons: ✓ Ja (grün) / ✕ Nein (rot) |
| Amazon-Link | Button „Auf Amazon anzeigen" öffnet die Produktseite in neuem Tab |

Nach einer Bewertung (Ja oder Nein) wechselt die Karte automatisch zum nächsten Wunsch. Bereits bewertete Wünsche sind über die Pfeil-Navigation weiterhin änderbar (z. B. Ja → Nein nachträglich korrigierbar).

## 4. Warenkorb

- Fixiert unten links, zeigt Artikelanzahl + Summe der **aufgedeckten** Preise (nicht aufgedeckte zählen nicht in die Summe, werden aber als „+ x Geschenke ohne sichtbaren Preis" ausgewiesen).
- Klick öffnet eine Übersicht/Modal mit allen „Ja"-Wünschen, dort einzeln entfernbar.
- Zwei Aktionen im Warenkorb:
  1. **„Alle zu Amazon hinzufügen"** – öffnet einen Sammel-Link (siehe Abschnitt 5).
  2. Pro Position zusätzlich der individuelle „Auf Amazon anzeigen"-Link als Fallback.
- Daten liegen in `localStorage` unter einem Projekt-eigenen Key (z. B. `wunschliste_cart`) als Array von Wunsch-IDs. Bleibt beim Reload erhalten.

## 5. Amazon-Warenkorb – technische Machbarkeit

**Was NICHT geht:** Es gibt keine kostenlose, offizielle API, mit der eine Webseite ohne Zutun des Besuchers fremde/eigene Produkte direkt und zuverlässig in den Amazon-Account eines Besuchers legt. Ein serverseitiger „automatischer" Einkauf ist ausgeschlossen (erfordert Amazon-Login, Zahlungsdaten etc. – das wird hier nicht gebaut und wäre auch nicht gewünscht).

**Was GEHT (und kostenlos ist):** Amazon bietet seit vielen Jahren im Rahmen des Associates-Programms ein offiziell dokumentiertes **„Add to Cart"-Formular** an: einen simplen Link/GET-Request der Form

```
https://www.amazon.de/gp/aws/cart/add.html?ASIN.1=B0XXXXXXX1&Quantity.1=1&ASIN.2=B0XXXXXXX2&Quantity.2=1&...
```

- Das legt die angegebenen ASINs in den Warenkorb **des Besuchers, der auf den Link klickt** (dessen eigener, bereits im Browser eingeloggter Amazon-Account) – nichts Serverseitiges, keine Zugangsdaten nötig.
- Funktioniert ohne API-Key, ohne Account bei Amazon-Entwicklerprogrammen, rein als Hyperlink.
- Jeder Wunsch braucht dafür seine **ASIN** (10-stelliger Produktcode, aus dem Amazon-Link ablesbar, z. B. aus `.../dp/B0XXXXXXX1/`).
- Einschränkungen, die wir einplanen müssen:
  - Keine offizielle Garantie, dass Amazon diesen Mechanismus dauerhaft unverändert anbietet (keine aktuelle offizielle Deprecation bekannt, aber es ist eine ältere, nicht prominent beworbene Funktion – wir sollten das beim Testen verifizieren).
  - Funktioniert nur clientseitig und nur für Amazon.de (bzw. die jeweilige länderspezifische Domain) – die Domain muss zur ASIN-Region passen.
  - Falls ein Produkt nicht mehr verfügbar/ASIN falsch ist, scheitert nur dieser eine Eintrag, nicht der ganze Link.
- **Deshalb als Doppel-Strategie:**
  1. Primär: Sammel-Button baut automatisch den Multi-ASIN-Link aus allen „Ja"-Wünschen und öffnet ihn in neuem Tab.
  2. Fallback: Pro Wunsch immer zusätzlich ein normaler Produktlink („Auf Amazon anzeigen"), falls der Sammel-Link bei einzelnen Artikeln nicht greift.
- Optional (später, nicht jetzt nötig): ein eigener Amazon-Partnerprogramm-Tag (`AssociateTag`) könnte ergänzt werden, falls gewünscht – nicht erforderlich für die Grundfunktion.

Dieser Ansatz ist 100 % kostenlos, braucht kein Backend und lässt sich direkt in JavaScript umsetzen (String aus den gespeicherten ASINs bauen, `window.open(url, '_blank')`).

## 6. Design

- Dunkelblauer Hintergrund (z. B. `#1a2744`-Ton), helle Produktkarte mit Schatten und abgerundeten Ecken.
- Große, pillenförmige Buttons mit dezenter Hover-/Klick-Animation (leichtes Skalieren, Farbwechsel).
- Ruhige, klare Typografie, viel Weißraum auf der Karte, keine überladenen Icons.
- Responsive: Karte skaliert, Navigation/Warenkorb rücken auf Mobile zusammen (Warenkorb z. B. als Leiste am unteren Bildschirmrand).

## 7. Technik & Projektstruktur

Nur HTML/CSS/Vanilla-JS, kostenlos hostbar auf GitHub Pages. Keine Build-Tools, keine bezahlten Dienste.

```
Weinachtswunschliste website/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js            # Haupt-Logik: Kartenwechsel, Bewertung, Warenkorb-UI
│   ├── cart.js           # LocalStorage-Handling, Summenberechnung
│   ├── amazon-link.js     # Baut Einzel- und Sammel-Amazon-Links aus ASINs
│   └── wishes-data.js     # Array der Wunsch-Objekte (vom Nutzer befüllt)
├── assets/
│   └── images/
│       └── <wunsch-id>/   # 1..n Bilder je Wunsch
└── PROJECT.md
```

### Datenmodell pro Wunsch (in `wishes-data.js`)

```js
{
  id: "homeserver",
  name: "Homeserver",
  images: ["assets/images/homeserver/1.jpg", "assets/images/homeserver/2.jpg"],
  importance: 5,          // 1-5, siehe Skala oben
  price: 249.00,           // in Euro, bleibt verborgen bis Klick
  asin: "B0XXXXXXX1",
  amazonUrl: "https://www.amazon.de/dp/B0XXXXXXX1",
  description: "Kurze Info, falls gewünscht"
}
```

Diese Liste wird später vom Nutzer mit den konkreten Wünschen (Bilder, Preise, Amazon-Links) befüllt.

## 8. Offene Punkte für später

- Genaue Anzahl und Inhalte aller Wünsche (folgt vom Nutzer).
- Ob es eine Kopf-/Begrüßungssektion geben soll (z. B. Name des Beschenkten, Hinweistext).
- Ob „Nein"-Wünsche irgendwo einsehbar/rückgängig machbar sein sollen (aktuell: ja, über Zurück-Navigation).
- Feintuning der Wichtigkeits-Visualisierung (Sterne vs. Balken vs. Badges).

## 9. Nächste Schritte

Warten auf die konkreten Wunsch-Daten (Bilder, Namen, Preise, Amazon-Links) vom Nutzer. Erst danach beginnt die Programmierung gemäß diesem Konzept.
