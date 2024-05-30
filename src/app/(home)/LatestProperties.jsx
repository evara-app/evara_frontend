import React from "react";

//? import components
import Card from "@/components/home/Card";

function LatestProperties() {
  return (
    <div className="mt-10">
      <div>
        <h1 className="text-center text-gray-default relative text-4xl font-medium pt-2 before:absolute before:top-0 before:w-1/3 before:bg-green-blue before:h-1 before:rounded">
          The latest registered property
        </h1>
        <p className="text-sm text-center mt-5">
          Do you know that hundreds of new projects are registered for sale or
          rent in Evra every day For the latest discounts on dwelling and
          commercial property, review the latest Evara registered properties
        </p>
      </div>
      <div className="w-full mt-10 flex items-center justify-evenly flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div className="min-w-[320px]">
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestProperties;
