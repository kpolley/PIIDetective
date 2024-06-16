"use client";
import { useColumn } from "@/context/ColumnProvider";
import { ColumnDetail } from "@/components/ColumnDetail";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
    const { columns } = useColumn();
    const router = useRouter();

    // Find the item with the id from the URL
    const item = columns.find((column) => column.id === Number(params.id));
    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="p-6">
         <Button onClick={() => router.back()} className="mb-4">
        Back
      </Button>
      <ColumnDetail />

        </div>
    );

  }