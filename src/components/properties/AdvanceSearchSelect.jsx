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

function AdvanceSearchSelect({ filter, filterHandler, inputHandler }) {
  const { data: allCategories, isLoading } = useGetAllCategories();
  const { results: categories } = allCategories || {};
  const { data: country } = useGetCountry();
  const { data: rooms } = useGetRooms();
  const { data: propertyFields } = useGetPropertyFields();
  const { another_features } = propertyFields?.data || {};
  const transactionType = [
    {
      id: "BU",
      name: "Sell",
      type: "Sell",
    },
    {
      id: "RE",
      name: "Rent",
      type: "Rent",
    },
    {
      id: "DR",
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
      });
      // updatedOptions.propertyType = transformData(categories);
    }
    setOptions(updatedOptions);
  }, [country, rooms, another_features]);

  // console.log(options);

  useEffect(() => {
    const updatedOptions = { ...options };
    // change structure of api data because react-select accept this way
    const transformData = (data) =>
      data.map((item) => ({ label: item.name, value: item.id }));

    const transformDataWithParent = (data, parents) => {
      return parents.map((parent) => ({
        label: parent,
        options: data
          .filter((item) => item.parentLabel === parent)
          .map((item) => ({
            label: item.name,
            value: item.id,
          })),
      }));
    };

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
        // get cities name in array
        const parents = filter.city.map(
          (item) => options.city.find((cit) => cit.value == item)?.label
        );

        // get province from data
        const { results } = await getProvincesMutate(filter.city);

        // set province names with parent name to options
        updatedOptions.province = transformDataWithParent(results, parents);

        // set options state
        setOptions(updatedOptions);
      } catch (error) {}
    };

    if (filter.country && options.country) fetchCities();
    if (filter.city.length) fetchProvince();
  }, [filter, options.country, options.city]);

  const loadOptions = async (inputValue, callback) => {};

  // console.log(filter);

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const valueHandler = (name) => {
    if (Array.isArray(filter[name]) && options[name]) {
      return filter[name].reduce((acc, filterValue) => {
        acc.push(options[name]?.find((option) => option.value == filterValue));
        return acc;
      }, []);
    } else {
      return options[name]?.filter((item) => item.value == filter[name]);
    }
  };

  return (
    <div className="grid grid-cols-2">
      {PropertiesFilter.map((filters) => {
        return filters.type === "Select" ? (
          <AsyncSelect
            key={filters.id}
            classNamePrefix="select2-selection"
            className="col-span-2"
            styles={multiInputStyle}
            isMulti={filters.name === "country" ? false : true}
            instanceId={filters.id}
            components={animatedComponents}
            placeholder={filters.label}
            defaultOptions={options[filters.name]}
            onChange={(event) => filterHandler(event, filters.name)}
            loadOptions={loadOptions}
            formatGroupLabel={formatGroupLabel}
            value={valueHandler(filters.name)}
            getOptionLabel={({ label }) => label}
            getOptionValue={({ value }) => value}
          />
        ) : (
          <input
            className="border border-border-gray col-span-1 py-1 px-2 rounded m-1 outline-none focus:border-green-blue text-[#7F7F7F] placeholder:text-[#7F7F7F]"
            key={filters.id}
            placeholder={filters.label}
            type="text"
            name={filters.name}
            onChange={inputHandler}
            value={filter[filters.name]}
          />
        );
      })}
    </div>
  );
}

export default AdvanceSearchSelect;
