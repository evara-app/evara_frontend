"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

//? import components
import AdvanceSearchSelect from "@/components/properties/AdvanceSearchSelect";

//? import constants
import { PropertiesFilter } from "@/constants/propertiesFilters";

//? import icons
import { MdRefresh } from "react-icons/md";

//? import mui
import Divider from "@mui/material/Divider";

function AdvanceSearch({
  categories,
  countries,
  propertyFields,
  onClose,
  isMobile = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // convert this filter to string
  const notValItems = [
    "country",
    "minPrice",
    "maxPrice",
    "minGross",
    "maxGross",
  ];
  //get filters from url and convert to pass into filter state
  const urlParams = PropertiesFilter.reduce((acc, filter) => {
    const paramName = filter.name;
    const paramValues = searchParams.getAll(paramName);

    acc[paramName] = notValItems.includes(paramName)
      ? paramValues.toString()
      : paramValues;

    return acc;
  }, {});

  const [filter, setFilter] = useState(urlParams || {});
  const [generalSearch, setGeneralSearch] = useState("");

  // query handler
  const createQueryString = useCallback(
    (query) => {
      const params = new URLSearchParams();
      const existQueries = [
        {
          label: "ordering",
          value: searchParams.get("ordering"),
        },
        {
          label: "viewType",
          value: searchParams.get("viewType"),
        },
      ];
      existQueries.forEach((query) => {
        if (query.value !== null) params.append(query.label, query.value);
      });
      for (const [name, value] of Object.entries(query)) {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(name, item));
        } else {
          value && params.append(name, value);
        }
      }
      return params.toString();
    },
    [searchParams]
  );

  const createGeneralSearchQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams();
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const filterHandler = (event, name) => {
    if (name === "features" || name === "propertyType")
      return setFilter({
        ...filter,
        [name]: [
          ...new Set(event.map((item) => `${item.parent},${item.label}`)),
        ],
      });
    Array.isArray(event)
      ? setFilter({ ...filter, [name]: event.map((item) => item.value) })
      : setFilter({ ...filter, [name]: event.value });
  };

  const inputHandler = (event, value, currencyName) => {
    if (currencyName) setFilter({ ...filter, currency: currencyName });
    setFilter({ ...filter, [event.target.name]: value });
  };

  const submitHandler = () => {
    router.push(pathname + "?" + createQueryString(filter));
    isMobile && onClose();
  };

  const generalSearchHandler = () => {
    router.push(
      pathname + "?" + createGeneralSearchQueryString("search", generalSearch)
    );
    isMobile && onClose();
  };

  const refreshHandler = () => {
    router.push("/properties", { scroll: false });
    isMobile && onClose();
  };

  console.log(filter);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5>Advanced Search</h5>
        <button
          className="text-blue-400 hover:text-blue-500 transition flex items-center gap-x-1"
          onClick={refreshHandler}
        >
          <MdRefresh className="icon text-blue-500" />
          Refresh
        </button>
      </div>
      <AdvanceSearchSelect
        filter={filter}
        filterHandler={filterHandler}
        inputHandler={inputHandler}
        categories={categories}
        countries={countries}
        propertyFields={propertyFields}
      />
      <button className="button w-full" onClick={submitHandler}>
        Submit
      </button>
      <Divider sx={{ margin: "10px 0px" }} />
      <label htmlFor="generalSearch">
        <input
          id="generalSearch"
          type="text"
          placeholder="Search in address, title and all the information related to the property"
          className="w-full border border-[#d1d5db] p-2 rounded-lg outline-none focus:border-green-blue shadow text-[#7F7F7F] placeholder:text-[#7F7F7F]"
          onChange={(event) => setGeneralSearch(event.target.value)}
        />
      </label>
      <button className="button w-full mt-2" onClick={generalSearchHandler}>
        Search
      </button>
    </div>
  );
}

export default AdvanceSearch;
