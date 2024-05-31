"use client";

import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

//? import constants
import { PropertiesFilter } from "@/constants/propertiesFilters";

//? import hooks
import {
  useGetCountry,
  useGetRooms,
  useGetPropertyFields,
} from "@/hooks/propertyDetails";
import { useGetAllCategories } from "@/hooks/useCategories";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const multiInputStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#4ade80" : "#d1d5db",
    ":hover": { borderColor: "#4ade80" },
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    padding: "4px 0px",
    borderRadius: "10px",
    margin: "10px 0px",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? "#22c55e" : "white",
    ":hover": { backgroundColor: "#dcfce7" },
  }),
};
const animatedComponents = makeAnimated();

function AdvanceSearchSelect({ filter, filterHandler }) {
  const { data: allCategories, isLoading } = useGetAllCategories();
  const { results: categories } = allCategories || {};
  const { data: country } = useGetCountry();
  const { data: rooms } = useGetRooms();
  const { data: propertyFields } = useGetPropertyFields();
  const { another_features } = propertyFields?.data || {};
  const transactionType = [
    {
      id: 2,
      name: "Sell",
      type: "Sell",
    },
    {
      id: 1,
      name: "Rent",
      type: "Rent",
    },
    {
      id: 3,
      name: "Daily rent",
      type: "Rent",
    },
  ];

  const [options, setOptions] = useState({});

  useEffect(() => {
    const updatedOptions = { ...options };
    // change structure of api data because react-select accept this way
    if (country && rooms && another_features) {
      const transformData = (data) =>
        data.map((item) => ({ label: item.name, value: item.id }));
      updatedOptions.country = transformData(country);
      updatedOptions.room = transformData(rooms);
      updatedOptions.features = transformData(another_features);
      updatedOptions.transactionType = transformData(transactionType);
      Object.keys(categories).map((item) => {
        updatedOptions.propertyType = transformData(categories[item]);
        // console.log(...categories[item]);
      });
      // updatedOptions.propertyType = transformData(categories);
    }
    setOptions(updatedOptions);
  }, [country, rooms, another_features]);

  useEffect(() => {}, []);

  const loadOptions = async (inputValue, callback) => {
    console.log(inputValue, callback);
  };

  console.log(options);
  // console.log(categories);

  return (
    <div>
      {PropertiesFilter.map((filters) => {
        return filters.type === "Select" ? (
          <AsyncSelect
            key={filters.id}
            styles={multiInputStyle}
            isMulti
            instanceId
            components={animatedComponents}
            placeholder={filters.label}
            defaultOptions={options[filters.name]}
            onChange={(event) => filterHandler(event, filters.name)}
            loadOptions={loadOptions}
          />
        ) : (
          <input key={filters.id} type="text" />
        );
      })}
    </div>
  );
}

export default AdvanceSearchSelect;
