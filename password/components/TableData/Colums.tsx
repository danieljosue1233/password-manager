"use client"

import { Button } from "@components/ui/button";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@components/ui/dropdown-menu";
import { toast } from "@hooks/use-toast";
import { Element } from "@prisma/client"
import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { Copy, MoreHorizontal, User } from "lucide-react";



export type ColumProps = Element

const caseInsensitiveFilter: FilterFn<any> = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    return String(cellValue).toLowerCase().includes(String(value).toLowerCase());
};

export const columns: ColumnDef<ColumProps>[] = [
    {
        accessorKey: "name",
        header: "Name",
        filterFn: caseInsensitiveFilter,
    },
    {
        accessorKey: "typeElement",
        header: "Type Element",
        enableGlobalFilter: true
    },
    {
        accessorKey: "urlWebsite",
        header: "Url website",
        enableGlobalFilter: true
    },
    {
        accessorKey: "directory",
        header: "Directory",
        enableGlobalFilter: true
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const password = row.original.password;
            const username = row.original.username;

            const onEditElement = () => {
                window.location.href = `/element/${row.original.id}`;
            };

            const copyItemClipboard = (item: string, name: string) => {
                navigator.clipboard.writeText(item)
                toast({
                    title: `${name} copied✅`
                })
            }

            return (
                <div className="flex gap-2 justify-center items-center">
                    {password && (
                        <Copy className="w-4 h-4 cursor-pointer"
                            onClick={() => copyItemClipboard(password, "Password")}
                        />
                    )}
                    {username && (
                        <User className="w-4 h-4 cursor-pointer" onClick={() => copyItemClipboard(username, "Username")} />
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer" onClick={onEditElement}>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
];
