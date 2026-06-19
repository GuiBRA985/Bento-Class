const lista =
  document.getElementById(
    'lista-licoes'
  );

lista.innerHTML = '';

window.TAXONOMY.forEach(group => {

  // Título do grupo
  const titulo =
    document.createElement('h2');

  titulo.className =
    'group-title';

  titulo.innerText =
    group.group;

  lista.appendChild(
    titulo
  );

  // Container dos cards
  const container =
    document.createElement('div');

  container.className =
    'group-container';

  group.subgroups.forEach(sub => {

    const card =
      document.createElement('div');

    card.className =
      'lesson-card';

    card.innerHTML = `
      <h3>${sub}</h3>

      <button
        class="btn"
        onclick="openGenerator('${encodeURIComponent(sub)}')">

        Entrar

      </button>
    `;

    container.appendChild(
      card
    );

  });

  lista.appendChild(
    container
  );

});

// Abre o gerador
window.openGenerator =
function(sub) {

  window.location.href =
    `generator/index.html?sub=${sub}`;

};
