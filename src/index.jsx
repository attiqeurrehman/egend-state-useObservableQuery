/* eslint-disable jsx-a11y/anchor-is-valid */
import { enableLegendStateReact } from "@legendapp/state/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Basic } from "./basic";
import { Mutating } from "./mutating";
import { Optimized } from "./optimized";

enableLegendStateReact();

const queryClient = new QueryClient();

export default function App() {
  const ref = useRef(1);
  useEffect(() => {
    ++ref.current;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          gap: "32px",
          maxWidth: 1200,
          margin: "0 auto"
        }}
      >
        <Basic />
        <Optimized />
        <Mutating />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
