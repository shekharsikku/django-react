import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Join from "./Join";
import Create from "./Create";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}
