"use client";
import React from "react";

//? Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//? Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

//? import required modules
import { Pagination } from "swiper/modules";

function SwiperCarousel({ list, children }) {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={true}
      modules={[Pagination]}
      className="mySwiper"
    >
      {list.map((item) => (
        <SwiperSlide key={item}>{children}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperCarousel;
