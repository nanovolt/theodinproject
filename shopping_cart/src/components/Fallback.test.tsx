import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback, logError } from "./Fallback";
import { useEffect } from "react";

it("if an error is thrown it gets caught by error boundary with a fallback component", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  function Test() {
    useEffect(() => {
      throw Error("oops");
    }, []);
    return <></>;
  }

  render(
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <Test />
    </ErrorBoundary>
  );

  expect(screen.getByText("Something went wrong:")).toBeVisible();
  expect(screen.getByText("oops")).toBeVisible();

  consoleErrorSpy.mockRestore();
});
