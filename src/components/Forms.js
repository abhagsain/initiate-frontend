import React from "react";
import { Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-apollo";
import { LOGIN_USER } from "./queries";
export const SignUp = () => {
  return (
    <div>
      <h2>Sign up form</h2>
    </div>
  );
};
export function Login() {
  const [loginUser, { data, loading }] = useMutation(LOGIN_USER);
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
            variables: { email: values.email, password: values.password }
          }).then(({ data }) => {
            const { loginUser } = data;
            if (loginUser.res.error) {
              setErrors({ [loginUser.res.input]: loginUser.res.message });
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
          if (data) {
            // const {
            //   res: { error, message }
            // } = data;
          }
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
                {touched.password && errors.password && (
                  <span>{errors.password}</span>
                )}
              </label>
              <div>
                {/* error && <h2>{message}</h2> */}
                <button type="submit">{loading ? "Loading " : "Submit"}</button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
export default Login;
