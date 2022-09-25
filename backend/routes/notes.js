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

module.exports = router;
