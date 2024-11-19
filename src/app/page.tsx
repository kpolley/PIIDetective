"use client";

import ColumnItemList from "@/components/ColumnItemList";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDetail } from "@/components/ColumnDetail";
import { useWindow } from '@/context/WindowProvider';
import { useSelectedColumn } from '@/context/SelectedColumnProvider';
export default function Home() {
  const { isMobile, height } = useWindow();
  const { selectedColumn } = useSelectedColumn();


  // mobile view
  if(isMobile) {
    return (
      <div>
      <ScrollArea className="h-full">
        <ColumnItemList />
      </ScrollArea>
      </div>
    );
  }

  // desktop view
  return (
    <div>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={10} maxSize={200}>
        <ScrollArea className="h-full" style={{ height: height }}>
          <ColumnItemList />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="pr-6 pl-6 pb-6 overflow-y-auto" style={{ height: height }}>
            <ColumnDetail columnItem={selectedColumn}/>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}
