const welcome =
  document.getElementById(
    "welcomeMessage"
  );

const last =
  DAILY.lastVisit;

if (!last) {
  welcome.innerHTML =
    "👋 Welcome!<br>Let's begin your English journey.";
}
else {
  welcome.innerHTML =
    "👋 Welcome back!<br>Ready for today's lesson?";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // STATS

    document.getElementById(
      "streak"
    ).textContent =
      PROGRESS.streak;

    document.getElementById(
      "points"
    ).textContent =
      PROGRESS.points;

    document.getElementById(
      "lessonsDone"
    ).textContent =
      PROGRESS.completedLessons;

    // QUOTES

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
          Math.random() *
          quotes.length
        )
      ];

    // CURRENT BLOCK

    renderCurrentBlock();

    // JOURNEY

    renderJourney();

    // MODAL

    const modal =
      document.getElementById(
        "pathModal"
      );

    document
      .getElementById(
        "viewPath"
      )
      .addEventListener(
        "click",
        () => {

          renderFullPath();

          modal.style.display =
            "flex";
        }
      );

    document
      .getElementById(
        "closeModal"
      )
      .addEventListener(
        "click",
        () => {

          modal.style.display =
            "none";
        }
      );
  }
);

function renderCurrentBlock() {

  const group = TAXONOMY[PROGRESS.currentGroup];
  const sub = group.subgroups[PROGRESS.currentSubgroup];

  const percent = Math.round(
    (PROGRESS.currentLesson / PROGRESS.totalLessons) * 100
  );

  const dailyPercent = Math.round(
    (DAILY.lessonsToday / DAILY.dailyLimit) * 100
  );

  const buttonText = DAILY.gamesUnlocked
    ? "🎮 Play Games"
    : "▶ Continue Learning";

  const buttonAction = DAILY.gamesUnlocked
    ? "playGames()"
    : "openGenerator()";

  document.getElementById("currentBlock").innerHTML = `
    <div class="goal-card">
      <strong>🎯 Today's Goal</strong>

      <p>
        ${DAILY.lessonsToday}
        of
        ${DAILY.dailyLimit}
        lessons completed
      </p>

      <div class="progress-bar">
        <div
          class="progress-fill"
          style="width:${dailyPercent}%;">
        </div>
      </div>
    </div>

    <div class="card">

      <h3>📍 You are here</h3>

      <p>
        ${group.group}<br>
        → <strong>${sub}</strong>
      </p>

      <div class="progress-bar">
        <div
          class="progress-fill"
          style="width:${percent}%;">
        </div>
      </div>

      <p>
        ${PROGRESS.currentLesson}
        of
        ${PROGRESS.totalLessons}
        lessons completed
      </p>

      <div class="goal-card">
        <strong>🎯 Today's Goal</strong>

        <p>
          Complete 1 lesson<br>
          Earn 50 points
        </p>
      </div>

      <br>

${
  DAILY.gamesUnlocked
    ? `
      <div class="goal-card">
        <strong>
          🎉 Today's lessons are complete!
        </strong>

        <p>
          You unlocked today's games.
        </p>
      </div>
    `
    : ""
}

      <button
  class="primary-btn"
  onclick="${buttonAction}">

  ${buttonText}

</button>

    </div>
  `;
}
function renderJourney() {

  const journey =
    document.getElementById(
      "journey"
    );

  journey.innerHTML = "";

  TAXONOMY.forEach(
    group => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "path-node";

      card.innerHTML =
        `<strong>
          ${group.group}
        </strong>`;

      journey.appendChild(
        card
      );
    }
  );
}

function renderFullPath() {

  const full =
    document.getElementById(
      "fullPath"
    );

  full.innerHTML = "";

  TAXONOMY.forEach(
    group => {

      const div =
        document.createElement(
          "div"
        );

      div.style.marginBottom =
        "25px";

      div.innerHTML =
        `<h3>
          ${group.group}
        </h3>`;

      group.subgroups.forEach(
        sub => {

          div.innerHTML +=
            `<p>
              🔒 ${sub}
            </p>`;
        }
      );

      full.appendChild(div);
    }
  );
}
