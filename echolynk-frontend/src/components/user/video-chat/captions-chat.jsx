import { DotIcon, Edit, Pen, Send, UserPlus } from "lucide-react"
import User1 from "../../../assets/image.png"
import { Textarea } from "../../../components/ui/textarea"
import { Input } from "../../../components/ui/input"

export const CaptionsChat = () => {
    return(
        <div className='flex flex-col w-full p-2 gap-3 h-2/5'>
            <div className='flex bg-blue-300 bg-opacity-70 px-3 py-1 justify-between align-middle rounded-md hover:bg-opacity-90 transition-all'>
                <h1 className='text-lg font-bold '>Captions</h1>
                <div className='flex'>
                    <Pen className='w-5 h-5 self-center'/>
                    <div className='flex -space-x-3'>
                        <DotIcon className='w-5 h-5 self-center'/>
                        <DotIcon className='w-5 h-5 self-center'/>
                        <DotIcon className='w-5 h-5 self-center'/>
                    </div>
                </div>
            </div>
            <div className="w-full p-3">
                <div className="flex flex-col w-full gap-3 h-full">
                    <div className="flex gap-6">
                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                        <div>
                            <p className='self-center italic text-gray-700'> User 1</p>
                            <p className='self-center'> Hi</p>
                        </div>
                    </div>
                    <div className="flex gap-6 self-end">
                        <div>
                            <p className='self-center italic text-gray-700'> You</p>
                            <p className='self-center'> Hi</p>
                        </div>
                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                    </div>
                    <div className="flex gap-6">
                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                        <div>
                            <p className='self-center italic text-gray-700'> User 1</p>
                            <p className='self-center'> Hi</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Input placeholder="Type your message" />
                    <Send className='w-5 h-5 self-center'/>
                </div>
            </div>
        </div>
    )
}