const params = new URLSearchParams(window.location.search);
const lessonId = parseInt(params.get('id'));

async function loadLesson() {

const lessonResult = await supabaseClient
    .from('lessons')
    .select('*')
    .eq('id', lessonId);

if (lessonResult.error) {
    alert('Erro ao carregar lição: ' + lessonResult.error.message);
    return;
}

if (!lessonResult.data || lessonResult.data.length === 0) {
    alert('Lição não encontrada');
    return;
}

const lesson = lessonResult.data[0];

document.getElementById('title').textContent =
    lesson.title || `Lesson ${lesson.lesson_number}`;

const wordsResult = await supabaseClient
    .from('words')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('word_order');

if (wordsResult.error) {
    alert('Erro ao carregar palavras: ' + wordsResult.error.message);
    return;
}

const wordsList = document.getElementById('words');
wordsList.innerHTML = '';

wordsResult.data.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word.word;
    wordsList.appendChild(li);
});

const sentencesResult = await supabaseClient
    .from('sentences')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sentence_order');

if (sentencesResult.error) {
    alert('Erro ao carregar frases: ' + sentencesResult.error.message);
    return;
}

const sentencesDiv = document.getElementById('sentences');
sentencesDiv.innerHTML = '';

sentencesResult.data.forEach(sentence => {
    const p = document.createElement('p');
    p.textContent = sentence.sentence;
    sentencesDiv.appendChild(p);
});

}

loadLesson();
