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
import FacultyProfile from "./screens/FacultyProfile";
import Leave from "./components/Forms/Leave";
import HallRequisition from "./components/Forms/HallRequisition";
import Test from "./screens/test";
import FormHierarchy from "./components/FormHierarchy";
import CourseRegistrationForm from "./components/Forms/CourseRegistrationForm";
import FormBuilderContainer from "./components/DynamicForm/FormBuilderContainer";
import ALLFormPreview from "./screens/AllFormPreview";
import DynamicFormPreview from "./screens/DynamicFormPreview";
import DynamicFormPreviewFaculty from "./screens/DynamicFormPreviewFaculty";
import EditProfile from "./screens/EditProfile";
import EditFacultyProfile from "./screens/EditFacultyProfile";

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
          <Route path="/facultyprofile" element={<FacultyProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editfacultyprofile" element={<EditFacultyProfile />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/hallrequisition" element={<HallRequisition />} />
          <Route
            path="/courseregistration"
            element={<CourseRegistrationForm />}
          />
          <Route path="/formbuilder" element={<FormBuilderContainer />} />
          <Route path="/formhierarchy" element={<FormHierarchy />} />
          <Route path="/allform/:formId" exact element={<ALLFormPreview />} />
          <Route path="/form/:formId" exact element={<DynamicFormPreview />} />
          <Route
            path="/facultyform/:formId"
            exact
            element={<DynamicFormPreviewFaculty />}
          />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Only Heading, Text Input, Multi Text add heading,
// external role set in faculty
// set admin profile
// create a card that render data and approve dispprove *****
// ADD Faculty in administrator
// Cousrse for faculty in administrator
// Form Submission Restructure Date and Time
// File Upload
// Administartor Form List card Delete and edit button
