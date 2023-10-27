export type DarkModeAction = {
  type: "toggle" | "setTo";
  mode?: "dark" | "light";
};

export type DarkMode = "dark" | "light";
export type DarkModeDispatch = React.Dispatch<DarkModeAction>;
