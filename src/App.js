import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import AdminNavigation from "./screens/AdminNavigation";
import FacultyNavigation from "./screens/FacultyNavigation";
import StudentNavigation from "./screens/StudentNavigation";
import Profile from "./screens/Profile";
import Leave from "./components/Forms/Leave";
import HallRequisition from "./components/Forms/HallRequisition";
import Test from "./screens/test";
import FormHierarchy from "./components/FormHierarchy";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/adminhome" element={<AdminNavigation />} />
          <Route path="/facultyhome" element={<FacultyNavigation />} />
          <Route path="/studenthome" element={<StudentNavigation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/hallrequisition" element={<HallRequisition />} />
          <Route path="/formhierarchy" element={<FormHierarchy />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
