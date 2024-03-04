"use client";

import React from "react";
import Link from "next/link";

//? import mui
import Divider from "@mui/material/Divider";

//? import icons
import SizeIcon from "&/assets/svg/size.svg";
import BedIcon from "&/assets/svg/bed.svg";
import FloorIcon from "&/assets/svg/floor.svg";
import { AiOutlineHeart } from "react-icons/ai";

function FavCard() {
  const favHandler = () => {
    console.log("clicked !");
  };
  return (
    <Link href="#">
      <div className="max-w-[250px] lg:max-w-xs rounded-md overflow-hidden shadow-md hover:shadow-lg transition relative">
        <div>
          <img src="/assets/img/auth.jpg" alt="thumbnail" />
          <button
            className="absolute top-2 right-2 text-white p-1 bg-red-500 rounded-full z-10"
            onClick={favHandler}
          >
            <AiOutlineHeart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2">
          <h5 className="text-lg text-gray-default font-medium">
            Ankara villa house
          </h5>
          <p className="text-white-two text-sm mb-2">Shiraz - Qasrdasht</p>
          <span className="text-lg text-green-blue font-medium">
            2,5000,000 USD
          </span>
          <Divider className="my-2" />
          <div className="flex items-center justify-between text-white-two text-xs mx-2">
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

export default FavCard;
