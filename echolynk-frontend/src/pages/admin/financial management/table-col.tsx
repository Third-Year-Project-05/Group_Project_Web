import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Checkbox } from "../../../components/ui/checkbox"
import ConfirmationPopup from "../../../components/confirmationPopup"
import { useState } from "react"


export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


export const columnsNew: ColumnDef<Payment>[] = [
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
        accessorKey: "id",
        header: "ID",
        // cell: ({ value }) => value,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "amount",
        header: "Amount",
        // cell: ({ value }) => value,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        // cell: ({ value }) => value,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "email",
        header: "Email",
        // cell: ({ value }) => value,
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
        const [isOpen, setIsOpen] = useState(false)
        return (
            <DropdownMenu>
            <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => {
                    console.log("Edit", row.original)
                }}
                >
                Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                onClick={() => {
                    console.log("Delete", row.original)
                }}
                >
                Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )
        },
        enableSorting: false,
        enableHiding: false,
    },
  
]