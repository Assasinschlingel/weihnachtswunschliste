// Verwaltet Bewertungen ("Ja"/"Nein"), aufgedeckte Preise und die Warenkorb-Summe.
// Alles in localStorage, pro Browser individuell, siehe PROJECT.md Abschnitt 8.

const RATINGS_STORAGE_KEY = "wunschliste_ratings";
const REVEALED_STORAGE_KEY = "wunschliste_revealed";

function loadJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? value : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // localStorage nicht verfügbar - Zustand gilt dann nur für die aktuelle Seitenansicht
  }
}

function loadRatings() {
  return loadJson(RATINGS_STORAGE_KEY, {});
}

function saveRating(id, value) {
  const ratings = loadRatings();
  if (value === null) {
    delete ratings[id];
  } else {
    ratings[id] = value;
  }
  saveJson(RATINGS_STORAGE_KEY, ratings);
  return ratings;
}

function loadRevealed() {
  return loadJson(REVEALED_STORAGE_KEY, {});
}

function markRevealed(id) {
  const revealed = loadRevealed();
  revealed[id] = true;
  saveJson(REVEALED_STORAGE_KEY, revealed);
  return revealed;
}

// Liefert { count, sum, hiddenCount } für alle Wünsche, deren Bewertung "yes" ist.
function getCartSummary(wishes, ratings, revealed) {
  let count = 0;
  let sum = 0;
  let hiddenCount = 0;

  wishes.forEach((wish) => {
    if (ratings[wish.id] !== "yes") return;
    count++;
    const isRevealedAndPriced = revealed[wish.id] && wish.priceApplicable && wish.priceKnown && typeof wish.price === "number";
    if (isRevealedAndPriced) {
      sum += wish.price;
    } else {
      hiddenCount++;
    }
  });

  return { count, sum, hiddenCount };
}

function getCartWishes(wishes, ratings) {
  return wishes.filter((wish) => ratings[wish.id] === "yes");
}
