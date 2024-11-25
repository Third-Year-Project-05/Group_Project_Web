import React, { useRef, useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import { Holistic } from "@mediapipe/holistic";
import { Camera } from "@mediapipe/camera_utils";

const Room = ({ roomID }) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const holistic = useRef(null);
  const camera = useRef(null);
  const keypointsSequenceRef = useRef([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isBackendEnabled, setIsBackendEnabled] = useState(true);

  const signModelEndpoint = "http://127.0.0.1:9100/predict";
  const socketEndpoint = "http://127.0.0.1:8000";

  const sendToBackend = useCallback(async (keypointsSequence) => {
    try {
      const response = await fetch(signModelEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keypoint: keypointsSequence }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Prediction:", data);
      } else {
        console.error("Error in backend response", response.statusText);
      }
    } catch (error) {
      console.error("Error connecting to backend", error);
    }
  }, []);

  const flattenLandmarks = useCallback((landmarks, expectedLength) => {
    if (landmarks) {
      const flattened = landmarks.flatMap((point) => [point.x, point.y, point.z]);
      return [
        ...flattened,
        ...Array(expectedLength - flattened.length).fill(0),
      ];
    }
    return Array(expectedLength).fill(0);
  }, []);

  const extractKeypoints = useCallback((results) => {
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
  }, [flattenLandmarks]);

  const processHolisticResults = useCallback(
    (results) => {
      if (
        (!results.leftHandLandmarks || results.leftHandLandmarks.length === 0) &&
        (!results.rightHandLandmarks || results.rightHandLandmarks.length === 0)
      ) {
        return;
      }

      const keypoints = extractKeypoints(results);
      keypointsSequenceRef.current.push(keypoints);

      if (keypointsSequenceRef.current.length > 30) {
        keypointsSequenceRef.current = keypointsSequenceRef.current.slice(-30);
      }

      if (keypointsSequenceRef.current.length === 30) {
        sendToBackend(keypointsSequenceRef.current);
      }
    },
    [extractKeypoints, sendToBackend]
  );

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect(socketEndpoint);
        socketRef.current.emit("join room", roomID);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleReceiveCall);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        // Initialize Holistic and Camera
        holistic.current = new Holistic({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
        });

        holistic.current.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          refineFaceLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        holistic.current.onResults(processHolisticResults);

        camera.current = new Camera(userVideo.current, {
          onFrame: async () => {
            if (isBackendEnabled) {
              await holistic.current.send({ image: userVideo.current });
            }
          },
        });

        camera.current.start();
      });

    return () => {
      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
      if (camera.current) camera.current.stop();
    };
  }, [roomID, processHolisticResults, isBackendEnabled]);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.stunprotocol.org" },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => peerRef.current.setLocalDescription(offer))
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      });
  }

  function handleReceiveCall(incoming) {
    peerRef.current
      .setRemoteDescription(new RTCSessionDescription(incoming.sdp))
      .then(() => peerRef.current.createAnswer())
      .then((answer) => peerRef.current.setLocalDescription(answer))
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc);
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current.addIceCandidate(candidate);
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  const toggleMute = () => {
    const enabled = userStream.current.getAudioTracks()[0].enabled;
    userStream.current.getAudioTracks()[0].enabled = !enabled;
    setIsMuted(!enabled);
  };

  const toggleVideo = () => {
    const enabled = userStream.current.getVideoTracks()[0].enabled;
    userStream.current.getVideoTracks()[0].enabled = !enabled;
    setIsVideoOff(!enabled);
  };

  const endCall = () => {
    socketRef.current.disconnect();
    if (peerRef.current) peerRef.current.close();
    userStream.current.getTracks().forEach((track) => track.stop());
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-4">
        <video
          ref={userVideo}
          autoPlay
          muted
          className="w-1/2 border-2 border-blue-500 h-1/2"
        />
        <video
          ref={partnerVideo}
          autoPlay
          className="w-1/2 border-2 border-green-500 h-1/2"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={toggleMute} className="px-4 py-2 text-white bg-red-500 rounded">
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button onClick={toggleVideo} className="px-4 py-2 text-white bg-blue-500 rounded">
          {isVideoOff ? "Turn On Video" : "Turn Off Video"}
        </button>
        <button onClick={endCall} className="px-4 py-2 text-white bg-black rounded">
          End Call
        </button>
      </div>
    </div>
  );
};

export default Room;