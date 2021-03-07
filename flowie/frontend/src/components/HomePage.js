import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Feedback from "./Feedback";
import CircularStatic from "./CircularStatic";
import PauseRounded from "@material-ui/icons/PauseRounded";
import PlayArrowRounded from "@material-ui/icons/PlayArrowRounded";

const HomePage = ({ userId, csrftoken }) => {
  let params = useParams();
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [work, setWork] = useState(true);

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
    <div>
      <div className="signin">
        {!sessionEnded ? (
          <div className="timer-container">
            <div className="timer home-page">
              <img src={"/static/img/tomato.svg"} alt="" />
              <h6>{work ? "Work Time" : "Break Time"}</h6>
              <CircularStatic
                workTime={workTime}
                breakTime={breakTime}
                work={work}
                setWork={setWork}
              />
              <div className="timer-buttons">
                <button>
                  <PauseRounded style={{ fill: "red" }} />
                </button>
                <button>
                  <PlayArrowRounded style={{ fill: "red" }} />
                </button>
              </div>
            </div>
            <button
              className="red-butt"
              onClick={() => {
                setSessionEnded(true);
              }}
            >
              Finish
            </button>
          </div>
        ) : null}
        {sessionEnded ? <Feedback /> : null}
      </div>
    </div>
  );
};

export default HomePage;
