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

const today =
  new Date()
    .toISOString()
    .split("T")[0];

if (
  DAILY.lastVisit &&
  DAILY.lastVisit !== today
) {
  DAILY.lessonsToday = 0;
  DAILY.gamesUnlocked = false;
}

DAILY.lastVisit = today;
saveDaily();
