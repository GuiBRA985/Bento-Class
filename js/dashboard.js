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

      let icon = "🔒";

      if (index < PROGRESS.currentGroup) {
        icon = "🟢";
      }

      if (index === PROGRESS.currentGroup) {
        icon = "🟡";
      }

      const card =
        document.createElement("div");

      card.className = "card";

      card.innerHTML = `
        <h3>
          ${icon}
          ${group.group}
        </h3>

        <p>
          ${group.subgroups.length}
          módulos
        </p>
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
