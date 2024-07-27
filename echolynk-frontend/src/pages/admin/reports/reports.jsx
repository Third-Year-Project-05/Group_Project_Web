// import React from 'react';
import { Chart1 } from '../../../components/admin/reports-chart';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../../../components/ui/select';
// import { Label } from '../../../components/ui/label';
// import { DatePicker } from '@shadcn/components';


const AdminReports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle report generation logic here
        console.log('Generating report from', startDate, 'to', endDate);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Generate Report</h2>
                    <p className="text-gray-600">Select the date range to generate reports on revenue, users, etc.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p className="block text-sm font-medium text-gray-700">Report Type</p>
                            <Select value={reportType} onValueChange={setReportType} required>
                                <SelectTrigger className="mt-1 block w-full border  rounded-md shadow-sm ">
                                    {reportType || "Select a report type"}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="revenue">Revenue</SelectItem>
                                    <SelectItem value="users">Users</SelectItem>
                                    <SelectItem value="activity">Activity</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="block text-sm font-medium text-gray-700">From</p>
                            <Input 
                                id="start-date" 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                className="mt-1 block w-full border  rounded-md shadow-sm "
                                required
                            />
                        </div>
                        <div>
                            <p className="block text-sm font-medium text-gray-700">To</p>
                            <Input 
                                id="end-date" 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                className="mt-1 block w-full border  rounded-md shadow-sm "
                                required
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        Generate Report
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>

    );
}

export default AdminReports;
