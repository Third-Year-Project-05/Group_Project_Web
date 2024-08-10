import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import React, { useState } from "react";

export type User = {
    email: string;
    userName: string;
    phoneNumber: string;
    role: string;
    timestamp: {
        seconds: number;
        nanos: number;
    };
};

// Convert backend timestamp to JavaScript Date object
const convertTimestampToDate = (timestamp: { seconds: number; nanos: number }): Date => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanos / 1000000;
    return new Date(milliseconds);
};

export const columnsAll: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "userName",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "timestamp",
        header: "Created On",
        cell: ({ cell }) => {
            const value = cell.getValue() as { seconds: number; nanos: number };
            const date = convertTimestampToDate(value);
            return date.toLocaleDateString();
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ cell }) => {
            const value = cell.getValue() as string;
            const style = {
                backgroundColor: value === 'Premium' ? 'rgba(255, 215, 0, 0.4)' : 'rgba(0, 128, 0, 0.5)',
                padding: '7px',
                borderRadius: '14px',
            };
            return <span style={style} className="self-center">{value}</span>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const User = row.original;
            const [isPopupOpen, setIsPopupOpen] = useState(false);

            const handleEdit = () => {
                console.log('Edit action for user:', User.userName);
                // edit logic
            };

            const handleDelete = () => {
                console.log('Delete action for user:', User.userName);
                // delete logic
            };

            return (
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleEdit}
                    >
                        <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleDelete}
                    >
                        <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            );
        },
    },
];
