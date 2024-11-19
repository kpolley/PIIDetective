"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ColumnClassification, Column } from '@/models/zod';
import { useColumnQuery } from '@/app/providers';

export type ColumnClassificationIncludeColumn = ColumnClassification & { column: Column };

interface SelectedColumnContextType {
    selectedColumn: ColumnClassificationIncludeColumn | null;
    selectColumn: (columnID: number | null) => void;
}

const SelectedColumnContext = createContext<SelectedColumnContextType | undefined>(undefined);

export const SelectedColumnProvider = ({ children }: { children: ReactNode }) => {
    const [selectedColumn, setSelectedColumn] = useState<ColumnClassificationIncludeColumn | null>(null);

    function selectColumn(columnID: number | null) {
        if(columnID === null) {
            setSelectedColumn(null);
            return;
        }
        
        const columnQuery = useColumnQuery();
        const selectedColumn = columnQuery.data?.find((column) => column.column.id === columnID);
        setSelectedColumn(selectedColumn || null);
    }

    return (
        <SelectedColumnContext.Provider value={{ selectedColumn, selectColumn }}>
            {children}
        </SelectedColumnContext.Provider>
    );
};

export const useSelectedColumn = () => {
    const context = useContext(SelectedColumnContext);
    if (context === undefined) {
        throw new Error('useSelectedColumn must be used within an SelectedColumnProvider');
    }
    return context;
};