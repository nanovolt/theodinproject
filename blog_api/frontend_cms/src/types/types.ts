import { Location } from "react-router-dom";

export type DarkModeAction = {
  type: "toggle" | "setTo";
  mode?: "dark" | "light";
};

// export interface RouterLocation extends Location {
//   state: {
//     from: string;
//   };
// }

export type RouterLocation = {
  state: {
    from: string;
    type: string;
  };
} & Location;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

export type DarkMode = "dark" | "light";
export type DarkModeDispatch = React.Dispatch<DarkModeAction>;
