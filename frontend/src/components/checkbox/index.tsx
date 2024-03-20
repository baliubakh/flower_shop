import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import styles from "./checkbox.module.scss";

interface ICheckboxProps {
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
}
const Checkbox = ({ labelProps, inputProps, label }: ICheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      <input {...inputProps} type="checkbox" className={styles.input} />
      <label {...labelProps} className={styles.label} htmlFor="javascript">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
