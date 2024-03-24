import React, { useState } from "react";
import styles from "../cart.module.scss";
import SVGMinusSolid from "@/public/img/svg/minusSolid";
import SVGPlusSolid from "@/public/img/svg/plusSolid";

interface ICounterProps {
  start?: number;
  handleCountChange?: (count: number) => void;
}

const Counter = ({
  start = 1,
  handleCountChange = () => {},
}: ICounterProps) => {
  const [count, setCount] = useState<number>(start);

  const handleMinusClick = () => {
    if (count !== 1) {
      handleCountChange(count - 1);
      setCount((prev) => prev - 1);
    }
  };

  const handlePlusClick = () => {
    handleCountChange(count + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div className={styles.counterWrapper}>
      <div className={styles.counterOperation} onClick={handleMinusClick}>
        <SVGMinusSolid />
      </div>
      <span className={styles.count}>{count}</span>
      <div className={styles.counterOperation} onClick={handlePlusClick}>
        <SVGPlusSolid />
      </div>
    </div>
  );
};

export default Counter;
