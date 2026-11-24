import { VIEWS, type View } from "../views";
import { sfx } from "../lib/sound";

type Props = {
  view: View;
  onGo: (v: View) => void;
  onTimer: (seconds: number) => void;
  onToggleScores: () => void;
};

function toggleFullscreen() {
  try {
    if (document.fullscreenElement) void document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => undefined);
  } catch {
    // fullscreen not allowed
  }
}

/** Logo, round navigation and the host's toolbar. */
export default function GameHeader({ view, onGo, onTimer, onToggleScores }: Props) {
  return (
    <header className="game-header">
      <div className="logo">
        THE GROUP WANTS
        <br />
        <span>TO GUESS</span>
      </div>
      <nav>
        {VIEWS.map(([key, label]) => (
          <button key={key} className={view === key ? "on" : ""} onClick={() => onGo(key)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="tools">
        <button onClick={() => onTimer(30)} title="30 second timer">⏱ 30s</button>
        <button onClick={() => onTimer(60)} title="60 second timer">⏱ 60s</button>
        <button onClick={() => sfx("ding")} title="Correct sound">✅ Ding</button>
        <button onClick={() => sfx("buzz")} title="Wrong sound">❌ Buzz</button>
        <button onClick={onToggleScores} title="Show or hide the scoreboard">🏆 Scores</button>
        <button onClick={toggleFullscreen} title="Fullscreen">⛶</button>
      </div>
    </header>
  );
}
