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

const messages = [

"The road to success is always under construction. — Lily Tomlin",

"Listen, smile, agree, and then do whatever you were gonna do anyway. — Robert Downey Jr.",

"I always wanted to be somebody, but now I realize I should have been more specific. — Lily Tomlin",

"Opportunity is missed by most people because it is dressed in overalls and looks like work. — Thomas Edison",

"People say nothing is impossible, but I do nothing every day. — Winnie the Pooh",

"When life gives you lemons, squirt someone in the eye. — Cathy Guisewite",

"Confidence is 10% hard work and 90% delusion. — Tina Fey",

"The elevator to success is out of order. You’ll have to use the stairs, one step at a time. — Joe Girard",

"I didn’t fail the test. I just found 100 ways to do it wrong. — Benjamin Franklin",

"Age is of no importance unless you’re a cheese. — Billie Burke",

"A diamond is merely a lump of coal that did well under pressure. — Anonymous",

"Nothing is impossible, the word itself says ‘I’m possible!’ — Audrey Hepburn",

"If you’re going through hell, keep going. — Winston Churchill",

"Hard work never killed anybody, but why take a chance? — Edgar Bergen",

"I am so clever that sometimes I don’t understand a single word of what I am saying. — Oscar Wilde",

"Be happy – it drives people crazy. — Anonymous",

"Don’t worry about the world coming to an end today. It’s already tomorrow in Australia. — Charles Schulz",

"You only live once, but if you do it right, once is enough. — Mae West",

"Well-behaved women seldom make history. — Laurel Thatcher Ulrich"
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
