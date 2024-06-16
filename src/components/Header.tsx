"use client";

import { Button } from "@/components/ui/button"
import ScanStatusIcon from "./ScanStatusIcon"
import { Shield, RefreshCw } from "react-feather";
import { useState } from "react";
import { useColumn } from "@/context/ColumnProvider";
import { ScanStatus } from '@prisma/client';

export default function Header() {
  const [loading, setLoading] = useState(false);
  const { getColumns } = useColumn();
  const [scanStatus, setScanStatus] = useState<ScanStatus | null>(null);
  
  async function runScan() {
    try {
        setLoading(true);
        const response = await fetch('/api/scan');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setScanStatus(data.scanStatus);

    } catch (error) {
        console.error('Failed to run scan:', error);
        return null;
    }

    await getColumns();
    setLoading(false);
  } 

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 my-1 text-gray-900 shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex items-center gap-4">
        <Shield className="h-6 w-6" />
        <span className="text-lg font-medium">PII Detective</span>
      </div>
      <div className="flex items-center gap-4">
        <ScanStatusIcon scanStatus={scanStatus} setScanStatus={setScanStatus} />
        <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => runScan()}
            disabled={loading}
        >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Refresh</span>
        </Button>
      </div>
    </header>
  )
}