import type { View } from ".";

const ROUNDS: { view: View; kicker: string; title: string; desc: string }[] = [
  { view: "r1", kicker: "ROUND 1", title: "Weird But True", desc: "Fill in the blank. Everyone writes an answer, then reveal. Real answer +10, best fake +20." },
  { view: "r2", kicker: "ROUND 2", title: "Pick Me Behaviour", desc: "Pick a category and a value. Every category is a trap, so it's never about what it sounds like." },
  { view: "r3", kicker: "ROUND 3", title: "Group Chat Forensics", desc: "Real messages from your chat. Buzz in with who sent it. Funniest made-up backstory +20." },
  { view: "final", kicker: "FINAL · DOUBLE POINTS", title: "Who Am I?", desc: "Blindfolded, 60 seconds of yes/no questions. Everyone else may lie once. Catch the lie +10." },
];

const POINTS = [
  { n: "+10", label: "Correct answer", color: "var(--gold)" },
  { n: "+20", label: "Funniest answer (host decides)", color: "var(--pink)" },
  { n: "−5", label: 'Boring answer or "pass"', color: "var(--minus)" },
  { n: "+40", label: "Correct guess in the final", color: "var(--cyan)" },
];

export default function Home({ onGo }: { onGo: (v: View) => void }) {
  return (
    <>
      <div className="kicker">The home edition</div>
      <h1 className="hero display">
        The Group
        <br />
        Wants to <em>Guess</em>
        <b>.</b>
      </h1>
      <p className="sub">The most unserious living-room quiz. Being funny is worth more than being right.</p>
      <div className="pts">
        {POINTS.map((p) => (
          <div className="pt" key={p.n}>
            <div className="n" style={{ color: p.color }}>
              {p.n}
            </div>
            <div className="l">{p.label}</div>
          </div>
        ))}
      </div>
      <div className="rounds">
        {ROUNDS.map((r) => (
          <button className="rnd" key={r.view} onClick={() => onGo(r.view)}>
            <div className="k">{r.kicker}</div>
            <div className="t">{r.title}</div>
            <div className="d">{r.desc}</div>
          </button>
        ))}
      </div>
      <p className="hint" style={{ marginTop: 22 }}>
        Host tips: click <b>✏️ Edit</b> to add player names and your own questions. Keys: <kbd>Space</kbd> reveal ·{" "}
        <kbd>←</kbd>
        <kbd>→</kbd> prev/next · <kbd>Esc</kbd> close. Buzz in with your own noise; a wrong buzz locks you out of that
        question.
      </p>
    </>
  );
}
