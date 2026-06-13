async function signup() {

const email =
    document.getElementById('email').value;

const password =
    document.getElementById('password').value;

const { error } =
    await supabaseClient.auth.signUp({

        email: email,
        password: password

    });

if (error) {

    alert(error.message);
    return;

}

alert(
    'Conta criada! Verifique seu e-mail para confirmar o cadastro.'
);

}

async function login() {

const email =
    document.getElementById('email').value;

const password =
    document.getElementById('password').value;

const { error } =
    await supabaseClient.auth.signInWithPassword({

        email: email,
        password: password

    });

if (error) {

    alert(error.message);
    return;

}

window.location.href =
    'dashboard.html';

}
