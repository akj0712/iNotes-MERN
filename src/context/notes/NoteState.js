import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63302b10b2c03bfacbe30cb5",
      user: "632fd3d00c390804776c7aed",
      title: "my Title",
      description: "my Description",
      tag: "my Tag",
      date: "2022-09-25T10:18:56.997Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f61",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f62",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f63",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // ** Add a note
  const addNote = (title, description, tag) => {
    // TODO: API CALL
    console.log("adding a new note");
    const note = {
      _id: "6331f4c4c8a156663be4f",
      user: "632fd3d00c390804776c7aed",
      title: title,
      description: description,
      tag: tag,
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // ** Delete a note
  const deleteNote = (id) => {
    // TODO: API CALL
    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // ** Edit a note
  const editNote = (id, title, description, tag) => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
