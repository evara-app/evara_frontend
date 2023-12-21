"use client";

import React, { useState } from "react";

//? import components
import MultiSelect from "@/common/MultiSelect";

//? import icons
import { HiChevronDown } from "react-icons/hi";

const searchButtons = [
  {
    id: 1,
    label: "Buy",
    value: 1,
  },
  {
    id: 2,
    label: "Mortgage & Rent",
    value: 2,
  },
  {
    id: 3,
    label: "General search",
    value: 3,
  },
];

function SearchPanelComponent() {
  const [activeBtn, setActiveBtn] = useState<number>(1);

  return (
    <div className="relative -bottom-10">
      {/* //* select search type buttons  */}
      <div>
        {/* //* map and make search buttons */}
        {searchButtons.map((btn) => {
          return (
            <button
              className={
                btn.value === 2
                  ? `-left-3 z-10 ${
                      btn.value === activeBtn
                        ? "text-black bg-white SearchPanelButton"
                        : "SearchPanelButton"
                    }`
                  : btn.value === 3
                  ? `-left-4 z-0 ${
                      btn.value === activeBtn
                        ? "text-black bg-white SearchPanelButton"
                        : "SearchPanelButton"
                    }`
                  : `z-20 ${
                      btn.value === activeBtn
                        ? "text-black bg-white SearchPanelButton"
                        : "SearchPanelButton"
                    }`
              }
              key={btn.id}
              value={btn.value}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
      {/* //* search type select  */}
      <div className=" bg-white rounded-md rounded-tl-none flex p-4 gap-x-2 border border-gray-default/20 overflow-x-hidden-hidden shadow-greenShaow">
        {[false, true, false, false, false, false].map((item) => {
          return (
            <div className="flex-1 relative flex flex-col border-r border-r-gray-default/40 gap-y-1 cursor-pointer">
              <div>Category</div>
              <div className="flex items-center justify-between mx-1">
                <span className="text-gray-default">Istanbul</span>
                <HiChevronDown className="icon text-black" />
              </div>
              <MultiSelect status={item} />
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <button className="button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchPanelComponent;
