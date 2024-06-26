import Image from "next/image";
import React, { useState } from "react";

import { IProduct } from "@/src/types/product";
import noImage from "@/public/img/noImage.png";
import styles from "../cart.module.scss";
import SVGTrashSolid from "@/public/img/svg/trashSolid";
import Counter from "./counter";
import { IItem } from "@/src/types";

interface ICartItemProps extends IProduct {
  amount: number;
  onAmountChange: (id: number, amount: number) => void;
  onProductDelete: (id: number) => void;
  pageData: IItem;
}

const CartItem = ({
  photos,
  id,
  name,
  category,
  price,
  amount,
  onAmountChange,
  onProductDelete,
  pageData,
}: ICartItemProps) => {
  const [total, setTotal] = useState<number>(amount);

  const handleTotalChange = (num: number) => {
    onAmountChange(id, num);
    setTotal(num);
  };

  return (
    <div className={styles.cartItemWrapper}>
      <div className={styles.cartItemImage}>
        <Image
          src={photos && photos[0] ? photos[0] : noImage}
          alt={`${id}-${name}-flower`}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.itemWrapper}>
        <div className={styles.spaceBetween}>
          <h5 className={styles.itemTitle}>{name}</h5>
          <div
            className={styles.trashIconWrapper}
            onClick={() => onProductDelete(id)}
          >
            <SVGTrashSolid />
          </div>
        </div>
        <span className={styles.categoryText}>{category}</span>
        <div className={styles.price}>
          {pageData.perUnit} {price} грн
        </div>
        <div className={`${styles.spaceBetween} ${styles.counterMobile}`}>
          <Counter handleCountChange={handleTotalChange} start={total} />
          <span>
            {pageData.total} {total * price}грн
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
