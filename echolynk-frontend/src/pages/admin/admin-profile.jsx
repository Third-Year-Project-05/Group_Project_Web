import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import userPhoto from '../../assets/Wikum.png';
import { CameraIcon } from 'lucide-react';
import { getUser } from '../../services/userService';

const AdminProfile = () => {
    const [profileImage, setProfileImage] = useState(userPhoto);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('********');
    const fileInputRef = useRef(null);

    // Retrieve userId from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    console.log('User ID:', userId);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                console.error('No userId found in local storage');
                return;
            }

            try {
                const userData = await getUser(userId);
                console.log('Fetched User Data:', userData);

                setName(userData.userName || '');
                setEmail(userData.email || '');
                setProfileImage(userData.photo || userPhoto);
            } catch (error) {
                console.error('Failed to fetch user data:', error.message);
                // Optionally display an error message to the user
            }
        };

        fetchUser();
    }, [userId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <div className='relative w-16 h-16'>
                            <img
                                src={profileImage}
                                alt="User Photo"
                                className="w-16 h-16 rounded-full cursor-pointer object-cover"
                                onClick={handleImageClick}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-30 transition-opacity opacity-0 hover:opacity-100"
                            >
                                <CameraIcon className="h-8 w-8 text-white cursor-pointer" onClick={handleImageClick} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <p className="text-gray-600">{email}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button variant="primary" className="mr-4">Save Changes</Button>
                    <Button variant="secondary">Cancel</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AdminProfile;
