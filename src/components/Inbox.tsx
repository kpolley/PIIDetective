"use client";

import * as React from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnItem } from "./ColumnItem";
import { ColumnDetail } from "./ColumnDetail";
import { useColumn } from "@/context/ColumnProvider";
import ColumnItemList from "./ColumnItemList";

export default function Inbox() {
  const { items, selectItem, selectedItem } = useColumn();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // if window width is less than 768px, return mobile view
  if(window.innerWidth < 768) {
    if (selectedItem) {
      return(
        <div>
          <div className="p-6">
            <Button onClick={() => selectItem(null)}>Back</Button>
          </div>
          <ScrollArea className="h-full overflow-auto">
            <ColumnDetail columnItem={selectedItem} />
          </ScrollArea>
        </div>
      )
    }

    return(
      <ColumnItemList />
    )
  }

  // if window width is greater than 768px, return desktop view
  return(
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={10} maxSize={200}>
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">New Findings</h2>
            {items.map((item) => (
              <ColumnItem key={item.id} columnItem={item} onClick={() => selectItem(item)} />
            ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        {selectedItem ? (
            <ColumnDetail columnItem={selectedItem} />
        ) : (
          <div className="p-4">Select an item to view details</div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )

  // return (
  //   <div className="h-screen">
  //     {/* Desktop View */}
  //     <div className="hidden md:flex h-full">
  //       <ResizablePanelGroup direction="horizontal">
  //         <ResizablePanel defaultSize={30} minSize={10} maxSize={200} className="h-full">
  //           <ScrollArea className="h-full overflow-auto">
  //             <div className="p-4">
  //               <h2 className="text-xl font-bold mb-4">New Findings</h2>
  //               {items.map((item) => (
  //                 <ColumnItem key={item.id} columnItem={item} onClick={() => selectItem(item)} />
  //               ))}
  //             </div>
  //           </ScrollArea>
  //         </ResizablePanel>
  //         <ResizableHandle />
  //         <ResizablePanel>
  //           {selectedItem ? (
  //             <ScrollArea>
  //               <ColumnDetail columnItem={selectedItem} />
  //             </ScrollArea>
  //           ) : (
  //             <div className="p-4">Select an item to view details</div>
  //           )}
  //         </ResizablePanel>
  //       </ResizablePanelGroup>
  //     </div>

  //     {/* Mobile View */}
  //     <div className="md:hidden h-full">
  //       {selectedItem ? (
  //         <div>
  //           <button onClick={() => selectItem(null)} className="p-2 bg-gray-200">Back</button>
  //           <ScrollArea className="h-full overflow-auto">
  //             <ColumnDetail columnItem={selectedItem} />
  //           </ScrollArea>
  //         </div>
  //       ) : (
  //         <ScrollArea className="h-full overflow-auto">
  //           <div className="p-4">
  //             <h2 className="text-xl font-bold mb-4">New Findings</h2>
  //             {items.map((item) => (
  //               <ColumnItem key={item.id} columnItem={item} onClick={() => selectItem(item)} />
  //             ))}
  //           </div>
  //         </ScrollArea>
  //       )}
  //     </div>
  //   </div>
  // );
}