import { createContext, useContext, useReducer } from "react";
import { DarkModeState, useDarkMode } from "../hooks/useDarkMode";
import { DarkModeAction } from "../types/types";

type DarkModeContextType = {
  mode: "dark" | "light";
};

const DarkModeContext = createContext<DarkModeContextType>({
  mode: "dark",
});

type Props = {
  children: React.ReactNode;
};

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }: Props) {
  const [mode, setDarkMode] = useDarkMode();

  const [cart, dispatchCart] = useReducer(darkModeReducer, "light");

  return (
    <DarkModeContext.Provider value={{ mode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function darkModeReducer(state: DarkModeState, action: DarkModeAction) {
  switch (action.type) {
    case "dark":
      return "light";
    case "light":
      return "dark";
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}
