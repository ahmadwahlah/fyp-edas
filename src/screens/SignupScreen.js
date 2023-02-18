import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./SignupScreen.css";

const SignupScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="website-name">EDAS</div>
      <div className="form-box">
        <div className="form-heading">Register</div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            faculty: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            role: Yup.string().required("Role is required"),
            faculty: Yup.string().when("role", {
              is: "Faculty/Admin",
              then: Yup.string().required("Faculty is required"),
            }),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="form-group">
                <Field name="firstName" type="text" placeholder="First Name" />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div className="form-group">
                <Field name="lastName" type="text" placeholder="Last Name" />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div className="form-group">
                <Field name="email" type="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="form-group">
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <Field as="select" name="role">
                  <option value="">Select Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Faculty/Admin">Faculty/Admin</option>
                  <option value="Student">Student</option>
                </Field>
                <ErrorMessage name="role" component="div" />
              </div>
              {values.role === "Faculty/Admin" && (
                <div className="form-control">
                  <label>Faculty</label>
                  <Field as="select" name="faculty">
                    <option value="">Select Faculty</option>
                    <option value="FCSE">FCSE</option>
                    <option value="FES">FES</option>
                    <option value="FME">FME</option>
                    <option value="FEE">FEE</option>
                    <option value="MGS">MGS</option>
                  </Field>
                  <ErrorMessage name="faculty" component="div" />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={() => navigate("/registered")}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupScreen;
