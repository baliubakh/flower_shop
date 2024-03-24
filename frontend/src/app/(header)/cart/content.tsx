"use client";

import React, { useEffect } from "react";
import styles from "./cart.module.scss";
import { useGetFullCartMutation } from "@/src/redux/services/cart";
import SVGCartSolid from "@/public/img/svg/cartSolid";
import { UserGetUsersCart } from "@/src/hooks/useGetUsersCart";
import Loader from "@/src/components/loader";
import CartItem from "./components/cartItem";
import Button from "@/src/components/button";

interface IContentProps {
  isUserDataExists: boolean;
}

const Content = ({ isUserDataExists }: IContentProps) => {
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
        <p className={styles.noCartText}>
          You don&#39;t have any products in your cart, please add something to
          cart to see changes
        </p>
      </div>
    )) || (
      <div className={styles.cartWrapper}>
        <div className={styles.cartItems}>
          <h3 className={styles.cartHeader}>Your Cart</h3>
          <div className={styles.cartItemsWrapper}>
            {filledCart?.map((product) => (
              <CartItem
                key={product.id}
                onAmountChange={onChangeCartClick}
                onProductDelete={onProductDelete}
                {...product}
              />
            ))}
          </div>
        </div>
        <div className={styles.cartSubtotal}>
          <p>
            Subtotal for {filledCart?.length} item
            {filledCart && filledCart.length === 1 ? "" : "s"}:{" "}
            <strong>
              {filledCart
                ?.map((el) => el.amount * el.quantity)
                .reduce((acc, curr) => acc + curr)}
              ₴
            </strong>
          </p>
          <div className={styles.subTotalBtnWrapper}>
            <Button text="Checkout" />
          </div>
        </div>
      </div>
    )
  );
};

export default Content;
