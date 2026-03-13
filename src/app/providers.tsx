import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
