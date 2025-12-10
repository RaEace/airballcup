"use client";

import {Column, ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDown, ArrowUp, ChevronDown, ChevronUp} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {FunctionComponent, ReactNode} from "react";
import {CompleteRanking} from "@/app/(app)/rankings/[id]/page.tsx";

export const columns: ColumnDef<CompleteRanking>[] = [
    {
        accessorKey: "rank",
        header: ({ column }) => {
            return (
                <SortingBtnHeader column={column}>
                    #
                </SortingBtnHeader>
            );
        },
        cell: ({ row }) => {
            const rank = row.getValue<number>("rank");
            return <span className={cn(
                "font-text",
                {"text-yellow-300": rank === 1},
                {"text-gray-300": rank === 2},
                {"text-orange-300": rank === 3},
            )}>{rank}</span>
        },
    },
    {
        accessorKey: "playerName",
        header: ({ column }) => {
            return <SortingBtnHeader column={column}>
                Équipe
            </SortingBtnHeader>
        },
        cell: ({ row }) => {
            const rank = row.getValue<number>("rank");
            const playerName = row.getValue<string>("playerName");
            return <div className={"flex items-center font-text"}>
                <span className={cn(
                    {"text-yellow-300": rank === 1},
                    {"text-gray-300": rank === 2},
                    {"text-orange-300": rank === 3},
                )}>{playerName}</span>
            </div>
        }
    },
    {
        accessorKey: "eloRating",
        header: ({ column }) => {
            return (
                <SortingBtnHeader column={column}>
                    ELO
                </SortingBtnHeader>
            );
        },
        cell: ({ row }) => {
            const rank = row.getValue<number>("rank");
            const eloRating = row.getValue<number>("eloRating");

            const Chevron = row.getIsExpanded() ? ChevronUp : ChevronDown;

            return <div className={"flex justify-between items-center gap-2 w-full"}>
                <span className={cn(
                    "font-text",
                    {"text-yellow-300": rank === 1},
                    {"text-gray-300": rank === 2},
                    {"text-orange-300": rank === 3},
                )}>{eloRating}</span>
                {row.getCanExpand() && <Chevron className={"size-4"} />}
            </div>;
        }
    },
];

const SortingBtnHeader: FunctionComponent<{
    children: ReactNode;
    column: Column<CompleteRanking, unknown>;
    color?: string;
}> = ({children, column, color}) => {
    const Arrow = column.getIsSorted() === "asc" ? ArrowUp : ArrowDown;

    return (
        <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={color && `text-${color}`}
        >
            {children}
            {column.getIsSorted() && (
                <Arrow
                    size={16}
                    className={cn("ml-1 transition-all transform duration-75", color && `text-${color}`)}
                />
            )}
        </Button>
    );
}