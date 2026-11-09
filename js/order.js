// Zufällige, aber pro Besucher stabile Anzeige-Reihenfolge.
// Siehe PROJECT.md Abschnitt 7: Reihenfolge darf NICHT nach Preis/Wichtigkeit sortiert sein.

const ORDER_STORAGE_KEY = "wunschliste_order";

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getDisplayOrder(allIds) {
  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY));
  } catch (e) {
    stored = null;
  }

  if (!Array.isArray(stored) || stored.length === 0) {
    const fresh = shuffle(allIds);
    saveDisplayOrder(fresh);
    return fresh;
  }

  // Bestehende Reihenfolge behalten, aber bekannte, inzwischen entfernte IDs rauswerfen
  // und neu hinzugekommene IDs ans Ende anhängen (kein Neumischen für wiederkehrende Besucher).
  const known = stored.filter((id) => allIds.includes(id));
  const missing = allIds.filter((id) => !known.includes(id));
  const combined = known.concat(missing);

  if (combined.length !== stored.length || missing.length > 0) {
    saveDisplayOrder(combined);
  }

  return combined;
}

function saveDisplayOrder(order) {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (e) {
    // localStorage nicht verfügbar - Reihenfolge gilt dann nur für die aktuelle Seitenansicht
  }
}
