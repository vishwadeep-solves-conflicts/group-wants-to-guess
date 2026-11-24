export type View = "home" | "r1" | "r2" | "r3" | "final" | "edit";

/** The screens in the top navigation, in order. */
export const VIEWS: [View, string][] = [
  ["home", "Home"],
  ["r1", "1 · Weird But True"],
  ["r2", "2 · Pick Me Behaviour"],
  ["r3", "3 · Group Chat"],
  ["final", "Final · Who Am I?"],
  ["edit", "✏️ Edit"],
];

/** Screens where Space reveals and the arrow keys step through questions. */
export const STEPPED_VIEWS: View[] = ["r1", "r3", "final"];
