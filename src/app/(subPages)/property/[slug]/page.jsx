import React from "react";
import Image from "next/image";
import Link from "next/link";
//? import compontns
import Header from "@/app/(subPages)/property/[slug]/Header";
import AboutProperty from "@/app/(subPages)/property/[slug]/AboutProperty";
import PriceDetails from "@/app/(subPages)/property/[slug]/PriceDetails";
import PropertyAgent from "@/app/(subPages)/property/[slug]/PropertyAgent";
import TextAbout from "@/app/(subPages)/property/[slug]/TextAbout";

//? icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShare } from "react-icons/hi2";
import SizeIcon from "&/assets/svg/size.svg";
import BedIcon from "&/assets/svg/bed.svg";
import FloorIcon from "&/assets/svg/floor.svg";
import ShowerIcon from "&/assets/svg/shower.svg";
import ToiletIcon from "&/assets/svg/wc.svg";

//? import service
import { getPropertyBySlug } from "@/services/properties";

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

const allFeatures = [
  {
    id: 1,
    label: "bed set",
    icon: <BedIcon className="svgIcon" />,
  },
  {
    id: 2,
    label: "toilet",
    icon: <ToiletIcon className="svgIcon" />,
  },
  {
    id: 3,
    label: "shower",
    icon: <ShowerIcon className="svgIcon" />,
  },
];

async function page({ params }) {
  const PropertyDetails = getPropertyBySlug(params.slug);

  const [{ results: property }] = await Promise.all([PropertyDetails]);

  return (
    <div>
      {/* //* title and location ... */}
      <div>
        <div>
          <h1 className="text-gray-default text-3xl">{property?.title}</h1>
        </div>
        <div className="flexItems justify-between mt-2">
          <div className="flexItems text-gray-default/80">
            <HiOutlineLocationMarker className="icon-stroke icon text-gray-default/80 " />
            <p>
              {property?.title} | {property?.country?.name} |
              {property?.city?.name}
            </p>
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
      <Header />
      <div className="grid grid-cols-6 mt-10 gap-x-2">
        <div className="col-span-4">
          {/* Main features */}
          <div className=" w-full rounded-lg px-2 sm:px-8 sm:pb-6 mb-8 border border-zinc-200 p-2">
            <div className="flex items-center justify-between mb-6">
              <h5 className="text-sm md:text-xl font-bold">Main features</h5>
              <div className="hidden md:flex items-center gap-x-4 rounded-md bg-white-two/25 px-2 py-1 text-xs">
                <span>Registration date</span>
                <span>Jun 19</span>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-5 md:grid-rows-1 justify-items-stretch md:justify-items-center gap-y-4 text-white-two text-sm">
              <div className="flex items-center gap-x-1">
                <SizeIcon className="svgIcon" />
                <span>{property?.gross} Gross M2</span>
              </div>
              <div className="flex items-center gap-x-1">
                <SizeIcon className="svgIcon" />
                <span>{property?.net} Net M2</span>
              </div>
              <div className="flex items-center gap-x-1">
                <FloorIcon className="svgIcon" />
                <span>Floor</span>
              </div>
              <div className="flex items-center gap-x-1">
                <BedIcon className="svgIcon" />
                <span>Room</span>
              </div>
              <div className="flex items-center gap-x-1">
                <ShowerIcon className="svgIcon" />
                <span>4</span>
              </div>
            </div>
            <hr className="hidden md:block my-4" />
            <AboutProperty>
              <TextAbout readMore={true} data={property?.description} />
            </AboutProperty>
          </div>
          {/* all features  */}
          <div className="w-full rounded-lg px-2 sm:px-8 sm:pb-6 mb-8 border border-zinc-200 p-2">
            <h5 className="text-sm md:text-xl font-bold">All features</h5>
            <div className="grid grid-cols-3 gap-y-10 justify-items-center mt-10">
              {allFeatures.map((feature) => (
                <span
                  className="flex items-center gap-x-2 text-white-two col-span-1"
                  key={feature.id}
                >
                  {feature.icon}
                  {feature.label}
                </span>
              ))}
              <span className="text-white-two col-span-1">
                The total area is : 500 meters
              </span>
              <span className="text-white-two col-span-1">
                The Foundation area is : 700 meters
              </span>
              <span className="text-white-two col-span-1">
                building age : 5 year
              </span>
            </div>
          </div>
          {/* comments  */}
          <div className="w-full rounded-lg px-2 sm:px-8 sm:pb-6 mb-8 border-b border-zinc-200 p-2">
            <div className="flexItems justify-between">
              <h5 className="text-sm md:text-xl font-bold">Comments</h5>
              <button className="border-2 border-green-blue/50 hover:border-green-blue transition font-medium rounded-md py-2 px-4">
                Add Comment
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {/* property price information section  */}
          <PriceDetails property={property} />
          {/* property owner/agent details */}
          <PropertyAgent property={property} />
          {/* other properties adv */}
          <div className="hidden md:block border border-zinc-200 p-4 rounded-lg">
            <span className="text-gray-default text-lg ">other properties</span>
            <hr className="bg-gray-default my-4" />
            {[1, 2, 3, 4].map((property) => {
              return (
                <div
                  key={property}
                  className="flex flex-col border-b border-zinc-200 py-4"
                >
                  <Link legacyBehavior href="#">
                    <div className="flex items-center gap-x-4">
                      <div className="w-1/3">
                        <div className="w-20 h-16 lg:w-28 lg:h-20 rounded-md relative overflow-hidden">
                          <Image
                            className="aspect-w-16 aspect-h-1 p-0"
                            src="/assets/img/auth.jpg"
                            alt="property image"
                            fill
                          />
                        </div>
                      </div>
                      <div className="w-2/3 flex flex-col gap-y-1 truncate ">
                        <h1 className="text-sm lg:text-base font-bold">
                          4 bedoom apartment in Pendik
                        </h1>
                        <span className="text-gray-500 text-xs ">
                          ISTANBUL | ÜSKÜDAR
                        </span>
                        <span className="text-sm lg:text-xl text-green-500 font-bold">
                          15,246,000 - TL
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
