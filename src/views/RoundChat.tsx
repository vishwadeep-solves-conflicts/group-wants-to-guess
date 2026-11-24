import EmptyRound from "../components/EmptyRound";
import RoundHeader from "../components/RoundHeader";
import StepControls from "../components/StepControls";
import { DEFAULTS, type QA } from "../data/defaults";

type Props = { items: QA[]; index: number; show: boolean; onStep: (d: number) => void; onReveal: () => void };

/** Round 3: guess who sent the message. */
export default function RoundChat({ items, index, show, onStep, onReveal }: Props) {
  if (!items.length) return <EmptyRound name="Round 3" />;
  const item = items[index];
  const isSample = JSON.stringify(items) === JSON.stringify(DEFAULTS.chat);
  return (
    <>
      <RoundHeader
        kicker="Round 3 · Group Chat Forensics"
        rules="Buzz in with who sent it (+10). Funniest guess at the backstory gets +20."
        right={<div className="counter">{index + 1} / {items.length}</div>}
      />
      {isSample && (
        <div className="note">
          These are sample messages. Before the game, open <b>✏️ Edit</b> and paste real messages from your group chat with
          the sender's name. Get a quick OK from everyone before using anything too embarrassing.
        </div>
      )}
      <div className="stagecard">
        <div className="phone">
          <div className="bubble">{item.q}</div>
          {show ? (
            <div className="sender">— {item.a}</div>
          ) : (
            <div className="hidden-ans" style={{ textAlign: "center" }}>
              Who sent this? Press <kbd>Space</kbd> to reveal
            </div>
          )}
        </div>
      </div>
      <StepControls onStep={onStep}>
        <button className="primary" onClick={onReveal}>
          {show ? "Hide" : "Reveal"} sender
        </button>
      </StepControls>
    </>
  );
}
