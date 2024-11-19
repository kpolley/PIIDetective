"use client";

import * as React from "react";
import { ColumnItem } from "./ColumnItem";
import { useColumnQuery } from "@/app/providers";

export default function ColumnItemList() {  
    const columnQuery = useColumnQuery();
    return(
      <div>
        <h2 className="text-xl font-bold mb-4">New Findings</h2>
        {columnQuery.data?.map((column) => (
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