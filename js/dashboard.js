async function loadDashboard() {

const {
    data: { user }
} =
await supabaseClient.auth.getUser();

if (!user) {

    window.location.href =
        'login.html';

    return;
}

const progressResult =
    await supabaseClient
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id);

if (progressResult.error) {

    console.error(
        progressResult.error
    );

    return;
}

const lessons =
    progressResult.data || [];

const totalStarted =
    lessons.length;

const completed =
    lessons.filter(
        lesson =>
            lesson.completed
    ).length;

let percentage = 0;

if (totalStarted > 0) {

    percentage =
        Math.round(

            lessons.reduce(
                (sum, lesson) =>
                    sum +
                    (lesson.progress || 0),
                0
            )

            / totalStarted

        );

}

document.getElementById(
    'progressPercent'
).textContent =
    percentage + '%';

document.getElementById(
    'progressFill'
).style.width =
    percentage + '%';

document.getElementById(
    'lessonsCompleted'
).textContent =
    completed;

const messages = [

"Seu inglês evoluiu. Sua letra continua parecendo bula de remédio.",

"Parabéns. Hoje você pronunciou melhor que ontem.",

"Eminem ainda não ligou. Continue treinando.",

"Seu progresso está ótimo. Sua caligrafia segue misteriosa.",

"Uma palavra por vez. Roma não foi construída em um dia."

];

document.getElementById(
    'bentoMessage'
).textContent =

messages[
    Math.floor(
        Math.random() *
        messages.length
    )
];

}

loadDashboard();
