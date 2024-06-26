"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./shop.module.scss";
import TextInput from "@/src/components/input";
import SVGSortArrowDown from "@/public/img/svg/sortArrowDown";
import SVGSortArrowUp from "@/public/img/svg/sortArrowUp";
import { useGetActiveProductsQuery } from "@/src/redux/services/product";
import Loader from "@/src/components/loader";
import ProductCard from "@/src/components/productCard";
import { IProduct } from "@/src/types/product";
import Link from "next/link";
import { UserGetUsersCart } from "@/src/hooks/useGetUsersCart";
import { IProductCard, IShop, Locale } from "@/src/types";

interface IContentProps {
  isUserDataExists: boolean;
  pageData: IShop;
  productCardData: IProductCard;
  lang: Locale;
}

const Content = ({
  isUserDataExists,
  pageData,
  productCardData,
  lang,
}: IContentProps) => {
  const { usersCartIsLoading, usersCart, onAddToCartClick } =
    UserGetUsersCart(isUserDataExists);
  const [search, setSearch] = useState<string>("");
  const [sortCheap, setSortCheap] = useState<boolean>();
  const [sortedData, setSortedData] = useState<IProduct[]>([]);
  const { data, isLoading } = useGetActiveProductsQuery();

  const handleSortClick = () => setSortCheap((prev) => !prev);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value);

  useEffect(() => {
    if (data)
      setSortedData(
        data.filter(
          (el) => el.name.includes(search) || el.category.includes(search)
        )
      );
  }, [search, data]);

  useEffect(() => {
    if (data && typeof sortCheap !== "undefined") {
      const dataCopy = [...data];
      dataCopy.sort((a, b) =>
        sortCheap ? a.price - b.price : b.price - a.price
      );
      setSortedData(dataCopy);
    }
  }, [sortCheap, data]);

  if (isLoading || usersCartIsLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div className={styles.searchWrapper}>
          <TextInput
            placeholder={pageData.search}
            onChange={handleSearchInput}
          />
        </div>
        <div className={styles.sortWrapper} onClick={handleSortClick}>
          {sortCheap ? (
            <div className={styles.sortInner}>
              <div className={styles.sortIconWrapper}>
                <SVGSortArrowDown />
              </div>
              {pageData.cheap}
            </div>
          ) : (
            <div className={styles.sortInner}>
              <div className={styles.sortIconWrapper}>
                <SVGSortArrowUp />
              </div>
              {pageData.expensive}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        {sortedData.map((product) => (
          <Link
            key={product.id}
            href={`/${lang}/product/${product.id}`}
            className={styles.productLink}
          >
            <ProductCard
              {...product}
              pageData={productCardData}
              isInCart={usersCart && !!usersCart[product.id]}
              onAddCartClick={onAddToCartClick}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Content;
