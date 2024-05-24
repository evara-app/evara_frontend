import React from "react";

//? import components
import AdvanceSearch from "@/app/(subPages)/properties/AdvanceSearch";

function page() {
  return (
    <div className="grid grid-cols-8 gap-x-5">
      <div className="col-span-2">
        <AdvanceSearch />
      </div>
      <div className="col-span-6">main panel</div>
    </div>
  );
}

export default page;
