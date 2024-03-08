"use client";

import React, { useEffect, useState, Fragment } from "react";

//? import components
import CustomSelect from "@/common/CustomSelect";

//? import icons
import { HiChevronDown } from "react-icons/hi";

//? import hooks
import { useGetAllCategories } from "@/hooks/useCategories";
import { includeObj } from "@/utils/objectUtils";

function SelectCategory({ handler }) {
  const { data: allCategories } = useGetAllCategories();
  const { results } = allCategories || {};

  const [category, setCategory] = useState([]);
  const [buttonItems, setButtonItems] = useState([
    {
      id: 1,
      label: "Category",
      placeholder: " Select one category",
    },
    {
      id: 2,
      label: "Sell or by",
      placeholder: " Select Sell or by",
    },
  ]);

  const [sellOrRent, setSellOrRent] = useState([
    {
      id: 1,
      label: "Sell",
      value: "Sell",
    },
    {
      id: 2,
      label: "Rent",
      value: "Rent",
    },
  ]);
  const [open, setOpen] = useState(false);

  const openHandler = (event) => {
    if (event.target.id === open) {
      setOpen(false);
      return;
    }
    setOpen(Number(event.target.id));
  };

  // make new state with another structure
  useEffect(() => {
    if (results) {
      Object.keys(results).forEach((key, index) =>
        setCategory((prevstate) => [
          ...prevstate,
          { id: key + 1, parent: key, children: results[key] },
        ])
      );
    }
  }, [results]);

  // make a decision witch select shows
  const renderSelects = () => {
    switch (open) {
      case 1:
        return (
          <div className="absolute border border-white-two/40 w-full rounded top-12 bg-white start-0 z-20 max-h-60 overflow-y-scroll">
            <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default">
              {category.map((item) => (
                <Fragment key={item.id}>
                  <li
                    key={item.id}
                    className="p-2 rounded cursor-default text-white-two flex justify-start"
                    onClick={() => handler(item.value)}
                  >
                    {item.parent}
                  </li>
                  {item.children.map((child) => (
                    <li
                      key={child.id}
                      className="p-2 rounded hover:text-white hover:font-medium hover:bg-green-400 flex justify-start"
                      onClick={() => handler(child.name)}
                    >
                      {child.name}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          </div>
        );
      case 2:
        return <CustomSelect items={sellOrRent} handler={handler} />;
      default:
        break;
    }
  };
  return (
    <div className="flex items-center flex-wrap md:flex-nowrap gap-y-4 gap-x-2">
      {buttonItems.map((button) => (
        <div key={button.id} className="flex flex-col w-full">
          <h5 className="ps-1 mb-1">{button.label}</h5>
          <button
            id={button.id}
            className="flex flex-auto text-white-two items-center justify-between p-2 border border-white-two/40 rounded relative"
            onClick={openHandler}
          >
            {button.placeholder}
            <HiChevronDown className={`icon text-white-two transition`} />
            {open == button.id && renderSelects()}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
