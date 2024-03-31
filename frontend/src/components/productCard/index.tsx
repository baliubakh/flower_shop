import { IProduct } from "@/src/types/product";
import styles from "./productCard.module.scss";
import React from "react";
import Image from "next/image";
import noImage from "@/public/img/noImage.png";
import SVGCartSolid from "@/public/img/svg/cartSolid";
import SVGPencilSolid from "@/public/img/svg/pencilSolid";
import SVGTrashSolid from "@/public/img/svg/trashSolid";
import SVGCircleCheck from "@/public/img/svg/circleCheck";
import { IProductCard } from "@/src/types";

interface IProductCardProps extends IProduct {
  pageData: IProductCard;
  isAdmin?: boolean;
  onTrashClick?: (id: string) => Promise<void>;
  onEditClick?: (data: IProduct) => void;
  onAddCartClick?: (id: number) => void | Promise<void>;
  isInCart?: boolean;
}

const ProductCard = ({
  name,
  category,
  description,
  photos,
  id,
  price,
  quantity,
  isAdmin = false,
  onEditClick,
  onTrashClick,
  onAddCartClick = () => {},
  isInCart = false,
  pageData,
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
                photos,
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
          src={photos && photos[0] ? photos[0] : noImage}
          alt={`${id}-${name}-flower`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.name}>{name}</div>
        <div className={styles.category}>{category}</div>
        <div className={styles.infoWrapper}>
          <span className={styles.infoItem}>{price} грн</span>
          {(isInCart && (
            <div className={styles.cartWrapper}>
              <div className={styles.cartIcon}>
                <SVGCircleCheck />
              </div>
              {pageData.in}
            </div>
          )) || (
            <div
              className={styles.cartWrapper}
              onClick={(e) => {
                e.preventDefault();
                onAddCartClick(+id);
              }}
            >
              <div className={styles.cartIcon}>
                <SVGCartSolid />
              </div>
              {pageData.add}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
