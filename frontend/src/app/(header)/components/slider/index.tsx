"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "@/src/components/productCard";
import { useGetActiveProductsQuery } from "@/src/redux/services/product";
import Loader from "@/src/components/loader";
import { UserGetUsersCart } from "@/src/hooks/useGetUsersCart";

interface ISliderProps {
  isUserDataExists: boolean;
}

const Slider = ({ isUserDataExists }: ISliderProps) => {
  const { usersCartIsLoading, usersCart, onAddToCartClick } =
    UserGetUsersCart(isUserDataExists);
  const { data, isLoading } = useGetActiveProductsQuery();

  if (isLoading || usersCartIsLoading) return <Loader />;

  return (
    <Swiper spaceBetween={50} slidesPerView={4}>
      {data &&
        data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              {...product}
              onAddCartClick={onAddToCartClick}
              isInCart={usersCart && !!usersCart[product.id]}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
