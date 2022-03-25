import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";

import { queryClient } from "api";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
