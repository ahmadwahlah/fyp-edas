import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // send request to the server to reset password with email
  };

  return (
    <div className="forgot-password-screen">
      <div className="header">EDAS</div>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" onClick={() => navigate("/requestsent")}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
