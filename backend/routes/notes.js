//Module Exports
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");

//Route 1: Fetching all notes of a user using path using GET: /api/notes/fetchallnotes. Login Required...

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id }); //returns an empty object if nothing is found...
  res.json(notes);
});

//Route 2: Adding notes for a user using path using POST: /api/notes/addnote. Login Required...

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title should be at least 3 chacater long").isLength({
      min: 3,
    }),

    body(
      "description",
      "Description should be at least 6 character long"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });

      res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Route 3: Updating an specific note using path using PUT: /api/notes/updatenote/:id. Login Required...

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //Getting request data using destructuring
  const { title, description, tag } = req.body;

  const newnote = {}; //creating empty object of a not to only add incoming info

  try {
    //Adding info to newnotw only if updated info exists in request
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //Find if the requested note exists or not.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found ");
    }

    //Checking if user requesting update is updating its note only and not of other user...
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("User not matched");
    }

    //Updating Note
    note = await Note.findByIdAndUpdate(
      req.params.id, //id of note that needs to be updated
      { $set: newnote }, //update with this
      { new: true } //add fields if not already exists in object
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured.");
  }
});

//Route 4: Deleting a specific note using path using DELETE: /api/notes/deletenote/:id. Login Required...

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find if the requested note exists or not.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found ");
    }

    //Checking if user requesting delete is deleting its note only and not of other user...
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("User not matched");
    }

    //Deleting Note
    note = await Note.findByIdAndDelete(
      req.params.id //id of note that needs to be deleted
    );
    res.send("Note deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured.");
  }
});

module.exports = router;
