const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ** ROUTE: 1 :: get all the notes GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ** ROUTE: 2 :: add a new notes using POST "/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    [
      body("title", "Enter a valid title(>= 2 char)").isLength({ min: 2 }),
      body("description", "Enter a valid description(>= 5 char)").isLength({
        min: 5,
      }),
    ],
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // ** If there are error return bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ** ROUTE: 3 :: update an existing note using POST "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // ** Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // ** FInd the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ** ROUTE: 4 :: delete an existing note using POST "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // ** FInd the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // ** Allow deletion only if user own this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Notes has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
