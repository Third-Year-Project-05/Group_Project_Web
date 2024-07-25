import React from 'react';
import { Chart1 } from '../../../components/admin/reports-chart';

const AdminReports = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4">
            <h1 className="text-xl font-semibold mb-4">REPORTS</h1>
            <Chart1/>
        </div>


    );
}

export default AdminReports;
