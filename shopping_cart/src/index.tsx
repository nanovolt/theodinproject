import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import { Router } from "./Router";
import { ErrorBoundary } from "react-error-boundary";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

function Fallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  console.log("logError:", error);
  console.log("componentStack:", info.componentStack);
};

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <DarkModeProvider>
        <Router />
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
