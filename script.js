document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card-slot"));
  const counterEl = document.getElementById("counter");
  const statusBar = document.querySelector(".status-bar");
  const finalMessage = document.getElementById("finalMessage");
  const resetBtn = document.getElementById("resetBtn");

  const revealedSet = new Set();
  const totalCards = cards.length;

  function updateProgress() {
    counterEl.textContent = `${revealedSet.size} / ${totalCards}`;

    if (revealedSet.size === totalCards) {
      statusBar.classList.add("is-complete");
      finalMessage.classList.add("is-visible");
      finalMessage.setAttribute("aria-hidden", "false");
    }
  }

  function toggleCard(card, index) {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(isFlipped));

    if (isFlipped) {
      revealedSet.add(index);
      updateProgress();
    }
  }

  cards.forEach((card, index) => {
    // Iluminação acompanha o cursor sobre a carta
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--mouse-x", `${x.toFixed(1)}%`);
      card.style.setProperty("--mouse-y", `${y.toFixed(1)}%`);
    });

    // Clique vira a carta
    card.addEventListener("click", () => {
      toggleCard(card, index);
    });

    // Acessibilidade via teclado (Enter ou Espaço)
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard(card, index);
      }
    });
  });

  // Botão para reiniciar o baralho
  resetBtn.addEventListener("click", () => {
    revealedSet.clear();
    cards.forEach((card) => {
      card.classList.remove("is-flipped");
      card.setAttribute("aria-pressed", "false");
    });

    statusBar.classList.remove("is-complete");
    finalMessage.classList.remove("is-visible");
    finalMessage.setAttribute("aria-hidden", "true");
    counterEl.textContent = `0 / ${totalCards}`;
  });
});