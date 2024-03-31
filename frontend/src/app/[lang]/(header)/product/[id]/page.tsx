import React from "react";
import styles from "./productItem.module.scss";
import ProductContent from "./content";
import { Locale } from "@/src/types";
import { getDictionary } from "../../../dictionaries";

interface IProductPage {
  params: { id: string; lang: Locale };
}

const ProductPage = async ({ params }: IProductPage) => {
  const { id, lang } = params;
  const { productItem } = await getDictionary(lang);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <ProductContent pageData={productItem} id={id} />
      </div>
    </div>
  );
};

export default ProductPage;
