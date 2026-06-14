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

// WORDS

const wordsResult = await supabaseClient
    .from('words')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('word_order');

const wordsList =
    document.getElementById('words');

wordsList.innerHTML = '';

wordsResult.data.forEach(word => {

    const li =
document.createElement('li');

const speakButton =
document.createElement('button');

speakButton.textContent = '🔊';

speakButton.onclick = function() {
speakWord(word.word);
};

const practiceButton =
document.createElement('button');

practiceButton.textContent = '🎤';

practiceButton.onclick = function() {
practiceWord(word.word);
};

const result =
document.createElement('span');

result.id =
'result-' + word.word;

li.append(
document.createTextNode(word.word + ' '),
speakButton,
document.createTextNode(' '),
practiceButton,
document.createTextNode(' '),
result
);

wordsList.appendChild(li);

});

// SENTENCES

const sentencesResult = await supabaseClient
    .from('sentences')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sentence_order');

const sentencesDiv =
    document.getElementById('sentences');

sentencesDiv.innerHTML = '';

sentencesResult.data.forEach(sentence => {

    const div =
        document.createElement('div');

    div.innerHTML = `
        <p>${sentence.sentence}</p>

        <button onclick="practiceSentence('${sentence.sentence}')">
            🎤 Praticar frase
        </button>

        <hr>
    `;

    sentencesDiv.appendChild(div);

});

}

// OUVIR PALAVRA

function speakWord(word) {

const utterance =
    new SpeechSynthesisUtterance(word);

utterance.lang = 'en-US';
utterance.rate = 0.8;

speechSynthesis.speak(utterance);

}

// PRATICAR PALAVRA

function practiceWord(expectedWord) {

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

// PRATICAR SENTENÇA

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

recognition.onresult = function(event) {

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
            '✅ Excelente pronúncia!'
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

recognition.start();

}

loadLesson();
