import React from "react";
import Slider from "./Slider";
import Rating from "./Rating";

const Feedback = () => {
  return (
    <div className="feedback">
      <h1>Congratulations!</h1>
      <img src="" alt="congratulations image" srcset="" />
      <Slider />
      <Rating type="work" />
      <Rating type="break" />
      <button>FINISH</button>
    </div>
  );
};

export default Feedback;
