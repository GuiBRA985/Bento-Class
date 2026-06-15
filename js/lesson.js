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

    // FIX #4: verificação de erro adicionada
    if (wordsResult.error) {
        alert('Erro ao carregar palavras: ' + wordsResult.error.message);
        return;
    }

    const wordsList = document.getElementById('words');
    wordsList.innerHTML = '';

    wordsResult.data.forEach(word => {

        const li = document.createElement('li');

        const speakButton = document.createElement('button');
        speakButton.textContent = '🔊';
        speakButton.onclick = function() {
            speakWord(word.word);
        };

        const practiceButton = document.createElement('button');
        practiceButton.textContent = '🎤';
        practiceButton.onclick = function() {
            practiceWord(word.word);
        };

        const result = document.createElement('span');

        // FIX #2: normalizar o ID igual ao que é usado no getElementById
        result.id = 'result-' + word.word.toLowerCase().replace(/[.,!?'"]/g, '').trim();

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

    // FIX #4: verificação de erro adicionada
    if (sentencesResult.error) {
        alert('Erro ao carregar sentenças: ' + sentencesResult.error.message);
        return;
    }

    const sentencesDiv = document.getElementById('sentences');
    sentencesDiv.innerHTML = '';

    sentencesResult.data.forEach(sentence => {

        const div = document.createElement('div');

        const p = document.createElement('p');
        p.textContent = sentence.sentence;

        // FIX #3: substituído innerHTML com onclick inline por addEventListener
        const btn = document.createElement('button');
        btn.textContent = '🎤 Praticar frase';
        btn.addEventListener('click', () => practiceSentence(sentence.sentence));

        const hr = document.createElement('hr');

        div.append(p, btn, hr);
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

// PRATICAR PALAVRA

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

        // FIX #1: removido bloco morto fora do escopo (score/spoken/result inexistentes)
        if (spoken === expected) {
            result.textContent = '✅ Correto!';
        } else {
            result.textContent = '❌ Incorreto. Você disse: ' + spoken;
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


};

recognition.start();

}

window.uploadPhoto = async function() {

const file =
document.getElementById('photoInput')
.files[0];

if (!file) {

alert(
    'Tire uma foto primeiro.'
);

return;

}

alert(
'Foto selecionada: ' +
file.name
);

}

console.log("CHEGUEI NO FINAL DO ARQUIVO");

loadLesson();
