import { useFetch } from "./useFetch";
import { renderHook, waitFor } from "@testing-library/react";

it("fails to fetch, no response, network request failed", async () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const { result } = renderHook(() => useFetch(""));

  let response = result.current;
  expect(response.isLoading).toBe(true);

  await waitFor(() => {
    response = result.current;
    expect(response.isLoading).toBe(false);
  });

  expect(response.data).toBe(null);
  expect(response.errorMessage).toBe("Network request failed");
  expect(response.isError).toBeTruthy();

  consoleErrorSpy.mockRestore();
});

it("successfully fetches data", async () => {
  const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ test: 200 }),
  } as Response);

  const { result } = renderHook(() => useFetch("some valid url"));

  let response = result.current;
  expect(response.isLoading).toBe(true);

  await waitFor(() => {
    response = result.current;
    expect(response.isLoading).toBe(false);
  });

  expect(response.data).toEqual({ test: 200 });
  expect(response.isError).toBeFalsy();
  expect(response.errorMessage).toBe("");

  fetchSpy.mockRestore();
});

it("fetches data with error", async () => {
  const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
    statusText: "something went wrong",
    json: () => Promise.resolve(),
  } as Response);

  const { result } = renderHook(() => useFetch("some valid url"));

  let response = result.current;
  expect(response.isLoading).toBe(true);

  await waitFor(() => {
    response = result.current;
    expect(response.isLoading).toBe(false);
  });

  expect(response.data).toEqual(null);
  expect(response.isError).toBeTruthy();
  expect(response.errorMessage).toBe("something went wrong");

  fetchSpy.mockRestore();
});
