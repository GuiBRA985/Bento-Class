const params =
new URLSearchParams(window.location.search);

const lessonId = 1;
async function loadLesson() {

    const { data: lesson } =
    await supabaseClient
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

    document.getElementById('title')
        .textContent =
        `Lesson ${lesson.lesson_number}`;

    const { data: words } =
    await supabaseClient
    .from('words')
    .select('*')
    .eq('lesson_id', lessonId);

    const wordList =
    document.getElementById('words');

    words.forEach(word => {

        const li =
        document.createElement('li');

        li.textContent = word.word;

        wordList.appendChild(li);
    });

    const { data: sentences } =
    await supabaseClient
    .from('sentences')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sentence_order');

    const sentenceDiv =
    document.getElementById('sentences');

    sentences.forEach(sentence => {

        const p =
        document.createElement('p');

        p.textContent =
        sentence.sentence;

        sentenceDiv.appendChild(p);
    });
}

loadLesson();
