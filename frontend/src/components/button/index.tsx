import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type TButtonColors = "brandColor1";

type TButtonSizes = "medium" | "large" | "small";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColors;
  size?: TButtonSizes;
  text: string;
  icon?: React.ReactNode;
}

const Button = ({
  color = "brandColor1",
  size = "medium",
  text,
  icon,
  ...otherProps
}: IButtonProps) => {
  return (
    <button
      {...otherProps}
      className={`${styles.customBtn} ${styles[`${color}`]} ${
        styles[`${size}`]
      }`}
    >
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      {text}
    </button>
  );
};

export default Button;
