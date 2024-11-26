import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const Room = ({ roomID }) => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("http://localhost:8000");
            socketRef.current.emit("join room", roomID);

            socketRef.current.on("other user", userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleReceiveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

        // Cleanup on unmount
        return () => {
            if (peerRef.current) peerRef.current.close();
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [roomID]);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    } 

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.stunprotocol.org" },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com' 
                }
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        });
    }

    function handleReceiveCall(incoming) {
        peerRef.current.setRemoteDescription(new RTCSessionDescription(incoming.sdp)).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
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
                candidate: e.candidate
            }
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
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-4">
                <video
                    ref={userVideo}
                    autoPlay
                    muted
                    className="w-1/2 h-1/2 border-2 border-blue-500"
                />
                <video
                    ref={partnerVideo}
                    autoPlay
                    className="w-1/2 h-1/2 border-2 border-green-500"
                />
            </div>
            <div className="mt-4 flex gap-4">
                <button
                    onClick={toggleMute}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    {isMuted ? "Unmute" : "Mute"}
                </button>
                <button
                    onClick={toggleVideo}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {isVideoOff ? "Turn Video On" : "Turn Video Off"}
                </button>
                <button
                    onClick={endCall}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                    End Call
                </button>
            </div>
        </div>
    );
};

export default Room;
