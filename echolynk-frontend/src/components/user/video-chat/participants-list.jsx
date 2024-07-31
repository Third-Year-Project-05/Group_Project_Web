import React from 'react';
import User1 from '../../../assets/image.png';
import { MicrophoneIcon, UserAddIcon } from '@heroicons/react/solid';
import { CameraOff, DotIcon, MicOff, Option, OptionIcon, UserPlus } from 'lucide-react';
import { Dot } from 'recharts';

export const ParticipantsList = () => {
    return (
        <div className='flex flex-col w-full p-2 gap-3 h-2/5'>
            <div className='flex bg-blue-300 bg-opacity-70 px-3 py-1 justify-between align-middle rounded-md hover:bg-opacity-90 transition-all'>
                <h1 className='text-lg font-bold '>Participants(4)</h1>
                <div className='flex'>
                    <UserPlus className='w-5 h-5 self-center'/>
                    <div className='flex -space-x-3'>
                        <DotIcon className='w-5 h-5 self-center'/>
                        <DotIcon className='w-5 h-5 self-center'/>
                        <DotIcon className='w-5 h-5 self-center'/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 overflow-y-scroll p-2 px-7'>
                <div className='flex flex-row justify-between'>
                    <div className='flex gap-6'>

                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                        <p className='self-center'>User 1</p>
                    </div>
                    <div className='flex gap-3 self-center'>

                        <MicOff className='w-5 h-5 opacity-35'/>
                        <CameraOff className='w-5 h-5 opacity-35'/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex gap-6'>

                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                        <p className='self-center'>User 2</p>
                    </div>
                    <div className='flex gap-3 self-center'>

                        <MicOff className='w-5 h-5'/>
                        <CameraOff className='w-5 h-5'/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex gap-6'>

                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                        <p className='self-center'>User 3</p>
                    </div>
                    <div className='flex gap-3 self-center'>

                        <MicOff className='w-5 h-5'/>
                        <CameraOff className='w-5 h-5'/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex gap-6'>

                        <img src={User1} alt="user1" className='rounded-full w-11 h-11'/>
                        <p className='self-center'>User 4</p>
                    </div>
                    <div className='flex gap-3 self-center'>

                        <MicOff className='w-5 h-5'/>
                        <CameraOff className='w-5 h-5'/>
                    </div>
                </div>
            </div>
        </div>
    );
}