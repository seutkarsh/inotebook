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
      _id: "62cac9f42b54c3cfb78b6ea5",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:40.122Z",
      __v: 0,
    },
    {
      _id: "62cac9f52b54c3cfb78b6ea7",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    },
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
      _id: "62cac9f42b54c3cfb78b6ea5",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:40.122Z",
      __v: 0,
    },
    {
      _id: "62cac9f52b54c3cfb78b6ea7",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    },
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
      _id: "62cac9f42b54c3cfb78b6ea5",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:40.122Z",
      __v: 0,
    },
    {
      _id: "62cac9f52b54c3cfb78b6ea7",
      user: "62ca8760f522b928a6d692a0",
      title: "first note",
      description: "this is the first note",
      tag: "Important",
      date: "2022-07-10T12:45:41.040Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
