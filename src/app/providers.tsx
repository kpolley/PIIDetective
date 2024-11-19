"use client";

import {
  useQuery,
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { WindowProvider } from "@/context/WindowProvider";
import { SelectedColumnProvider } from "@/context/SelectedColumnProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ColumnClassification, Column } from "@/models/zod";

export type ColumnClassificationIncludeColumn = ColumnClassification & {
  column: Column;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function useColumnQuery() {
  return useQuery<ColumnClassificationIncludeColumn[]>({
    queryKey: ["column"],
    queryFn: async () => {
      const response = await fetch("/api/columns");

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    },
  });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WindowProvider>
        <SelectedColumnProvider>
          {children}
          <ReactQueryDevtools />
        </SelectedColumnProvider>
      </WindowProvider>
    </QueryClientProvider>
  );
}
