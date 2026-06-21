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
  style={{
    marginTop: 20,
    padding: "12px 20px",
    border: "none",
    borderRadius: 8,
    background: "#2848ff",
    color: "#fff",
    cursor: "pointer"
  }}
>
  Generate Lesson
</button>
</div>
      </div>
    </div>
  );
}
