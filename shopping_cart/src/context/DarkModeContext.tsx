import React, { createContext, useContext, useEffect, useReducer } from "react";
import { DarkMode, DarkModeAction, DarkModeDispatch } from "../types/types";

const DarkModeContext = createContext<DarkMode>("dark");
const DarkModeDispatchContext = createContext<DarkModeDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

export function useDarkModeDispatchContext() {
  return useContext(DarkModeDispatchContext);
}

export function DarkModeProvider({ children }: Props) {
  function getInitialMode() {
    const lsVal = window.localStorage.getItem("colorMode");
    if (lsVal) {
      return lsVal === "dark" ? "dark" : "light";
    } else {
      return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
    }
  }
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const initialMode = getInitialMode();

  const [mode, modeDispatch] = useReducer(darkModeReducer, initialMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => {
      modeDispatch({ type: "setTo", mode: mediaQuery.matches ? "dark" : "light" });
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  return (
    <DarkModeContext.Provider value={mode}>
      <DarkModeDispatchContext.Provider value={modeDispatch}>
        {children}
      </DarkModeDispatchContext.Provider>
    </DarkModeContext.Provider>
  );
}

function darkModeReducer(state: DarkMode, action: DarkModeAction) {
  switch (action.type) {
    case "toggle":
      return state === "light" ? "dark" : "light";
    case "setTo":
      return action.mode!;
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}
