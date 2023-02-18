import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginScreen.css";

const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="website-name">EDAS</h2>
      <button className="register-button" onClick={() => navigate("/register")}>
        Register
      </button>
      <Formik
        initialValues={{ role: "", email: "", password: "" }}
        validationSchema={Yup.object({
          role: Yup.string()
            .required("Role is required")
            .oneOf(["Administrator", "Faculty/Admin", "Student"]),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <div className="form-box">
          <h3 className="form-heading">Login</h3>
          <Form className="form-group">
            <label htmlFor="role">Role:</label>
            <Field as="select" name="role">
              <option value="">Select Role</option>
              <option value="Administrator">Administrator</option>
              <option value="Faculty/Admin">Faculty/Admin</option>
              <option value="Student">Student</option>
            </Field>
            <ErrorMessage name="role" component="div" className="error" />
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
            <a href="#" onClick={() => navigate("/fogetpassowrd")}>
              Forgot Password?
            </a>
            <button type="submit">Login</button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default LoginScreen;
