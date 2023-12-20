"use client";

import React, { useState } from "react";

//? import components
import MultiSelect from "@/common/MultiSelect";

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
    <div>
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
      <div>
        
      </div>
    </div>
  );
}

export default SearchPanelComponent;
