async function carregarLicoes() {

    const result =
await supabaseClient
    .from('lessons')
    .select('*')
    .eq(
        'subcategory',
        'Short Vowels'
    )
    .order(
        'lesson_number'
    );

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert(error.message);
        return;
    }

    const lista = document.getElementById('lista-licoes');

    data.forEach(licao => {

        const card = document.createElement('div');

        card.className = 'lesson-card';

        card.innerHTML = `
            <a href="lesson.html?id=${licao.id}">
                <h3>Lição ${licao.lesson_number}</h3>
                <p>${licao.title ?? ''}</p>
            </a>
        `;

        lista.appendChild(card);
    });
}

carregarLicoes();
