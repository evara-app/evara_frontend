import React from "react";

//? import components
import SpecialAds from "@/app/(home)/SpecialAds";
import Poster from "@/app/(home)/Poster";
import LatestProperties from "@/app/(home)/LatestProperties";

//? import service
import { getSpecialAds, getLastProperties } from "@/services/properties";

async function page() {
  const specialAdsPromise = getSpecialAds();
  const LastPropertiesPromise = getLastProperties();
  const [{ results: specialAds }, { results: lastProperties }] =
    await Promise.all([specialAdsPromise, LastPropertiesPromise]);
  return (
    <div className="bg-white">
      <div className="bg-gray-100 py-2">
        <div className="md:container md:max-w-[1536px] mx-auto">
          <SpecialAds data={specialAds} />
        </div>
        <Poster />
        <div className="md:container md:max-w-[1536px] mx-auto">
          <LatestProperties data={lastProperties} />
        </div>
      </div>
    </div>
  );
}

export default page;
