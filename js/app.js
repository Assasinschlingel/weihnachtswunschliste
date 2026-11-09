// Haupt-Logik: Kartenanzeige, Navigation, Bewertung, Preis-Reveal, Warenkorb-UI
// und das Ausweich-Minigame beim Nein-Button (Homeserver, Internet-Upgrade).

const BADGE_DEFS = {
  "homeserver-11": { emoji: "🏠", label: "11/10" },
  "top-priority": { emoji: "👑", label: "Höchste Priorität" },
  family: { emoji: "👨‍👩‍👧‍👦", label: "Für die ganze Familie" },
  friends: { emoji: "🤝", label: "Auch für Freunde" },
  conditional: { emoji: "⏳", label: "Nur solange ich bis Weihnachten noch spiele" },
  gag: { emoji: "😂", label: "Nur Spaß / Troll-Wunsch" }
};

const LINK_LABELS = {
  amazon: "🛒 Auf Amazon ansehen",
  "amazon-search": "🔎 Bei Amazon suchen",
  manufacturer: "🔗 Beim Hersteller ansehen",
  retailer: "🔗 Beim Anbieter ansehen",
  none: null
};

const IMPORTANCE_MAX = 11;

let order = [];
let currentIndex = 0;
let ratings = {};
let revealed = {};
let eHeld = false;
let currentImageIndex = 0;

const wishById = Object.fromEntries(WISHES.map((w) => [w.id, w]));

function currentWish() {
  return wishById[order[currentIndex]];
}

function init() {
  order = getDisplayOrder(WISHES.map((w) => w.id));
  ratings = loadRatings();
  revealed = loadRevealed();

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "e") eHeld = true;
  });
  document.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "e") eHeld = false;
  });

  document.getElementById("prevBtn").addEventListener("click", () => goTo(currentIndex - 1));
  document.getElementById("nextBtn").addEventListener("click", () => goTo(currentIndex + 1));
  document.getElementById("revealPriceBtn").addEventListener("click", onRevealPrice);
  document.getElementById("cartWidget").addEventListener("click", openCartModal);
  document.getElementById("closeCartModal").addEventListener("click", closeCartModal);
  document.getElementById("cartModalBackdrop").addEventListener("click", closeCartModal);
  document.getElementById("addAllToAmazonBtn").addEventListener("click", onAddAllToAmazon);
  document.getElementById("mediaPrevBtn").addEventListener("click", () => shiftImage(-1));
  document.getElementById("mediaNextBtn").addEventListener("click", () => shiftImage(1));

  renderWish();
  renderCartWidget();
}

function goTo(index) {
  const len = order.length;
  currentIndex = ((index % len) + len) % len;
  renderWish();
}

function onRevealPrice() {
  const wish = currentWish();
  revealed = markRevealed(wish.id);
  renderWish();
}

function rate(value) {
  const wish = currentWish();
  ratings = saveRating(wish.id, value);
  renderCartWidget();
  goTo(currentIndex + 1);
}

function renderWish() {
  const wish = currentWish();
  const card = document.getElementById("card");
  const isRevealed = !!revealed[wish.id];
  const rating = ratings[wish.id] || null;

  card.className = "card" + (wish.specialTier === "top" ? " card-top-tier" : "") + (wish.isGagGift ? " card-gag" : "") + (wish.glow ? " card-glow" : "");

  currentImageIndex = 0;
  renderMedia(wish);
  document.getElementById("wishName").textContent = wish.name;
  document.getElementById("wishDescription").textContent = wish.description || "";

  renderImportance(wish);
  renderBadges(wish);
  renderPrice(wish, isRevealed);
  renderLink(wish);
  renderRatingButtons(wish, rating);

  document.getElementById("positionIndicator").textContent = `${currentIndex + 1} / ${order.length}`;
}

function renderMedia(wish) {
  const img = document.getElementById("mediaImage");
  const emoji = document.getElementById("mediaEmoji");
  const hint = document.getElementById("mediaPhotoHint");
  const prevBtn = document.getElementById("mediaPrevBtn");
  const nextBtn = document.getElementById("mediaNextBtn");

  const hasImages = wish.images.length > 0;

  if (hasImages) {
    img.src = wish.images[currentImageIndex];
    img.alt = wish.name;
    img.style.display = "block";
    emoji.style.display = "none";
    hint.style.display = "none";
  } else {
    img.style.display = "none";
    img.removeAttribute("src");
    emoji.style.display = "block";
    emoji.textContent = wish.emoji;
    hint.style.display = "block";
  }

  const showNav = wish.images.length > 1;
  prevBtn.style.display = showNav ? "flex" : "none";
  nextBtn.style.display = showNav ? "flex" : "none";

  const brandIcon = document.getElementById("mediaBrandIcon");
  if (wish.brandIcon) {
    brandIcon.src = wish.brandIcon;
    brandIcon.style.display = "block";
  } else {
    brandIcon.style.display = "none";
  }
}

