"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
  Controller,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function FullScreen({ index }) {
  console.log(index?.activeIndex);
  return (
    <div>
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Keyboard, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true, onlyInViewport: true }}
        initialSlide={index?.activeIndex}
      >
        <SwiperSlide className="aspect-w-16 aspect-h-9">
          <Image
            src="/assets/img/auth.jpg"
            alt="test"
            fill={true}
            objectFit="cover"
            objectPosition="bottom"
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide className="aspect-w-16 aspect-h-9">
          <Image
            src="/assets/img/navbarBg.jpg"
            alt="test"
            fill={true}
            objectFit="cover"
            objectPosition="bottom"
          />
        </SwiperSlide>
        <SwiperSlide className="aspect-w-16 aspect-h-9">
          <Image
            src="/assets/img/auth.jpg"
            alt="test"
            fill={true}
            objectFit="cover"
            objectPosition="bottom"
          />
        </SwiperSlide>
        <SwiperSlide className="aspect-w-16 aspect-h-9">
          <Image
            src="/assets/img/navbarBg.jpg"
            alt="test"
            fill={true}
            objectFit="cover"
            objectPosition="bottom"
          />
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
}

export default FullScreen;
