import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../../../components/ui/select';
import { getReportData } from '../../../api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminReports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        getReportData(startDate, endDate, reportType)
            .then((response) => setData(response))
            .catch((error) => console.error('Error fetching report data:', error));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Data Report", 20, 20);
        
        // Example of adding table headers
        let headers = [["ID", "Name", "Email", "Timestamp"]];
        let rows = data.map(user => [
            user.userId, 
            user.userName, 
            user.email, 
            new Date(user.timestamp.seconds * 1000).toLocaleString()
        ]);
        console.log(rows);
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 30,
            styles: { fontSize: 10, cellPadding: 3 },
            margin: { top: 30 }
        });

        doc.save("report.pdf");
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Generate Report</h2>
                    <p className="text-gray-600">Select the date range to generate reports on revenue, users, etc.</p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <p className="block text-sm font-medium text-gray-700">Report Type</p>
                            <Select value={reportType} onValueChange={setReportType} required>
                                <SelectTrigger className="mt-1 block w-full border rounded-md shadow-sm ">
                                    {reportType || "Select a report type"}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="revenue">Revenue</SelectItem>
                                    <SelectItem value="user">Users</SelectItem>
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
                                className="mt-1 block w-full border rounded-md shadow-sm "
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
                                className="mt-1 block w-full border rounded-md shadow-sm "
                                required
                            />
                        </div>
                    </form>
                    {data.length > 0 && (
                        <div className="mt-4">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Email</th>
                                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((user, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{'USR-'+ user.userId.slice(-4)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{user.userName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                            <td className="border border-gray-300 px-4 py-2">{new Date(user.timestamp.seconds * 1000).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
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
                        onClick={generatePDF}
                        disabled={data.length === 0}
                    >
                        Download PDF
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default AdminReports;
