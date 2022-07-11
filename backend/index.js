//Module Imports
const connectToDatabase = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();

connectToDatabase();

//to resolve cors error
app.use(cors());
//Middlewares
app.use(express.json());
const port = 5000;
app.get("/", (req, res) => {});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
