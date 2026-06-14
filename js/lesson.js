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
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 5;

recognition.onresult = function(event) {
    const spoken = event.results[0][0]
        .transcript
        .toLowerCase()
        .replace(/[.,!?'"]/g, '')
        .trim();

    const expected = expectedWord
        .toLowerCase()
        .replace(/[.,!?'"]/g, '')
        .trim();

    const result = document.getElementById('result-' + expected);

    // comparação
    if (spoken === expected) {
        result.textContent = '✅ Correto!';
    } else {
        result.textContent = '❌ Incorreto. Você disse: ' + spoken;
    }
};
    
if (score >= 0.80) {

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
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {

    const spoken =
        event.results[0][0]
        .transcript
        .toLowerCase()
        .replace(/[.,!?']/g, '')
        .trim();

    const expected =
        expectedSentence
        .toLowerCase()
        .replace(/[.,!?']/g, '')
        .trim();

    const spokenWords =
        spoken.split(' ');

    const expectedWords =
        expected.split(' ');

    const matches =
        spokenWords.filter(
            word =>
                expectedWords.includes(word)
        ).length;

    const score =
        Math.round(
            (matches /
             expectedWords.length) * 100
        );

    if (score >= 90) {

        alert(
            '✅ Excelente! (' +
            score +
            '%)'
        );

    } else if (score >= 75) {

        alert(
            '🟡 Muito bom! (' +
            score +
            '%)'
        );

    } else if (score >= 60) {

        alert(
            '🟡 Quase lá! (' +
            score +
            '%)'
        );

    } else {

        alert(
            '❌ Vamos tentar novamente.\n\n' +
            'Pontuação: ' +
            score +
            '%'
        );

    }

};

recognition.start();

}

loadLesson();
