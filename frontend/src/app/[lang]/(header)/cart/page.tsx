import React from "react";
import styles from "./cart.module.scss";
import { headers } from "next/headers";
import Content from "./content";
import { IJwtPayload } from "@/src/utils/authenticate";
import { Locale } from "@/src/types";
import { getDictionary } from "../../dictionaries";

interface ICartPageProps {
  params: { lang: Locale };
}

const CartPage = async ({ params }: ICartPageProps) => {
  const { lang } = params;
  const { cart } = await getDictionary(lang);
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "{}");
  const isUserDataExists = Object.keys(userData).length !== 0;

  return (
    <div className={styles.wrapper}>
      <Content isUserDataExists={isUserDataExists} pageData={cart} />
    </div>
  );
};

export default CartPage;
