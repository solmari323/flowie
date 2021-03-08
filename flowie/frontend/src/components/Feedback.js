import React, { useState } from "react";
import DiscreteSlider from "./Slider";
import Rating from "./Rating";

const Feedback = ({ setSessionStarted, setFeedbackSubmitted }) => {
  const [next, setNext] = useState(false);
  const [breakTooshort, setBreakTooshort] = useState();
  const [workTooshort, setWorkTooshort] = useState();

  return (
    <div className="feedback">
      {next == false && (
        <div className="feedback-container">
          <h1>Congratulations!</h1>
          <img src={"/static/img/girl.svg"} className="girl" alt="" />
          <DiscreteSlider />
          <button
            onClick={() => {
              setNext(true);
            }}
          >
            Contine
          </button>
        </div>
      )}
      {next == true && (
        <div className="feedback-container">
          <DiscreteSlider />
          <br />
          <Rating type="work" />
          <br />
          <Rating type="break" />
          <br />
          <button
            onClick={() => {
              setSessionStarted(false);
              setFeedbackSubmitted(true);
            }}
          >
            FINISH
          </button>{" "}
          {/* On finish go to the home page?/timer page?*/}
        </div>
      )}
    </div>
  );
};

export default Feedback;
