"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "@/src/components/productCard";
import { useGetActiveProductsQuery } from "@/src/redux/services/product";
import Loader from "@/src/components/loader";

const Slider = () => {
  const { data, isLoading } = useGetActiveProductsQuery();

  if (isLoading) return <Loader />;

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data &&
        data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
