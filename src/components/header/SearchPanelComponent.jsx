"use client";

import React, { useState } from "react";

//? import icons
import { HiChevronDown } from "react-icons/hi";

//? import constants
import Filter from "@/constants/filter.json";
import FilterTypes from "@/constants/filterTypes.json";

//? import components
import MultiSelect from "@/common/MultiSelect";

const searchButtonsClass = [
  {
    id: 1,
    class: "z-20",
  },
  {
    id: 2,
    class: "-left-3 z-10",
  },
  {
    id: 3,
    class: "-left-4 z-0",
  },
];

const inputsList = [
  {
    id: 1,
    label: "Category",
    name: "category",
  },
  {
    id: 2,
    label: "City",
    name: "city",
  },
  {
    id: 3,
    label: "District | Region",
    name: "region",
  },
  {
    id: 4,
    label: "Quarter",
    name: "quarter",
  },
  {
    id: 5,
    label: "Price",
    name: "price",
  },
  {
    id: 6,
    label: "Room",
    name: "room",
  },
  {
    id: 7,
    label: "Search",
    placeholder:
      "Search in address, title and the information related to the property ...",
    name: "search",
    type: "text",
  },
];

const mobileItemsStep1 = ["category", "quarter", "price", "room", "search"];
const mobileItemsStep2 = ["region", "quarter", "price", "room", "search"];

function SearchPanelComponent() {
  const [activeBtn, setActiveBtn] = useState("Buy");

  const buttonClass = () => {
    const data = Filter.map(
      (item) => searchButtonsClass.find((btn) => btn.id == item.id).class
    );
    return data;
  };

  const renderInputs = () => {
    const activeFields = FilterTypes.find(
      (item) => item.type === activeBtn
    ).fields;
    const inputs = inputsList.filter((input) =>
      activeFields.includes(input.name)
    );
    return inputs;
  };
  return (
    <div className="relative -bottom-10">
      {/* select search type buttons  */}
      <div>
        {/* map and make search buttons */}
        {Filter.map((btn, index) => {
          return (
            <button
              key={btn.id}
              className={`${buttonClass()[index]} ${
                activeBtn == btn.type && "text-black bg-white"
              } SearchPanelButton`}
              value={btn.title}
              onClick={() => setActiveBtn(btn.type)}
            >
              {btn.title}
            </button>
          );
        })}
      </div>
      {/* search type select  */}
      <div className=" bg-white rounded-md rounded-tl-none flex items-center p-4 gap-x-2 border border-gray-default/20 overflow-x-hidden-hidden shadow-greenShaow">
        {renderInputs().map((item, index) =>
          !item.type ? (
            <div
              key={index}
              className={`flex-1 relative flex flex-col border-r border-r-gray-default/40 gap-y-1 cursor-pointer ${
                activeBtn === "Buy" && !mobileItemsStep1.includes(item.name)
                  ? "md:block"
                  : activeBtn === "Rent" &&
                    !mobileItemsStep2.includes(item.name)
                  ? "md:block"
                  : "hidden md:block"
              }`}
            >
              <div>{item.label}</div>
              <div className="flex items-center justify-between mx-1 text-xs md:text-base">
                <span className="text-gray-default text-xs md:text-sm">
                  {item.label}
                </span>
                <HiChevronDown className="icon text-black" />
              </div>
              {/* <MultiSelect status={item} /> */}
            </div>
          ) : (
            <div className="flex-1">
              <input
                type="text"
                placeholder={item.placeholder}
                className="w-full rounded-md border border-border-gray focus:border-green-blue outline-none p-2"
              />
            </div>
          )
        )}
        <div className="hidden md:flex items-center justify-center">
          <button className="button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchPanelComponent;
