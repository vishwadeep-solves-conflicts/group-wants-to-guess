import type { ReactNode } from "react";

/** ← Prev on the left, Next → on the right, the round's buttons in the middle. */
export default function StepControls({ onStep, children }: { onStep: (d: number) => void; children: ReactNode }) {
  return (
    <div className="row">
      <button className="ghost" onClick={() => onStep(-1)}>
        ← Prev
      </button>
      <div className="spacer" />
      {children}
      <div className="spacer" />
      <button className="ghost" onClick={() => onStep(1)}>
        Next →
      </button>
    </div>
  );
}
