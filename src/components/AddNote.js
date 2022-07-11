import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  //state for input fields
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  //input field onchange handler
  const inputHandler = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }); //spread op overwriting only values that are targeted...e.target.name is same as the key in default object.
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.title);
    setnote({ title: "", description: "", tag: "" });
  };

  return (
    <div className="my-4">
      <h2>Add Note</h2>
      <form className="my-3" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            id="title"
            name="title"
            onChange={inputHandler}
            required
            minLength={3}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={inputHandler}
            required
            minLength={5}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={inputHandler}
            value={note.tag}
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
