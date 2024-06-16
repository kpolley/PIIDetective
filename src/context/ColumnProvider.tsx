"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ColumnClassification, Column } from '@/models/zod';

export type ColumnClassificationIncludeColumn = ColumnClassification & { column: Column };

interface ColumnContextType {
    columns: ColumnClassificationIncludeColumn[];
    selectedColumn: ColumnClassificationIncludeColumn | null;
    loading: boolean;
    addColumn: (column: ColumnClassificationIncludeColumn) => void;
    removeColumn: (columnId: Number) => void;
    selectColumn: (columnId: Number | null) => void;
    getColumns: () => Promise<void>;
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

export const ColumnProvider = ({ children }: { children: ReactNode }) => {
    const [selectedColumn, setSelectedColumn] = useState<ColumnClassificationIncludeColumn | null>(null);
    const [columns, setColumns] = useState<ColumnClassificationIncludeColumn[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const getColumns = async () => {
        setLoading(true);
        const response = await fetch('/api/columns');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ColumnClassificationIncludeColumn[] = await response.json();
        setColumns(data);
        setLoading(false);
    };

    useEffect(() => {
        getColumns();
    }, []);

    const addColumn = (column: ColumnClassificationIncludeColumn) => {
        setColumns((prevColumns) => [column, ...prevColumns]);
    };

    const removeColumn = (columnId: Number) => {
        setColumns((prevColumns) => prevColumns.filter((i) => i.columnId !== columnId));
    };

    const selectColumn = (columnId: Number | null) => {
        const column = columns.find((i) => i.columnId === columnId);
        if (!column) {
            setSelectedColumn(null);
            return;
        }

        setSelectedColumn(column);
    };

    return (
        <ColumnContext.Provider value={{ columns, selectedColumn, loading, addColumn, removeColumn, selectColumn, getColumns }}>
            {children}
        </ColumnContext.Provider>
    );
};

export const useColumn = () => {
    const context = useContext(ColumnContext);
    if (context === undefined) {
        throw new Error('useColumn must be used within an ColumnProvider');
    }
    return context;
};