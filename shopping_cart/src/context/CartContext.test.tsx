import { Cart } from "../types/types";
import { CartProvider, useCart, useCartDispatch } from "./CartContext";
import { render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

const initialState: Cart = { items: [], itemsAmount: 0, grandTotal: 0 };

it("cart context returns default value, if no context provider given", async () => {
  let state: Cart;

  const Test = () => {
    state = useCart();
    return <></>;
  };

  render(<Test />);

  await waitFor(() => {
    expect(state).toEqual(initialState);
  });
});

it("dispatch context returns default value, if no context provider given", async () => {
  let dispatchReturnValue: any;

  const Test = () => {
    const cartDispatch = useCartDispatch();
    dispatchReturnValue = cartDispatch({ type: "added_item" });
    return <></>;
  };

  render(<Test />);

  await waitFor(() => {
    expect(dispatchReturnValue).toBe("some default return");
  });
});

it("initializes reducer", async () => {
  let state: Cart;
  const Test = () => {
    state = useCart();
    // const cartDispatch = useCartDispatch();

    // return <>{JSON.stringify(cart, null, 2)}</>;
    return <></>;
  };

  render(
    <CartProvider>
      <Test />
    </CartProvider>
  );

  await waitFor(() => {
    expect(state).toEqual(initialState);
  });
});

it("adds items", async () => {
  let state: Cart;

  const Test = () => {
    state = useCart();
    const cartDispatch = useCartDispatch();

    // wrapping dispatch in useEffect to trigger state change on initial render?
    // doesn't work without it.
    // TODO: Need more reading on this
    useEffect(() => {
      cartDispatch({
        type: "added_item",
        product: {
          id: 1,
          image: "test image",
          price: 42,
          title: "test title",
        },
      });

      cartDispatch({
        type: "added_item",
        product: {
          id: 1,
          image: "test image",
          price: 42,
          title: "test title",
        },
      });

      cartDispatch({
        type: "added_item",
        product: {
          id: 2,
          image: "test image 2",
          price: 69,
          title: "test title 2",
        },
      });

      cartDispatch({
        type: "added_item",
        product: {
          id: 2,
          image: "test image 2",
          price: 69,
          title: "test title 2",
        },
      });
    }, [cartDispatch]);

    return <></>;
  };

  render(
    <CartProvider initialState={initialState}>
      <Test />
    </CartProvider>
  );

  const desiredState: Cart = {
    grandTotal: 222,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 2,
        total: 84,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 2,
        total: 138,
      },
    ],
  };

  await waitFor(() => {
    expect(state).toEqual(desiredState);
  });
});

it("does not remove an item from the cart if there is only one such item in the cart", () => {
  const initialState: Cart = {
    grandTotal: 180,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 1,
        total: 42,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 2,
        total: 138,
      },
    ],
  };

  let state;

  function Test() {
    state = useCart();
    const cartDispatch = useCartDispatch();

    useEffect(() => {
      cartDispatch({
        type: "removed_item",
        product: { id: 1, image: "test image", price: 42, title: "test title" },
      });
    }, [cartDispatch]);
    return <></>;
  }

  render(
    <CartProvider initialState={initialState}>
      <Test />
    </CartProvider>
  );

  expect(state).toEqual(initialState);
});

it("removes items", () => {
  const initialState: Cart = {
    grandTotal: 291,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 2,
        total: 84,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 3,
        total: 207,
      },
    ],
  };

  let state;

  function Test() {
    state = useCart();
    const cartDispatch = useCartDispatch();

    useEffect(() => {
      cartDispatch({
        type: "removed_item",
        product: { id: 1, image: "test image", price: 42, title: "test title" },
      });

      cartDispatch({
        type: "removed_item",
        product: { id: 2, image: "test image 2", price: 69, title: "test title 2" },
      });
    }, [cartDispatch]);
    return <></>;
  }

  render(
    <CartProvider initialState={initialState}>
      <Test />
    </CartProvider>
  );

  let desiredState: Cart = {
    grandTotal: 180,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 1,
        total: 42,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 2,
        total: 138,
      },
    ],
  };
  expect(state).toEqual(desiredState);
});

it("deletes items", () => {
  const initialState: Cart = {
    grandTotal: 291,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 2,
        total: 84,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 3,
        total: 207,
      },
    ],
  };

  let state;

  function Test() {
    state = useCart();
    const cartDispatch = useCartDispatch();

    useEffect(() => {
      cartDispatch({
        type: "deleted_item",
        product: { id: 1, image: "test image", price: 42, title: "test title" },
      });
    }, [cartDispatch]);
    return <></>;
  }

  render(
    <CartProvider initialState={initialState}>
      <Test />
    </CartProvider>
  );

  let desiredState: Cart = {
    grandTotal: 207,
    itemsAmount: 1,
    items: [
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 3,
        total: 207,
      },
    ],
  };
  expect(state).toEqual(desiredState);
});

it("clears cart (deletes all cart items)", () => {
  const initialState: Cart = {
    grandTotal: 291,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 2,
        total: 84,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 3,
        total: 207,
      },
    ],
  };

  let state;

  function Test() {
    state = useCart();
    const cartDispatch = useCartDispatch();

    useEffect(() => {
      cartDispatch({
        type: "cleared_cart",
      });
    }, [cartDispatch]);
    return <></>;
  }

  render(
    <CartProvider initialState={initialState}>
      <Test />
    </CartProvider>
  );

  let desiredState: Cart = {
    grandTotal: 0,
    itemsAmount: 0,
    items: [],
  };
  expect(state).toEqual(desiredState);
});

it("throws error if dispatch given icorrect action type", () => {
  // reassigning console.error to prevent React from cluttering the console
  // and after test restore mock implementation
  // console.error = jest.fn();
  // console.error = () => {};
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const initialState: Cart = {
    grandTotal: 291,
    itemsAmount: 2,
    items: [
      {
        id: 1,
        image: "test image",
        price: 42,
        title: "test title",
        amount: 2,
        total: 84,
      },
      {
        id: 2,
        image: "test image 2",
        price: 69,
        title: "test title 2",
        amount: 3,
        total: 207,
      },
    ],
  };

  function Test() {
    // const state = useCart();
    const cartDispatch = useCartDispatch();

    useEffect(() => {
      cartDispatch({
        // using type assertion as "cleared_cart", to let typescript compile without errors,
        // but it still throws error and the test passes
        type: "ThisIsAnInvalidActionType" as "cleared_cart",
      });
    }, [cartDispatch]);
    return <></>;
  }

  function Fallback({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) {
    return (
      <div role="alert">
        <h1>Error Boundary</h1>
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  const logError = (error: Error, info: { componentStack: string }) => {
    // Do something with the error, e.g. log to an external API
    // console.log("logError:", error);
    // console.log("componentStack:", info.componentStack);
  };

  render(
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <CartProvider initialState={initialState}>
        <Test />
      </CartProvider>
    </ErrorBoundary>
  );

  expect(screen.getByText("Error Boundary")).toBeVisible();
  expect(screen.getByText("Unknown action: ThisIsAnInvalidActionType")).toBeVisible();

  consoleErrorSpy.mockRestore();
});
