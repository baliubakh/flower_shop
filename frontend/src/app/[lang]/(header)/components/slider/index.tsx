"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "@/src/components/productCard";
import { useGetActiveProductsQuery } from "@/src/redux/services/product";
import Loader from "@/src/components/loader";
import { UserGetUsersCart } from "@/src/hooks/useGetUsersCart";
import { IProductCard } from "@/src/types";
import { SwiperOptions } from "swiper/types";

interface ISliderProps {
  isUserDataExists: boolean;
  pageData: IProductCard;
}
const swiperOptions: SwiperOptions = {
  spaceBetween: 30,
  slidesPerView: 4,
  loop: true,
  breakpoints: {
    1400: {
      slidesPerView: 4,
      spaceBetween: 30,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const Slider = ({ isUserDataExists, pageData }: ISliderProps) => {
  const { usersCartIsLoading, usersCart, onAddToCartClick } =
    UserGetUsersCart(isUserDataExists);
  const { data, isLoading } = useGetActiveProductsQuery();

  if (isLoading || usersCartIsLoading) return <Loader />;

  return (
    <Swiper {...swiperOptions}>
      {data &&
        data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              {...product}
              pageData={pageData}
              onAddCartClick={onAddToCartClick}
              isInCart={usersCart && !!usersCart[product.id]}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
