"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CircleCheckBig } from "lucide-react"
import { useEffect } from "react";
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
  const acceptDecisionMutation = useMutation({
    mutationFn: async (columnId: number) =>{
      const response = await fetch(`/api/decision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columnId, decision: "accept" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      columnQuery.refetch();
    },
    onError: (error) => {
      console.error("Failed apply decision:", error);
    }
  });
  const rejectDecisionMutation = useMutation({
    mutationFn: async (columnId: number) =>{
      const response = await fetch(`/api/decision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columnId, decision: "reject" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      columnQuery.refetch();
    },
    onError: (error) => {
      console.error("Failed apply decision:", error);
    }
  });

  useEffect(() => {
    acceptDecisionMutation.reset();
    rejectDecisionMutation.reset();
  }, [columnItem]);

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
            <span className="ml-4">{columnItem.column.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Table Name:</span>
            <span className="ml-4">{columnItem.column.tableName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Dataset ID:</span>
            <span className="ml-4">{columnItem.column.datasetId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Classification:</span>
            <span className="ml-4">{columnItem.classification}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Confidence Score:</span>
            <span className="ml-4">{columnItem.confidenceScore}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button
          onClick={() => acceptDecisionMutation.mutate(columnItem.columnId)}
          disabled={acceptDecisionMutation.isPending || rejectDecisionMutation.isPending}
          className="w-full"
        >
          {acceptDecisionMutation.isPending ? 
            <Loader2 className="animate-spin"/> : acceptDecisionMutation.isSuccess ?
              <CircleCheckBig /> : "Accept"
          }
        </Button>
        <Button
          onClick={() => rejectDecisionMutation.mutate(columnItem.columnId)}
          disabled={rejectDecisionMutation.isPending || acceptDecisionMutation.isPending}
          className="w-full"
          variant={"destructive"}
        >
          {rejectDecisionMutation.isPending ? 
            <Loader2 className="animate-spin"/> : rejectDecisionMutation.isSuccess ?
              <CircleCheckBig /> : "Reject"
          }
        </Button>
      </CardFooter>
    </Card>
  );
}
