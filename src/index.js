import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { queryClient } from "api";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
