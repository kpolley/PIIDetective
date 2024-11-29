"use client";

import ColumnItemList from "@/components/ColumnItemList";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDetail } from "@/components/ColumnDetail";
import { useSelectedColumn } from "@/context/SelectedColumnProvider";

export default function Home() {
  const { selectedColumn } = useSelectedColumn();

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={10} maxSize={50}>
          <ScrollArea className="h-screen">
            <ColumnItemList />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="pr-6 pl-6 pb-6">
            <ColumnDetail columnItem={selectedColumn} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
