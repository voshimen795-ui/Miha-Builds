// A row (or column) of numbered nodes on one line. Nodes light up in order
// when the parent is hovered or marked active; pure CSS, no JS loop.
export default function FlowLine({ steps, vertical = false }: { steps: string[]; vertical?: boolean }) {
  return (
    <ol className={`flow ${vertical ? "flow--v" : ""}`}>
      {steps.map((s, i) => (
        <li key={s} style={{ ["--i" as string]: i }}>
          <i aria-hidden="true" />
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}
