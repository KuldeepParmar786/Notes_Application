const Note = ({ note, toggleimportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <div className="bg-amber-700">
      <li>
        {note.content}
        <button onClick={toggleimportance}>{label}</button>
      </li>
    </div>
  );
};

export default Note;
