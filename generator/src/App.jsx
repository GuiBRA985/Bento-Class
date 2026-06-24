import { lessonTemplates }
  from "./data/lessonTemplates";
import { useState, useEffect } from "react";
import { TAXONOMY } from "./data/taxonomy";

function speak(text) {
  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";
  utterance.rate = 0.8;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
function spellWord(word) {
  const letters =
    word.toUpperCase().split("");

  speechSynthesis.cancel();

  letters.forEach((letter, index) => {
    setTimeout(() => {
      const utterance =
        new SpeechSynthesisUtterance(
          letter
        );

      utterance.lang = "en-US";
      utterance.rate = 0.5;

      speechSynthesis.speak(
        utterance
      );
    }, index * 1200);
  });
}

function startRecording(
  expectedWord,
  completedWords,
  setCompletedWords
) {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Speech recognition is not supported on this device."
    );
    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (
    event
  ) => {

    const spoken =
      event.results[0][0]
        .transcript
        .trim()
        .toLowerCase();

    const expected =
      expectedWord
        .trim()
        .toLowerCase();

    if (
      spoken === expected
    ) {

      setCompletedWords(prev => {

  if (
    prev.includes(
      expectedWord
    )
  ) {
    return prev;
  }

  return [
    ...prev,
    expectedWord
  ];
});

      alert(
        `✅ Great!\n\nYou said: ${spoken}`
      );

    } else {

      alert(
        `❌ Try again.\n\nExpected: ${expected}\nYou said: ${spoken}`
      );

    }
  };

  recognition.onerror =
    () => {
      alert(
        "Could not recognize speech."
      );
    };
}

export default function App() {
  const [studentProgress,
  setStudentProgress
] = useState(() => {

  const saved =
    localStorage.getItem(
      "studentProgress"
    );

  return saved
    ? JSON.parse(saved)
    : {};
});

useEffect(() => {
  localStorage.setItem(
    "studentProgress",
    JSON.stringify(
      studentProgress
    )
  );
}, [studentProgress]);

  function saveProgress(
  lessonKey,
  data
) {
  setStudentProgress(prev => ({
    ...prev,

    [lessonKey]: {
      ...prev[lessonKey],
      ...data
    }
  }));
}

  const [
    completedWords,
    setCompletedWords
  ] = useState([]);

  const [
  completedSentences,
  setCompletedSentences
] = useState([]);

const [
  handwritingUploaded,
  setHandwritingUploaded
] = useState(false);

  const params =
    new URLSearchParams(
      window.location.search
    );

  const urlGroup = params.get("group");
  const urlSub = params.get("sub");

  const initialGroup =
    TAXONOMY.find(
      t => t.group === urlGroup
    )?.group ||
    TAXONOMY[0].group;

  const initialSub =
    TAXONOMY
      .find(
        t => t.group === initialGroup
      )
      ?.subgroups
      .find(
        s => s.sub === urlSub
      )
      ?.sub ||
    TAXONOMY[0]
      .subgroups[0]
      .sub;

  const [group] =
    useState(initialGroup);

  const [sub] =
    useState(initialSub);
  const [pattern, setPattern] =
  useState("");
  const [lesson, setLesson] =
  useState(null);

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <h1>Bento Generator 🚀</h1>

<div
  style={{
    marginTop: 30,
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 12
  }}
>
  <h2>Current Lesson</h2>

  <p>
    <strong>Group:</strong> {group}
  </p>

  <p>
    <strong>Subgroup:</strong> {sub}
  </p>

  <div
    style={{
      marginTop: 20
    }}
  >
    <label>
      Lesson Pattern
    </label>

    <input
      value={pattern}
      onChange={(e) =>
        setPattern(
          e.target.value
        )
      }
      placeholder="Example: CVC"
      style={{
        display: "block",
        width: "100%",
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
        border: "1px solid #ccc"
      }}
    />
  </div>

  <button
  onClick={() => {

    const lessonData =
      lessonTemplates[group]?.[sub];

    if (!lessonData) {
      return;
    }

    setLesson({
      title: `${group} - ${sub}`,
      group,
      sub,
      pattern: lessonData.pattern,
      words: lessonData.words,
      sentences: lessonData.sentences
    });

    const lessonKey =
      `${group}-${sub}`;

    const savedLesson =
      studentProgress?.[
        lessonKey
      ];

    if (!savedLesson) {

      saveProgress(
        lessonKey,
        {
          startedAt:
            new Date()
              .toISOString(),

          completed: false,

          words: [],

          sentences: [],

          handwriting: false
        }
      );

    } else {

      setCompletedWords(
        savedLesson.words || []
      );

      setCompletedSentences(
        savedLesson.sentences || []
      );

      setHandwritingUploaded(
        savedLesson.handwriting ||
          false
      );
 }}}
    >
  Generate Lesson
</button>
    
  lesson && (

    <div
      style={{
        marginTop: 30,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 12
      }}
    >

      <h2>
        {lesson.title}
      </h2>

      <p>
        <strong>
          Pattern:
        </strong>{" "}
        {lesson.pattern}
      </p>
      <div
  style={{
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    background: "#fafafa"
  }}
>

  <h3>
    Words Progress
  </h3>

  <p>
    {completedWords.length}
    /
    {lesson.words.length}
  </p>

  <progress
    value={completedWords.length}
    max={lesson.words.length}
    style={{
      width: "100%",
      height: 20
    }}
  />
</div>
      <h3>Study Words</h3>

{lesson.words.map(word => (

  <div
    key={word.text}
    style={{
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12
    }}
  >

    <h4>
{
  completedWords.includes(
    word.text
  )
    ? "✅ " + word.text
    : word.text
}
</h4>

    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }}
    >
      <button
  onClick={() =>
    speak(word.text)
  }
>
  ▶ Hear
</button>

<button
  onClick={() =>
    spellWord(word.text)
  }
>
  🔤 Spell
</button>
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
<div
  style={{
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    background: "#fafafa"
  }}
>

  <h3>
    ✍️ Handwriting Practice
  </h3>

  <p>
    Write all sentences on paper.
    When you finish, take ONE picture
    containing all sentences.
  </p>

  <button>
    📷 Upload Handwriting
  </button>

</div>
      <h3>🎙 Sentence Speaking Practice</h3>

{lesson.sentences.map(sentence => (

  <div
    key={sentence.text}
    style={{
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12
    }}
  >

    <p>{sentence.text}</p>

    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }}
    >
      <button>🎙 Record Sentence</button>
    </div>

  </div>

))}

    </div>

  )
}
  
  {
  lesson && (
    <div
      style={{
        marginTop: 30,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fafafa"
      }}
    >
      <h3>
        Generated Lesson
      </h3>

      <p>
        <strong>Group:</strong>{" "}
        {lesson.group}
      </p>

      <p>
        <strong>Subgroup:</strong>{" "}
        {lesson.sub}
      </p>

      <p>
        <strong>Pattern:</strong>{" "}
        {lesson.pattern}
      </p>
    </div>
  )
  }
</div>
      </div>
  );
}
