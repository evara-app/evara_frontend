"use client";

import React, { useState, useRef } from "react";

//? import components
import Carousel from "@/app/(subPages)/properties/[slug]/Carousel";

function Header() {
  const swiper1Ref = useRef();
  const swiper2Ref = useRef();

  const [fullScreen, setFullScreen] = useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   set selected photo as active photo to full screen carousel
  const fullScreenHandler = (event) => {
    setFullScreen(event.activeIndex);
    handleOpen();
  };

  return (
    <div>
      <Carousel
        swiper1Ref={swiper1Ref}
        swiper2Ref={swiper2Ref}
        open={open}
        fullScreen={fullScreen}
        fullScreenHandler={fullScreenHandler}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Header;
