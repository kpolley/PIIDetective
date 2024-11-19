"use client";

import { useEffect, useCallback } from "react";
import { ScanStatus } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Compass } from "react-feather";

const scanStatusToHumanReadable = {
  InProgress: "In Progress",
  Completed: "Completed",
  Failed: "Failed",
};

function getHumanReadableScanStatus(status: ScanStatus) {
  return scanStatusToHumanReadable[status.status] || "Unknown Status";
}

type ScanStatusIconProps = {
  scanStatus: ScanStatus | null;
  setScanStatus: (scanStatus: ScanStatus) => void;
};

export default function ScanStatusIcon({
  scanStatus,
  setScanStatus,
}: ScanStatusIconProps) {
  const updateScanStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/scan/status");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const scanStatus = await response.json();
      if (!scanStatus.status) {
        return null;
      }
      setScanStatus(scanStatus);
    } catch (error) {
      console.error("Failed to fetch scan status:", error);
      return null;
    }
  }, [setScanStatus]);

  useEffect(() => {
    updateScanStatus();
    const interval = setInterval(() => {
      updateScanStatus();
    }, 2000);
    return () => clearInterval(interval);
  }, [updateScanStatus]);

  if (!scanStatus) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium dark:bg-gray-700 dark:text-white">
      <Compass className="h-5 w-5 " />
      <span>Scan: {getHumanReadableScanStatus(scanStatus)}</span>
      <span className="ml-2 text-gray-500 dark:text-gray-400">
        {formatDistance(new Date(scanStatus.scanStart), new Date(), {
          addSuffix: true,
        })}
      </span>
    </div>
  );
}
