import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
          // setUserId(data.user_id);
          setUserId("No Session");
        }
      });
  }, []);

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  var csrftoken = getCookie("csrftoken");

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return !userId ? null : userId == "No Session" ? (
              <SignIn setUserId={setUserId} csrftoken={csrftoken} />
            ) : (
              <Redirect to={`/${userId}`} />
            );
          }}
        />
        <Route
          path="/signUp"
          render={() => {
            return <SignUp setUserId={setUserId} csrftoken={csrftoken} />;
          }}
        />
        <Route
          exact
          path="/:userId"
          render={() => {
            return <HomePage userId={userId} csrftoken={csrftoken} />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Home;
