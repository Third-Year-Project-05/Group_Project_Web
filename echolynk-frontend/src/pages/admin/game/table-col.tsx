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

export type Game = {
    id: number
    name: string
    description: string
    level: string
    type: string
    rounds: number
}


export const columnsAll: ColumnDef<Game>[] = [
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
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "level",
        header: "Level",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "rounds",
        header: "Rounds",
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const Game = row.original
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
              onClick={() => navigator.clipboard.writeText(Game.id.toString())}
            >
              Copy Game ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View author</DropdownMenuItem> */}
            <DropdownMenuItem>View Game details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      
      )
    },
  },
  
]
