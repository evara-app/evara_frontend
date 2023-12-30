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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

import FullScreenComponent from "./FullScreen";
function Carousel() {
  const [fullScreen, setFullScreen] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Keyboard, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true, onlyInViewport: true }}
      >
        <SwiperSlide className="aspect-w-16 aspect-h-9">
          <Image
            src="/assets/img/mac.jpg"
            alt="test"
            fill={true}
            objectPosition="bottom"
            objectFit="cover"
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
      </Swiper>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          className="bg-white-two bg-opacity-10 backdrop-blur-sm"
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Swiper
              modules={[Navigation, Scrollbar, A11y, Keyboard, Controller]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              keyboard={{ enabled: true, onlyInViewport: true }}
              className="max-w-5xl"
            >
              <SwiperSlide className="aspect-w-16 aspect-h-9">
                <img
                  src="/assets/img/mac.jpg"
                  alt="test"
                  className="object-contain"
                />
              </SwiperSlide>
              <SwiperSlide className="aspect-w-16 aspect-h-9">
                <img
                  src="/assets/img/navbarBg.jpg"
                  alt="test"
                  className="object-contain"
                />
              </SwiperSlide>
              <SwiperSlide className="aspect-w-16 aspect-h-9">
                <img
                  src="/assets/img/auth.jpg"
                  alt="test"
                  className="object-contain"
                />
              </SwiperSlide>
              <SwiperSlide className="aspect-w-16 aspect-h-9">
                <img
                  src="/assets/img/navbarBg.jpg"
                  alt="test"
                  className="object-contain"
                />
              </SwiperSlide>
            </Swiper>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Carousel;
