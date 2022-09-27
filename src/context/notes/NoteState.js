import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // ** Get all note
  const getNotes = async () => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZmQzZDAwYzM5MDgwNDc3NmM3YWVkIn0sImlhdCI6MTY2NDA4MjgxM30.ZcSS5EiHYhvOXuWKbCxS1KdayEznWrO2P1ZUGs3Manw",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };  

  // ** Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZmQzZDAwYzM5MDgwNDc3NmM3YWVkIn0sImlhdCI6MTY2NDA4MjgxM30.ZcSS5EiHYhvOXuWKbCxS1KdayEznWrO2P1ZUGs3Manw",
      },
      body: JSON.stringify({ title, description, tag }),
    });

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
  const editNote = async (id, title, description, tag) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZmQzZDAwYzM5MDgwNDc3NmM3YWVkIn0sImlhdCI6MTY2NDA4MjgxM30.ZcSS5EiHYhvOXuWKbCxS1KdayEznWrO2P1ZUGs3Manw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // ** Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
