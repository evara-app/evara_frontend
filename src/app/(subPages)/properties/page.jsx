import React from "react";
import queryString from "query-string";

//? import components
import AdvanceSearch from "@/app/(subPages)/properties/AdvanceSearch";
import PropertyList from "@/app/(subPages)/properties/PropertyList";

//? import service
import { getProperties } from "@/services/properties";

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function page({ searchParams }) {
  const propertiesPromise = getProperties(queryString.stringify(searchParams));

  const [propertiesList] = await Promise.all([propertiesPromise]);

  return (
    <div className="grid grid-cols-8 gap-x-5">
      <div className="col-span-2">
        <AdvanceSearch />
      </div>
      <div className="col-span-6">
        <PropertyList propertiesList={propertiesList} />
      </div>
    </div>
  );
}

export default page;
