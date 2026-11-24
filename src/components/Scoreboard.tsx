import { useRef, useState } from "react";
import type { Game } from "../lib/storage";

type Props = { game: Game; onAdd: (player: string, points: number) => void; onUndo: () => void };

const BUTTONS: { points: number; label: string; cls: string }[] = [
  { points: 10, label: "+10", cls: "" },
  { points: 20, label: "+20", cls: "p20" },
  { points: -5, label: "−5", cls: "m5" },
  { points: 40, label: "+40", cls: "p40" },
];

export default function Scoreboard({ game, onAdd, onUndo }: Props) {
  const players = game.data.players;
  const score = (n: string) => game.scores[n] || 0;
  const max = Math.max(...players.map(score));
  const anyPoints = players.some((n) => score(n) !== 0);
  const [bumped, setBumped] = useState<number | null>(null);
  const bumpTimer = useRef<number | null>(null);

  const add = (i: number, points: number) => {
    onAdd(players[i], points);
    setBumped(i);
    if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
    bumpTimer.current = window.setTimeout(() => setBumped(null), 400);
  };

  return (
    <aside>
      <h3>🏆 Scoreboard</h3>
      {players.map((name, i) => {
        const leading = anyPoints && score(name) === max;
        return (
          <div className={`pl ${leading ? "lead" : ""}`} key={`${name}-${i}`}>
            <div className="top">
              <div className="nm">
                {leading ? "👑 " : ""}
                {name}
              </div>
              <div className={`sc ${bumped === i ? "bump" : ""}`}>{score(name)}</div>
            </div>
            <div className="btns">
              {BUTTONS.map((b) => (
                <button key={b.points} className={b.cls} onClick={() => add(i, b.points)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <button className="ghost undo" onClick={onUndo} disabled={!game.history.length} style={game.history.length ? undefined : { opacity: 0.4 }}>
        ↶ Undo last
      </button>
    </aside>
  );
}