function shiftImage(delta) {
  const wish = currentWish();
  if (wish.images.length < 2) return;
  const len = wish.images.length;
  currentImageIndex = ((currentImageIndex + delta) % len + len) % len;
  renderMedia(wish);
}

function renderImportance(wish) {
  const box = document.getElementById("importanceBox");
  box.innerHTML = "";

  if (wish.specialTier === "top") {
    box.innerHTML = `<div class="importance-top">👑 Absolute Top-Priorität</div>`;
    return;
  }
  if (wish.isGagGift) {
    box.innerHTML = `<div class="importance-gag">🎉 Spaßwunsch</div>`;
    return;
  }
  if (wish.importanceValue === null) {
    box.innerHTML = `<div class="importance-text">${wish.importanceLabel || "Noch nicht festgelegt"}</div>`;
    return;
  }

  const pct = Math.min(100, (wish.importanceValue / IMPORTANCE_MAX) * 100);
  box.innerHTML = `
    <div class="importance-text">${wish.importanceLabel} (${wish.importanceValue}/10)</div>
    <div class="importance-bar"><div class="importance-bar-fill" style="width:${pct}%"></div></div>
  `;
}

function renderBadges(wish) {
  const row = document.getElementById("badgeRow");
  row.innerHTML = "";
  wish.badges.forEach((key) => {
    const def = BADGE_DEFS[key];
    if (!def) return;
    const pill = document.createElement("span");
    pill.className = "badge-pill";
    pill.textContent = `${def.emoji} ${def.label}`;
    row.appendChild(pill);
  });

  if (wish.conditional && wish.conditionalNote) {
    const note = document.createElement("div");
    note.className = "conditional-note";
    note.textContent = wish.conditionalNote;
    row.appendChild(note);
  }
}

function renderPrice(wish, isRevealed) {
  const priceSection = document.getElementById("priceSection");
  const revealBtn = document.getElementById("revealPriceBtn");
  const priceValue = document.getElementById("priceValue");

  if (!wish.priceApplicable) {
    priceSection.style.display = "none";
    return;
  }
  priceSection.style.display = "flex";

  if (!isRevealed) {
    revealBtn.style.display = "inline-block";
    priceValue.style.display = "none";
    return;
  }

  revealBtn.style.display = "none";
  priceValue.style.display = "inline-block";
  if (wish.priceDisplay) {
    priceValue.textContent = wish.priceDisplay;
  } else {
    priceValue.textContent = wish.priceKnown && typeof wish.price === "number"
      ? `${wish.price.toFixed(2).replace(".", ",")} €`
      : "Noch nicht festgelegt";
  }
}

function renderLink(wish) {
  const linkBtn = document.getElementById("productLinkBtn");
  const label = LINK_LABELS[wish.linkType];
  if (!label || !wish.url) {
    linkBtn.style.display = "none";
    return;
  }
  linkBtn.style.display = "inline-block";
  linkBtn.textContent = label;
  linkBtn.onclick = () => window.open(wish.url, "_blank", "noopener");
}

