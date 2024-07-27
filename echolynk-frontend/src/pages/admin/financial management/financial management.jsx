import React from 'react';
import { TableNew } from './tables';

const AdminFinancialManagement = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4">
            <h1 className="text-xl font-semibold mb-4">FINANCIAL MANAGEMENT</h1>
            <TableNew />
        </div>
    );
}

export default AdminFinancialManagement;
