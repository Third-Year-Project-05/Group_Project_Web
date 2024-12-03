import React from "react";
// import { Holistic } from "@mediapipe/holistic";
// import { Camera } from "@mediapipe/camera_utils";
// import Cookies from "js-cookie";

const HolisticComponent = ({
  // isNeedDetection,
  // isToggleDisabled,
  // setPredict,
  // setIsLoading,
  // handleSendMessage,
  videoRef,
  canvasRef
}) => {
  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const keypointsSequenceRef = useRef([]);
  // const holisticRef = useRef(null); // Store holistic instance
  // const cameraRef = useRef(null); // Store camera instance

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full border-blue-500"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width="1280"
        height="720"
        style={{
          width: "100%",
          height: "auto",
          border: "1px solid black",
          display: "none",
        }}
      ></canvas>
    </div>
  );
};

export default HolisticComponent;
