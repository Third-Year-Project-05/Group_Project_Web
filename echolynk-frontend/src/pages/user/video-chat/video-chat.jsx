import { CaptionsChat } from "../../../components/user/video-chat/captions-chat";
import { ParticipantsList } from "../../../components/user/video-chat/participants-list";
import { ParticipantsVideo } from "../../../components/user/video-chat/participants-video";
import  CreateRoom  from "./createRoom";
import React from "react";

const VideoChat = () => {
    return (
        <div className="ml-16 flex flex-col justify-center">
            <h1 className='text-2xl font-bold ml-5'>Video Call</h1>
            {/* <div className="flex"> */}
                <div className="flex flex-col w-4/5 p-2 gap-5 justify-center">
                    <CreateRoom className='self-center align-middle '/>
                    {/* <ParticipantsList /> */}
                    {/* <CaptionsChat /> */}
                </div>
            {/* </div> */}
        </div>
    );
}

export default VideoChat;