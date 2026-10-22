// Numbered section label, like a sheet number on a technical drawing.
export default function SectionHead({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className={`sh mono rv ${dark ? "sh--dark" : ""}`}>
      <b>{n}</b>
      <i aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
