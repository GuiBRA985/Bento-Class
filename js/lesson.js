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

document.getElementById('title').textContent = lesson.title;

// WORDS

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

// SENTENCES

const sentencesResult = await supabaseClient
    .from('sentences')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sentence_order');

const sentencesDiv = document.getElementById('sentences');
sentencesResult.data.forEach(sentence => {

const div = document.createElement('div');

div.className = 'sentence-card';

div.innerHTML = `
    <p>${sentence.sentence}</p>

    <button onclick="practiceSentence(${sentence.id}, '${sentence.sentence.replace(/'/g, "\\'")}')">
        🎤 Validar frase
    </button>

    <span id="sentence-result-${sentence.id}"></span>

    <hr>
`;

sentencesDiv.appendChild(div);

});
}

// OUVIR PALAVRA

function speakWord(word) {

const utterance = new SpeechSynthesisUtterance(word);

utterance.lang = 'en-US';
utterance.rate = 0.8;

speechSynthesis.speak(utterance);

}

// PRATICAR PRONÚNCIA

function practiceWord(expectedWord) {

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('Reconhecimento de voz não suportado.');
    return;
}

const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 5;
console.log(event.results[0]);

recognition.onresult = function(event) {

    const spoken =
    event.results[0][0]
    .transcript
    .toLowerCase()
    .replace(/[.,!?']/g, '')
    .trim();

    const expected =
    expectedWord
    .toLowerCase()
    .replace(/[.,!?']/g, '')
    .trim();

    const result =
        document.getElementById(
            'result-' + expectedWord
        );

    if (spoken === expected) {

        result.innerHTML =
            ' ✅ Correto';

    } else {

        result.innerHTML =
            ' ❌ Você disse: ' + spoken;

    }

};

recognition.start();

}

async function practiceSentence(sentenceId, expectedSentence) {

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert('Reconhecimento de voz não suportado.');
    return;
}

const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = async function(event) {

    const spoken =
        event.results[0][0].transcript.trim();

    const result =
        document.getElementById(
            'sentence-result-' + sentenceId
        );

    result.innerHTML =
        `<br>Esperado: ${expectedSentence}
         <br>Você disse: ${spoken}
         <br>✅ Registrado`;

    const { error } =
        await supabaseClient
            .from('sentence_submissions')
            .insert({
                sentence_id: sentenceId,
                audio_url: spoken
            });

    if (error) {
        console.error(error);
    }

};

recognition.start();

}

loadLesson();
