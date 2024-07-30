import { SpeakerphoneIcon } from "@heroicons/react/solid"
import { ExitIcon, SpeakerLoudIcon, SpeakerModerateIcon } from "@radix-ui/react-icons"
import { AudioLines, Camera, DotIcon, Mic, ScreenShare, Speaker, SpeakerIcon, StopCircle } from "lucide-react"

export const Controllers = () => {
    return(
        <div className='flex flex-col gap-3 mb-4'>
            <div className='flex gap-3 justify-between'>
                <SpeakerModerateIcon className='w-5 h-5 self-center'/>
                <div className="flex gap-10">
                    <Mic className='w-5 h-5 self-center'/>
                    <Camera className='w-5 h-5 self-center'/>
                </div>
                <ScreenShare className='w-5 h-5 self-center'/>
                <div className='flex -space-x-3 self-center'>
                    <DotIcon className='w-5 h-5 self-center'/>
                    <DotIcon className='w-5 h-5 self-center'/>
                    <DotIcon className='w-5 h-5 self-center'/>
                </div>
                <div className="bg-red-600 p-1 bg-opacity-70 rounded-sm">

                    <ExitIcon className='w-7 h-7 '/>
                </div>
            </div>
        </div>
    )
}