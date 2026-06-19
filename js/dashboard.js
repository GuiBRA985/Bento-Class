document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pathModal");
  const openBtn = document.getElementById("viewPath");
  const closeBtn = document.getElementById("closeModal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});
