"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, LayoutDashboard  } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PostamatColumn = {
  id: string;
  name: string;
  status: string;
  total: string;
  free: string;
  loaded: string;
  region: string,
  city: string;
  address: string;
  sizes: string;
  location: string;
};

export const columns: ColumnDef<PostamatColumn>[] = [
  {
    accessorKey: "name",
    header: "Номер",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Статус
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <Badge
          variant={status === "ON" ? "outline" : "destructive"}
          className={status === "ON" ? "bg-green-500 text-white ml-4" : "ml-4"}
        >
          {status === "ON" ? "Online" : "Offline"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Ячейки",
  },
  {
    accessorKey: "free",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Свободно
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { free } = row.original;

      return <div className="ml-10">{free}</div>;
    },
  },
  {
    accessorKey: "loaded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Занято
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { loaded } = row.original;

      return <div className=" ml-14">{loaded}</div>;
    },
  },
  {
    accessorKey: "region",
    header: "Регион"
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Город
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    accessorKey: "sizes",
    header: "Детали",
    cell: ({ row }) => {
      const { sizes } = row.original;
      const size = Object.entries(sizes);

      return (
        <div className="">
          {
            <Popover>
              <PopoverTrigger className=" font-bold"><LayoutDashboard className="h-6 w-6 ml-2"/></PopoverTrigger>
              <PopoverContent>
                <ul>
                  {size.map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          }
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "",
    id: "actions",
    cell: ({ row }) => {
      const { location } = row.original;

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
              onClick={() => {
                navigator.clipboard.writeText(location);
                toast.success("Координата скопирована!");
              }}
            >
              Копировать
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
