"use client";

import React from "react";
import styles from "./productItem.module.scss";
import { useGetSpecificProductQuery } from "@/src/redux/services/product";
import Loader from "@/src/components/loader";
import Image from "next/image";
import noImage from "@/public/img/noImage.png";
import Button from "@/src/components/button";
import SVGCartSolid from "@/public/img/svg/cartSolid";
import { IProductItem } from "@/src/types";

interface IProductContentProps {
  id: string;
  pageData: IProductItem;
}

const ProductContent = ({ id, pageData }: IProductContentProps) => {
  const { data, isLoading } = useGetSpecificProductQuery(id);

  if (isLoading) return <Loader />;

  return (
    data && (
      <div className={styles.productWrapper}>
        <div className={styles.productContentWrapper}>
          <div className={styles.productImage}>
            <Image
              src={data.photos ? data.photos[0] : noImage}
              alt={`${id}-${data.name}-flower`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          <div className={styles.productInfoWrapper}>
            <div>
              <h5 className={styles.productInfoTitle}>{data.name}</h5>
              <h6 className={styles.productCategory}>{data.category}</h6>
              <p className={styles.productDescription}>{data.description}</p>
            </div>
            <div className={styles.productBottomInfoWrapper}>
              <span className={styles.productPrice}>
                {data.price}₴ / {pageData.each}
              </span>
              <Button
                size="small"
                icon={<SVGCartSolid />}
                text={pageData.addToCart}
              />
            </div>
          </div>
        </div>
        <div>
          <p className={styles.moreText}>{pageData.morePhotos}</p>
          <div className={styles.moreWrapper}>
            {data.photos.map((img, idx) => (
              <div className={styles.moreImageWrapper} key={idx}>
                <Image
                  src={img}
                  alt={`more-photos-${idx}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductContent;
