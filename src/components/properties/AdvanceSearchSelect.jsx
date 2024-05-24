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

function AdvanceSearchSelect() {
  const { data: country } = useGetCountry();
  const { data: rooms } = useGetRooms();
  const { data: propertyFields } = useGetPropertyFields();
  const { another_features } = propertyFields?.data || {};

  const [options, setOptions] = useState({});

  useEffect(() => {
    const updatedOptions = { ...options };
    if (country && rooms && another_features) {
      updatedOptions.country = country.map((item) => {
        return { label: item.name, value: item.id };
      });
      updatedOptions.room = rooms.map((item) => {
        return { label: item.name, value: item.id };
      });
      updatedOptions.features = another_features.map((item) => {
        return { label: item.name, value: item.id };
      });
    }
    setOptions(updatedOptions);
  }, [country, rooms, another_features]);

  console.log(options);

  return (
    <div>
      {PropertiesFilter.map((filter) => {
        return filter.type === "Select" ? (
          <AsyncSelect
            key={filter.id}
            styles={multiInputStyle}
            components={animatedComponents}
            placeholder={filter.label}
            defaultOptions={options[filter.name]}
            isMulti
          />
        ) : (
          <input key={filter.id} type="text" />
        );
      })}
    </div>
  );
}

export default AdvanceSearchSelect;
