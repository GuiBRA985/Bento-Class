document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pathModal");
  const openBtn = document.getElementById("viewPath");
  const closeBtn = document.getElementById("closeModal");
  const fullPath = document.getElementById("fullPath");

  function renderPath() {
    fullPath.innerHTML = "";

    window.TAXONOMY.forEach(group => {
      const card = document.createElement("div");

      card.style.marginBottom = "25px";

      const title = document.createElement("h3");
      title.textContent = group.group;
      title.style.marginBottom = "10px";

      card.appendChild(title);

      group.subgroups.forEach(sub => {
        const item = document.createElement("div");

        item.textContent = "🔒 " + sub;

        item.style.padding = "8px 0";
        item.style.color = "#666";

        card.appendChild(item);
      });

      fullPath.appendChild(card);
    });
  }

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      renderPath();
      modal.style.display = "flex";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});
