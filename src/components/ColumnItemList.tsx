"use client";

import * as React from "react";
import { ColumnItem } from "./ColumnItem";
import { useColumn } from "@/context/ColumnProvider";

export default function ColumnItemList() {  
    const { columns } = useColumn();
    return(
      <div>
        <h2 className="text-xl font-bold mb-4">New Findings</h2>
        {columns.map((column) => (
          <ColumnItem 
            key={column.columnId}
            id={column.columnId}
            name={column.column.name}
            tableName={column.column.tableName}
            datasetId={column.column.datasetId}
            confidenceScore={column.confidenceScore}
            classification={column.classification}
          />
        ))}
      </div>
    )
}