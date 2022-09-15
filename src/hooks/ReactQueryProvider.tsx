import { LONG_STALE_TIME } from "constants/queries";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: LONG_STALE_TIME,
      retry: 0,
    },
  },
});

type Props = {
  children: ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
