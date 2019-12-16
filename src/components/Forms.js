import React, { useContext } from "react";
import { Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-apollo";
import { LOGIN_USER } from "./queries";
import { useAuth } from "./useAuth";
import { AuthContext } from "./AuthContext";
import { Redirect } from "react-router-dom";

export const SignUp = () => {
  return (
    <div>
      <h2>Sign up form</h2>
    </div>
  );
};

export function Login() {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to="/protected" />;
  return (
    <div>
      <h2>Login form</h2>
      <Formik
        initialValues={{
          email: "vipansh@gmail.com",
          password: "abc"
        }}
        onSubmit={(values, { setErrors }) => {
          loginUser({
            variables: {
              email: values.email,
              password: values.password
            }
          }).then(({ data }) => {
            const { loginUser } = data;
            localStorage.setItem("token", loginUser.token);
            setAuthenticated(true);
            if (loginUser.res.error) {
              setErrors({
                [loginUser.res.input]: loginUser.res.message
              });
            }
          });
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Invalid Email")
            .required("Email is required"),
          password: yup
            .string()
            .min(3, "Too short")
            .max(12)
            .required("Password is required")
        })}
      >
        {({ handleSubmit, touched, errors, ...args }) => {
          return (
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <div>
                  <Field name="email" type="email" placeholder="bitches" />
                  <ErrorMessage name="email" />
                </div>
              </label>
              <label>
                Password
                <Field name="password" type="password" placeholder="bitches" />
                <ErrorMessage name="email" />
              </label>
              <div>
                <button type="submit">{loading ? "Loading " : "Submit"}</button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
