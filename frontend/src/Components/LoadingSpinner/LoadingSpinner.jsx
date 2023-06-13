import React from "react";
import "./LoadingSpinner.css";
import { RotatingLines, ThreeCircles } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#cf0a2c"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};

export default LoadingSpinner;
