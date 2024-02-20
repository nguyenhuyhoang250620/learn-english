
import React from "react";
import ReactPlayer from "react-player";

const Camera = () => {
  return (
    <ReactPlayer
      url="rtsp://116.98.101.28/"
      controls={true}
    />
  );
};

export default Camera;
