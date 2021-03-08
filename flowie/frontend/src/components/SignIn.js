import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = ({ setUserId, csrftoken }) => {
  let history = useHistory();
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
        "X-CSRFToken": csrftoken,
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
          setUserId(data.user_id);
          // history.push("/" + data.user_id);
        } else {
          console.log("No Data!");
        }
      });
  };

  return (
    <div className="signin">
      <div className="container">
        <img src={"/static/img/tomato.svg"} alt="" />
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
      <br />
      <a href="signUp">Don't have an Account? Create One!</a>
    </div>
  );
};

/* Link to Sign Up Page */
export default SignIn;
