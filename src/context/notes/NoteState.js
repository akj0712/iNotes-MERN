import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  // ** GET all note
  const getNote = async () => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZmQzZDAwYzM5MDgwNDc3NmM3YWVkIn0sImlhdCI6MTY2NDA4MjgxM30.ZcSS5EiHYhvOXuWKbCxS1KdayEznWrO2P1ZUGs3Manw",
      },
      // body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  };

  // ** Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API CALL
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
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // ** Delete a note
  const deleteNote = async (id) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZmQzZDAwYzM5MDgwNDc3NmM3YWVkIn0sImlhdCI6MTY2NDA4MjgxM30.ZcSS5EiHYhvOXuWKbCxS1KdayEznWrO2P1ZUGs3Manw",
      },
      // body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    console.log("Deleting the note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // ** Edit a note
  const editNote = async (id, title, description, tag) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyZmQzZDAwYzM5MDgwNDc3NmM3YWVkIn0sImlhdCI6MTY2NDA4MjgxM30.ZcSS5EiHYhvOXuWKbCxS1KdayEznWrO2P1ZUGs3Manw",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);


    let newNote = JSON.parse(JSON.stringify(notes))
    // ** Logic to edit in client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    // console.log(notes);
    setNotes(newNote)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
