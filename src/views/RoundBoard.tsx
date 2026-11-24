import type { CSSProperties, ReactNode } from "react";
import EmptyRound from "../components/EmptyRound";
import RoundHeader from "../components/RoundHeader";
import type { Category } from "../data/defaults";

type Props = { board: Category[]; used: string[]; onOpen: (category: number, row: number) => void; onReset: () => void };

export const tileId = (category: number, row: number) => `${category}-${row}`;

/** Round 2: the quiz board. Tiles open in TileModal. */
export default function RoundBoard({ board, used, onOpen, onReset }: Props) {
  if (!board.length) return <EmptyRound name="Round 2" />;
  const rows = Math.max(...board.map((c) => c.qs.length));
  const cells: ReactNode[] = board.map((c, ci) => (
    <div className="cat" key={`cat-${ci}`}>
      {c.cat}
    </div>
  ));
  for (let r = 0; r < rows; r++) {
    board.forEach((c, ci) => {
      const id = tileId(ci, r);
      cells.push(
        c.qs[r] ? (
          <button key={id} className={`tile ${used.includes(id) ? "used" : ""}`} onClick={() => onOpen(ci, r)}>
            {(r + 1) * 10}
          </button>
        ) : (
          <div key={id} />
        )
      );
    });
  }
  return (
    <>
      <RoundHeader
        kicker="Round 2 · Pick Me Behaviour"
        rules="Players take turns picking. Every category is a misdirect. Buzz in to answer."
        right={
          <button className="ghost" onClick={onReset}>
            ↺ Reset board
          </button>
        }
      />
      <div className="board" style={{ "--cols": board.length } as CSSProperties}>
        {cells}
      </div>
    </>
  );
}
