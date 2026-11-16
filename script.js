document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card-slot"));
  const counterEl = document.getElementById("counter");
  const hintTextEl = document.getElementById("hintText");
  const finalMessageEl = document.getElementById("finalMessage");
  const resetBtn = document.getElementById("resetBtn");
  const totalCards = cards.length; // 5 cartas

  // Injeta o conteúdo dos SVGs no DOM quando hospedado (GitHub Pages),
  // garantindo que imagens externas referenciadas dentro do SVG carreguem sem bloqueio.
  async function inlineRepoSvgs() {
    if (!window.location.protocol.startsWith("http")) return;

    const svgImgs = Array.from(document.querySelectorAll("img.card-svg"));
    await Promise.all(
      svgImgs.map(async (img, idx) => {
        const src = img.getAttribute("src");
        if (!src) return;
        try {
          const res = await fetch(src);
          if (!res.ok) return;
          const svgText = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, "image/svg+xml");
          const svgEl = doc.querySelector("svg");
          if (!svgEl) return;

          // Evita conflito de IDs internos (máscaras/gradientes do Figma) entre os 5 versos
          const prefix = `svg${idx}_`;
          svgEl.querySelectorAll("[id]").forEach((el) => {
            const oldId = el.id;
            const newId = prefix + oldId;
            el.id = newId;
            svgEl.querySelectorAll("*").forEach((node) => {
              Array.from(node.attributes).forEach((attr) => {
                if (attr.value.includes(`#${oldId}`)) {
                  attr.value = attr.value.replaceAll(`#${oldId}`, `#${newId}`);
                }
              });
            });
          });

          svgEl.setAttribute("aria-hidden", "true");
          img.replaceWith(svgEl);
        } catch (_) {
          // Mantém o <img> como fallback caso ocorra erro de rede
        }
      })
    );
  }

  function updateStatus() {
    const flippedCount = cards.filter((c) => c.classList.contains("is-flipped")).length;
    counterEl.textContent = `${flippedCount} / ${totalCards}`;

    if (flippedCount === totalCards) {
      hintTextEl.textContent = "Todas as cartas foram reveladas!";
      finalMessageEl.classList.add("is-visible");
      finalMessageEl.setAttribute("aria-hidden", "false");
    } else {
      hintTextEl.textContent = "Clique nas cartas para revelar";
      finalMessageEl.classList.remove("is-visible");
      finalMessageEl.setAttribute("aria-hidden", "true");
    }
  }

  function toggleCard(card) {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(isFlipped));
    updateStatus();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => toggleCard(card));

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard(card);
      }
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });

  resetBtn.addEventListener("click", () => {
    cards.forEach((card) => {
      card.classList.remove("is-flipped");
      card.setAttribute("aria-pressed", "false");
    });
    updateStatus();
  });

  inlineRepoSvgs();
  updateStatus();
});