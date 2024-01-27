import React from "react";
import Image from "next/image";

//? Import Swiper components & styles
import {
  Navigation,
  Scrollbar,
  A11y,
  Keyboard,
  Controller,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//? import mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  border: "none",
};

const carouselList = [
  {
    id: 1,
    src: "/assets/img/mac.jpg",
    alt: "test",
  },
  {
    id: 2,
    src: "/assets/img/auth.jpg",
    alt: "test",
  },
  {
    id: 3,
    src: "/assets/img/navbarBg.jpg",
    alt: "test",
  },
  {
    id: 4,
    src: "/assets/img/auth.jpg",
    alt: "test",
  },
];

function Carousel({
  swiper1Ref,
  swiper2Ref,
  open,
  handleClose,
  fullScreen,
  fullScreenHandler,
}) {
  return (
    <>
      <Swiper
        //   control both swipers with one command
        onSwiper={(swiper) => {
          swiper1Ref.current = swiper;
          swiper1Ref.current.controller.control = swiper2Ref.current;
        }}
        modules={[Navigation, Scrollbar, A11y, Keyboard, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ enabled: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        controller
        className="rounded-xl max-h-[500px]"
        onClick={fullScreenHandler}
      >
        {carouselList.map(({ id, src, alt }) => (
          <SwiperSlide key={id} className="aspect-w-16 aspect-h-9">
            <Image
              src={src}
              alt={alt}
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* // full screen carousel */}
      <Modal
        open={open}
        onClose={handleClose}
        className="bg-white-two bg-opacity-10 backdrop-blur-sm"
      >
        <Box className="outline-none" sx={style}>
          <Swiper
            //   control both swipers with one command
            onSwiper={(swiper) => {
              swiper2Ref.current = swiper;
              swiper2Ref.current.controller.control = swiper1Ref.current;
            }}
            modules={[Navigation, Scrollbar, A11y, Keyboard, Controller]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            initialSlide={fullScreen}
            keyboard={{ enabled: true, onlyInViewport: true }}
            controller
            className="max-w-5xl"
          >
            {carouselList.map(({ id, src, alt }) => (
              <SwiperSlide key={id} className="aspect-w-16 aspect-h-9">
                <img src={src} alt={alt} className="object-contain" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Modal>
    </>
  );
}

export default Carousel;
