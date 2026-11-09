// Dezenter, rein dekorativer Schneefall-Effekt (nicht klickbar, kein Einfluss auf die App-Logik).

(function () {
  const container = document.getElementById("snowfall");
  if (!container) return;

  const FLAKE_COUNT = 45;

  for (let i = 0; i < FLAKE_COUNT; i++) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    flake.textContent = Math.random() < 0.35 ? "❄" : "•";

    const size = 8 + Math.random() * 16;
    const duration = 10 + Math.random() * 14;
    const delay = Math.random() * -20;
    const drift = (Math.random() - 0.5) * 120;

    flake.style.left = `${Math.random() * 100}%`;
    flake.style.fontSize = `${size}px`;
    flake.style.opacity = (0.25 + Math.random() * 0.45).toFixed(2);
    flake.style.setProperty("--drift", `${drift}px`);
    flake.style.animationDuration = `${duration}s`;
    flake.style.animationDelay = `${delay}s`;

    container.appendChild(flake);
  }
})();
