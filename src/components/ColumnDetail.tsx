"use client";

import ColumnDetailCard from "./ColumnDetailCard";
import ColumnDetailTableSample from "./ColumnDetailTableSample";
import { ColumnClassificationIncludeColumn } from "@/app/providers";

export function ColumnDetail({
  columnItem,
}: {
  columnItem: ColumnClassificationIncludeColumn | null;
}) {
  if (!columnItem) {
    return <div className="p-4">Select an item to view details</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="p-6">
        <ColumnDetailCard columnItem={columnItem} />
      </div>
      <ColumnDetailTableSample
        key={columnItem.columnId}
        tableName={columnItem.column.tableName}
        datasetId={columnItem.column.datasetId}
        highlightedColumnName={columnItem.column.name}
      />
    </div>
  );
}
