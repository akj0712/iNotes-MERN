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
    {
      _id: "6331f4c4c8a156663be42f64",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f65",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f66",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f67",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f68",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
      __v: 0,
    },
    {
      _id: "6331f4c4c8a156663be42f69",
      user: "632fd3d00c390804776c7aed",
      title: "Abhinav",
      description: "Abhinav is a good boy",
      tag: "personal",
      date: "2022-09-26T18:51:48.444Z",
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
