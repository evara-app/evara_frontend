import React from "react";

//? import components
import SpecialAds from "@/app/(home)/SpecialAds";
import Poster from "@/app/(home)/Poster";
import LatestProperties from "@/app/(home)/LatestProperties";
function page() {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 py-2">
        <div className="md:container md:max-w-[1536px] mx-auto">
          <SpecialAds />
        </div>
        <Poster />
        <div className="md:container md:max-w-[1536px] mx-auto">
          <LatestProperties />
        </div>
      </div>
    </div>
  );
}

export default page;
