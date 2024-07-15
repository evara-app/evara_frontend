import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

//? import components
import Header from "@/app/(subPages)/property/[...slug]/Header";
import AboutProperty from "@/app/(subPages)/property/[...slug]/AboutProperty";
import PriceDetails from "@/app/(subPages)/property/[...slug]/PriceDetails";
import PropertyAgent from "@/app/(subPages)/property/[...slug]/PropertyAgent";
import TextAbout from "@/app/(subPages)/property/[...slug]/TextAbout";
import SaveAndShare from "@/app/(subPages)/property/[...slug]/SaveAndShare";
import Comments from "@/app/(subPages)/property/[...slug]/Comments";
//? icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import SizeIcon from "&/assets/svg/size.svg";
import BedIcon from "&/assets/svg/bed.svg";
import FloorIcon from "&/assets/svg/floor.svg";
import ShowerIcon from "&/assets/svg/shower.svg";
import ToiletIcon from "&/assets/svg/wc.svg";
import { FaCheck } from "react-icons/fa";

//? import service
import {
  getPropertyBySlug,
  getPropertyBySlugToken,
  getAllComments,
} from "@/services/properties";

//? import mui
import Divider from "@mui/material/Divider";

//? import utils
import middlewareAuth from "@/utils/middlewareAut";

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

const separatedFeatures = [
  "room",
  "bathroom",
  "age",
  "monthly_administrative_fees",
  "floor",
];

async function page({ params, searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("access").value;
  const user = await middlewareAuth(token);

  // only if token is available will be set in headers
  const propertySlug = params.slug[0];
  const propertyId = params.slug[1];
  const commentSize = searchParams?.commentSize;

  const PropertyDetails = user
    ? getPropertyBySlugToken(propertySlug, token)
    : getPropertyBySlug(propertySlug);

  const propertyComments = getAllComments(propertyId, commentSize);

  const [{ results: property }, { count, results: comments }] =
    await Promise.all([PropertyDetails, propertyComments]);

  console.log(property);

  return (
    <div>
      {/* title and location ... */}
      <div>
        <div>
          <h1 className="text-3xl font-medium">{property?.title}</h1>
        </div>
        <div className="flexItems justify-between mt-2">
          <div className="flexItems text-gray-default/80">
            <HiOutlineLocationMarker className="icon-stroke icon text-gray-default/80 " />
            <p>
              {property?.country?.name} | {property?.city?.name} | (Owner :
              {property?.user?.profile?.first_name}{" "}
              {property?.user?.profile?.last_name})
            </p>
          </div>
          <SaveAndShare property={property} />
        </div>
      </div>
      <Header property={property} />
      <div className="grid grid-cols-6 mt-10 gap-x-2">
        <div className="col-span-4">
          {/* Main features */}
          <div className=" w-full rounded-lg px-2 sm:px-8 sm:pb-1 mb-8 border border-gray-200 bg-box-default-gray shadow-boxShadow p-2">
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
                <span>
                  {
                    property?.feature?.find((item) => item.name === "floor")
                      .value
                  }{" "}
                  Floor
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <BedIcon className="svgIcon" />
                <span>
                  {
                    property?.feature?.find((item) => item.name === "room")
                      .value
                  }{" "}
                  Room
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <ShowerIcon className="svgIcon" />
                <span>
                  {
                    property?.feature?.find((item) => item.name === "bathroom")
                      .value
                  }
                </span>
              </div>
            </div>
            <hr className="hidden md:block my-4" />
            <AboutProperty>
              <TextAbout readMore={true} data={property?.description} />
            </AboutProperty>
          </div>
          {/* all features  */}
          <div className="w-full rounded-lg px-2 sm:px-8 sm:pb-6 mb-8 border border-gray-200 bg-box-default-gray shadow-boxShadow p-2">
            <h5 className="text-sm md:text-xl font-bold">All features</h5>
            <div className="grid grid-cols-3 gap-y-10 justify-items-start gap-x-2 mt-10">
              {property.feature.map(
                ({ name, value }) =>
                  !separatedFeatures.includes(name) && (
                    <span className="text-white-two col-span-1 flex items-center gap-x-2">
                      <span className="first-letter:capitalize">
                        {name?.split("_").join(" ")} :{" "}
                      </span>
                      {value.toString().toLowerCase() === "true" ? (
                        <FaCheck className="icon text-green-500" />
                      ) : (
                        <span className="first-letter:capitalize">{value}</span>
                      )}
                    </span>
                  )
              )}
            </div>
            <Divider sx={{ margin: "10px 0px" }} />
            <div className="grid grid-cols-3 gap-y-10 justify-items-start gap-x-2">
              <span className="text-white-two col-span-1">
                The total area is : {property?.gross} meters
              </span>
              <span className="text-white-two col-span-1">
                The Foundation area is : {property?.net} meters
              </span>
              <span className="text-white-two col-span-1">
                building age :
                {property?.feature?.find((item) => item.name === "age").value}{" "}
                year
              </span>
            </div>
          </div>
          {/* comments  */}
          <Comments property={property} comments={comments} count={count} />
        </div>
        <div className="col-span-2">
          {/* property price information section  */}
          <PriceDetails property={property} />
          {/* property owner/agent details */}
          <PropertyAgent property={property} />
          {/* other properties adv */}
          <div className="hidden md:block border border-gray-200 bg-box-default-gray shadow-boxShadow p-4 rounded-lg">
            <span className="text-gray-default text-lg ">other properties</span>
            <hr className="bg-gray-default my-4" />
            {[1, 2, 3, 4].map((property) => {
              return (
                <div
                  key={property}
                  className="flex flex-col border-b border-gray-200 py-4"
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
