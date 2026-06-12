const params = new URLSearchParams(window.location.search);

const lessonId = Number(params.get('id'));

async function loadLesson() {

const { data: lesson, error: lessonError } =
    await supabaseClient
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

if (lessonError) {
    alert(lessonError.message);
    return;
}

document.getElementById('title').textContent =
    `Lesson ${lesson.lesson_number}`;

const { data: words, error: wordsError } =
    await supabaseClient
    .from('words')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('word_order');

if (wordsError) {
    alert(wordsError.message);
    return;
}

const wordList = document.getElementById('words');
wordList.innerHTML = '';

words.forEach(word => {
    wordList.innerHTML += `
        <li>${word.word}</li>
    `;
});

const { data: sentences, error: sentencesError } =
    await supabaseClient
    .from('sentences')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sentence_order');

if (sentencesError) {
    alert(sentencesError.message);
    return;
}

const sentenceDiv = document.getElementById('sentences');
sentenceDiv.innerHTML = '';

sentences.forEach(sentence => {
    sentenceDiv.innerHTML += `
        <p>${sentence.sentence}</p>
    `;
});

}

loadLesson();
