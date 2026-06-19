window.PROGRESS = JSON.parse(
  localStorage.getItem("bentoProgress")
) || {
  streak: 7,
  points: 1250,
  completedLessons: 18,

  currentGroup: 0,
  currentSubgroup: 1,

  currentLesson: 4,
  totalLessons: 10
};

window.saveProgress = function () {
  localStorage.setItem(
    "bentoProgress",
    JSON.stringify(window.PROGRESS)
  );
};
