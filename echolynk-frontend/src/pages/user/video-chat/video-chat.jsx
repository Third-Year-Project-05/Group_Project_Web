import { CaptionsChat } from "../../../components/user/video-chat/captions-chat";
import { ParticipantsList } from "../../../components/user/video-chat/participants-list";
import { ParticipantsVideo } from "../../../components/user/video-chat/participants-video";
import React from "react";

const VideoChat = () => {
    return (
        <div className="ml-16">
            <h1 className='text-2xl font-bold ml-5'>Video Call</h1>
            <div className="flex">
                <ParticipantsVideo />
                <div className="flex flex-col w-3/5 p-2 gap-5">
                    <ParticipantsList />
                    <CaptionsChat />
                </div>
            </div>
        </div>
    );
}

export default VideoChat;