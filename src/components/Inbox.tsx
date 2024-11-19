"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnItem } from "./ColumnItem";
import { ColumnDetail } from "./ColumnDetail";
import { useSelectedColumn } from "@/context/SelectedColumnProvider";
import { useColumnQuery } from "@/app/providers";

export default function Inbox() {
  const { selectedColumn, selectColumn } = useSelectedColumn();
  const columnQuery = useColumnQuery();

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={10} maxSize={200}>
        <ScrollArea className="h-full">
          <div className="p-4">
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
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        {selectedColumn ? (
          <ColumnDetail columnItem={selectedColumn} />
        ) : (
          <div className="p-4">Select an item to view details</div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
