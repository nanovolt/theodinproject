import { ErrorInfo } from "react";

export const logError = (error: Error, info: ErrorInfo) => {
  // Do something with the error, e.g. log to an external API
  console.log("logError:", error);
  console.log("componentStack:", info.componentStack);
};
