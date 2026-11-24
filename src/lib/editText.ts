// The plain-text formats used on the Edit screen.
import type { Category, QA } from "../data/defaults";

/** "question | answer", one per line. */
export const pairsToText = (list: QA[]) => list.map((x) => `${x.q} | ${x.a}`).join("\n");

export function parsePairs(text: string): QA[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf("|");
      return i < 0 ? { q: l, a: "" } : { q: l.slice(0, i).trim(), a: l.slice(i + 1).trim() };
    });
}

/** "## Category | twist" followed by that category's question lines. */
export const boardToText = (board: Category[]) =>
  board.map((c) => `## ${c.cat} | ${c.hint || ""}\n` + pairsToText(c.qs)).join("\n\n");

export function parseBoard(text: string): Category[] {
  const out: Category[] = [];
  let cur: Category | null = null;
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((l) => {
      if (l.startsWith("##")) {
        const s = l.replace(/^#+/, "").trim();
        const i = s.indexOf("|");
        cur = { cat: i < 0 ? s : s.slice(0, i).trim(), hint: i < 0 ? "" : s.slice(i + 1).trim(), qs: [] };
        out.push(cur);
      } else {
        if (!cur) {
          cur = { cat: "Category", hint: "", qs: [] };
          out.push(cur);
        }
        cur.qs.push(parsePairs(l)[0]);
      }
    });
  return out;
}

/** One entry per non-empty line. */
export const lines = (text: string) =>
  text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
