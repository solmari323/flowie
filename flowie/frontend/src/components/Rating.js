import React, { useState } from "react";

const Rating = (props) => {
  const [buttonActive, setButtonActive] = useState("2");

  return (
    <div>
      <p className="session-p">How was your {props.type} session?</p>
      <div className="container-rating">
        <button
          id="1"
          className={buttonActive == "1" ? "active" : ""}
          onClick={() => {
            setButtonActive("1");
          }}
        >
          Too short
        </button>
        <button
          id="2"
          className={buttonActive == "2" ? "active" : ""}
          onClick={() => {
            setButtonActive("2");
          }}
        >
          Just Right
        </button>
        <button
          id="3"
          className={buttonActive == "3" ? "active" : ""}
          onClick={() => {
            setButtonActive("3");
          }}
        >
          Too long
        </button>
      </div>
    </div>
  );
};

export default Rating;
