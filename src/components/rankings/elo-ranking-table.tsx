"use client";

import {FunctionComponent, useCallback, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {CompleteRanking} from "@/app/(app)/rankings/[id]/page.tsx";
import {getColumns, EditingState} from "@/components/rankings/columns.tsx";
import {deleteRanking, updateRanking} from "@/components/rankings/actions.ts";
import {useIsAdmin} from "@/hooks/use-is-admin.ts";

interface EloRankingProps {
    rankings: CompleteRanking[];
    seasonId: string;
}

function sortNumberRows(a: Row<number>, b: Row<number>) {
    return a.original - b.original;
}

function sortStringRows(a: Row<string>, b: Row<string>) {
    return a.original.localeCompare(b.original);
}

const EloRankingTable: FunctionComponent<EloRankingProps> = ({rankings: initialData, seasonId}) => {
    const isAdmin = useIsAdmin();
    const [data, setData] = useState<CompleteRanking[]>(initialData);
    const [sort, setSort] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editingValues, setEditingValues] = useState<EditingState>({rank: 0, playerName: "", eloRating: 0});
    const [busy, setBusy] = useState(false);

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
        getCoreRowModel: getCoreRowModel<CompleteRanking>(),
        getPaginationRowModel: getPaginationRowModel<CompleteRanking>(),
        getSortedRowModel: getSortedRowModel<CompleteRanking>(),
        onSortingChange: setSort,
        onPaginationChange: setPagination,
        sortingFns: {
            rank: sortNumberRows,
            teamName: sortStringRows,
            elo: sortNumberRows,
            wins: sortNumberRows,
            losses: sortNumberRows,
            winRate: sortNumberRows,
        },
        state: {
            sorting: sort,
            pagination,
        }
    });

    return (
        <div className={"w-full"}>
            {busy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="text-white text-sm font-text animate-pulse">Chargement…</div>
                </div>
            )}
            <Table className={"w-full"}>
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
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : <TableRow>
                        <TableCell colSpan={columns.length} className={"text-center"}>Aucune donnée</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
            <div
                className={"bg-gray-950 border-t border-gray-800 py-2 w-full flex items-center justify-center gap-4"}>
                <Button className={"min-h-[44px] min-w-[44px]"} disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}>
                    <DoubleArrowLeftIcon className={"size-4"}/>
                </Button>
                <Button className={"min-h-[44px] min-w-[44px]"} onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                    <ArrowLeft className={"size-4"}/>
                </Button>
                <div className={"text-center text-gray-500"}>
                    Page {pagination.pageIndex + 1} sur {Math.max(table.getPageCount(), 1)}
                </div>
                <Button className={"min-h-[44px] min-w-[44px]"} onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                    <ArrowRight className={"size-4"}/>
                </Button>
                <Button className={"min-h-[44px] min-w-[44px]"} onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                    <DoubleArrowRightIcon className={"size-4"}/>
                </Button>
            </div>
        </div>
    );
};

export default EloRankingTable;
