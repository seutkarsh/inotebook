import React, { useContext } from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-5">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note} key={note._id} />;
      })}
    </div>
  );
};

export default Notes;
