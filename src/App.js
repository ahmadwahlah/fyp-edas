import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import AdminNavigation from "./screens/AdminNavigation";
import LineGraph from "./screens/test";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adminhome" element={<AdminNavigation />} />
          <Route path="/test" element={<LineGraph />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
