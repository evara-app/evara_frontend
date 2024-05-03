"use client";

import React, { useEffect, useState, Fragment } from "react";

//? import components
import CustomSelect from "@/common/CustomSelect";
import Loading from "@/common/Loading";

//? import icons
import { HiChevronDown } from "react-icons/hi";

//? import hooks
import { useGetAllCategories } from "@/hooks/useCategories";
import { includeObj } from "@/utils/objectUtils";

function SelectCategory({ defaultValue, handler, setHandler }) {
  const { data: allCategories } = useGetAllCategories();
  const { results } = allCategories || {};

  const [category, setCategory] = useState([]);

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
    if (event.target.id == open) {
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
              {!category ? (
                <Loading />
              ) : (
                category.map((item) => (
                  <Fragment key={item.id}>
                    <li
                      key={item.id}
                      className="p-2 rounded cursor-default text-white-two flex justify-start"
                    >
                      {item.parent}
                    </li>
                    {item.children.map((child) => (
                      <li
                        key={child.id}
                        className="p-2 ps-4 rounded hover:text-white hover:font-medium hover:bg-green-400 flex justify-start"
                        onClick={() => handler("category", child.name)}
                      >
                        {child.name}
                      </li>
                    ))}
                  </Fragment>
                ))
              )}
            </ul>
          </div>
        );
      case 2:
        return (
          <CustomSelect
            items={sellOrRent}
            name={"SellOrBuy"}
            handler={handler}
          />
        );
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex items-center flex-wrap md:flex-nowrap gap-y-4 gap-x-2">
        <div className="flex flex-col w-full">
          <h5 className="ps-1 mb-1">Category</h5>
          <button
            id={1}
            className="flex flex-auto text-white-two items-center justify-between p-2 border border-white-two/40 rounded relative"
            onClick={openHandler}
          >
            {defaultValue?.category || "Select one category"}
            <HiChevronDown className={`icon text-white-two transition`} />
            {open == 1 && renderSelects()}
          </button>
        </div>
        <div className="flex flex-col w-full">
          <h5 className="ps-1 mb-1">Sell or by</h5>
          <button
            id={2}
            className="flex flex-auto text-white-two items-center justify-between p-2 border border-white-two/40 rounded relative"
            onClick={openHandler}
          >
            {defaultValue?.SellOrBuy || "Select one  Select Sell or by"}
            <HiChevronDown className={`icon text-white-two transition`} />
            {open == 2 && renderSelects()}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-2 mt-5">
        <button
          disabled={
            defaultValue?.category && defaultValue?.SellOrBuy ? false : true
          }
          className={
            defaultValue?.category && defaultValue?.SellOrBuy
              ? "button px-10"
              : "disableButton px-10"
          }
          onClick={() => setHandler((prevstate) => prevstate + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SelectCategory;
