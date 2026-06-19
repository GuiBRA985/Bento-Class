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

function canStudy() {
  return (
    DAILY.lessonsToday <
    DAILY.dailyLimit
  );
}

function completeLesson() {

  if (
    DAILY.lessonsToday >=
    DAILY.dailyLimit
  ) {
    return;
  }

  DAILY.lessonsToday++;

  if (
    DAILY.lessonsToday >=
    DAILY.dailyLimit
  ) {
    DAILY.gamesUnlocked =
      true;
  }

  saveDaily();
}

window.DAILY =
  JSON.parse(
    localStorage.getItem("bentoDaily")
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

window.saveDaily = saveDaily;

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
