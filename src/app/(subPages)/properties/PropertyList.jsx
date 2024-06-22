import React from "react";

//? import components
import Card from "@/components/properties/Card";

function PropertyList({ propertiesList }) {
  const { count, results } = propertiesList;
  return (
    <div className="flex items-center justify-start gap-x-4 gap-y-2 flex-wrap">
      {results.map((item) => (
        <div className="flex-1">
          <Card cardData={item} />
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
