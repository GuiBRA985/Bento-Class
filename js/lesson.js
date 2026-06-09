const params = new URLSearchParams(window.location.search);

const lessonId = Number(params.get('id'));

console.log("ID DA URL:", lessonId);
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
    console.log("LESSON ID:", lessonId);
    console.log("WORDS:", words);
    
    alert(
  "Lição: " + lessonId +
  "\nPalavras encontradas: " + (words ? words.length : 0)
);

    const wordList =
document.getElementById('words');

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

    console.log("SENTENCES:", sentences);
    console.log("SENTENCES ERROR:", sentencesError);

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
