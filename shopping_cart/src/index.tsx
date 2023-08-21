import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import { Router } from "./Router";
import { ErrorBoundary } from "react-error-boundary";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Fallback, logError } from "./components/Fallback";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <DarkModeProvider>
        <Router />
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
