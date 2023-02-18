import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisteredScreen.css";

const RegisteredScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="register-screen">
      <div className="header">EDAS</div>
      <div className="register-box">
        <p>Account registered successfully</p>
        <p>You will receive a confirmation email shortly</p>
        <button onClick={() => navigate("/")}>Back to Login</button>
      </div>
    </div>
  );
};

export default RegisteredScreen;
