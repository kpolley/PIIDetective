"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnItem } from "./ColumnItem";
import { ColumnDetail } from "./ColumnDetail";
import { useWindow } from "@/context/WindowProvider";
import { useSelectedColumn } from "@/context/SelectedColumnProvider";
import { useColumnQuery } from "@/app/providers";
import ColumnItemList from "./ColumnItemList";

export default function Inbox() {
  const { selectedColumn, selectColumn } = useSelectedColumn();
  const columnQuery = useColumnQuery();
  const { isMobile } = useWindow();

  if (isMobile) {
    if (selectedColumn) {
      return (
        <div>
          <div className="p-6">
            <Button onClick={() => selectColumn(null)}>Back</Button>
          </div>
          <ScrollArea className="h-full overflow-auto">
            <ColumnDetail columnItem={selectedColumn} />
          </ScrollArea>
        </div>
      );
    }

    return <ColumnItemList />;
  }

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
