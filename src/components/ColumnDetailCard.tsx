"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import LoadingButton from "./LoadingButton";
import { DecisionAPIBody } from "@/app/api/decision/route"
import { useColumn } from "@/context/ColumnProvider";

export default function Component() {
    const { removeColumn, selectedColumn } = useColumn();

    async function callDecisionApi({columnId, decision}: DecisionAPIBody) {
        try {
            const response = await fetch(`/api/decision`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ columnId, decision }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            await response.json();
            removeColumn(columnId)
        } catch (error) {
            console.error('Failed apply decision:', error);
        }
    }

    if(!selectedColumn) {
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
                        <span>{selectedColumn.column.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Table Name:</span>
                        <span>{selectedColumn.column.tableName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Dataset ID:</span>
                        <span>{selectedColumn.column.datasetId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Classification:</span>
                        <span>{selectedColumn.classification}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Confidence Score:</span>
                        <span>{selectedColumn.confidenceScore}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex space-x-2">
                <LoadingButton onClick={() => callDecisionApi({ columnId: selectedColumn.columnId, decision: "accept" } as DecisionAPIBody)} className="w-full">Accept</LoadingButton>
                <LoadingButton onClick={() => callDecisionApi({ columnId: selectedColumn.columnId, decision: "reject" } as DecisionAPIBody)} variant="destructive" className="w-full">Reject</LoadingButton>
            </CardFooter>
        </Card>
    )
}