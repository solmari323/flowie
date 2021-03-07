import React from "react";

const Rating = (props) => {
  return (
    <div>
      <p className="session-p">How was your {props.type} session?</p>
      <div className="container-rating">
        <button>Too short</button>
        <button>Just Right</button>
        <button>Too long</button>
      </div>
    </div>
  );
};

export default Rating;
