"use client";

import React, { useEffect } from "react";
import styles from "./cart.module.scss";
import { useGetFullCartMutation } from "@/src/redux/services/cart";
import SVGCartSolid from "@/public/img/svg/cartSolid";
import { UserGetUsersCart } from "@/src/hooks/useGetUsersCart";
import Loader from "@/src/components/loader";
import CartItem from "./components/cartItem";
import Button from "@/src/components/button";
import { ICart } from "@/src/types";

interface IContentProps {
  isUserDataExists: boolean;
  pageData: ICart;
}

const Content = ({ isUserDataExists, pageData }: IContentProps) => {
  const { usersCartIsLoading, usersCart, onChangeCartClick, onProductDelete } =
    UserGetUsersCart(isUserDataExists);
  const [getFilledCart, { data: filledCart, isLoading }] =
    useGetFullCartMutation();

  useEffect(() => {
    if (usersCart) getFilledCart({ cartObj: JSON.stringify(usersCart) });
  }, [usersCart, getFilledCart]);

  if (isLoading || usersCartIsLoading) return <Loader />;

  return (
    !usersCart ||
    (Object.keys(usersCart).length === 0 && (
      <div className={`${styles.content} ${styles.noCartWrapper}`}>
        <div className={styles.noCartIcon}>
          <SVGCartSolid />
        </div>
        <p className={styles.noCartText}>{pageData.noItemsText}</p>
      </div>
    )) || (
      <div className={styles.cartWrapper}>
        <div className={styles.cartItems}>
          <h3 className={styles.cartHeader}>{pageData.yourCart}</h3>
          <div className={styles.cartItemsWrapper}>
            {filledCart?.map((product) => (
              <CartItem
                key={product.id}
                onAmountChange={onChangeCartClick}
                onProductDelete={onProductDelete}
                pageData={pageData.item}
                {...product}
              />
            ))}
          </div>
        </div>
        <div className={styles.cartSubtotal}>
          <p>
            {pageData.subtotal.replace(
              "{{length}}",
              (filledCart || [])?.length.toString()
            )}
            <strong>
              {" "}
              {filledCart
                ?.map((el) => el.amount * el.quantity)
                .reduce((acc, curr) => acc + curr)}
              ₴
            </strong>
          </p>
          <div className={styles.subTotalBtnWrapper}>
            <Button text={pageData.checkout} />
          </div>
        </div>
      </div>
    )
  );
};

export default Content;
