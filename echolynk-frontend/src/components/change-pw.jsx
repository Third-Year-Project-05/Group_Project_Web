import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            setSuccess('');
            return;
        }

        // Implement password change logic here
        // E.g., send currentPassword and newPassword to the server

        // If successful:
        setSuccess('Password changed successfully.');
        setError('');
        // If there's an error:
        // setError('An error occurred.');
    };

    return (
        <div className="flex items-start justify-center mb-5">
            <Card className="w-full max-w-md p-8 space-y-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">Change Password</CardTitle>
                    <CardDescription className="text-center">Enter your current and new passwords to change your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>}
                    {success && <div className="p-2 text-green-600 bg-green-100 border border-green-400 rounded">{success}</div>}

                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                            <Input
                                type="password"
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full mt-1"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <Input
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-1"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <Input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-1"
                                required
                            />
                        </div>

                        <div>
                            <Button type="submit" className="w-full">
                                Change Password
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePasswordPage;
