import EmptyRound from "../components/EmptyRound";
import RoundHeader from "../components/RoundHeader";
import StepControls from "../components/StepControls";

type Props = {
  names: string[];
  index: number;
  show: boolean;
  onStep: (d: number) => void;
  onReveal: () => void;
  onTimer: (s: number) => void;
  onShuffle: () => void;
};

/** Final: Who Am I? The name is shown to everyone except the blindfolded guesser. */
export default function FinalWhoAmI({ names, index, show, onStep, onReveal, onTimer, onShuffle }: Props) {
  if (!names.length) return <EmptyRound name="the Final" />;
  return (
    <>
      <RoundHeader
        kicker="Final · Who Am I? · Double points"
        rules="Blindfold the guesser. 60 seconds of yes/no questions. Each opponent may lie once (catch it: +10). Correct guess: +40."
        right={<div className="counter">{index + 1} / {names.length}</div>}
      />
      <div className="stagecard">
        {show ? (
          <>
            <div className="who">{names[index]}</div>
            <p className="sub" style={{ marginTop: 18 }}>
              Make sure the guesser can't see the screen!
            </p>
          </>
        ) : (
          <>
            <div className="who off">? ? ?</div>
            <p className="sub" style={{ marginTop: 18 }}>
              Blindfold on? Press <kbd>Space</kbd> to show the name to everyone else.
            </p>
          </>
        )}
      </div>
      <StepControls onStep={onStep}>
        <button className="primary" onClick={onReveal}>
          {show ? "Hide" : "Show"} name
        </button>
        <button className="pink" onClick={() => onTimer(60)}>
          ⏱ Start 60s
        </button>
        <button onClick={onShuffle}>🔀 Shuffle</button>
      </StepControls>
    </>
  );
}
