window.DAILY =
  JSON.parse(
    localStorage.getItem(
      "bentoDaily"
    )
  ) || {
    lessonsToday: 0,
    dailyLimit: 5,
    gamesUnlocked: false,
    lastVisit: null
  };

function saveDaily() {
  localStorage.setItem(
    "bentoDaily",
    JSON.stringify(DAILY)
  );
}
