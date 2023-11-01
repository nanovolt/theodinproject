import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import { Router } from "./Router";
import { ErrorBoundary } from "react-error-boundary";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Fallback } from "./components/Fallback";
import { logError } from "./components/Fallback.log";
import { Provider } from "react-redux";

import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <DarkModeProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
