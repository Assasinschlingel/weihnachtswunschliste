// Baut den offiziellen Amazon "Add to Cart"-Sammel-Link aus allen Wünschen mit bekannter ASIN.
// Siehe PROJECT.md Abschnitt 8: rein clientseitig, kostenlos, legt Artikel in den
// Amazon-Warenkorb des Besuchers (nicht serverseitig, kein Login nötig).

function buildAmazonCartUrl(wishes) {
  const itemsWithAsin = wishes.filter((wish) => wish.linkType === "amazon" && wish.asin);
  if (itemsWithAsin.length === 0) return null;

  const params = [];
  itemsWithAsin.forEach((wish, index) => {
    const n = index + 1;
    params.push(`ASIN.${n}=${encodeURIComponent(wish.asin)}`);
    params.push(`Quantity.${n}=1`);
  });

  return `https://www.amazon.de/gp/aws/cart/add.html?${params.join("&")}`;
}
