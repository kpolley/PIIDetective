"use client";

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface ComponentProps {
    tableName: string;
    datasetId: string;
    highlightedColumnName?: string;
}

export default function Component({ tableName, datasetId, highlightedColumnName }: ComponentProps) {
    const [sampleData, setSampleData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setSampleData([]);
        };
    }, [tableName, datasetId]);

    const fetchSampleData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/sample?datasetId=${datasetId}&tableName=${tableName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSampleData(data);
        } catch (error) {
            console.error('Error fetching sample data:', error);
        }
        setLoading(false);
    };

    const getHeaders = () => {
        if (sampleData.length === 0) return [];
        return Object.keys(sampleData[0]);
    };

    const formatValue = (value: any) => {
        const maxLength = 50;
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value).slice(0, maxLength);
        }
        return String(value).slice(0, maxLength);
    };

    if(sampleData.length === 0) {
        return(
            <div className='flex justify-center'>
            <Button 
            onClick={fetchSampleData}
            disabled={loading}
        >
            Fetch Sample Data
        </Button>
        </div>
        )
    }

    return (
        <ScrollArea className="rounded-lg border w-full">
        <Table>
            <TableHeader>
                <TableRow>
                    {getHeaders().map((header) => (
                        <TableHead key={header} className={`px-4 py-3 bg-gray-100 dark:bg-gray-800 text-left font-medium text-gray-500 dark:text-gray-400 ${header === highlightedColumnName ? 'bg-red-200 dark:bg-red-600' : ''}`}>
                            {header.charAt(0).toUpperCase() + header.slice(1)}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {sampleData.map((row, index) => (
                    <TableRow key={index}>
                        {getHeaders().map((header) => (
                            <TableCell key={header} className={`px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 ${header === highlightedColumnName ? 'bg-red-200 dark:bg-red-600' : ''}`}>
                                {formatValue(row[header])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </ScrollArea>
    );
}