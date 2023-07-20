import { ReactNode } from "react";
import "./header.css";

type Props = {
  children?: ReactNode;
};

export default function Header({ children }: Props) {
  return <header>{children}</header>;
}
