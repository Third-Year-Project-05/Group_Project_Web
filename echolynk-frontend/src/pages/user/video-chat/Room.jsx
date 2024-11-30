import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

import HolisticComponent from "./HolisticComponent";
import ChatFeature from "./components/ChatFeature";

const Room = ({ roomID }) => {
  const userVideo = useRef(null);
  const partnerVideo = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);
  const otherUser = useRef(null);
  const userStream = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("http://localhost:8000");
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

        // Listen for messages
        socketRef.current.on("receive message", handleReceiveMessage);
      });

    return () => {
      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [roomID]);

  const sendMessage = (message) => {
    console.log("Sending message:", message);

    socketRef.current.emit("send message", { text: message, roomID });
    setMessages((prev) => [
      ...prev,
      { sender: socketRef.current.id, text: message },
    ]);
    console.log(messages);
  };

  function handleReceiveMessage(data) {
    console.log("msg reciieved", data);
    setMessages((prev) => [
      ...prev,
      { sender: data["sender"], text: data["text"] },
    ]);
    console.log(messages);
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
    window.location.reload(); // Reload the page or navigate to a different page
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-4">
          <HolisticComponent />
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
          <button
            onClick={toggleMute}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button
            onClick={toggleVideo}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            {isVideoOff ? "Turn Video On" : "Turn Video Off"}
          </button>
          <button
            onClick={endCall}
            className="px-4 py-2 text-white bg-gray-700 rounded"
          >
            End Call
          </button>
        </div>
        <ChatFeature messages={messages} sendMessage={sendMessage} />
      </div>
    </>
  );
};

export default Room;
