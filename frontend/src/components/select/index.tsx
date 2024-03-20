import React, { useState } from "react";
import styles from "./select.module.scss";
import { FieldError } from "react-hook-form";

export interface IOption<T> {
  label: string;
  value: T;
}

interface ISelectProps<T> {
  title?: string;
  header?: string;
  options: IOption<T>[];
  handleSelectChange: (option: T) => void;
  error?: FieldError;
}

const Select = <T = string,>({
  title,
  header,
  options,
  handleSelectChange,
  error,
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSelect = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: IOption<T>) => {
    handleSelectChange(option.value);
    toggleSelect();
  };

  const handleBlur = () => setIsOpen(false);

  return (
    <div className={styles.selectWrapper} tabIndex={0} onBlur={handleBlur}>
      {title && <span className={styles.selectTitle}>{title}</span>}
      <div className={styles.inputErrorWrapper}>
        <div className={styles.header} onClick={toggleSelect}>
          <span>{header}</span>
          <span className={`${styles.arrow} ${isOpen ? styles.active : ""}`} />
        </div>
        {error && <span className={styles.inputError}>{error.message}</span>}{" "}
      </div>
      <ul className={`${styles.body} ${isOpen ? styles.open : ""}`}>
        {options.map((option, idx) => (
          <li
            key={idx}
            className={styles.option}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
