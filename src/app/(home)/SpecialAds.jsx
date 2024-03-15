import React from "react";

//? import components
import SwiperCarousel from "@/common/SwiperCarousel ";
import RoundedCard from "@/components/home/RoundedCard";

function SpecialAds() {
  return (
    <div className="mt-20 grid grid-cols-6 gap-x-6 items-center">
      <div className="col-span-2 flex flex-col gap-y-10">
        <h1 className="text-4xl font-medium">Special ads</h1>
        <p className="text-lg text-white-two leading-6">
          Dwelling and commercial units with special conditions Discount and
          immediate sale of profitable projects in the best regions of Turkey
          Apartments, villas, offices, shops, hotels, land and other commercial
          real estate
        </p>
        <button className="button max-w-xs">Show all the advertisments</button>
      </div>
      <div className="col-span-4 overflow-auto">
        <SwiperCarousel list={[1, 2, 3, 4, 5]}>
          <RoundedCard />
        </SwiperCarousel>
      </div>
    </div>
  );
}

export default SpecialAds;
