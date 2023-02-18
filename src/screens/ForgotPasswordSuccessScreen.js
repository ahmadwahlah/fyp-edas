import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordSuccessScreen.css";

const ForgotPasswordSuccessScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="forgot-password-success-screen">
      <div className="header">EDAS</div>
      <div className="message">
        Forgot password request sent successfully. You will receive an email
        shortly.
      </div>
      <button className="back-to-login-button" onClick={() => navigate("/")}>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPasswordSuccessScreen;
