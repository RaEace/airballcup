"use client";

import {Column, ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDown, ArrowUp, ChevronDown, ChevronUp} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {FunctionComponent, ReactNode} from "react";

export type EloEntry = {
    rank: number;
    teamName: string;
    elo: number;
    wins: number;
    losses: number;
    winRate: number;
};

export const columns: ColumnDef<EloEntry>[] = [
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
        accessorKey: "teamName",
        header: ({ column }) => {
            return <SortingBtnHeader column={column}>
                Équipe
            </SortingBtnHeader>
        },
        cell: ({ row }) => {
            const rank = row.getValue<number>("rank");
            const teamName = row.getValue<string>("teamName");
            return <div className={"flex items-center font-text"}>
                <span className={cn(
                    {"text-yellow-300": rank === 1},
                    {"text-gray-300": rank === 2},
                    {"text-orange-300": rank === 3},
                )}>{teamName}</span>
            </div>
        }
    },
    {
        accessorKey: "wins",
        header: ({ column }) =>
            <SortingBtnHeader color={"green-500"} column={column}>
                Victoires
            </SortingBtnHeader>,
        enableHiding: true,
    },
    {
        accessorKey: "losses",
        header: ({ column }) =>
            <SortingBtnHeader color={"primary-500"} column={column}>
                Défaites
            </SortingBtnHeader>,
        enableHiding: true,
    },
    {
        accessorKey: "gamesPlayed",
        header: ({ column }) => {
            return <SortingBtnHeader column={column}>Parties jouées</SortingBtnHeader>
        },
        enableHiding: true,
    },
    {
        accessorKey: "winRate",
        header: ({ column }) =>
            <SortingBtnHeader column={column}>Taux de victoire</SortingBtnHeader>,
        cell: ({ row }) => {
            const wins = row.getValue<number>("wins");
            const losses = row.getValue<number>("losses");
            const winRate = row.getValue<number>("winRate");
            return <span>{wins + losses > 0 ? `${winRate}%` : "-"}</span>;
        },
        enableHiding: true,
    },
    {
        accessorKey: "elo",
        header: ({ column }) => {
            return (
                <SortingBtnHeader column={column}>
                    ELO
                </SortingBtnHeader>
            );
        },
        cell: ({ row }) => {
            const rank = row.getValue<number>("rank");
            const elo = row.getValue<number>("elo");

            const Chevron = row.getIsExpanded() ? ChevronUp : ChevronDown;

            return <div className={"flex justify-between items-center gap-2 w-full"}>
                <span className={cn(
                    "font-text",
                    {"text-yellow-300": rank === 1},
                    {"text-gray-300": rank === 2},
                    {"text-orange-300": rank === 3},
                )}>{elo}</span>
                {row.getCanExpand() && <Chevron className={"size-4"} />}
            </div>;
        }
    },
];

const SortingBtnHeader: FunctionComponent<{
    children: ReactNode;
    column: Column<EloEntry, unknown>;
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