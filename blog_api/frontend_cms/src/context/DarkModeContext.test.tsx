import { render, screen, waitFor } from "@testing-library/react";
import {
  DarkModeProvider,
  useDarkModeContext,
  useDarkModeDispatchContext,
} from "./DarkModeContext";
import { ErrorInfo, useEffect } from "react";
import { DarkModeState } from "../hooks/useDarkMode";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ErrorBoundary } from "react-error-boundary";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: unknown) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

afterEach(() => {
  Storage.prototype.getItem = () => null;
});

it(`sets "dark" mode if storage returns "dark"`, async () => {
  Storage.prototype.getItem = () => "dark";

  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    state = mode;
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("dark");
  });
});

it(`sets "light" mode if storage returns "light"`, async () => {
  Storage.prototype.getItem = () => "light";

  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    state = mode;
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("light");
  });
});

it(`context returns "dark" default value if context provider isn't rendered`, async () => {
  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    const modeDispatch = useDarkModeDispatchContext();

    // gets called default ()=>{} function
    // nothing happens
    modeDispatch({ type: "toggle" });

    state = mode;
    return <></>;
  }

  render(<Test />);

  await waitFor(() => {
    expect(state).toBe("dark");
  });
});

it(`sets "dark" mode if media prefer-color-scheme matches "dark"`, async () => {
  let state: DarkModeState;

  Storage.prototype.getItem = () => null;

  function Test() {
    const mode = useDarkModeContext();
    state = mode;
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("dark");
  });
});

it(`sets "light" mode if media prefer-color-scheme doesn't match "dark"`, async () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: unknown) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });

  Storage.prototype.getItem = () => null;

  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    state = mode;
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("light");
  });
});

it(`triggers matchMedia change event when media prefer-color-scheme matches "dark"`, async () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: unknown) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn((_arg, cb) => {
        cb();
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });

  Storage.prototype.getItem = () => null;

  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    state = mode;
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("dark");
  });
});

it(`triggers matchMedia change event when media prefer-color-scheme doesn't match "dark"`, async () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: unknown) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn((_arg, cb) => {
        cb();
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });

  Storage.prototype.getItem = () => null;

  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    state = mode;
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("light");
  });
});

it("toggles mode through effects", async () => {
  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    const modeDispatch = useDarkModeDispatchContext();
    state = mode;

    useEffect(() => {
      modeDispatch({ type: "toggle" });
    }, [modeDispatch]);
    return <></>;
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("light");
  });
});

it("toggles mode through user interaction", async () => {
  const user = userEvent.setup();

  let state: DarkModeState;

  function Test() {
    const mode = useDarkModeContext();
    const modeDispatch = useDarkModeDispatchContext();
    state = mode;

    return (
      <>
        <button
          onClick={() => {
            modeDispatch({ type: "toggle" });
          }}
        >
          mode
        </button>
      </>
    );
  }

  render(
    <DarkModeProvider>
      <Test />
    </DarkModeProvider>
  );

  await waitFor(() => {
    expect(state).toBe("dark");
  });

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "mode" }));
  });

  await waitFor(() => {
    expect(state).toBe("light");
  });

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "mode" }));
  });

  await waitFor(() => {
    expect(state).toBe("dark");
  });
});

it("throws error if dispatch given icorrect action type", async () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const user = userEvent.setup();

  function Test() {
    const modeDispatch = useDarkModeDispatchContext();

    return (
      <>
        <button
          onClick={() => {
            // using type assertion as "toggle", to let typescript compile without errors,
            // but it still throws error and the test passes
            modeDispatch({ type: "oopsie" as "toggle" });
          }}
        >
          mode
        </button>
      </>
    );
  }

  function Fallback({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) {
    // trying to fix typescript errors to compile for docker,
    // don't have time to figure out
    // why did i added this resetErrorBoundary ?
    resetErrorBoundary();
    return (
      <div role="alert">
        <h1>Error Boundary</h1>
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  const logError = (error: Error, info: ErrorInfo) => {
    // Do something with the error, e.g. log to an external API
    console.log("logError:", error);
    console.log("componentStack:", info.componentStack);
  };

  render(
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <DarkModeProvider>
        <Test />
      </DarkModeProvider>
    </ErrorBoundary>
  );

  await act(async () => {
    await user.click(screen.getByRole("button", { name: "mode" }));
  });

  expect(screen.getByText("Error Boundary")).toBeVisible();
  expect(screen.getByText("Unknown action: oopsie")).toBeVisible();

  consoleErrorSpy.mockRestore();
});
