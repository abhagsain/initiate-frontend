import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...args
}) {
  const context = useContext(AuthContext);
  return (
    <Route
      {...args}
      render={props => {
        return context.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={`${redirectTo}`} />
        );
      }}
    />
  );
}
