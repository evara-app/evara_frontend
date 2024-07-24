import React from "react";

//? import components
import SearchPanelComponent from "@/components/header/SearchPanelComponent";

//? import service
import { getAllCategories } from "@/services/categoriesService";
import { getCountries, getPropertyFields } from "@/services/addProperty";

async function SearchPanel() {
  const [countries, { results: categories }, propertyFields] =
    await Promise.all([
      getCountries(),
      getAllCategories(),
      getPropertyFields(),
    ]);

  return (
    <div className="max-w-[1536px] mx-auto">
      <div>
        <SearchPanelComponent
          categories={categories}
          countries={countries}
          propertyFields={propertyFields}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
