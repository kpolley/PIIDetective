"use client";
import { useSelectedColumn } from "@/context/SelectedColumnProvider";
import { useRouter } from "next/navigation";

interface ColumnItemProps {
  id: number;
  name: string;
  tableName: string;
  datasetId: string;
  confidenceScore: string;
  classification: string;
}

export function ColumnItem({
  id,
  name,
  tableName,
  datasetId,
  confidenceScore,
  classification,
}: ColumnItemProps) {
  
  const { selectColumn } = useSelectedColumn();
  const router = useRouter();

  return (
    <div
      onClick={() => selectColumn(id)}
      className="group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-4 flex items-start gap-4"
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {confidenceScore}
          </div>
        </div>
        <div className="text-sm font-medium">
          {datasetId}.{tableName}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {classification}
        </p>
      </div>
    </div>
  );
}
