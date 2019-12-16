import { useState, useEffect } from "react";
export const useAuth = () => {
  // read the local storage
  // if it doens'nt contain token then redirect
  // use to a different route
  // const [isAuthenticated, setAuthenticated] = useState(false);
  const isAuth = localStorage.getItem("token");
  if (!isAuth) return [false];
  return [true];
};
