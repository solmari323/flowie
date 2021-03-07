import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Feedback from "./Feedback";

const HomePage = ({ userId, csrftoken }) => {
  let params = useParams();
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();
  const [workTime, setWorkTime] = useState();
  const [breakTime, setBreakTime] = useState();

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        user_id: params.userId,
      }),
    };

    fetch("api/getUser", requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("Bad Response!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          if (!data.optimal_session) {
            setWorkTime(25);
            setBreakTime(5);
          } else {
            setWorkTime(data.optimal_session);
          }
        } else {
          console.log("No Data!");
        }
      });
  }, []);

  return (
    <div className="signin">
      <div className="container">
        <p>Timer goes here</p>
      </div>
      <button>Finish</button>
      <Feedback />
    </div>
  );
};

export default HomePage;
