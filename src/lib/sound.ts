// Sound effects made with the Web Audio API, so there are no audio files to load.

export type Sfx = "ding" | "buzz" | "reveal" | "tick";

let ctx: AudioContext | null = null;

function tone(f: number, t0: number, d: number, type: OscillatorType = "sine", g = 0.18) {
  const c = ctx!;
  const o = c.createOscillator();
  const v = c.createGain();
  o.type = type;
  o.frequency.value = f;
  v.gain.setValueAtTime(g, c.currentTime + t0);
  v.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + d);
  o.connect(v).connect(c.destination);
  o.start(c.currentTime + t0);
  o.stop(c.currentTime + t0 + d + 0.02);
}

export function sfx(kind: Sfx) {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx || new AC();
    if (ctx.state === "suspended") void ctx.resume();
    if (kind === "ding") {
      tone(880, 0, 0.18);
      tone(1320, 0.12, 0.3);
    } else if (kind === "buzz") {
      tone(110, 0, 0.55, "sawtooth", 0.15);
      tone(116, 0, 0.55, "square", 0.06);
    } else if (kind === "reveal") {
      tone(523, 0, 0.12, "triangle");
      tone(659, 0.09, 0.12, "triangle");
      tone(784, 0.18, 0.25, "triangle");
    } else if (kind === "tick") {
      tone(1000, 0, 0.05, "square", 0.05);
    }
  } catch {
    // no audio available
  }
}
