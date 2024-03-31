import React from "react";
import Content from "./content";
import { headers } from "next/headers";
import { IJwtPayload } from "@/src/utils/authenticate";
import { Locale } from "@/src/types";
import { getDictionary } from "../../dictionaries";

interface IShopPageProps {
  params: { lang: Locale };
}

const ShopPage = async ({ params }: IShopPageProps) => {
  const { lang } = params;
  const headersList = headers();
  const userData: IJwtPayload = JSON.parse(headersList.get("userData") || "{}");
  const { shop, productCard } = await getDictionary(lang);
  const isUserDataExists = Object.keys(userData).length !== 0;
  return (
    <Content
      isUserDataExists={isUserDataExists}
      pageData={shop}
      productCardData={productCard}
      lang={lang}
    />
  );
};

export default ShopPage;
