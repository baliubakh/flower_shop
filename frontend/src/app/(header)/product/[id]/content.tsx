"use client";

import React from "react";
import styles from "./productItem.module.scss";
import { useGetSpecificProductQuery } from "@/src/redux/services/product";
import Loader from "@/src/components/loader";
import Image from "next/image";
import noImage from "@/public/img/noImage.png";
import Button from "@/src/components/button";
import SVGCartSolid from "@/public/img/svg/cartSolid";

interface IProductContentProps {
  id: string;
}

const ProductContent = ({ id }: IProductContentProps) => {
  const { data, isLoading } = useGetSpecificProductQuery(id);

  if (isLoading) return <Loader />;

  return (
    data && (
      <div className={styles.productContentWrapper}>
        <div className={styles.productImage}>
          <Image
            src={data.photo ? data.photo : noImage}
            alt={`${id}-${data.name}-flower`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.productInfoWrapper}>
          <div>
            {" "}
            <h5 className={styles.productInfoTitle}>{data.name}</h5>
            <h6 className={styles.productCategory}>{data.category}</h6>
            <p className={styles.productDescription}>{data.description}</p>
          </div>
          <div className={styles.productBottomInfoWrapper}>
            <span className={styles.productPrice}>{data.price}₴ / each</span>
            <Button size="small" icon={<SVGCartSolid />} text="Add to cart" />
          </div>
        </div>
      </div>
    )
  );
};

export default ProductContent;
