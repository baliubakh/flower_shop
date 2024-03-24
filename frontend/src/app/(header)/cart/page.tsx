import React from "react";
import styles from "./cart.module.scss";
import { headers } from "next/headers";
import Content from "./content";
import { IJwtPayload } from "@/src/utils/authenticate";

const CartPage = () => {
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "{}");
  const isUserDataExists = Object.keys(userData).length !== 0;

  return (
    <div className={styles.wrapper}>
      <Content isUserDataExists={isUserDataExists} />
    </div>
  );
};

export default CartPage;
