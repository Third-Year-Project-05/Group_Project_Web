import React, { useState } from 'react';
import {

  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
 
} from '../../../components/ui/select';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';


const AdminSettings = () => {
  const [notificationEmail, setNotificationEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleSaveSettings = () => {
    // Handle saving settings logic here
    console.log('Settings saved', { notificationEmail, theme, isTwoFactorEnabled, language });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-blue-500 text-white p-4 rounded-t-md">
          <h2 className="text-2xl font-bold">Admin Settings</h2>
        </CardHeader>
        <CardContent className="p-4 bg-white space-y-6">
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Notification Email</p>
            <Input
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your notification email"
            />
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Theme</p>
            <Select value={theme} onValueChange={setTheme} required>
              <SelectTrigger className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
                {theme || 'Select a theme'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</p>
            <div className="flex items-center">
              <Switch checked={isTwoFactorEnabled} onCheckedChange={setIsTwoFactorEnabled} />
              <span className="ml-2 text-sm">{isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Language</p>
            <Select value={language} onValueChange={setLanguage} required>
              <SelectTrigger className="mt-1 block w-full border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
                {language || 'Select a language'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="si">Sinhala</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 rounded-b-md flex justify-end space-x-4">
          <Button
            type="button"
            variant="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettings;
