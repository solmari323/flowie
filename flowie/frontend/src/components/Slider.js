import React from "react";

const Slider = () => {
  return (
    <div className="slider">
      <p>Did that feel productive?</p>
      {/* TODO: Style Slider */}
      <input className="slider" type="range" min="0" max="100" name="" id="" />
    </div>
  );
};

export default Slider;
