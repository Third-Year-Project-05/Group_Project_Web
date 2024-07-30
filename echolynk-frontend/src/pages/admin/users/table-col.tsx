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

export type User = {
    id: number
    name: string
    email: string
    created_on: string
    type: string
    status: string
}


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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "created_on",
        header: "Created On",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ cell }) => {
            const value = cell.getValue() as string;
            const style = {
                backgroundColor: value === 'Premium' ? 'rgba(255, 215, 0, 0.4)' : 'rgba(0, 128, 0, 0.5)',
                padding: '5px',
                borderRadius: '12px', 
                  
            };
            return (
                <span style={style} className="self-center">
                    {value}
                </span>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const User = row.original
      const [isPopupOpen, setIsPopupOpen] = useState(false);

      const handleApprove = () => {
        console.log('Approve action!');
        // approval logic
      }

      const handleOpenPopup = () => {
        setIsPopupOpen(true);
        document.body.style.overflow = 'hidden'; 
      };
    
      const handleClosePopup = () => {
        setIsPopupOpen(false);
        document.body.style.overflow = 'auto'; 
      };

      const handleConfirm = () => {
        console.log('Action confirmed!');
        handleClosePopup();
        // confirmation logic
      };

      return (

     
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(User.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View author</DropdownMenuItem> */}
            <DropdownMenuItem>View User details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      
      )
    },
  },
  
]
