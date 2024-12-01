import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getReportData } from '../../../api';

export const generateReport = (startDate, endDate, reportType) => {
    const [data, setData] = useState([]);
    console.log(data);

    getReportData(startDate, endDate, reportType)
        .then((response) => setData(response))
        .catch((error) => console.error('Error fetching report data:', error));


    // Render the report
    return (
        <div>
            <h1>Data Report</h1>
            {data.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.timestamp}</td>
                                {/* Add more fields as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available for the selected date range and report type.</p>
            )}
        </div>
    );
};

// export default generateReport;
