import { useFetch } from "./useFetch";
import { renderHook, waitFor } from "@testing-library/react";

// beforeEach(() => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve({ test: 200 }),
//     })
//   ) as jest.Mock;
// });

// afterEach(() => {
// })

// global.fetch = jest.fn().mockResolvedValue({
//   ok: true,
//   json: () => Promise.resolve({ test: 200 }),
// });

// (global.fetch as jest.Mock).mockImplementation();

// TODO figure out what to do with Aggregate Error, test passes but needs to disable console.error
it.skip("fails to fetch, no response, network request failed", async () => {
  // global.fetch = jest.fn(() => new Error("e")) as jest.Mock;

  const { result } = renderHook(() => useFetch(""));

  // console.log(result);

  const response = result.current;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { data, isLoading, isError, errorMessage } = response;
  expect(isLoading).toBe(true);

  await waitFor(() => {
    const response = result.current;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let { data, isLoading, isError, errorMessage } = response;
    // console.log("response:", response);

    // console.log("errorMessage:", errorMessage);
    // expect(isLoading).toBe(false);
    expect(errorMessage).toBe("Network request failed");
  });
});

it("successfully fetches data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ test: 200 }),
    })
  ) as jest.Mock;

  // expect.assertions(2);

  // "https://fakestoreapi.com/products"
  const { result } = renderHook(() => useFetch("some valid url"));

  const response = result.current;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { data, isLoading, isError, errorMessage } = response;
  // console.log("initial:", response);
  expect(isLoading).toBe(true);

  await waitFor(() => {
    const response = result.current;
    // { data, isLoading, isError, errorMessage } = response;
    data = response.data;
    isLoading = response.isLoading;
    isError = response.isError;
    errorMessage = response.errorMessage;

    // console.log(response);

    expect(isLoading).toBe(false);
  });
  // console.log(data);
  expect(data).toEqual({ test: 200 });
});

it("fetches data with error", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve(),
    })
  ) as jest.Mock;

  // expect.assertions(2);

  // "https://fakestoreapi.com/products"
  const { result } = renderHook(() =>
    useFetch("https://fakestoreapi.com/products")
  );

  const response = result.current;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { data, isLoading, isError, errorMessage } = response;
  // console.log("initial:", response);
  expect(isLoading).toBe(true);

  await waitFor(() => {
    const response = result.current;
    // { data, isLoading, isError, errorMessage } = response;
    data = response.data;
    isLoading = response.isLoading;
    isError = response.isError;
    errorMessage = response.errorMessage;

    // console.log(response);
    expect(isLoading).toBe(false);
  });
  // console.log(data);
  expect(data).toBeNull();
  expect(isError).toBeTruthy();
});
