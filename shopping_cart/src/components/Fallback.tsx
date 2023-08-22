export function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  // console.log("logError:", error);
  // console.log("componentStack:", info.componentStack);
};