function renderRatingButtons(wish, rating) {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const hint = document.getElementById("dodgeHint");

  yesBtn.classList.toggle("is-selected", rating === "yes");
  noBtn.classList.toggle("is-selected", rating === "no");

  yesBtn.onclick = () => rate("yes");
  noBtn.onclick = () => rate("no");

  setupDodge(wish.evasiveNoButton);
  hint.style.display = wish.evasiveNoButton ? "block" : "none";

  // Startposition pro Karte zurücksetzen: zentriert neben Ja, bis zum ersten Ausweich-Trigger
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

// ---- Ausweich-Minigame für den Nein-Button ----

let dodgeMoveHandler = null;
let dodgeEnterHandler = null;

function setupDodge(isEvasive) {
  const stage = document.getElementById("ratingStage");
  const noBtn = document.getElementById("noBtn");

  if (dodgeMoveHandler) {
    stage.removeEventListener("mousemove", dodgeMoveHandler);
    noBtn.removeEventListener("mouseenter", dodgeEnterHandler);
    dodgeMoveHandler = null;
    dodgeEnterHandler = null;
  }

  if (!isEvasive) return;

  dodgeMoveHandler = (e) => dodgeIfTooClose(e.clientX, e.clientY);
  dodgeEnterHandler = () => {
    if (!eHeld) placeNoButtonRandomly();
  };

  stage.addEventListener("mousemove", dodgeMoveHandler);
  noBtn.addEventListener("mouseenter", dodgeEnterHandler);
}

function dodgeIfTooClose(clientX, clientY) {
  if (eHeld) return;
  const noBtn = document.getElementById("noBtn");
  const rect = noBtn.getBoundingClientRect();
  const margin = 55;
  if (
    clientX >= rect.left - margin &&
    clientX <= rect.right + margin &&
    clientY >= rect.top - margin &&
    clientY <= rect.bottom + margin
  ) {
    placeNoButtonRandomly();
  }
}

function placeNoButtonRandomly() {
  const stage = document.getElementById("ratingStage");
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  const stageW = stage.clientWidth;
  const stageH = stage.clientHeight;
  const btnW = noBtn.offsetWidth || 110;
  const btnH = noBtn.offsetHeight || 48;
  const maxLeft = Math.max(8, stageW - btnW - 8);
  const maxTop = Math.max(8, stageH - btnH - 8);

  const yesRect = yesBtn.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const avoid = {
    left: yesRect.left - stageRect.left - 20,
    right: yesRect.right - stageRect.left + 20,
    top: yesRect.top - stageRect.top - 20,
    bottom: yesRect.bottom - stageRect.top + 20
  };

  let left, top, tries = 0;
  do {
    left = 8 + Math.random() * (maxLeft - 8);
    top = 8 + Math.random() * (maxTop - 8);
    tries++;
  } while (
    tries < 12 &&
    left < avoid.right &&
    left + btnW > avoid.left &&
    top < avoid.bottom &&
    top + btnH > avoid.top
  );

  noBtn.style.position = "absolute";
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
}

// ---- Warenkorb ----

function renderCartWidget() {
  const { count, sum, hiddenCount } = getCartSummary(WISHES, ratings, revealed);
  const widget = document.getElementById("cartWidget");
  const sumText = sum > 0 ? `${sum.toFixed(2).replace(".", ",")} €` : "0,00 €";
  const hiddenText = hiddenCount > 0 ? ` (+${hiddenCount} ohne sichtbaren Preis)` : "";
  widget.innerHTML = `🛒 ${count} Artikel · ${sumText}${hiddenText}`;
}

function openCartModal() {
  const cartWishes = getCartWishes(WISHES, ratings);
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  if (cartWishes.length === 0) {
    list.innerHTML = `<p class="cart-empty">Noch keine Geschenke ausgewählt.</p>`;
  }

  cartWishes.forEach((wish) => {
    const row = document.createElement("div");
    row.className = "cart-row";

    let priceText = "Preis nicht aufgedeckt";
    if (revealed[wish.id]) {
      if (wish.priceDisplay) {
        priceText = wish.priceDisplay;
      } else if (wish.priceKnown && typeof wish.price === "number") {
        priceText = `${wish.price.toFixed(2).replace(".", ",")} €`;
      } else {
        priceText = "Noch nicht festgelegt";
      }
    }

    const linkLabel = LINK_LABELS[wish.linkType];
    const linkHtml = linkLabel && wish.url
      ? `<button class="btn btn-small" data-url="${wish.url}">${linkLabel}</button>`
      : "";

    row.innerHTML = `
      <span class="cart-row-emoji">${wish.emoji}</span>
      <span class="cart-row-name">${wish.name}</span>
      <span class="cart-row-price">${wish.priceApplicable ? priceText : "–"}</span>
      ${linkHtml}
      <button class="btn btn-small btn-remove" data-id="${wish.id}">Entfernen</button>
    `;
    list.appendChild(row);
  });

  list.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      ratings = saveRating(btn.dataset.id, null);
      renderCartWidget();
      renderWish();
      openCartModal();
    });
  });

  list.querySelectorAll("[data-url]").forEach((btn) => {
    btn.addEventListener("click", () => window.open(btn.dataset.url, "_blank", "noopener"));
  });

  const amazonUrl = buildAmazonCartUrl(cartWishes);
  const addAllBtn = document.getElementById("addAllToAmazonBtn");
  addAllBtn.disabled = !amazonUrl;
  addAllBtn.dataset.url = amazonUrl || "";
  document.getElementById("amazonFallbackHint").style.display = amazonUrl ? "none" : "block";

  document.getElementById("cartModal").style.display = "flex";
}

function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

function onAddAllToAmazon() {
  const url = document.getElementById("addAllToAmazonBtn").dataset.url;
  if (url) window.open(url, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", init);
