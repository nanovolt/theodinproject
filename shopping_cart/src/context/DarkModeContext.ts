import { createContext } from "react";

type DarkModeContextType = {
  mode: "dark" | "light";
};

export const DarkModeContext = createContext<DarkModeContextType>({
  mode: "dark",
});
