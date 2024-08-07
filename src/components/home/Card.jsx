import React from "react";
import Link from "next/link";
import Image from "next/image";
//? import mui
import Divider from "@mui/material/Divider";

//? import icons
import SizeIcon from "&/assets/svg/size.svg";
import BedIcon from "&/assets/svg/bed.svg";
import FloorIcon from "&/assets/svg/floor.svg";

//? import components
import PropertyPrice from "@/app/(subPages)/properties/PropertyPrice";

//? import utils
import { convertTime } from "@/utils/toLocalTime";

function Card({ data }) {
  return (
    <Link href="#">
      <div className="max-w-xs overflow-hidden relative bg-gray-100 rounded-md">
        <div className="shadow-[0_10px_20px_0_rgb(0,0,0,10%)] bg-white p-4">
          <div className="aspect-w-16 aspect-h-14 rounded-md">
            <img
              src={data?.banner}
              className="rounded-md"
              alt="thumbnail"
              fill
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-start rounded-b-md p-2 bg-white shadow-[0_10px_20px_0_rgb(0,0,0,10%)] h-[185px]">
          <h5 className="relative line-clamp-2 text-xl text-gray-default font-bold h-14">
            {data?.title}
          </h5>
          <p className="text-white-two text-sm mb-2">
            {data?.country?.name} - {data?.province?.name}
          </p>
          <span className="text-xl text-green-blue font-bold mb-5">
            <PropertyPrice cardData={data} />
          </span>
          <p className="text-white-two text-sm mb-2">
            {convertTime(data?.approved_at, "en-US")}
          </p>
          <Divider className="my-2" />
          <div className="flex items-center justify-between text-white-two text-xs mx-2 my-1">
            <div className="flex items-center gap-x-1">
              <BedIcon className="w-4 h-4 " />
              <span>{data?.feature_metadata?.room} Bed</span>
            </div>
            <div className="flex items-center gap-x-1">
              <FloorIcon className="w-4 h-4" />
              <span>{data?.feature_metadata?.floor} Floor</span>
            </div>
            <div className="flex items-center gap-x-1">
              <SizeIcon className="w-4 h-4" />
              <span>{data?.gross} M2</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
