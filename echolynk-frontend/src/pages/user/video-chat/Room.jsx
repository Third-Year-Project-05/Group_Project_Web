import { useRef, useEffect, useState, useCallback } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaMicrophoneAlt,
  FaMicrophoneAltSlash,
  FaVideo,
  FaVideoSlash,
  FaAngellist,
  FaPhoneSlash,
  FaRegClone,
} from "react-icons/fa";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { Holistic } from "@mediapipe/holistic";
import { Camera } from "@mediapipe/camera_utils";

import logo from "../../../assets/echolynk.png";
import LoadingPopup from "../../../components/LoadingPopup";
import HolisticComponent from "./components/HolisticComponent";
import ChatFeature from "./components/ChatFeature";
import { useNavigate, useParams } from "react-router-dom";
import CopyLinkModal from "./components/CopyLinkModal";
// For Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const Room = () => {
  let deafUser = false;
  try {
    if (JSON.parse(localStorage.getItem("user")).role === "Deaf") {
      deafUser = true;
    } else {
      deafUser = false;
    }
  } catch (e) {
    console.error(e);
  }

  const { roomID } = useParams();

  const userVideo = useRef(null);
  const partnerVideo = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);
  const otherUser = useRef(null);
  const userStream = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(true);
  const [isPartnerVideoOff, setIsPartnerVideoOff] = useState(true);

  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // copy modal visible or not
  const [isModalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  // sign detection state
  const [isNeedDetection, setIsNeedDetection] = useState(
    Cookies.get("isNeedDetection") !== "true"
  );
  const [isToggleDisabled, setIsToggleDisabled] = useState(false);
  const [predict, setPredict] = useState("");

  const handleSendMessage = (message) => {
    if (
      message === "" ||
      (messages.length > 0 && messages[messages.length - 1] === message)
    ) {
      console.log("valid");
      return;
    }
    // console.log("Sending message:", message);
    socketRef.current.emit("send message", { text: message, roomID });
    // setMessages((prev) => [
    //   ...prev,
    //   { sender: socketRef.current.id, text: message },
    // ]);
    // console.log(messages);
  };

  function handleReceiveMessage(data) {
    // console.log("msg reciieved", data);
    setMessages((prev) => [
      ...prev,
      { sender: data["sender"], text: data["text"], time: data["timestamp"] },
    ]);
    // console.log(messages);
  }

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
    if (partnerVideo.current) {
      partnerVideo.current.srcObject = e.streams[0];
      setIsPartnerVideoOff(true);
    } else {
      setIsPartnerVideoOff(false);
    }
  }

  const toggleMute = () => {
    const enabled = userStream.current.getAudioTracks()[0].enabled;
    userStream.current.getAudioTracks()[0].enabled = !enabled;
    setIsMuted(!enabled);
  };

  const toggleVideo = useCallback(() => {
    const enabled = userStream.current.getVideoTracks()[0].enabled;
    userStream.current.getVideoTracks()[0].enabled = !enabled;
    setIsVideoOff(!enabled);
  }, []);

  const endCall = () => {
    socketRef.current.disconnect();
    if (peerRef.current) peerRef.current.close();
    navigate("/user-video-chat");
    window.location.reload();
  };

  // speech recognition
  const startListening = () => {
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    setIsLoading(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect(
          "https://video-call-backend-test-production.up.railway.app/"
        );
        socketRef.current.emit("join room", roomID);

        socketRef.current.on("other user", (userID) => {
          console.log("Other user in the room:", userID);
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          console.log("User joined the room:", userID);
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleReceiveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        socketRef.current.on("receive message", handleReceiveMessage);
      });

    // Set up speech recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let latestTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        latestTranscript += event.results[i][0].transcript;
      }
      handleSendMessage(latestTranscript);
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [roomID]);

  const clearChat = () => {
    setMessages([]);
  };

  // holistic all parts
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
        handleSendMessage(data.prediction);
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
            console.log("No hand detections");
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
    setIsLoading(true);
    setIsToggleDisabled(true);
    setTimeout(() => {
      setIsToggleDisabled(false);
      setIsLoading(false);
    }, 3500);

    if (!newDetectionState && holisticRef.current) {
      holisticRef.current.close();
      holisticRef.current = null;
    } else if (newDetectionState) {
      initializeHolistic();
    }
  };
  
  return (
    <>
      {isLoading && <LoadingPopup opacity="" />}

      {deafUser && (
        <HolisticComponent
          // isNeedDetection={isNeedDetection}
          // isToggleDisabled={isToggleDisabled}
          // setPredict={setPredict}
          // setIsLoading={setIsLoading}
          // handleSendMessage={handleSendMessage}
          videoRef={videoRef}
          canvasRef={canvasRef}
        />
      )}
      <div className="flex flex-col items-center">
        {/* video stearm component */}
        <div className="flex flex-col items-center gap-4 px-5 pt-5 md:flex-row">
          <video
            ref={partnerVideo}
            autoPlay
            className={`w-full h-64 border-2 md:w-1/2 md:h-1/2 rounded-md ${
              !isPartnerVideoOff ? "hidden" : ""
            }`}
          />
          {!isPartnerVideoOff && (
            <div className="w-full h-full border-2 border-blue-500 rounded-md md:w-1/2 md:h-1/2">
              <img src={logo} alt="Logo" />
            </div>
          )}
          <video
            ref={userVideo}
            autoPlay
            muted={!isMuted}
            className={`w-full h-64 border-2 md:w-1/2 md:h-1/2 rounded-md ${
              !isVideoOff ? "hidden" : ""
            }`}
          />
          <p className="absolute p-3 text-black bg-white rounded-3xl right-10 top-10">
            Me
          </p>
          {!isVideoOff && (
            <div className="w-full h-full border-2 border-blue-500 rounded-md md:w-1/2 md:h-1/2">
              <img src={logo} alt="Logo" />
            </div>
          )}
        </div>

        {/* button section */}
        <div className="fixed flex flex-wrap justify-center h-12 gap-4 bottom-4">
          <button
            type="button"
            onClick={toggleModal}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 gap-2"
          >
            <FaRegClone />
            Copy
          </button>
          <button
            onClick={toggleMute}
            className="px-4 py-2 text-white bg-red-500 rounded-lg"
          >
            {isMuted ? (
              <FaMicrophoneAlt className="w-6 h-6" />
            ) : (
              <FaMicrophoneAltSlash className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={toggleVideo}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            {isVideoOff ? (
              <FaVideo className="w-6 h-6" />
            ) : (
              <FaVideoSlash className="w-6 h-6" />
            )}
          </button>
          {/* deaf users for only supported - sign detection system */}
          {deafUser && (
            <button
              onClick={checkNeedDetection}
              disabled={isToggleDisabled}
              className="px-4 py-2 text-white bg-green-500 rounded disabled:bg-green-300"
            >
              {isNeedDetection ? (
                <FaAngellist className="w-6 h-6" />
              ) : (
                "Disabled Detection"
              )}
            </button>
          )}
          {/* verbel users for only supported - voice to text messages */}
          {!deafUser && (
            <button
              onClick={isListening ? stopListening : startListening} // Toggle between start and stop
              className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded"
            >
              {isListening ? (
                <FaMicrophone className="w-6 h-6" />
              ) : (
                <FaMicrophoneSlash className="w-6 h-6" />
              )}
              Voice to Text
            </button>
          )}
          <button
            onClick={endCall}
            className="px-4 py-2 text-white bg-red-700 rounded"
          >
            <span className="flex gap-2">
              <FaPhoneSlash className="w-6 h-6" />
              End Call
            </span>
          </button>
        </div>

        <CopyLinkModal
          link={`${window.location.origin}/user-video-chat/room/${roomID}`}
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />

        {predict && (
          <p className="fixed p-3 text-black bg-white rounded-lg bottom-65 left-6 md:bottom-80">{` Message : ${predict}`}</p>
        )}
        <ChatFeature
          messages={messages}
          sendMessage={handleSendMessage}
          socketId={socketRef.current ? socketRef.current.id : null}
          clearChat={clearChat}
        />
      </div>
    </>
  );
};

export default Room;
