// Estatísticas temporárias
document.getElementById("streak").textContent = 7;
document.getElementById("points").textContent = 1250;
document.getElementById("completed").textContent = 8;

document.getElementById("wordsCount").textContent = 864;
document.getElementById("sentencesCount").textContent = 211;
document.getElementById("accuracy").textContent = "89%";

const journey =
  document.getElementById(
    "journey"
  );

// Gera os grupos automaticamente
window.TAXONOMY.forEach(group => {

  const card =
    document.createElement("div");

  card.className =
    "lesson-card";

  card.innerHTML = `
    <h3>${group.group}</h3>

    <p>
      ${group.subgroups.length}
      categorias disponíveis
    </p>

    <button>
      Entrar
    </button>
  `;

  const button =
    card.querySelector(
      "button"
    );

  button.onclick =
    () => {

      // Por enquanto abre
      // o primeiro subgrupo

      const firstSub =
        group.subgroups[0];

      window.location.href =
        `generator/index.html?sub=${encodeURIComponent(firstSub)}`;

    };

  journey.appendChild(
    card
  );

});

// Botão continuar
document
  .getElementById(
    "continueBtn"
  )
  .onclick = () => {

    window.location.href =
      "generator/index.html?sub=Short%20Vowels";

  };
