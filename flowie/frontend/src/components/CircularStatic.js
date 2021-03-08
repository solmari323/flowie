import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  // if (props.value >= props.timeInterval - 1) {
  //   props.setTimeInterval(props.work ? props.workTime : props.breakTime);
  //   // Line below causing errors
  //   // props.setWork(!props.work);
  // }
  console.log(props.progress);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        size={100}
        value={(props.progress / props.timeInterval) * 100}
        color="secondary"
        variant="determinate"
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.progress)} mins`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  progress: PropTypes.number.isRequired,
  workTime: PropTypes.number,
  breakTime: PropTypes.number,
  work: PropTypes.bool,
  setWork: PropTypes.func,
  timeInterval: PropTypes.number,
  setTimeInterval: PropTypes.func,
};

export default function CircularStatic(props) {
  const [progress, setProgress] = React.useState(props.workTime);
  const [timeInterval, setTimeInterval] = useState(props.workTime);

  React.useEffect(() => {
    const timer = setInterval(() => {
      //   if (progress >= timeInterval - 1) {
      //     props.setWork(!props.work);
      //   }
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <CircularProgressWithLabel
      progress={progress}
      work={props.work}
      workTime={props.workTime}
      breakTime={props.breakTime}
      setWork={props.setWork}
      timeInterval={timeInterval}
      setTimeInterval={setTimeInterval}
    />
  );
}

CircularStatic.propTypes = {
  workTime: PropTypes.number,
  breakTime: PropTypes.number,
  work: PropTypes.bool,
  setWork: PropTypes.func,
};
