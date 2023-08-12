import { ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type Props = {
  onClick?: () => void;
  className?: string | string[];
  children?: ReactNode;
  disabled?: boolean;
  style?: {};
};

export function Button({
  className,
  onClick,
  children,
  disabled,
  style,
}: Props) {
  const cn = classNames(styles.button, className);
  return (
    <button style={style} className={cn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
