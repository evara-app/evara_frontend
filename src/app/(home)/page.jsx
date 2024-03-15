import React from "react";

//? import components
import SpecialAds from "@/app/(home)/SpecialAds";

function page() {
  return (
    <div className="bg-white">
      <div className="bg-gray-100 p-2">
        <div className="md:container md:max-w-[1536px] mx-auto">
          <SpecialAds />
        </div>
      </div>
    </div>
  );
}

export default page;
