import React from 'react';
import userPhoto from '../../../assets/Wikum.png';

const AdminMessages = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <h1 className="text-xl font-semibold mb-4">MESSAGES</h1>
            <div className='flex gap-5'>
                <div className='cursor-pointer hover:underline hover:underline-offset-8 transition-all rounded-lg p-2 '>
                    <p>All</p>
                </div>
                <div className='cursor-pointer hover:underline hover:underline-offset-8 transition-all rounded-lg p-2'>
                    <p>Unread</p>
                </div>
                <div className='cursor-pointer hover:underline hover:underline-offset-8 transition-all rounded-lg p-2'>
                    <p>Read</p>
                </div>  
            </div>

            <div className='flex gap-4 w-full h-3/4 rounded-md m-3'>
                <div className='flex flex-col gap-5 w-1/4 rounded-md'>
                    <div className='flex flex-row justify-between items-center p-2 rounded-md cursor-pointer active-msg dark:bg-blue-600'>
                        <div className='flex flex-row items-center gap-2'>
                            <img src={userPhoto} alt='profile' className='w-10 h-10 rounded-full' />
                            <p className='font-semibold'>John Doe</p>
                        </div>
                        <p>2 days ago</p>
                    </div>
                    <div className='flex flex-row justify-between items-center p-2 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-300'>
                        <div className='flex flex-row items-center gap-2'>
                            <img src={userPhoto} alt='profile' className='w-10 h-10 rounded-full' />
                            <p className='font-semibold'>John Doe</p>
                        </div>
                        <p>2 days ago</p>
                    </div>
                </div>
                
                <div className=' w-3/4 rounded-lg flex flex-col gap-4 border border-blue-200 p-3'>
                    <div className='overflow-y-scroll h-full p-2'>
                        <div className='flex flex-col gap-2 cursor-pointer group'>
                            <p className='ml-8 italic text-sm opacity-0 group-hover:opacity-100 transition-opacity'>2 days ago</p>
                            <div className='bg-gray-200 dark:bg-inherit dark:border w-2/6 ml-7 mr-auto rounded-xl p-3'>
                                <p>Hello, how are you?</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 cursor-pointer group'>
                            <p className='self-end italic text-sm opacity-0 group-hover:opacity-100 transition-opacity'>2 days ago</p>
                            <div className='bg-blue-500 w-1/2 ml-auto mr-0 rounded-xl mt-0 p-3'>
                                <p className='text-white'>Hello, how are you?</p>
                            </div>
                        </div>

                    </div>
                    
                    <div className='mt-auto flex justify-between items-center gap-2'>
                        <input type='text' placeholder='Type a message...' className='flex-grow p-2 rounded-lg border border-gray-300 dark:bg-inherit' />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
                            Send
                        </button>
                    </div>
                </div>
       
            </div>
        </div>
    );
}

export default AdminMessages;
