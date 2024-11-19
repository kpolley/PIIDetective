"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import LoadingButton from "./LoadingButton";
import { DecisionAPIBody } from "@/app/api/decision/route";
import {
  useColumnQuery,
  ColumnClassificationIncludeColumn,
} from "@/app/providers";
import { useMutation } from "@tanstack/react-query";

export default function Component({
  columnItem,
}: {
  columnItem: ColumnClassificationIncludeColumn | null;
}) {
  const columnQuery = useColumnQuery();
  const removeColumnMutation = useMutation({
    mutationFn: async (columnId: number) => {
      const response = await fetch(`/api/columns/${columnId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      columnQuery.refetch();
    },
  });

  async function callDecisionApi({ columnId, decision }: DecisionAPIBody) {
    try {
      const response = await fetch(`/api/decision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columnId, decision }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.json();
      removeColumnMutation.mutate(columnId);
    } catch (error) {
      console.error("Failed apply decision:", error);
    }
  }

  if (!columnItem) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Column Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Column Name:</span>
            <span>{columnItem.column.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Table Name:</span>
            <span>{columnItem.column.tableName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Dataset ID:</span>
            <span>{columnItem.column.datasetId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Classification:</span>
            <span>{columnItem.classification}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Confidence Score:</span>
            <span>{columnItem.confidenceScore}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <LoadingButton
          onClick={() =>
            callDecisionApi({
              columnId: columnItem.columnId,
              decision: "accept",
            } as DecisionAPIBody)
          }
          className="w-full"
        >
          Accept
        </LoadingButton>
        <LoadingButton
          onClick={() =>
            callDecisionApi({
              columnId: columnItem.columnId,
              decision: "reject",
            } as DecisionAPIBody)
          }
          variant="destructive"
          className="w-full"
        >
          Reject
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
