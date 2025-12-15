import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ✅ CORRECT CONFIG - This is the key fix!
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // ✅ Data stays fresh for 5 minutes
      cacheTime: 10 * 60 * 1000,     // ✅ Cache persists in memory for 10 minutes
      refetchOnWindowFocus: false,   // ✅ Don't refetch when tab regains focus
      refetchOnMount: false,         // ✅ CRITICAL: Don't refetch on component remount
      refetchOnReconnect: false,     // ✅ Don't refetch on internet reconnection
      retry: 1,                      // ✅ Retry failed requests once
    },
  },
});

createRoot(document.getElementById("root")).render(
  // <StrictMode> // Keep commented out for now
  <BrowserRouter>
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          {/* ✅ Add DevTools to visualize cache (remove in production) */}
          <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
  // </StrictMode>,
);
