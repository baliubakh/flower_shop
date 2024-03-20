import React, {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  RefAttributes,
  forwardRef,
} from "react";
import styles from "./input.module.scss";
import { FieldError } from "react-hook-form";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  error?: FieldError;
}

const TextInput = forwardRef<
  HTMLInputElement,
  ITextInputProps & RefAttributes<HTMLInputElement>
>(({ title, labelProps, error, ...otherProps }, ref) => (
  <div className={styles.inputWrapper}>
    {title && (
      <label {...labelProps} className={styles.inputTitle}>
        {title}
      </label>
    )}
    <div className={styles.inputErrorWrapper}>
      <input {...otherProps} ref={ref} className={styles.input} />
      {error && <span className={styles.inputError}>{error.message}</span>}
    </div>
  </div>
));

TextInput.displayName = "TextInput";

export default TextInput;
