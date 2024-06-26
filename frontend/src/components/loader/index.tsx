import React from "react";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
