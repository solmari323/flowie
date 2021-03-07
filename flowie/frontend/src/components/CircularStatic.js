import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  if (props.value >= props.timeInterval - 1) {
    props.setTimeInterval(props.work ? props.workTime : props.breakTime);
    // Line below causing errors
    props.setWork(!props.work);
  }
  console.log(props.timeInterval);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
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
        >{`${Math.round(props.value)}s`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  workTime: PropTypes.number,
  breakTime: PropTypes.number,
  work: PropTypes.bool,
  setWork: PropTypes.func,
  timeInterval: PropTypes.number,
  setTimeInterval: PropTypes.func,
};

export default function CircularStatic(props) {
  const [progress, setProgress] = React.useState(20);
  const [timeInterval, setTimeInterval] = useState(props.workTime);

  React.useEffect(() => {
    const timer = setInterval(() => {
      //   if (progress >= timeInterval - 1) {
      //     props.setWork(!props.work);
      //   }
      setProgress((prevProgress) =>
        prevProgress >= timeInterval - 1 ? 0 : prevProgress + 1
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgressWithLabel
      value={progress}
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
