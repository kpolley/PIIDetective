"use client";
import { useColumnQuery } from "@/app/providers";
import { ColumnDetail } from "@/components/ColumnDetail";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
    const columnQuery = useColumnQuery();
    const router = useRouter();

    // Find the item with the id from the URL
    const selectedColumn = columnQuery.data?.find((column) => column.id === Number(params.id));
    if (!selectedColumn) {
        return <div>Column not found</div>;
    }

    return (
        <div className="p-6">
         <Button onClick={() => router.back()} className="mb-4">
        Back
      </Button>
      <ColumnDetail columnItem={selectedColumn}/>

        </div>
    );

  }