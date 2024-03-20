import { IProduct } from "@/src/types/product";
import styles from "./productCard.module.scss";
import React from "react";
import Image from "next/image";
import noImage from "@/public/img/noImage.png";
import SVGCartSolid from "@/public/img/svg/cartSolid";
import SVGPencilSolid from "@/public/img/svg/pencilSolid";
import SVGTrashSolid from "@/public/img/svg/trashSolid";

interface IProductCardProps extends IProduct {
  isAdmin?: boolean;
  onTrashClick?: (id: string) => Promise<void>;
  onEditClick?: (data: IProduct) => void;
}

const ProductCard = ({
  name,
  category,
  description,
  photo,
  id,
  price,
  quantity,
  isAdmin = false,
  onEditClick,
  onTrashClick,
  ...otherProps
}: IProductCardProps) => {
  return (
    <div className={styles.card}>
      {isAdmin && (
        <div className={styles.changeIcons}>
          <div
            className={styles.changeIconItem}
            onClick={() =>
              onEditClick &&
              onEditClick({
                category,
                description,
                quantity,
                price,
                name,
                id,
                photo,
                ...otherProps,
              })
            }
          >
            <SVGPencilSolid />
          </div>
          <div
            className={styles.changeIconItem}
            onClick={() => onTrashClick && onTrashClick(id.toString())}
          >
            <SVGTrashSolid />
          </div>
        </div>
      )}
      <div className={styles.imageWrapper}>
        <Image
          src={photo ? photo : noImage}
          alt={`${id}-${name}-flower`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.name}>{name}</div>
        <div className={styles.category}>{category}</div>
        <div className={styles.infoWrapper}>
          <span className={styles.infoItem}>{price} грн</span>
          <div className={styles.cartWrapper}>
            <div className={styles.cartIcon}>
              <SVGCartSolid />
            </div>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
