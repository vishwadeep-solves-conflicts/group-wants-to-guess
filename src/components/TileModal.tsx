import QuestionText from "./QuestionText";
import type { Category } from "../data/defaults";

type Props = {
  category: Category;
  row: number;
  show: boolean;
  onReveal: () => void;
  onDone: () => void;
  onClose: () => void;
  onTimer: (seconds: number) => void;
};

/** A Round 2 board question, full screen. */
export default function TileModal({ category, row, show, onReveal, onDone, onClose, onTimer }: Props) {
  const q = category.qs[row];
  return (
    <div className="modal on" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="box">
        <div className="row" style={{ justifyContent: "center", gap: 14 }}>
          <span className="cat" style={{ minHeight: 0, padding: "8px 18px" }}>
            {category.cat}
          </span>
          <span className="display" style={{ fontSize: 34, color: "var(--gold)" }}>
            {(row + 1) * 10}
          </span>
        </div>
        <QuestionText text={q.q} style={{ margin: "34px auto 0" }} />
        {show ? (
          <>
            <div className="answer">{q.a}</div>
            {category.hint && <div className="twist">The twist: {category.hint}</div>}
          </>
        ) : (
          <div className="hidden-ans" style={{ display: "inline-block" }}>
            Press <kbd>Space</kbd> to reveal
          </div>
        )}
        <div className="row" style={{ justifyContent: "center", marginTop: 34 }}>
          <button onClick={() => onTimer(30)}>⏱ 30s</button>
          <button className="primary" onClick={onReveal}>
            {show ? "Hide" : "Reveal"} answer
          </button>
          <button className="pink" onClick={onDone}>
            Done ✓
          </button>
          <button className="ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
