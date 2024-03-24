import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../constants";
import { ILocalCart } from "../types/cart";
import {
  useCreateUsersCartMutation,
  useGetUsersCartQuery,
  useLazyGetUsersCartQuery,
  useUpdateUsersCartMutation,
} from "../redux/services/cart";
import { filterObjByKeys } from "@/src/utils/filterObjByKeys";

export const UserGetUsersCart = (isUserDataExists: boolean) => {
  const [getDbCart, { isLoading: usersCartIsLoading }] =
    useLazyGetUsersCartQuery();
  const [updateCart] = useUpdateUsersCartMutation();
  const [createCart] = useCreateUsersCartMutation();
  const [usersCart, setUsersCart] = useState<{ [key: string]: number }>();

  const onChangeCartClick = async (id: number, amount: number) => {
    if (!isUserDataExists) {
      const cart: ILocalCart = JSON.parse(
        localStorage.getItem(LocalStorageKeys.cart) || "{}"
      );
      if (Object.keys(cart).length !== 0) {
        localStorage.setItem(
          LocalStorageKeys.cart,
          JSON.stringify({
            cartObj: { ...cart.cartObj, [id]: amount },
          })
        );
        setUsersCart({ ...cart.cartObj, [id]: amount });
      } else {
        localStorage.setItem(
          LocalStorageKeys.cart,
          JSON.stringify({
            cartObj: { [id]: amount },
          })
        );
        setUsersCart({ [id.toString()]: amount });
      }
    } else {
      const dbCart = await getDbCart();
      if ("data" in dbCart && dbCart.data) {
        updateCart({
          cartObj: JSON.stringify({
            ...JSON.parse(dbCart.data.cartObj),
            [id]: amount,
          }),
        });
        setUsersCart({ ...JSON.parse(dbCart.data.cartObj), [id]: amount });
      } else {
        createCart({ cartObj: JSON.stringify({ [id]: amount }) });
        setUsersCart({ [id.toString()]: amount });
      }
    }
  };

  const onAddToCartClick = async (id: number) => onChangeCartClick(id, 1);

  const onProductDelete = async (id: number) => {
    if (isUserDataExists) {
      const dbCart = await getDbCart();
      if ("data" in dbCart && dbCart.data) {
        const currCart: { [key: string]: number } = JSON.parse(
          dbCart.data.cartObj
        );
        const filtered = filterObjByKeys(currCart, [id.toString()]);
        updateCart({
          cartObj: JSON.stringify({
            ...filtered,
          }),
        });
        setUsersCart({ ...filtered });
      }
    } else {
      const cart: ILocalCart = JSON.parse(
        localStorage.getItem(LocalStorageKeys.cart) || "{}"
      );
      const filtered = filterObjByKeys(cart, [id.toString()]);

      if (Object.keys(cart).length !== 0) {
        localStorage.setItem(
          LocalStorageKeys.cart,
          JSON.stringify({
            cartObj: { ...filtered },
          })
        );
        setUsersCart({ ...filtered });
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (isUserDataExists) {
        const dbCart = await getDbCart();
        if ("data" in dbCart && dbCart.data)
          setUsersCart(JSON.parse(dbCart.data.cartObj));
      } else {
        const localCart = JSON.parse(
          localStorage.getItem(LocalStorageKeys.cart) || '{"cartObj":{}}'
        );
        if (localCart) setUsersCart(localCart.cartObj);
      }
    })();
  }, [getDbCart, isUserDataExists]);

  return {
    usersCart,
    onAddToCartClick,
    onChangeCartClick,
    onProductDelete,
    usersCartIsLoading,
  };
};
