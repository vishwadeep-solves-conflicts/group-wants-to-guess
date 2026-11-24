import type { ReactNode } from "react";

/** Round title, the rules in one line, and a counter or action on the right. */
export default function RoundHeader({ kicker, rules, right }: { kicker: string; rules: ReactNode; right?: ReactNode }) {
  return (
    <div className="row">
      <div>
        <div className="kicker">{kicker}</div>
        <p className="sub">{rules}</p>
      </div>
      <div className="spacer" />
      {right}
    </div>
  );
}
