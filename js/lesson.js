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

div.innerHTML = `
    <p>${sentence.sentence}</p>

    <button
        onclick="practiceSentence(
            '${sentence.sentence}'
        )">
        🎤 Praticar frase
    </button>

    <span
        id="sentence-result-${sentence.id}">
    </span>

    <hr>
`;

sentencesDiv.appendChild(div);

});

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

recognition.onresult = function(event) {

    const spoken =
        event.results[0][0].transcript
        .trim()
        .toLowerCase();

    const expected =
        expectedWord.toLowerCase();

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

function practiceSentence(expectedSentence) {

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    alert(
        'Reconhecimento de voz não suportado.'
    );

    return;
}

const recognition =
    new SpeechRecognition();

recognition.lang = 'en-US';

recognition.start();

recognition.onresult =
    function(event) {

    const spoken =
        event.results[0][0]
        .transcript
        .trim()
        .toLowerCase();

    const expected =
        expectedSentence
        .toLowerCase();

    if (spoken === expected) {

        alert(
            '✅ Excelente!'
        );

    } else {

        alert(
            '❌ Você disse:\n\n' +
            spoken +
            '\n\nEsperado:\n\n' +
            expectedSentence
        );

    }

};

}

loadLesson();
