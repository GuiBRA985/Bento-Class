import { lessonTemplates }
  from "./data/lessonTemplates";
import { useState } from "react";
import { TAXONOMY } from "./data/taxonomy";

export default function App() {
  const params = new URLSearchParams(window.location.search);

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
    title:
      `${group} - ${sub}`,

    group,
    sub,

    pattern:
      lessonData.pattern,

    words:
      lessonData.words,

    sentences:
      lessonData.sentences
  });
}}
>
  Generate Lesson
</button>
{
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

    <h4>{word.text}</h4>

    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }}
    >
      <button>▶ Hear</button>
      <button>🔤 Spell</button>
      <button>🎙 Record</button>
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
