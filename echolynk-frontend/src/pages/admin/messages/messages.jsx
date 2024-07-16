import React from 'react';

const AdminMessages = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <h1 className="text-xl font-semibold mb-4">MESSAGES</h1>
            {/* <div className='flex gap-5'>
                <div className='cursor-pointer hover:bg-blue-200 transition-all rounded-lg p-2'>
                    <p>All</p>
                </div>
                <div className='cursor-pointer hover:bg-blue-200 transition-all rounded-lg p-2'>
                    <p>Unread</p>
                </div>
                <div className='cursor-pointer hover:bg-blue-200 transition-all rounded-lg p-2'>
                    <p>Read</p>
                </div>  
            </div> */}

            <div className='bg-orange-700 w-full h-full rounded-md'>
                <div className='flex flex-col gap-5 bg-slate-950 w-1/4 rounded-md'>
                    
                </div>
            </div>
        </div>
    );
}

export default AdminMessages;
