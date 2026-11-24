import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "../lib/sound";

export type TimerState = { visible: boolean; left: number; low: boolean; done: boolean };

const OFF: TimerState = { visible: false, left: 0, low: false, done: false };

/** A countdown shown at the top of the screen. Ticks in the last 5 seconds, buzzes at zero. */
export function useTimer() {
  const [state, setState] = useState<TimerState>(OFF);
  const interval = useRef<number | null>(null);
  const hideLater = useRef<number | null>(null);

  const clear = () => {
    if (interval.current) window.clearInterval(interval.current);
    if (hideLater.current) window.clearTimeout(hideLater.current);
    interval.current = null;
    hideLater.current = null;
  };

  const stop = useCallback(() => {
    clear();
    setState(OFF);
  }, []);

  const start = useCallback((seconds: number) => {
    clear();
    let left = seconds;
    setState({ visible: true, left, low: left <= 10, done: false });
    interval.current = window.setInterval(() => {
      left--;
      if (left <= 5 && left > 0) sfx("tick");
      if (left <= 0) {
        clear();
        setState({ visible: true, left: 0, low: true, done: true });
        sfx("buzz");
        hideLater.current = window.setTimeout(() => setState(OFF), 2600);
        return;
      }
      setState({ visible: true, left, low: left <= 10, done: false });
    }, 1000);
  }, []);

  useEffect(() => clear, []);

  return { timer: state, startTimer: start, stopTimer: stop };
}
