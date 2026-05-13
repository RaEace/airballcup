"use client";

import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    ExpandedState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import useMediaQuery from "@/hooks/use-media-query.ts";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {CompleteRanking} from "@/app/(app)/rankings/[id]/page.tsx";
import {getColumns, EditingState} from "@/components/rankings/columns.tsx";
import {deleteRanking, updateRanking} from "@/components/rankings/actions.ts";

interface EloRankingProps {
    rankings: CompleteRanking[];
    seasonId: string;
    isAdmin?: boolean;
}

function sortNumberRows(a: Row<number>, b: Row<number>) {
    return a.original - b.original;
}

function sortStringRows(a: Row<string>, b: Row<string>) {
    return a.original.localeCompare(b.original);
}

const EloRankingTable: FunctionComponent<EloRankingProps> = ({rankings: initialData, seasonId, isAdmin = false}) => {
    const [data, setData] = useState<CompleteRanking[]>(initialData);
    const [sort, setSort] = useState<SortingState>([]);
    const [visibility, setVisibility] = useState<VisibilityState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editingValues, setEditingValues] = useState<EditingState>({rank: 0, playerName: "", eloRating: 0});
    const [busy, setBusy] = useState(false);
    const isMedium = useMediaQuery("(max-width: 768px)");

    // [[header, color]]
    const hiddenHeaders = {
        rank: ["#"],
        wins: ["V", "text-green-500"],
        losses: ["D", "text-red-500"],
        matchesPlayed: ["J"],
        winRate: ["WR"],
    };

    const handleEdit = useCallback((rowId: string, values: EditingState) => {
        setEditingRowId(rowId);
        setEditingValues(values);
    }, []);

    const handleCancel = useCallback(() => {
        setEditingRowId(null);
    }, []);

    const handleChangeField = useCallback((field: keyof EditingState, value: string | number) => {
        setEditingValues((prev) => ({...prev, [field]: value}));
    }, []);

    const handleSave = useCallback(async (rowId: string) => {
        const row = data.find((_, i) => String(i) === rowId) ?? data.find((r) => r.id === rowId);
        // TanStack row IDs are index-based strings when no getRowId is set.
        // We find the actual ranking document ID from the current page rows via the table.
        // Instead, we store it on save via the actions column, which has row.original.id.
        // Since handleSave receives rowId (TanStack row id, e.g. "0"), we need to look it up.
        // The table will pass row.original.id from the actions column — but currently we pass row.id.
        // Let's re-examine: in columns.tsx onSave(row.id) passes the TanStack row id.
        // We need the Payload document id. We'll change the approach: store the document id alongside.
        // Actually, the cleanest fix is to find the matching row from data by TanStack index.
        const index = parseInt(rowId, 10);
        const target = isNaN(index) ? data.find((r) => r.id === rowId) : data[index];
        if (!target) return;

        setBusy(true);
        const result = await updateRanking(target.id, seasonId, {
            rank: editingValues.rank,
            playerName: editingValues.playerName,
            eloRating: editingValues.eloRating,
        });
        setBusy(false);

        if (result.success) {
            setData((prev) =>
                prev.map((r) =>
                    r.id === target.id
                        ? {...r, rank: editingValues.rank, playerName: editingValues.playerName, eloRating: editingValues.eloRating}
                        : r
                )
            );
            setEditingRowId(null);
        } else {
            alert(`Erreur: ${result.message}`);
        }
    }, [data, editingValues, seasonId]);

    const handleDelete = useCallback(async (rowId: string) => {
        const index = parseInt(rowId, 10);
        const target = isNaN(index) ? data.find((r) => r.id === rowId) : data[index];
        if (!target) return;

        if (!window.confirm(`Supprimer "${target.playerName}" du classement ?`)) return;

        setBusy(true);
        const result = await deleteRanking(target.id, seasonId);
        setBusy(false);

        if (result.success) {
            setData((prev) => prev.filter((r) => r.id !== target.id));
        } else {
            alert(`Erreur: ${result.message}`);
        }
    }, [data, seasonId]);

    const columns = getColumns(isAdmin, isAdmin ? {
        editingRowId,
        editingValues,
        onEdit: handleEdit,
        onSave: handleSave,
        onCancel: handleCancel,
        onDelete: handleDelete,
        onChangeField: handleChangeField,
    } : undefined);

    const table = useReactTable<CompleteRanking>({
        data,
        columns,
        enableExpanding: true,
        getRowCanExpand: (row) => isMedium && row.depth === 0,
        getCoreRowModel: getCoreRowModel<CompleteRanking>(),
        getPaginationRowModel: getPaginationRowModel<CompleteRanking>(),
        getSortedRowModel: getSortedRowModel<CompleteRanking>(),
        getExpandedRowModel: getExpandedRowModel<CompleteRanking>(),
        onSortingChange: setSort,
        onColumnVisibilityChange: setVisibility,
        onPaginationChange: setPagination,
        sortingFns: {
            rank: sortNumberRows,
            teamName: sortStringRows,
            elo: sortNumberRows,
            wins: sortNumberRows,
            losses: sortNumberRows,
            winRate: sortNumberRows,
        },
        onExpandedChange: setExpanded,
        state: {
            sorting: sort,
            columnVisibility: visibility,
            expanded,
            pagination,
        }
    });

    useEffect(() => {
        if (isMedium) {
            setVisibility((prev) => ({
                ...prev,
                rank: false,
                wins: false,
                losses: false,
                matchesPlayed: false,
                winRate: false,
            }));
        } else {
            setVisibility((prev) => ({
                ...prev,
                rank: true,
                wins: true,
                losses: true,
                matchesPlayed: true,
                winRate: true,
            }));
        }
    }, [isMedium]);

    return (
        <div className={"w-full"}>
            {busy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="text-white text-sm font-text animate-pulse">Chargement…</div>
                </div>
            )}
            <Table className={"w-full h-[50vh]"}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead colSpan={header.rowSpan} key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <>
                                <TableRow
                                    key={row.id}
                                    onClick={editingRowId === row.id ? undefined : row.getToggleExpandedHandler()}
                                    className={cn({"hover:bg-gray-900 hover:cursor-pointer": isMedium && editingRowId !== row.id})}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {row.getIsExpanded() && isMedium && (
                                    <TableRow key={`${row.id}-expanded`} className={"w-full"}>
                                        <TableCell key={`${row.id}-expanded-cell`} colSpan={row.getVisibleCells().length}>
                                            <Table key={`${row.id}-inner`} className={"max-w-full rounded-t-none"}>
                                                <TableHeader key={`${row.id}-inner-header`}>
                                                    {Object.entries(hiddenHeaders).map(([_, [header, color]], _i, arr) => (
                                                        <TableHead colSpan={arr.length}
                                                                   className={cn("font-text text-text-m font-bold text-white", color)}
                                                                   key={header}>
                                                            {header}
                                                        </TableHead>
                                                    ))}
                                                </TableHeader>
                                                <TableBody key={`${row.id}-inner-body`}>
                                                    <TableRow key={`${row.id}-inner-row`}>
                                                        {row.getAllCells()
                                                            .filter((cell) => Object.keys(hiddenHeaders).includes(cell.column.id))
                                                            .map((cell, _, arr) => (
                                                                <TableCell colSpan={arr.length} key={cell.id}>
                                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))
                    ) : <TableRow>
                        <TableCell colSpan={columns.length} className={"text-center"}>Aucune donnée</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
            <div
                className={"bg-gray-950 border-t border-gray-800 py-2 w-full flex items-center justify-center gap-4"}>
                <Button disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}>
                    <DoubleArrowLeftIcon className={"size-4"}/>
                </Button>
                <Button onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                    <ArrowLeft className={"size-4"}/>
                </Button>
                <div className={"text-center text-gray-500"}>
                    Page {pagination.pageIndex + 1} sur {table.getPageCount()}
                </div>
                <Button onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                    <ArrowRight className={"size-4"}/>
                </Button>
                <Button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                    <DoubleArrowRightIcon className={"size-4"}/>
                </Button>
            </div>
        </div>
    );
};

export default EloRankingTable;
