import ReactDOM from "react-dom/client";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(),
}));

const render = jest.fn().mockName("render");

beforeEach(() => {
  (ReactDOM.createRoot as jest.Mock).mockReturnValue({ render });
  import("./index");
});

it("calls createRoot without crashing", () => {
  expect(ReactDOM.createRoot).toHaveBeenCalled();
});
