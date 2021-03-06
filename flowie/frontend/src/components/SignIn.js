import React, { useState } from "react";
import tomato from "./../../static/img/tomato.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const SubmitButtonClicked = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    };

    fetch("api/signIn", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("Bad Request!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        } else {
          console.log("No Data!");
        }
      });
  };

  return (
    <div className="signin">
      <div className="container">
        <img classname="tomato-img" src={tomato} alt="" />
        <input type="text" placeholder="Username" onChange={usernameChange} />
        <input
          type="password"
          placeholder="Password"
          onChange={passwordChange}
        />
      </div>
      <button type="submit" onClick={SubmitButtonClicked}>
        Sign In
      </button>

      
    </div>
  );
};

/* Link to Sign Up Page */
export default SignIn;

