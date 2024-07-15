import React from "react";
import queryString from "query-string";

//? import components
import AdvanceSearch from "@/app/(subPages)/properties/AdvanceSearch";
import PropertyList from "@/app/(subPages)/properties/PropertyList";
//? import service
import { getProperties } from "@/services/properties";
import { getAllCategories } from "@/services/categoriesService";
import {
  getRooms,
  getCountries,
  getPropertyFields,
} from "@/services/addProperty";

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function page({ searchParams }) {
  const propertiesPromise = getProperties(queryString.stringify(searchParams));

  const [propertiesList, countries, { results: categories }, propertyFields] =
    await Promise.all([
      propertiesPromise,
      getCountries(),
      getAllCategories(),
      getPropertyFields(),
    ]);

  return (
    <div className="grid grid-cols-8 gap-x-5 rounded-md p-4 shadow-md">
      <div className="py-5 bg-white col-span-2 border-r-2 border-r-border-gray/50 px-2 hidden md:block">
        <AdvanceSearch
          categories={categories}
          countries={countries}
          propertyFields={propertyFields}
        />
      </div>
      <div className="col-span-8 md:col-span-6">
        <PropertyList
          propertiesList={propertiesList}
          searchParams={searchParams}
          categories={categories}
          countries={countries}
          propertyFields={propertyFields}
        />
      </div>
    </div>
  );
}

export default page;
