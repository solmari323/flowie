import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import HomePage from "./HomePage";

const Home = () => {
  const [userId, setUserId] = useState();

  // If User has active session -> automatically login
  useEffect(() => {
    fetch("../api/activeSession")
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id == null) {
          setUserId("No Session");
        } else {
          setUserId(data.user_id);
        }
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return !userId ? null : userId == "No Session" ? (
              <SignIn />
            ) : (
              <Redirect to={`/${userId}`} />
            );
          }}
        />
        <Route path="/signUp" component={SignUp} />
        <Route
          exact
          path="/:userId"
          render={() => {
            return <Homepage />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Home;
