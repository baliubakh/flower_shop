import React, { PropsWithChildren } from "react";
import styles from "./auth.module.scss";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.authFormWrapper}>{children}</div>;
};

export default AuthLayout;
