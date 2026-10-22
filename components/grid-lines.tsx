export default function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
