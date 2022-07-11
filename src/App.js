import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NoteState from "./context/NoteState";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is an alert." />
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
