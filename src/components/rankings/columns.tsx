"use client";

import {Column, ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDown, ArrowUp, ChevronDown, ChevronUp, Pencil, Trash2, Check, X} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {FunctionComponent, ReactNode} from "react";
import {CompleteRanking} from "@/app/(app)/rankings/[id]/page.tsx";

export type EditingState = {
    rank: number;
    playerName: string;
    eloRating: number;
};

export type ActionsCallbacks = {
    editingRowId: string | null;
    editingValues: EditingState;
    onEdit: (rowId: string, values: EditingState) => void;
    onSave: (rowId: string) => void;
    onCancel: () => void;
    onDelete: (rowId: string) => void;
    onChangeField: (field: keyof EditingState, value: string | number) => void;
};

export function getColumns(isAdmin: boolean, actions?: ActionsCallbacks): ColumnDef<CompleteRanking>[] {
    const base: ColumnDef<CompleteRanking>[] = [
        {
            accessorKey: "rank",
            header: ({column}) => (
                <SortingBtnHeader column={column}>#</SortingBtnHeader>
            ),
            cell: ({row}) => {
                const rank = row.getValue<number>("rank");
                if (isAdmin && actions && actions.editingRowId === row.id) {
                    return (
                        <input
                            type="number"
                            value={actions.editingValues.rank}
                            onChange={(e) => actions.onChangeField("rank", Number(e.target.value))}
                            className="w-14 bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-white text-sm font-mono"
                        />
                    );
                }
                return (
                    <span className={cn(
                        "font-text",
                        {"text-yellow-300": rank === 1},
                        {"text-gray-300": rank === 2},
                        {"text-orange-300": rank === 3},
                    )}>{rank}</span>
                );
            },
        },
        {
            accessorKey: "playerName",
            header: ({column}) => (
                <SortingBtnHeader column={column}>Équipe</SortingBtnHeader>
            ),
            cell: ({row}) => {
                const rank = row.getValue<number>("rank");
                const playerName = row.getValue<string>("playerName");
                if (isAdmin && actions && actions.editingRowId === row.id) {
                    return (
                        <input
                            type="text"
                            value={actions.editingValues.playerName}
                            onChange={(e) => actions.onChangeField("playerName", e.target.value)}
                            className="w-40 bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-white text-sm font-mono"
                        />
                    );
                }
                return (
                    <div className={"flex items-center font-text"}>
                        <span className={cn(
                            {"text-yellow-300": rank === 1},
                            {"text-gray-300": rank === 2},
                            {"text-orange-300": rank === 3},
                        )}>{playerName}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "eloRating",
            header: ({column}) => (
                <SortingBtnHeader column={column}>ELO</SortingBtnHeader>
            ),
            cell: ({row}) => {
                const rank = row.getValue<number>("rank");
                const eloRating = row.getValue<number>("eloRating");
                const Chevron = row.getIsExpanded() ? ChevronUp : ChevronDown;

                if (isAdmin && actions && actions.editingRowId === row.id) {
                    return (
                        <input
                            type="number"
                            value={actions.editingValues.eloRating}
                            onChange={(e) => actions.onChangeField("eloRating", Number(e.target.value))}
                            className="w-20 bg-gray-800 border border-gray-600 rounded px-1 py-0.5 text-white text-sm font-mono"
                        />
                    );
                }

                return (
                    <div className={"flex justify-between items-center gap-2 w-full"}>
                        <span className={cn(
                            "font-text",
                            {"text-yellow-300": rank === 1},
                            {"text-gray-300": rank === 2},
                            {"text-orange-300": rank === 3},
                        )}>{eloRating}</span>
                        {row.getCanExpand() && <Chevron className={"size-4"}/>}
                    </div>
                );
            },
        },
    ];

    if (isAdmin && actions) {
        base.push({
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({row}) => {
                const isEditing = actions.editingRowId === row.id;
                if (isEditing) {
                    return (
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-green-400 hover:text-green-300 hover:bg-green-900/30"
                                onClick={() => actions.onSave(row.id)}
                                title="Enregistrer"
                            >
                                <Check className="size-4"/>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                                onClick={actions.onCancel}
                                title="Annuler"
                            >
                                <X className="size-4"/>
                            </Button>
                        </div>
                    );
                }
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                            onClick={() => actions.onEdit(row.id, {
                                rank: row.original.rank,
                                playerName: row.original.playerName,
                                eloRating: row.original.eloRating,
                            })}
                            title="Modifier"
                        >
                            <Pencil className="size-4"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                            onClick={() => actions.onDelete(row.id)}
                            title="Supprimer"
                        >
                            <Trash2 className="size-4"/>
                        </Button>
                    </div>
                );
            },
        });
    }

    return base;
}

/** Kept for backwards-compat — callers that don't need admin actions */
export const columns = getColumns(false);

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
            className={color ? `text-${color}` : undefined}
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
};
