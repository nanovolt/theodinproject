import { render, screen, waitFor, act } from "@testing-library/react";
import { Counter } from "./Counter";
import userEvent from "@testing-library/user-event";

it("counts", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await act(async () => {
    await user.click(screen.getByText(/click/));
  });

  await waitFor(async () => {
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
