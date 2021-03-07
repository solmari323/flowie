import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const DiscreteSlider = () => {
  return (
    <div>
      <p className="slider">Did that feel productive?</p>
      <Slider
        defaultValue={50}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="false"
        step={10}
        marks
        min={0}
        max={100}
      />
    </div>
  );
};

export default DiscreteSlider;
