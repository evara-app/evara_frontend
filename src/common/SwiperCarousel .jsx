"use client";
import React from "react";

//? Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//? Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

//? import required modules
import { Pagination, Autoplay, FreeMode } from "swiper/modules";

//? import components
import RoundedCard from "@/components/home/RoundedCard";

function SwiperCarousel({ data }) {
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
      {data.map((item) => (
        <SwiperSlide key={item.id} className="max-w-xs">
          <RoundedCard data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperCarousel;
