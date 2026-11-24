import { useEffect, useState } from "react";
import { DEFAULTS, clone, type GameData } from "../data/defaults";
import { loadGame, saveGame, type Game } from "../lib/storage";

/** The saved game: questions, scores, used tiles and score history. Saved on every change. */
export function useGame() {
  const [game, setGame] = useState<Game>(loadGame);

  useEffect(() => saveGame(game), [game]);

  return {
    game,
    addPoints: (player: string, points: number) =>
      setGame((g) => ({
        ...g,
        scores: { ...g.scores, [player]: (g.scores[player] || 0) + points },
        history: [...g.history, [player, points]],
      })),
    undo: () =>
      setGame((g) => {
        const last = g.history[g.history.length - 1];
        if (!last) return g;
        const [player, points] = last;
        return { ...g, scores: { ...g.scores, [player]: (g.scores[player] || 0) - points }, history: g.history.slice(0, -1) };
      }),
    markTileUsed: (id: string) => setGame((g) => (g.used.includes(id) ? g : { ...g, used: [...g.used, id] })),
    resetBoard: () => setGame((g) => ({ ...g, used: [] })),
    shuffleWhoAmI: () =>
      setGame((g) => {
        const a = g.data.whoami.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return { ...g, data: { ...g.data, whoami: a } };
      }),
    replaceData: (data: GameData) => setGame((g) => ({ ...g, data, used: [] })),
    restoreDefaults: () => setGame((g) => ({ ...g, data: clone(DEFAULTS), used: [] })),
    resetScores: () => setGame((g) => ({ ...g, scores: {}, history: [] })),
  };
}

export type GameApi = ReturnType<typeof useGame>;
