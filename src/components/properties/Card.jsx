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

function Card({ cardData }) {
  return (
    <Link href={`/property/${cardData?.slug}/${cardData?.id}`}>
      <div className="max-w-[250px] mx-auto md:mx-0 overflow-hidden relative bg-gray-100 rounded-md group shadow transition">
        <div className="bg-white p-4 border border-b-0 border-[#d1d5db] group-hover:border-[#4ade80]">
          <div className="aspect-w-16 aspect-h-14 rounded-md">
            <Image
              src="/assets/img/auth.jpg"
              className="rounded-md"
              alt="thumbnail"
              fill
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-start rounded-b-md p-2 pt-4 bg-white border border-t-0 border-[#d1d5db] group-hover:border-[#4ade80]">
          <h5 className="relative text-lg text-gray-default font-bold truncate">
            {cardData?.title}
          </h5>
          <p className="text-white-two text-sm mb-2">
            {cardData?.city?.name} - {cardData?.province?.name}
          </p>
          <span className="text-xl text-green-blue font-bold mb-5">
            <PropertyPrice cardData={cardData} />
          </span>
          <p className="text-white-two text-sm mb-2">
            {convertTime(cardData?.approved_at, "en-US")}
          </p>
          <Divider className="my-2" />
          <div className="flex items-center justify-between text-white-two text-xs mx-2 my-1">
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <BedIcon className="w-4 h-4 " />
              <span>{cardData?.feature_metadata?.room} Bed</span>
            </div>
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <FloorIcon className="w-4 h-4" />
              <span>{cardData?.feature_metadata?.floor} Floor</span>
            </div>
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <SizeIcon className="w-4 h-4" />
              <span className="flex items-center">
                <p className="max-w-[40px] truncate">{cardData?.gross}</p> M2
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
