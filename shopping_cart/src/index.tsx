import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import { Router } from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
