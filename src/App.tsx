import { useEffect, useRef, useState } from "react";
import AppBar from "./shared/AppBar";
import GameHeader from "./components/GameHeader";
import Scoreboard from "./components/Scoreboard";
import TileModal from "./components/TileModal";
import TimerBadge from "./components/TimerBadge";
import Toast from "./components/Toast";
import Home from "./views/Home";
import RoundWeird from "./views/RoundWeird";
import RoundBoard, { tileId } from "./views/RoundBoard";
import RoundChat from "./views/RoundChat";
import FinalWhoAmI from "./views/FinalWhoAmI";
import EditGame from "./views/EditGame";
import { STEPPED_VIEWS, type View } from "./views";
import { useGame } from "./hooks/useGame";
import { useTimer } from "./hooks/useTimer";
import { useToast } from "./hooks/useToast";
import { sfx } from "./lib/sound";

type Stepper = { index: number; show: boolean };
const START: Stepper = { index: 0, show: false };

export default function App() {
  const api = useGame();
  const { game } = api;
  const { timer, startTimer, stopTimer } = useTimer();
  const { message, toast } = useToast();

  const [view, setView] = useState<View>("home");
  const [r1, setR1] = useState<Stepper>(START);
  const [r3, setR3] = useState<Stepper>(START);
  const [fin, setFin] = useState<Stepper>(START);
  const [tile, setTile] = useState<{ ci: number; r: number; show: boolean } | null>(null);
  const [showScores, setShowScores] = useState(true);
  // bumped to rebuild the editor's text boxes after a save or restore
  const [editVersion, setEditVersion] = useState(0);

  const lengths = { r1: game.data.weird.length, r3: game.data.chat.length, final: game.data.whoami.length };
  const clamp = (s: Stepper, len: number) => ({ ...s, index: Math.max(0, Math.min(s.index, len - 1)) });

  const go = (v: View) => {
    setView(v);
    setTile(null);
    window.scrollTo(0, 0);
  };

  const step = (which: View, d: number) => {
    const move = (len: number) => (s: Stepper) => ({ index: (clamp(s, len).index + d + len) % len, show: false });
    if (which === "r1") setR1(move(lengths.r1));
    if (which === "r3") setR3(move(lengths.r3));
    if (which === "final") setFin(move(lengths.final));
  };

  const reveal = () => {
    if (tile) {
      if (!tile.show) sfx("reveal");
      setTile({ ...tile, show: !tile.show });
      return;
    }
    if (view === "r1") {
      if (!r1.show) sfx("reveal");
      setR1({ ...r1, show: !r1.show });
    } else if (view === "r3") {
      if (!r3.show) sfx("reveal");
      setR3({ ...r3, show: !r3.show });
    } else if (view === "final") {
      setFin({ ...fin, show: !fin.show });
    }
  };

  const addPoints = (player: string, points: number) => {
    api.addPoints(player, points);
    sfx(points > 0 ? "ding" : "buzz");
  };

  // keyboard: Space/Enter reveal, arrows step, Esc closes. The ref keeps the latest handlers.
  const keys = useRef<(e: KeyboardEvent) => void>(() => undefined);
  keys.current = (e) => {
    const target = e.target as HTMLElement;
    if (["TEXTAREA", "INPUT"].includes(target.tagName)) return;
    const stepped = STEPPED_VIEWS.includes(view);
    if (e.key === " " || e.key === "Enter") {
      if (stepped || tile) {
        e.preventDefault();
        reveal();
      }
    } else if (e.key === "ArrowRight" && !tile && stepped) step(view, 1);
    else if (e.key === "ArrowLeft" && !tile && stepped) step(view, -1);
    else if (e.key === "Escape") {
      setTile(null);
      stopTimer();
    }
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => keys.current(e);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const r1c = clamp(r1, lengths.r1);
  const r3c = clamp(r3, lengths.r3);
  const finc = clamp(fin, lengths.final);

  return (
    <div className="app">
      <AppBar title="The Group Wants to Guess" />
      <GameHeader view={view} onGo={go} onTimer={startTimer} onToggleScores={() => setShowScores((s) => !s)} />
      <div className={`wrap ${showScores ? "" : "noscores"}`}>
        <main>
          {view === "home" && <Home onGo={go} />}
          {view === "r1" && (
            <RoundWeird items={game.data.weird} index={r1c.index} show={r1c.show} onStep={(d) => step("r1", d)} onReveal={reveal} onTimer={startTimer} />
          )}
          {view === "r2" && (
            <RoundBoard board={game.data.board} used={game.used} onOpen={(ci, r) => setTile({ ci, r, show: false })} onReset={api.resetBoard} />
          )}
          {view === "r3" && <RoundChat items={game.data.chat} index={r3c.index} show={r3c.show} onStep={(d) => step("r3", d)} onReveal={reveal} />}
          {view === "final" && (
            <FinalWhoAmI
              names={game.data.whoami}
              index={finc.index}
              show={finc.show}
              onStep={(d) => step("final", d)}
              onReveal={reveal}
              onTimer={startTimer}
              onShuffle={() => {
                api.shuffleWhoAmI();
                setFin(START);
                toast("Shuffled");
              }}
            />
          )}
          {view === "edit" && (
            <EditGame
              key={editVersion}
              data={game.data}
              onSave={(data) => {
                api.replaceData(data);
                setEditVersion((v) => v + 1);
                toast("Saved ✓");
              }}
              onResetScores={() => {
                api.resetScores();
                toast("Scores reset");
              }}
              onRestoreDefaults={() => {
                api.restoreDefaults();
                setEditVersion((v) => v + 1);
                toast("Default questions restored");
              }}
            />
          )}
        </main>
        {showScores && <Scoreboard game={game} onAdd={addPoints} onUndo={api.undo} />}
      </div>

      {tile && game.data.board[tile.ci]?.qs[tile.r] && (
        <TileModal
          category={game.data.board[tile.ci]}
          row={tile.r}
          show={tile.show}
          onReveal={reveal}
          onTimer={startTimer}
          onClose={() => setTile(null)}
          onDone={() => {
            api.markTileUsed(tileId(tile.ci, tile.r));
            setTile(null);
          }}
        />
      )}
      <TimerBadge timer={timer} onStop={stopTimer} />
      <Toast message={message} />
    </div>
  );
}
