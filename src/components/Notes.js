import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  //state for input fields
  const [note, setnote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getNotes();
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNoteModal = (currentNote) => {
    ref.current.click();
    setnote(currentNote);
  };

  //input field onchange handler
  const inputHandler = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }); //spread op overwriting only values that are targeted...e.target.name is same as the key in default object.
  };

  const submitHandler = (e) => {
    refClose.current.click();
    editNote(note._id, note.title, note.description, note.tag);
  };
  return (
    <div className="row my-5">
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* start of form */}
              <form className="my-3">
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
                    value={note.title}
                    onChange={inputHandler}
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
                    value={note.description}
                    onChange={inputHandler}
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
                    value={note.tag}
                    onChange={inputHandler}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={note.title.length < 3 || note.description.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={submitHandler}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      <div className="container my-2">
        <h5>{notes.length === 0 && "No Notes Yet. Create one now!!!"}</h5>
      </div>
      {notes.map((note) => {
        return (
          <NoteItem
            note={note}
            updateNoteModal={updateNoteModal}
            key={note._id}
          />
        );
      })}
    </div>
  );
};

export default Notes;
