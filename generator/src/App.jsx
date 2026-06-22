import { useState } from "react";
import { lessonTemplates } from "./data/lessonTemplates";
import { TAXONOMY } from "./data/taxonomy";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function spellWord(word) {
  const letters = word.toUpperCase().split("");
  speechSynthesis.cancel();

  letters.forEach((letter, index) => {
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = "en-US";
      utterance.rate = 0.5;
      speechSynthesis.speak(utterance);
    }, index * 1200);
  });
}

function startRecording(expectedWord, completedWords, setCompletedWords) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported on this device.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.trim().toLowerCase();
    const expected = expectedWord.trim().toLowerCase();

    if (spoken === expected) {
      if (!completedWords.includes(expectedWord)) {
        setCompletedWords((prev) => [...prev, expectedWord]);
      }
      alert(`✅ Great!\n\nYou said: ${spoken}`);
    }
  };

  recognition.onerror = () => {
    alert("Could not recognize speech.");
  };
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const urlGroup = params.get("group");
  const urlSub = params.get("sub");

  const initialGroup =
    TAXONOMY.find((t) => t.group === urlGroup)?.group || TAXONOMY[0].group;

  const initialSub =
    TAXONOMY.find((t) => t.group === initialGroup)
      ?.subgroups.find((s) => s.sub === urlSub)?.sub ||
    TAXONOMY[0].subgroups[0].sub;

  const [group] = useState(initialGroup);
  const [sub] = useState(initialSub);
  const [pattern, setPattern] = useState("");
  const [lesson, setLesson] = useState(null);
  const [completedWords, setCompletedWords] = useState([]);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Bento Generator 🚀</h1>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <h2>Current Lesson</h2>

        <p>
          <strong>Group:</strong> {group}
        </p>
        <p>
          <strong>Subgroup:</strong> {sub}
        </p>

        {/* ... resto do seu JSX permanece igual ... */}

        {lesson && (
          <div
            style={{
              marginTop: 30,
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
            }}
          >
            <h2>{lesson.title}</h2>
            <p>
              <strong>Pattern:</strong> {lesson.pattern}
            </p>

            {/* Progress */}
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                background: "#fafafa",
              }}
            >
              <h3>Words Progress</h3>
              <p>
                {completedWords.length} / {lesson.words.length}
              </p>
            </div>

            {/* Words */}
            <h3>Study Words</h3>
            {lesson.words.map((word) => (
              <div
                key={word.text}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <h4>
                  {completedWords.includes(word.text)
                    ? "✅ " + word.text
                    : word.text}
                </h4>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={() => speak(word.text)}>▶ Hear</button>
                  <button onClick={() => spellWord(word.text)}>🔤 Spell</button>
                  <button
                    onClick={() =>
                      startRecording(
                        word.text,
                        completedWords,
                        setCompletedWords
                      )
                    }
                  >
                    🎙 Record
                  </button>
                </div>
              </div>
            ))}

            {/* Handwriting e Sentences mantidos iguais */}
            {/* ... (copie o resto do seu JSX aqui) ... */}
          </div>
        )}
      </div>
    </div>
  );
            }
