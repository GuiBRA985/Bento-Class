async function carregarLicoes() {

    const { data, error } = await supabaseClient
        .from('lessons')
        .select('*');

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert(error.message);
        return;
    }

    const lista = document.getElementById('lista-licoes');

    data.forEach(licao => {
        lista.innerHTML += `
            <div>
                Lição ${licao.lesson_number}
            </div>
        `;
    });
}

carregarLicoes();
