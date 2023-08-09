import { render, screen, waitFor, act } from "@testing-library/react";
import { Counter } from "./Counter";
import userEvent from "@testing-library/user-event";

it("counts", async () => {
  render(<Counter />);

  // await act(async () => {});

  userEvent.click(screen.getByText(/click/));

  await waitFor(async () => {
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
