import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { CameraIcon } from '@heroicons/react/outline';
import userPhoto from '../../assets/Wikum.png';

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSaveProfile = () => {
    // Handle save profile logic here
    console.log('Profile saved', { fullName, bio, email });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className=" text-white p-4 rounded-t-md" style={{backgroundColor: '#1966B4'}}>
          <h2 className="text-2xl font-bold">User Profile</h2>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                className="hidden"
                onChange={handleImageChange}
              />
              <img
                src={userPhoto || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-blue-500 cursor-pointer object-cover"
                onClick={() => document.getElementById('profileImage').click()}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-150">
                <CameraIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              rows="4"
              placeholder="Tell us about yourself"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
              Birthday
            </Label>
            <Input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your birthday"
            />
          </div>
          <div>
            <Label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </Label>
            <Input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your mobile number"
            />
          </div>
        </CardContent>
        <CardFooter className=" p-4 rounded-b-md flex justify-end space-x-4">
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            onClick={handleSaveProfile}
          >
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
