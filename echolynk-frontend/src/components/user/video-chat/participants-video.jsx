import User1 from '../../../assets/image.png';
import { Controllers } from './controllers';

export const ParticipantsVideo = () => {
    return (
        <div>
            <div className='flex flex-col w-full p-4 gap-3'>
                <div >
                    <img src={User1} alt="user1" className='rounded-md w-full h-96' />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <div>
                        <img src={User1} alt="user1" className='rounded-md'/>
                    </div>
                    <div>
                        <img src={User1} alt="user1" className='rounded-md'/>
                    </div>
                    <div>
                        <img src={User1} alt="user1" className='rounded-md'/>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <Controllers />

            </div>
        </div>
    );
};