import type { TimerState } from "../hooks/useTimer";

export default function TimerBadge({ timer, onStop }: { timer: TimerState; onStop: () => void }) {
  if (!timer.visible) return null;
  const cls = ["timer", "on", timer.low && "low", timer.done && "done"].filter(Boolean).join(" ");
  return (
    <div className={cls} onClick={onStop} title="Click to stop">
      {timer.done ? "TIME!" : timer.left}
    </div>
  );
}
