export default function EmptyRound({ name }: { name: string }) {
  return (
    <div className="stagecard">
      <div className="qtext">No questions for {name} yet.</div>
      <p className="sub">Add some in ✏️ Edit.</p>
    </div>
  );
}
