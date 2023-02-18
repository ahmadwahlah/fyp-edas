import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import RegisteredScreen from "./screens/RegsiteredScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ForgotPasswordSuccessScreen from "./screens/ForgotPasswordSuccessScreen";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<LoginScreen />} />
          <Route path="/register" element={<SignupScreen />} />
          <Route path="/registered" element={<RegisteredScreen />} />
          <Route path="/fogetpassowrd" element={<ForgotPasswordScreen />} />
          <Route
            path="/requestsent"
            element={<ForgotPasswordSuccessScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
