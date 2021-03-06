import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  let history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validatePassword, setValidatePassword] = useState();
  const [email, setEmail] = useState();

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const validatePasswordChange = (event) => {
    setValidatePassword(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const SubmitButtonClicked = () => {
    console.log(username, password, validatePassword, email);
    if (password == validatePassword) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
          email: email,
        }),
      };
      fetch("api/signUp", requestOptions)
        .then((response) => {
          if (!response.ok) {
            console.log("Invalid Details!");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            console.log(data);
            // history.push('' + {userId})
          } else {
            console.log("No Data!");
          }
        });
    } else {
      console.log("Passwords don't match!");
    }
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Username" onChange={usernameChange} />
        <input
          type="password"
          placeholder="Password"
          onChange={passwordChange}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={validatePasswordChange}
        />
        <input type="email" placeholder="email" onChange={emailChange} />
      </div>
      <button type="submit" onClick={SubmitButtonClicked}>
        Create Account
      </button>
    </div>
  );
};

export default SignUp;
