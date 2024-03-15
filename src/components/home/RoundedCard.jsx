"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
//? import mui
import Divider from "@mui/material/Divider";

//? import icons
import SizeIcon from "&/assets/svg/size.svg";
import BedIcon from "&/assets/svg/bed.svg";
import FloorIcon from "&/assets/svg/floor.svg";

function RoundedCard() {
  const favHandler = () => {
    console.log("clicked !");
  };
  return (
    <Link href="#">
      <div className="max-w-xs overflow-hidden relative bg-gray-100">
        <div className="rounded__card__tl shadow-[0_10px_20px_0_rgb(0,0,0,10%)] bg-white">
          <div className="aspect-w-16 aspect-h-14 rounded-tl-[50%]">
            <Image
              src="/assets/img/auth.jpg"
              className="rounded-tl-[50%]"
              alt="thumbnail"
              fill
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-start rounded-b-md p-2 bg-white shadow-[0_10px_20px_0_rgb(0,0,0,10%)]">
          <h5 className="text-xl text-gray-default font-bold">
            Ankara villa house
          </h5>
          <p className="text-white-two text-sm mb-2">Shiraz - Qasrdasht</p>
          <span className="text-xl text-green-blue font-bold mb-5">
            2,5000,000 USD
          </span>
          <p className="text-white-two text-sm mb-2">June 19, 2023</p>
          <Divider className="my-2" />
          <div className="flex items-center justify-between text-white-two text-xs mx-2 my-1">
            <div className="flex items-center gap-x-1">
              <BedIcon className="w-4 h-4 " />
              <span>2 Bed</span>
            </div>
            <div className="flex items-center gap-x-1">
              <FloorIcon className="w-4 h-4" />
              <span>3 Floor</span>
            </div>
            <div className="flex items-center gap-x-1">
              <SizeIcon className="w-4 h-4" />
              <span>1,500 M2</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RoundedCard;
