"use client";

import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useMutation } from "@tanstack/react-query";
//? import constants
import { PropertiesFilter } from "@/constants/propertiesFilters";

//? import hooks
import {
  useGetCountry,
  useGetRooms,
  useGetPropertyFields,
} from "@/hooks/propertyDetails";
import { useGetAllCategories } from "@/hooks/useCategories";

//? import service
import { getCities, getProvinces } from "@/services/properties";

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

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
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

  // react query
  const { isPending: citiesPending, mutateAsync: getCitiesMutate } =
    useMutation({ mutationFn: getCities });
  const { isPending: provincesPending, mutateAsync: getProvincesMutate } =
    useMutation({ mutationFn: getProvinces });

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

  useEffect(() => {
    const updatedOptions = { ...options };
    // change structure of api data because react-select accept this way
    const transformData = (data) =>
      data.map((item) => ({ label: item.name, value: item.id }));

    const transformDataWithParent = (data, parent) => console.log(data, parent);

    // get cities options for select filter
    const fetchCities = async () => {
      try {
        const { results } = await getCitiesMutate(filter.country);
        updatedOptions.city = transformData(results);
        setOptions(updatedOptions);
      } catch (error) {}
    };

    // get province options for select filter
    const fetchProvince = async () => {
      try {
        // get city name
        const parent = options.city.find(
          (item) => item.value == filter.city
        )?.label;

        const { results } = await getProvincesMutate(filter.city);

        transformDataWithParent(results, parent);
        // setOptions(updatedOptions);
      } catch (error) {}
    };

    if (filter.country) fetchCities();
    if (filter.city) fetchProvince();
  }, [filter]);

  const loadOptions = async (inputValue, callback) => {
    console.log(inputValue, callback);
  };

  // console.log(options);
  // console.log(categories);

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div>
      {PropertiesFilter.map((filters) => {
        return filters.type === "Select" ? (
          <AsyncSelect
            key={filters.id}
            classNamePrefix="select2-selection"
            styles={multiInputStyle}
            isMulti={filters.name === "country" ? false : true}
            instanceId
            components={animatedComponents}
            placeholder={filters.label}
            defaultOptions={options[filters.name]}
            onChange={(event) => filterHandler(event, filters.name)}
            loadOptions={loadOptions}
            formatGroupLabel={formatGroupLabel}
          />
        ) : (
          <input key={filters.id} type="text" />
        );
      })}
    </div>
  );
}

export default AdvanceSearchSelect;
