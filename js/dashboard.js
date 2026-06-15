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

}

loadDashboard();
