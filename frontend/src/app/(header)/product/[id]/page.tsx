import React from "react";
import styles from "./productItem.module.scss";
import ProductContent from "./content";

interface IProductPage {
  params: { id: string };
}

const ProductPage = ({ params }: IProductPage) => {
  const { id } = params;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <ProductContent id={id} />
      </div>
    </div>
  );
};

export default ProductPage;

