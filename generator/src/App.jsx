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
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px"
        }}
      >
        <h2>Current Lesson</h2>

        <p>
          <strong>Group:</strong>{" "}
          {group}
        </p>

        <p>
          <strong>Subgroup:</strong>{" "}
          {sub}
        </p>
      </div>
    </div>
  );
}
