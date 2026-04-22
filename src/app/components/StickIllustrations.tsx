export function StickFigureWithFlame({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stick figure */}
      <circle cx="60" cy="25" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="60" y1="33" x2="60" y2="65" stroke="currentColor" strokeWidth="2" />
      <line x1="60" y1="45" x2="45" y2="55" stroke="currentColor" strokeWidth="2" />
      <line x1="60" y1="45" x2="75" y2="55" stroke="currentColor" strokeWidth="2" />
      <line x1="60" y1="65" x2="45" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="60" y1="65" x2="75" y2="90" stroke="currentColor" strokeWidth="2" />

      {/* Flame */}
      <path
        d="M70 50 Q 72 45 75 48 Q 77 50 75 53 Q 73 56 70 54 Q 68 52 70 50 Z"
        stroke="#FE5A00"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M72 51 Q 73 49 74 50 Q 74.5 51 73.5 52 Z"
        stroke="#FE5A00"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export function StickFigureReading({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stick figure */}
      <circle cx="50" cy="25" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="50" y1="33" x2="50" y2="65" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="45" x2="35" y2="52" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="45" x2="70" y2="48" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="65" x2="40" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="65" x2="60" y2="90" stroke="currentColor" strokeWidth="2" />

      {/* Document */}
      <rect
        x="65"
        y="40"
        width="35"
        height="45"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line x1="70" y1="48" x2="95" y2="48" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="55" x2="95" y2="55" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="62" x2="90" y2="62" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="69" x2="95" y2="69" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function StickFigureWithClipboard({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stick figure */}
      <circle cx="45" cy="25" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="45" y1="32" x2="45" y2="60" stroke="currentColor" strokeWidth="2" />
      <line x1="45" y1="42" x2="32" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="45" y1="42" x2="60" y2="45" stroke="currentColor" strokeWidth="2" />
      <line x1="45" y1="60" x2="35" y2="80" stroke="currentColor" strokeWidth="2" />
      <line x1="45" y1="60" x2="55" y2="80" stroke="currentColor" strokeWidth="2" />

      {/* Clipboard */}
      <rect
        x="55"
        y="38"
        width="28"
        height="38"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="63"
        y="35"
        width="12"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <line x1="60" y1="46" x2="78" y2="46" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="52" x2="78" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="58" x2="75" y2="58" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function StickFigureWalking({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stick figure in walking pose */}
      <circle cx="50" cy="25" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="50" y1="33" x2="50" y2="65" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="45" x2="38" y2="52" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="45" x2="65" y2="48" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="65" x2="42" y2="92" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="65" x2="58" y2="85" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function StickFigureGroup({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Figure 1 */}
      <circle cx="40" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="40" y1="26" x2="40" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="35" x2="30" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="35" x2="50" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="50" x2="32" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="50" x2="48" y2="70" stroke="currentColor" strokeWidth="1.5" />

      {/* Figure 2 */}
      <circle cx="80" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="80" y1="26" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="35" x2="70" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="35" x2="90" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="50" x2="72" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="50" x2="88" y2="70" stroke="currentColor" strokeWidth="1.5" />

      {/* Figure 3 */}
      <circle cx="120" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="120" y1="26" x2="120" y2="50" stroke="currentColor" strokeWidth="1.5" />
      <line x1="120" y1="35" x2="110" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="120" y1="35" x2="130" y2="42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="120" y1="50" x2="112" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="120" y1="50" x2="128" y2="70" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
