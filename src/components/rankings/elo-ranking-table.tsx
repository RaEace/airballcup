"use client";

import {FunctionComponent, useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {EloEntry} from "@/components/rankings/columns.ts";
import {
    ColumnDef,
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

interface EloRankingProps {
    columns: ColumnDef<EloEntry>[];
    rankings: EloEntry[];
}

function sortNumberRows(a: Row<number>, b: Row<number>) {
    return a.original - b.original;
}

function sortStringRows(a: Row<string>, b: Row<string>) {
    return a.original.localeCompare(b.original);
}

const EloRankingTable: FunctionComponent<EloRankingProps> = ({rankings: data, columns}) => {
    const [sort, setSort] = useState<SortingState>([]);
    const [visibility, setVisibility] = useState<VisibilityState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});
    const isMedium = useMediaQuery("(max-width: 768px)");

    // [[header, color]]
    const hiddenHeaders = {
        rank: ["#"],
        wins: ["V", "text-green-500"],
        losses: ["D", "text-red-500"],
        gamesPlayed: ["J"],
        winRate: ["WR"],
    };

    const table = useReactTable<EloEntry>({
        data,
        columns,
        enableExpanding: true,
        getRowCanExpand: (row) => isMedium && row.depth === 0,
        getCoreRowModel: getCoreRowModel<EloEntry>(),
        getPaginationRowModel: getPaginationRowModel<EloEntry>(),
        getSortedRowModel: getSortedRowModel<EloEntry>(),
        getExpandedRowModel: getExpandedRowModel<EloEntry>(),
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
                gamesPlayed: false,
                winRate: false,
            }));
        } else {
            setVisibility((prev) => ({
                ...prev,
                rank: true,
                wins: true,
                losses: true,
                gamesPlayed: true,
                winRate: true,
            }));
        }
    }, [isMedium]);

    return (
        <div className={"w-full"}>
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
                                <TableRow key={row.id} onClick={row.getToggleExpandedHandler()}
                                          className={cn({"hover:bg-gray-900 hover:cursor-pointer": isMedium})}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {row.getIsExpanded() && isMedium && (
                                    <TableRow key={row.id} className={"w-full"}>
                                        <TableCell key={row.id} colSpan={row.getVisibleCells().length}>
                                            <Table key={row.id} className={"max-w-full rounded-t-none"}>
                                                <TableHeader key={row.id}>
                                                    {Object.entries(hiddenHeaders).map(([_, [header, color]], _i, arr) => (
                                                        <TableHead colSpan={arr.length}
                                                                   className={cn("font-text text-text-m font-bold text-white", color)}
                                                                   key={header}>
                                                            {header}
                                                        </TableHead>
                                                    ))}
                                                </TableHeader>
                                                <TableBody key={row.id}>
                                                    <TableRow key={row.id}>
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
            <div className={"bg-gray-950 border-t border-gray-800 py-2 w-full flex items-center justify-center gap-4"}>
                <Button disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}>
                    <DoubleArrowLeftIcon className={"size-4"} />
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
                    <DoubleArrowRightIcon className={"size-4"} />
                </Button>
            </div>
        </div>
    );
};

export default EloRankingTable;