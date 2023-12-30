import React from "react";
import Image from "next/image";

//? import compontns
import Carousel from "./Carousel";

//? icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShare } from "react-icons/hi2";

function page() {
  return (
    <div className="md:container mx-auto">
      {/* //* title and location ... */}
      <div>
        <div>
          <h1 className="text-gray-default text-3xl">Ankara villa house</h1>
        </div>
        <div className="flexItems justify-between mt-2">
          <div className="flexItems text-gray-default/80">
            <HiOutlineLocationMarker className="icon-stroke icon text-gray-default/80 " />
            <p>ISTANBUL | ADALAR | BURGAZADA</p>
          </div>
          <div className="flexItems gap-x-2">
            <button className="flexItems">
              <HiOutlineHeart className="icon-stroke saveAndShareBtn" />
              save
            </button>
            <button className="flexItems">
              <HiOutlineShare className="icon-stroke saveAndShareBtn" /> share
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 mt-10">
        <div className="col-span-3">
          <Carousel />
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}

export default page;
