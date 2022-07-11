import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "62cac7491075aa07382dc118",
      user: "62ca8760f522b928a6d692a0",
      title: "Updated title",
      description: "Updated Description",
      tag: "Carefree",
      date: "2022-07-10T12:34:17.854Z",
      __v: 0,
    },
    {
      _id: "62cac9f42b54c3cfb7jjjj8b6ea5",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:40.122Z",
      __v: 0,
    },
    {
      _id: "62cac9f52b54c3cfb7jj8b6ea7",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    },
    {
      _id: "62cac749107hh5aa07382dc118",
      user: "62ca8760f522b928a6d692a0",
      title: "Updated title",
      description: "Updated Description",
      tag: "Carefree",
      date: "2022-07-10T12:34:17.854Z",
      __v: 0,
    },
    {
      _id: "62cac9f42b54c3cggfb78b6ea5",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:40.122Z",
      __v: 0,
    },
    {
      _id: "62cac9f52b54c3cssfb78b6ea7",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    },
    {
      _id: "62cac7491075aa073s82dc118",
      user: "62ca8760f522b928a6d692a0",
      title: "Updated title",
      description: "Updated Description",
      tag: "Carefree",
      date: "2022-07-10T12:34:17.854Z",
      __v: 0,
    },
    {
      _id: "62cac9f42b54c3cfbhhhhh78b6ea5",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:40.122Z",
      __v: 0,
    },
    {
      _id: "62cac9f52b54c3cfb78bdgdg6ea7",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title, description, tag) => {
    const note = {
      _id: Math.random(10),
      user: "62ca8760f522b928a6d692a0",
      title: title,
      description: description,
      tag: tag,
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
    console.log("New Note Added");
  };
  //Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = (id, title, description, tag) => {
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id == id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
