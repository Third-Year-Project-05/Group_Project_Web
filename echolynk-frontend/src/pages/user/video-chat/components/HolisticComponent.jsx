import React, { useCallback, useEffect, useRef, useState } from "react";
import { Holistic } from "@mediapipe/holistic";
import { Camera } from "@mediapipe/camera_utils";
import Cookies from "js-cookie";

const HolisticComponent = ({
  isNeedDetection,
  isToggleDisabled,
  setPredict,
  setIsLoading,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const keypointsSequenceRef = useRef([]);
  const holisticRef = useRef(null); // Store holistic instance
  const cameraRef = useRef(null); // Store camera instance

  const backendURL = "http://127.0.0.1:9100/predict";

  const sendToBackend = useCallback(async (keypointsSequence) => {
    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keypoint: keypointsSequence }),
      });

      if (response.ok) {
        const data = await response.json();
        setPredict(data.prediction);
        // console.log(`predictions: ${data.prediction}`);
      } else {
        console.error("Error in backend response", response.statusText);
      }
    } catch (error) {
      console.error("Error connecting to backend", error);
    }
  }, []);

  const flattenLandmarks = useCallback((landmarks, expectedLength) => {
    if (landmarks) {
      const flattened = landmarks.flatMap((point) => [
        point.x,
        point.y,
        point.z,
      ]);

      if (flattened.length > expectedLength) {
        return flattened.slice(0, expectedLength);
      }
      return [
        ...flattened,
        ...Array(expectedLength - flattened.length).fill(0),
      ];
    }
    return Array(expectedLength).fill(0);
  }, []);

  const extractKeypoints = useCallback(
    (results) => {
      const pose = results.poseLandmarks
        ? results.poseLandmarks.flatMap((point) => [
            point.x,
            point.y,
            point.z,
            point.visibility,
          ])
        : Array(33 * 4).fill(0);

      const face = flattenLandmarks(results.faceLandmarks, 468 * 3);
      const leftHand = flattenLandmarks(results.leftHandLandmarks, 21 * 3);
      const rightHand = flattenLandmarks(results.rightHandLandmarks, 21 * 3);

      return [...pose, ...face, ...leftHand, ...rightHand];
    },
    [flattenLandmarks]
  );

  const drawCameraFeed = () => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    canvasCtx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const initializeHolistic = useCallback(() => {
    try {
      setIsLoading(true);
      const holisticInstance = new Holistic({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });

      holisticInstance.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        refineFaceLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      holisticInstance.onResults((results) => {
        if (isNeedDetection) {
          if (
            (!results.leftHandLandmarks ||
              results.leftHandLandmarks.length === 0) &&
            (!results.rightHandLandmarks ||
              results.rightHandLandmarks.length === 0)
          ) {
            // console.log("No hand detections");
            drawCameraFeed();
            return;
          }

          const keypoints = extractKeypoints(results);
          keypointsSequenceRef.current.push(keypoints);

          if (keypointsSequenceRef.current.length > 30) {
            keypointsSequenceRef.current =
              keypointsSequenceRef.current.slice(-30);
          }

          if (keypointsSequenceRef.current.length === 30) {
            setTimeout(() => sendToBackend(keypointsSequenceRef.current), 16.7);
          }
        }

        drawCameraFeed();
      });

      holisticRef.current = holisticInstance;
    } catch (error) {
      
    } finally{
      setIsLoading(false);
    }
  }, [isNeedDetection, extractKeypoints, sendToBackend]);

  useEffect(() => {
    try {
      initializeHolistic();

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (isNeedDetection && holisticRef.current) {
            await holisticRef.current.send({ image: videoRef.current });
          } else {
            drawCameraFeed();
          }
        },
        width: 1280,
        height: 720,
      });

      camera.start();
      cameraRef.current = camera;

      return () => {
        if (cameraRef.current) {
          cameraRef.current.stop();
          cameraRef.current = null;
        }
        if (holisticRef.current) {
          holisticRef.current.close();
          holisticRef.current = null;
        }
      };
    } catch (error) {
      console.log(error);
    }
  }, [isNeedDetection, initializeHolistic]);

  const checkNeedDetection = () => {
    if (isToggleDisabled) {
      return;
    }

    const newDetectionState = !isNeedDetection;
    setIsNeedDetection(newDetectionState);
    Cookies.set("isNeedDetection", newDetectionState.toString(), {
      expires: 1,
    });

    setIsToggleDisabled(true);
    setTimeout(() => setIsToggleDisabled(false), 2000);
    if (!newDetectionState && holisticRef.current) {
      holisticRef.current.close();
      holisticRef.current = null;
    } else if (newDetectionState) {
      initializeHolistic();
    }
  };

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
