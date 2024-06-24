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

function Card({ cardData }) {
  return (
    <Link href={`/property/${cardData?.slug}`}>
      <div className="max-w-[250px] overflow-hidden relative bg-gray-100 rounded-md group shadow transition">
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

export default Card;
