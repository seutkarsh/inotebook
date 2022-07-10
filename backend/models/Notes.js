const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  //User as foregin key to associate a use with note.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", //name of model whose key is associated...
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("notes", NotesSchema);
// User.createIndexes();
module.exports = Note;
