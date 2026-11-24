import EmptyRound from "../components/EmptyRound";
import QuestionText from "../components/QuestionText";
import RoundHeader from "../components/RoundHeader";
import StepControls from "../components/StepControls";
import type { QA } from "../data/defaults";

type Props = { items: QA[]; index: number; show: boolean; onStep: (d: number) => void; onReveal: () => void; onTimer: (s: number) => void };

/** Round 1: fill in the blank. */
export default function RoundWeird({ items, index, show, onStep, onReveal, onTimer }: Props) {
  if (!items.length) return <EmptyRound name="Round 1" />;
  const item = items[index];
  return (
    <>
      <RoundHeader
        kicker="Round 1 · Weird But True"
        rules="Everyone writes their answer secretly. Real answer +10 · funniest fake +20."
        right={<div className="counter">{index + 1} / {items.length}</div>}
      />
      <div className="stagecard">
        <QuestionText text={item.q} />
        {show ? (
          <div className="answer">{item.a}</div>
        ) : (
          <div className="hidden-ans">
            Answer hidden. Press <kbd>Space</kbd> to reveal
          </div>
        )}
      </div>
      <StepControls onStep={onStep}>
        <button onClick={() => onTimer(30)}>⏱ 30s to write</button>
        <button className="primary" onClick={onReveal}>
          {show ? "Hide" : "Reveal"} answer
        </button>
      </StepControls>
    </>
  );
}
