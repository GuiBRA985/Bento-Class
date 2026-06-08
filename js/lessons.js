async function carregarLicoes() {

    const { data, error } = await supabaseClient
        .from('lessons')
        .select('*')
        .order('lesson_number');

    if (error) {
        console.error(error);
        return;
    }

    const lista = document.getElementById('lista-licoes');

    data.forEach(licao => {

        const card = document.createElement('div');

        card.className = 'lesson-card';

        card.innerHTML = `
            <h3>Lição ${licao.lesson_number}</h3>
            <p>${licao.title ?? ''}</p>
        `;

        lista.appendChild(card);
    });
}

carregarLicoes();
