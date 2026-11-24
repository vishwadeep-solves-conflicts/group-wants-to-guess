import { DEFAULTS, clone, type GameData } from "../data/defaults";

export type Game = {
  data: GameData;
  /** Points by player name. */
  scores: Record<string, number>;
  /** Board tiles already played, as "category-row". */
  used: string[];
  /** Score changes, newest last, for undo. */
  history: [string, number][];
};

// Same key as the single-file version, so saved games carry over.
const KEY = "gwtg-v1";

export function loadGame(): Game {
  const game: Game = { data: clone(DEFAULTS), scores: {}, used: [], history: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) Object.assign(game, JSON.parse(raw));
  } catch {
    // storage blocked or corrupt: start fresh
  }
  return game;
}

export function saveGame(g: Game) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ data: g.data, scores: g.scores, used: g.used, history: g.history.slice(-60) }));
  } catch {
    // storage blocked
  }
}
