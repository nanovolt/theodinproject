import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  options?: {
    isIcon?: boolean;
  };
}

export const Button = (props: Props) => {
  const { options, children, className, ...rest } = props;

  return (
    <button className={cn(styles.button, className, { [styles.icon]: options?.isIcon })} {...rest}>
      {children}
    </button>
  );
};
