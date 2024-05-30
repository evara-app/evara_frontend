"use client";
import React from "react";

//? Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//? Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

//? import required modules
import { Pagination, Autoplay, FreeMode } from "swiper/modules";

function SwiperCarousel({ list, children }) {
  return (
    <Swiper
      className="py-5"
      slidesPerView="auto"
      spaceBetween={10}
      freeMode={true}
      pagination={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, FreeMode]}
    >
      {list.map((item) => (
        <SwiperSlide key={item} className="max-w-xs">
          {children}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperCarousel;
