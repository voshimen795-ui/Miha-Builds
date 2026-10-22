"use client";

// Digits roll like a mechanical counter. Separators stay put; each digit is
// a column of 0-9 translated to its value.
export default function Odometer({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`odo ${className}`} aria-label={value}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span className="odo__col" key={`${value.length}-${i}`} aria-hidden="true">
            <span className="odo__strip" style={{ transform: `translateY(${-Number(ch) * 10}%)` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span className="odo__sep" key={`${value.length}-${i}`} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
