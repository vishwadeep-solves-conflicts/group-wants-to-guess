import { Fragment } from "react";

/** Question text with every "___" drawn as an underlined blank. */
export default function QuestionText({ text, className = "qtext", style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const parts = text.split(/_{2,}/);
  return (
    <div className={className} style={style}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <span className="blank">&nbsp;</span>}
        </Fragment>
      ))}
    </div>
  );
}
