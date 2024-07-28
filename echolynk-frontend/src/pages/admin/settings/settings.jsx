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
import { X } from 'lucide-react'; // Assuming you use lucide-react for icons

const AdminSettings = () => {
  const [newEmail, setNewEmail] = useState('');
  const [notificationEmails, setNotificationEmails] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [adminNotifications, setAdminNotifications] = useState('all');

  const handleAddEmail = () => {
    if (newEmail && !notificationEmails.includes(newEmail)) {
      setNotificationEmails([...notificationEmails, newEmail]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setNotificationEmails(notificationEmails.filter(email => email !== emailToRemove));
  };

  const handleSaveSettings = () => {
    // Handle saving settings logic here
    console.log('Settings saved', { notificationEmails, theme, isTwoFactorEnabled, adminNotifications });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg transition-all duration-300">
        <CardHeader className="bg-blue-500 text-white p-4 rounded-t-md transition-colors duration-300">
          <h2 className="text-2xl font-bold">Admin Settings</h2>
        </CardHeader>
        <CardContent className="p-4 space-y-6 transition-all duration-300">
          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Notification Emails</p>
            <div className="flex space-x-2">
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 block w-full  rounded-md shadow-sm  transition-all duration-300"
                placeholder="Enter a notification email"
              />
              <Button
                type="button"
                onClick={handleAddEmail}
                className="bg-blue-500 hover:bg-blue-700 dark:text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
              >
                Add Email
              </Button>
            </div>
            {notificationEmails.length > 0 && (
              <ul className="mt-2 space-y-1">
                {notificationEmails.map((email, index) => (
                  <li key={index} className="flex items-center justify-between border border-gray-300 rounded p-2 transition-all duration-300">
                    <span>{email}</span>
                    <Button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="text-red-500 hover:text-red-700 dark:text-white bg-inherit hover:bg-inherit focus:outline-none transition-all duration-300"
                    >
                      <X size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Theme</p>
            <Select value={theme} onValueChange={setTheme} required>
              <SelectTrigger className="relative mt-1 block w-full  rounded-md shadow-sm  transition-all duration-300">
                <span>{theme || 'Select a theme'}</span>

              </SelectTrigger>
              <SelectContent className="transition-all duration-300">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Two-Factor Authentication</p>
            <div className="flex items-center">
              <Switch checked={isTwoFactorEnabled} onCheckedChange={setIsTwoFactorEnabled} className="transition-all duration-300" />
              <span className="ml-2 text-sm">{isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Admin Notifications</p>
            <Select value={adminNotifications} onValueChange={setAdminNotifications} required>
              <SelectTrigger className="relative mt-1 block w-full  rounded-md shadow-sm  transition-all duration-300">
                <span>{adminNotifications || 'Select notification setting'}</span>

              </SelectTrigger>
              <SelectContent className="transition-all duration-300">
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="important">Important Activities Only</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className=" p-4 rounded-b-md flex justify-end space-x-4 transition-all duration-300">
          <Button
            type="button"
            variant="primary"
            className="bg-blue-500 hover:bg-blue-700 dark:text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettings;
