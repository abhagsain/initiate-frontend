import React from "react";
import { Field, Form, withFormik } from "formik";
import * as yup from "yup";
export const SignUp = () => {
  return (
    <div>
      <h2>Sign up form</h2>
    </div>
  );
};
export const Login = ({ errors, touched, isSubmitting }) => {
  return (
    <div>
      <h2>Login form</h2>
      <Form>
        <div>
          <Field type="email" name="email" placeholder="Email" />
          {touched.email && errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Please Wait" : "Submit"}
        </button>
      </Form>
    </div>
  );
};
export default withFormik({
  mapPropsToValues(props) {
    return { email: "abhagsain@gmail.com", password: "password" };
  },
  handleSubmit(values, { setErrors, resetForm, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "abhagsain@gmail.com") {
        setErrors({ email: "Email is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log("TCL: handleSubmit -> values", values);
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .required("Required"),
    password: yup
      .string()
      .min(8, "Too short")
      .max(12)
      .required("Password is required")
  })
})(Login);
