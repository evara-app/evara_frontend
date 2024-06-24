"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

//? import components
import AdvanceSearchSelect from "@/components/properties/AdvanceSearchSelect";

//? import constants
import { PropertiesFilter } from "@/constants/propertiesFilters";

function AdvanceSearch() {
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

  // query handler
  const createQueryString = useCallback(
    (query) => {
      const params = new URLSearchParams();
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

  const filterHandler = (event, name) => {
    Array.isArray(event)
      ? setFilter({ ...filter, [name]: event.map((item) => item.value) })
      : setFilter({ ...filter, [name]: event.value });
  };

  const inputHandler = (event, value) => {
    setFilter({ ...filter, [event.target.name]: value });
  };

  const submitHandler = () => {
    router.push(pathname + "?" + createQueryString(filter));
  };

  return (
    <div>
      <h5>Advanced Search</h5>
      <AdvanceSearchSelect
        filter={filter}
        filterHandler={filterHandler}
        inputHandler={inputHandler}
      />
      <button className="button w-full" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
}

export default AdvanceSearch;
