import { ReactNode } from "react";
import "./footer.css";

type Props = {
  children?: ReactNode;
};

export default function Footer({ children }: Props) {
  return <footer>{children}</footer>;
}
