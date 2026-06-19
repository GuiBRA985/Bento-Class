const quotes = [
  "🌿 Every new word opens a new door.",
  "🚀 You are one lesson away from unlocking something new.",
  "💬 Learn a little. Speak a lot.",
  "🌎 Every lesson brings you closer to the world.",
  "✨ Keep learning. Your future self will thank you."
];

document.getElementById(
  "dailyQuote"
).textContent =
  quotes[
    Math.floor(
      Math.random() * quotes.length
    )
  ];


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pathModal");
  const openBtn = document.getElementById("viewPath");
  const closeBtn = document.getElementById("closeModal");

  const journey = document.getElementById("journey");
  const currentBlock = document.getElementById("currentBlock");
  const fullPath = document.getElementById("fullPath");

  renderDashboard();

  function renderDashboard() {
    renderCurrentBlock();
    renderJourney();
  }

  function renderCurrentBlock() {
    const group =
      TAXONOMY[PROGRESS.currentGroup];

    const sub =
      group.subgroups[
        PROGRESS.currentSubgroup
      ];

    currentBlock.innerHTML = `
      <div class="card">
        <h3>${group.group}</h3>

        <p>
          Você está estudando:
          <strong>${sub}</strong>
        </p>

        <button
          class="primary-btn"
          onclick="openGenerator('${encodeURIComponent(sub)}')">

          Continuar

        </button>
      </div>
    `;
  }

  function renderJourney() {
  journey.innerHTML = "";

  TAXONOMY.forEach((group, index) => {

    const card =
      document.createElement("div");

    card.classList.add(
      "path-node"
    );

    let icon = "🔒";

    if (index < PROGRESS.currentGroup) {
      icon = "🟢";
      card.classList.add(
        "completed"
      );
    }

    else if (
      index ===
      PROGRESS.currentGroup
    ) {
      icon = "🟡";
      card.classList.add(
        "current"
      );
    }

    else {
      card.classList.add(
        "locked"
      );
    }

    card.innerHTML = `
      <div class="path-title">
        ${icon}
        ${group.group}
      </div>

      <div class="path-sub">
        ${group.subgroups.length}
        módulos
      </div>
    `;

    journey.appendChild(card);
  });
}

  function renderPath() {
    fullPath.innerHTML = "";

    TAXONOMY.forEach((group, gIndex) => {

      const card =
        document.createElement("div");

      card.style.marginBottom = "30px";

      const title =
        document.createElement("h3");

      title.textContent =
        group.group;

      card.appendChild(title);

      group.subgroups.forEach(
        (sub, sIndex) => {

          let icon = "🔒";

          if (
            gIndex < PROGRESS.currentGroup
          ) {
            icon = "✅";
          }

          if (
            gIndex === PROGRESS.currentGroup &&
            sIndex <
              PROGRESS.currentSubgroup
          ) {
            icon = "✅";
          }

          if (
            gIndex === PROGRESS.currentGroup &&
            sIndex ===
              PROGRESS.currentSubgroup
          ) {
            icon = "🟡";
          }

          const item =
            document.createElement("div");

          item.style.padding =
            "8px 0";

          item.textContent =
            `${icon} ${sub}`;

          card.appendChild(item);
        }
      );

      fullPath.appendChild(card);
    });
  }

  if (openBtn) {
    openBtn.addEventListener(
      "click",
      () => {
        renderPath();
        modal.style.display =
          "flex";
      }
    );
  }

  if (closeBtn) {
    closeBtn.addEventListener(
      "click",
      () => {
        modal.style.display =
          "none";
      }
    );
  }
});

function openGenerator(sub) {
  window.location.href =
    `generator/index.html?sub=${sub}`;
}
