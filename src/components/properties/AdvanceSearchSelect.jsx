"use client";

import React, { useEffect, useState, Suspense } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useMutation } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";

//? import constants
import { PropertiesFilter } from "@/constants/propertiesFilters";

//? import service
import { getCities, getProvinces } from "@/services/properties";

//? import components
import Loading from "@/common/Loading";

//? import hooks
import { useGetCurrency, useGetLocalCurrency } from "@/hooks/common";

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

function AdvanceSearchSelect({
  filter,
  filterHandler,
  inputHandler,
  categories,
  countries,
  propertyFields,
}) {
  const listing = [
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

  // get currency
  const { data: currency, isLoading } = useGetCurrency();
  const { data: localCurrency } = useGetLocalCurrency();
  const currencyId = localCurrency || 1;
  const currencyName =
    !isLoading && currency.find((item) => item.id == currencyId).abbreviation;

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
    updatedOptions.listing = transformData(listing);
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
  }, [filter, options.country]);

  const loadOptions = async (inputValue, callback) => {};

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const valueHandler = (name, items) => {
    if (Array.isArray(filter[name]) && options[name]) {
      return filter[name].reduce((acc, filterValue) => {
        switch (name) {
          case "province":
            acc.push(
              options.province
                .flatMap((provinceOption) => provinceOption.options)
                .find((item) => item.value === filterValue)
            );
            break;
          case "features":
            acc.push(
              ...items.map((feature) => ({
                label: feature,
                value: feature.split(",")[1],
                parent: feature.split(",")[0],
              }))
            );
          case "propertyType":
            acc.push(
              ...items.map((propertyType) => ({
                label: propertyType,
                value: propertyType.split(",")[1],
                parent: propertyType.split(",")[0],
              }))
            );
            break;
          default:
            acc.push(
              options[name]?.find((option) => option.value === filterValue)
            );
        }
        return acc;
      }, []);
    } else {
      return options[name]?.filter((item) => item.value === filter[name]);
    }
  };

  return (
    <div className="grid grid-cols-2">
      {PropertiesFilter.map((filters) => {
        return filters.type === "Select" ? (
          <AsyncSelect
            key={filters.id}
            isLoading={!options[filters.name]}
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
            value={valueHandler(filters.name, filter[filters.name])}
          />
        ) : (
          <div
            key={filters.id}
            className="relative col-span-1 m-1 overflow-hidden z-0"
          >
            <NumericFormat
              allowLeadingZeros
              thousandSeparator=","
              className="w-full border border-border-gray py-1 px-2 rounded outline-none focus:border-green-blue text-[#7F7F7F] placeholder:text-[#7F7F7F]"
              placeholder={filters.label}
              type="text"
              name={filters.name}
              onValueChange={({ value }, { event }) =>
                inputHandler(event, value, currencyName)
              }
              value={filter[filters.name]}
            />
            {["minPrice", "maxPrice"].includes(filters.name) && (
              <span className="absolute end-0 text-[#7F7F7F] top-1/2 -translate-y-1/2 text-xs p-1 z-10">
                {!isLoading && currencyName}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AdvanceSearchSelect;
