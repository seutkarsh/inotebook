import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  //Host network link
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  //Fetch All Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (localStorage.getItem("token")) {
      setNotes(json);
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };
  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    //Frontend
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });

    const editedNotes = JSON.parse(JSON.stringify(notes));

    //frontend
    for (let index = 0; index < editedNotes.length; index++) {
      const element = editedNotes[index];

      if (element._id === id) {
        editedNotes[index].title = title;
        editedNotes[index].description = description;
        editedNotes[index].tag = tag;
        break;
      }
    }
    setNotes(editedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
