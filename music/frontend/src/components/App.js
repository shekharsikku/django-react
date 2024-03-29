import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Join from "./Join";
import Create from "./Create";
import Room from "./Room";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;