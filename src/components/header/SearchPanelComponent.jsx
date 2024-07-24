"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

//? import icons
import { HiChevronDown } from "react-icons/hi";

//? import constants
import Filter from "@/constants/filter.json";
import FilterTypes from "@/constants/filterTypes.json";

//? import components
import MultiSelect from "@/common/MultiSelect";

//? import service
import { getProvinces } from "@/services/properties";

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
    id: 2,
    label: "PropertyType",
    name: "propertyType",
    parent: true,
  },
  {
    id: 2,
    label: "Country",
    name: "country",
    parent: false,
  },
  {
    id: 3,
    label: "Province",
    name: "province",
    parent: false,
  },
  {
    id: 4,
    label: "City",
    name: "City",
    parent: true,
  },
  {
    id: 5,
    label: "Price",
    name: "price",
    parent: false,
  },
  {
    id: 6,
    label: "Features",
    name: "features",
    parent: true,
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

const mobileItemsStep1 = [
  "propertyType",
  "country",
  "price",
  "features",
  "search",
];
const mobileItemsStep2 = ["country", "province", "price", "features", "search"];

function SearchPanelComponent({ categories, countries, propertyFields }) {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  const [activeBtn, setActiveBtn] = useState("Buy");
  const [activeItem, setActiveItem] = useState("");
  const [filter, setFilter] = useState({});
  const [options, setOptions] = useState({});

  //react query
  const { isPending: provincesPending, mutateAsync: getProvincesMutate } =
    useMutation({ mutationFn: getProvinces });

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

  useEffect(() => {
    const updatedOptions = { ...options };
    // change structure of api data because react-select accept this way
    const transformData = (data) =>
      data.map((item) => ({ label: item.name, value: item.id }));

    const transformDataWithParent = (data, parents) => {
      return parents.map((parent) => ({
        label: parent,
        options: data[parent].map((item) => ({
          label: item.name,
          value: item.id,
          parent: parent,
        })),
      }));
    };

    updatedOptions.country = transformData(countries);
    updatedOptions.propertyType = transformDataWithParent(
      categories,
      Object.keys(categories)
    );
    updatedOptions.features = transformDataWithParent(
      propertyFields.data,
      Object.keys(propertyFields.data)
    );
    setOptions(updatedOptions);
  }, []);

  useEffect(() => {
    delete filter.province;
    const updatedOptions = { ...options };

    const transformData = (data) =>
      data.map((item) => ({ label: item.name, value: item.id }));

    // get cities options for select filter
    const fetchCities = async () => {
      try {
        const { results } = await getProvincesMutate(filter.country);
        updatedOptions.province = transformData(results);
        setOptions(updatedOptions);
      } catch (error) {}
    };

    filter.country && fetchCities();
  }, [filter.country]);

  const itemsComponentHandler = (name) => {
    setActiveItem(name);
  };

  const filterHandler = (event, name) => {
    if (["features", "propertyType"].includes(name)) {
      return setFilter({
        ...filter,
        [name]: [...(filter[name] || []), `${event.parent},${event.label}`],
      });
    }
    filter[name]?.includes(event.value)
      ? setFilter({
          ...filter,
          [name]: filter[name].filter((item) => item !== event.value),
        })
      : setFilter({
          ...filter,
          [name]: [...(filter[name] || []), event.value],
        });
  };

  const inputHandler = (event, value, currencyName) => {
    if (currencyName) setFilter({ ...filter, currency: currencyName });
    setFilter({ ...filter, [event.target.name]: value });
  };

  // query handler
  const createQueryString = useCallback((query) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(name, item));
      } else {
        value && params.append(name, value);
      }
    }
    return params.toString();
  }, []);

  const queryHandler = () => {
    router.push("/properties" + "?" + createQueryString(filter));
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
      <div className=" bg-white rounded-md rounded-tl-none flex items-center p-1 gap-x-2 border border-gray-default/20 overflow-x-hidden-hidden shadow-greenShaow">
        {renderInputs().map((item, index) =>
          !item.type ? (
            <button
              key={index}
              className={`flex-1 relative flex flex-col p-3 text-start border-r border-r-gray-default/40 gap-y-1 cursor-pointer ${
                activeBtn === "Buy" && !mobileItemsStep1.includes(item?.name)
                  ? "md:block"
                  : activeBtn === "Rent" &&
                    !mobileItemsStep2.includes(item?.name)
                  ? "md:block"
                  : "hidden md:block"
              }`}
              onClick={() => itemsComponentHandler(item?.name)}
            >
              <div>{item?.label}</div>
              <div className="flex items-center justify-between mx-1 text-xs md:text-base">
                <span className="text-gray-default text-xs md:text-sm">
                  {item?.label}
                </span>
                <HiChevronDown className="icon text-black" />
              </div>
              {item.name === activeItem && (
                <MultiSelect
                  key={item.name}
                  status={item}
                  options={options}
                  filter={filter}
                  filterHandler={filterHandler}
                />
              )}
            </button>
          ) : (
            <div className="flex-1">
              <input
                type="text"
                placeholder={item?.placeholder}
                className="w-full rounded-md border border-border-gray focus:border-green-blue outline-none p-2"
              />
            </div>
          )
        )}
        <div className="hidden md:flex items-center justify-center">
          <button className="button" onClick={queryHandler}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPanelComponent;
