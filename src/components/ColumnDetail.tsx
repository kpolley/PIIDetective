"use client";

import ColumnDetailCard from "./ColumnDetailCard";
import ColumnDetailTableSample from "./ColumnDetailTableSample";
import { useColumn } from "@/context/ColumnProvider";

export function ColumnDetail() {
    const { selectedColumn } = useColumn();

    if (!selectedColumn) {
        return <div className="p-4">Select an item to view details</div>
    }

    return (
            <div className="flex flex-col items-center">
                <div className="w-full max-w-96 p-6">
                    <ColumnDetailCard key={selectedColumn.columnId} />
                </div>
                    <ColumnDetailTableSample 
                        key={selectedColumn.columnId}
                        tableName={selectedColumn.column.tableName}
                        datasetId={selectedColumn.column.datasetId}
                        highlightedColumnName={selectedColumn.column.name}
                    />
            </div>
    )
}