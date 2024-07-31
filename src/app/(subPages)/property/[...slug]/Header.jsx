"use client";

import React, { useState, useRef } from "react";

//? import components
import Carousel from "@/app/(subPages)/property/[...slug]/Carousel";

function Header({ property }) {
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
    <div className="grid grid-cols-6 gap-x-2 mt-5 md:mt-10">
      <div className="col-span-full md:col-span-4">
        <Carousel
          property={property}
          swiper1Ref={swiper1Ref}
          swiper2Ref={swiper2Ref}
          open={open}
          fullScreen={fullScreen}
          fullScreenHandler={fullScreenHandler}
          handleClose={handleClose}
        />
      </div>
      <div className="col-span-full md:col-span-2 grid grid-cols-2 gap-4 mt-5 md:mt-0">
        <button className="detailsHeaderActiveBtn">
          <img
            className="detailsHeaderActiveImage"
            src="/assets/svg/location.svg"
            alt="location"
          />
          Location
        </button>
        <button className="detailsHeaderDeactiveBtn">
          <img
            className="detailsHeaderDeactiveImage"
            src="/assets/svg/panorama.svg"
            alt="location"
          />
          Location
        </button>
        <button className="detailsHeaderDeactiveBtn">
          <img
            className="detailsHeaderDeactiveImage"
            src="/assets/svg/photos.svg"
            alt="location"
          />
          Location
        </button>
        <button className="detailsHeaderDeactiveBtn">
          <img
            className="detailsHeaderDeactiveImage"
            src="/assets/svg/photos.svg"
            alt="location"
          />
          Location
        </button>
      </div>
    </div>
  );
}

export default Header;
