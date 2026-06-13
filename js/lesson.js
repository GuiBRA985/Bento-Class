const params = new URLSearchParams(window.location.search);
const lessonId = parseInt(params.get('id'));

async function loadLesson() {

const lessonResult = await supabaseClient
    .from('lessons')
    .select('*')
    .eq('id', lessonId);

if (lessonResult.error) {
    alert(lessonResult.error.message);
    return;
}

if (lessonResult.data.length === 0) {
    alert('Lição não encontrada');
    return;
}

const lesson = lessonResult.data[0];

document.getElementById('title').textContent = lesson.title;

const wordsResult = await supabaseClient
    .from('words')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('word_order');

const wordsList = document.getElementById('words');
wordsList.innerHTML = '';

wordsResult.data.forEach(word => {

    const li = document.createElement('li');

    li.innerHTML =
word.word +
' <button onclick="speakWord(\'' + word.word + '\')">🔊</button>' +
' <button onclick="practiceWord(\'' + word.word + '\')">🎤</button>' +
' <span id="result-' + word.word + '"></span>';

    wordsList.appendChild(li);

});

const sentencesResult = await supabaseClient
    .from('sentences')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sentence_order');

const sentencesDiv = document.getElementById('sentences');
sentencesDiv.innerHTML = '';

sentencesResult.data.forEach(sentence => {

    const p = document.createElement('p');

    p.textContent = sentence.sentence;

    sentencesDiv.appendChild(p);

});

}

function speakWord(word) {

const utterance = new SpeechSynthesisUtterance(word);

utterance.lang = 'en-US';
utterance.rate = 0.8;

speechSynthesis.speak(utterance);

}

loadLesson();
