import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Forms";
import Home from "./components/Home";
import { AuthContext } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
// import { useAuth } from "./components/useAuth";
function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [isAuthenticated, setAuthenticated]);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute
            component={() => {
              return (
                <div>
                  <h2>I'm protected route</h2>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setAuthenticated(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              );
            }}
            redirectTo="/login"
            path="/protected"
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
