import React from "react";
import Content from "./content";
import { headers } from "next/headers";
import { IJwtPayload } from "@/src/utils/authenticate";

const ShopPage = () => {
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "{}");

  const isUserDataExists = Object.keys(userData).length !== 0;
  return <Content isUserDataExists={isUserDataExists} />;
};

export default ShopPage;
