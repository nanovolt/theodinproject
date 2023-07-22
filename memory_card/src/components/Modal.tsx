import { ReactNode } from "react";
import "./modal.css";

type Props = {
  children?: ReactNode;
};

export default function Modal({ children }: Props) {
  return (
    <div className="modal-background">
      <div className="modal-window">{children}</div>
    </div>
  );
}
