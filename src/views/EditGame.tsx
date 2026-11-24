import { useRef } from "react";
import type { GameData } from "../data/defaults";
import { boardToText, lines, pairsToText, parseBoard, parsePairs } from "../lib/editText";

type Props = {
  data: GameData;
  onSave: (data: GameData) => void;
  onResetScores: () => void;
  onRestoreDefaults: () => void;
};

/** The host's editor. Text boxes are read on Save. */
export default function EditGame({ data, onSave, onResetScores, onRestoreDefaults }: Props) {
  const players = useRef<HTMLTextAreaElement>(null);
  const who = useRef<HTMLTextAreaElement>(null);
  const weird = useRef<HTMLTextAreaElement>(null);
  const chat = useRef<HTMLTextAreaElement>(null);
  const board = useRef<HTMLTextAreaElement>(null);

  const save = () =>
    onSave({
      players: lines(players.current!.value),
      whoami: lines(who.current!.value),
      weird: parsePairs(weird.current!.value),
      chat: parsePairs(chat.current!.value),
      board: parseBoard(board.current!.value),
    });

  return (
    <>
      <div className="kicker">Host only · don't screen-share this bit</div>
      <h2 className="display" style={{ fontSize: 40, margin: "8px 0 0" }}>
        Edit the game
      </h2>
      <p className="sub">
        Changes are saved in this browser. Use <b>|</b> to separate a question from its answer.
      </p>
      <div className="edit">
        <div className="field">
          <label>Players / teams</label>
          <small>One per line.</small>
          <textarea ref={players} style={{ minHeight: 140 }} defaultValue={data.players.join("\n")} />
        </div>
        <div className="field">
          <label>Final · Who Am I? names</label>
          <small>One per line. Add mutual friends for chaos.</small>
          <textarea ref={who} style={{ minHeight: 140 }} defaultValue={data.whoami.join("\n")} />
        </div>
        <div className="field">
          <label>Round 1 · Weird But True</label>
          <small>
            <code>question with ___ blank | answer</code>
          </small>
          <textarea ref={weird} defaultValue={pairsToText(data.weird)} />
        </div>
        <div className="field">
          <label>Round 3 · Group Chat Forensics</label>
          <small>
            <code>message | who sent it</code>
          </small>
          <textarea ref={chat} defaultValue={pairsToText(data.chat)} />
        </div>
        <div className="field" style={{ gridColumn: "1/-1" }}>
          <label>Round 2 · Pick Me Behaviour board</label>
          <small>
            Start each category with <code>## Category | the twist</code>, then one <code>question | answer</code> per line.
            The first line is worth 10, the second 20, the third 30, and so on.
          </small>
          <textarea ref={board} style={{ minHeight: 320 }} defaultValue={boardToText(data.board)} />
        </div>
      </div>
      <div className="row" style={{ marginTop: 16 }}>
        <button className="primary" onClick={save}>
          💾 Save changes
        </button>
        <button className="ghost" onClick={onResetScores}>
          Reset all scores
        </button>
        <div className="spacer" />
        <button className="ghost" onClick={onRestoreDefaults}>
          Restore default questions
        </button>
      </div>
    </>
  );
}
