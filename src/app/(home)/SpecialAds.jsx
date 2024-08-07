import React from "react";

//? import components
import SwiperCarousel from "@/common/SwiperCarousel ";

function SpecialAds({ data }) {
  return (
    <div className="mt-20 flex flex-col md:grid grid-cols-6 gap-x-6 items-center overflow-hidden">
      <div className="md:col-span-2 flex flex-col gap-y-10 text-center md:text-start">
        <h1 className="text-gray-default relative text-4xl font-medium pt-2 before:absolute before:top-0 before:w-1/3 before:bg-green-blue before:h-1 before:rounded">
          Special ads
        </h1>
        <p className="text-lg text-white-two leading-6">
          Dwelling and commercial units with special conditions Discount and
          immediate sale of profitable projects in the best regions of Turkey
          Apartments, villas, offices, shops, hotels, land and other commercial
          real estate
        </p>
        <button className="button max-w-xs hidden">
          Show all the advertisments
        </button>
      </div>
      <div className="md:col-span-4 overflow-hidden mt-10 md:mt-0">
        <SwiperCarousel data={data} />
      </div>
      <button className="button max-w-lg w-10/12 mx-auto md:w-full md:hidden mt-5 py-3">
        Show all the advertisments
      </button>
    </div>
  );
}

export default SpecialAds;
