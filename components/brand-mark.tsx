// The mark is the site's idea in miniature: one loose thread inside a
// ring that pulls straight when you hover the wordmark.
export default function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        className="brand__thread"
        d="M4 13 C 8 5, 10 21, 13 13 S 18 5, 22 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="22" cy="13" r="1.8" fill="var(--signal)" />
    </svg>
  );
}
