"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";

//? import inputs json file
import AddPropertyMethods from "@/constants/addPropertyMethods.json";
import AddPropertyMethodTypes from "@/constants/addPropertyMethodTypes.json";
import { AddPropertyInputs } from "@/constants/addPropertyInputs";

//? import components
import TextField from "@/common/TextField";
import CustomSelect from "@/common/CustomSelect";
import SelectInput from "@/components/addProperty/SelectInput";
import Map from "@/components/addProperty/Map";

//? import hooks
import {
  useGetRooms,
  useGetCountry,
  useGetPropertyFields,
} from "@/hooks/propertyDetails";
import { useGetCurrency, useGetLocalCurrency } from "@/hooks/common";

//? import mui
import Divider from "@mui/material/Divider";

const selectNames = ["room", "countries"];

function Details({
  data,
  inputs,
  handler,
  featuresHandler,
  mapHandler,
  selectValues,
  setSelectValues,
  validation,
  submit,
  stepHandler,
}) {
  // get property details data
  const { data: rooms } = useGetRooms();
  const { data: countries } = useGetCountry();
  const { data: propertyFields } = useGetPropertyFields();
  const { data: currency, isLoading } = useGetCurrency();
  const { data: localCurrency } = useGetLocalCurrency();
  const currencyId = localCurrency || 1;

  // states
  const [selectOpen, setSelectOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const selectOpenHandler = (name) => {
    if (name === selectOpen) {
      setSelectOpen(false);
      return;
    }
    setSelectOpen(name);
  };

  // update and set state select values data
  useEffect(() => {
    const updatedSelectValues = { ...selectValues };
    if (rooms) updatedSelectValues.room = rooms;
    if (countries) updatedSelectValues.country = countries;
    if (propertyFields) {
      Object.keys(propertyFields.data).forEach(
        (item) => (updatedSelectValues[item] = propertyFields.data[item])
      );
    }
    setSelectValues(updatedSelectValues);
  }, [rooms, countries, propertyFields]);

  // check is all inputs validated
  const isValidated = () => {
    const errors = Object.keys(validation.errors);
    const inputNames = inputs.flatMap((input) => errors.includes(input.name));
    if (inputNames.includes(true)) return false;
    return true;
  };

  useEffect(() => {
    if (isValidated()) setIsDisabled(isValidated());
  }, [validation.errors]);

  return (
    <form onSubmit={submit}>
      <div className="grid grid=cols-1 md:grid-cols-3 gap-x-2 gap-y-4">
        {inputs.map((input) => {
          if (input.type !== "Select" && input.type !== "Checkbox") {
            return (
              <div key={input.id} className="col-span-1">
                {input.type === "Number" ? (
                  <div className="flex flex-col gap-y-1 mt-2 relative">
                    <label
                      htmlFor={input.id}
                      className="flex items-center justify-between"
                    >
                      {input.label}
                      <span className="text-red-500 text-xs truncate max-w-xs">
                        {validation?.touched[input.name] &&
                          validation?.errors[input.name] &&
                          validation?.errors[input.name]}
                      </span>
                    </label>
                    <NumericFormat
                      id={input.id}
                      allowLeadingZeros
                      thousandSeparator=","
                      className={`border border-white-two p-2 rounded w-full overflow-hidden ${
                        validation?.errors[input.name]
                          ? "focus:border-red-500"
                          : "focus:border-green-blue"
                      } outline-none`}
                      placeHolder={input.placeholder}
                      type="text"
                      name={input.name}
                      onValueChange={({ value }) =>
                        handler(input.name, value, input.features)
                      }
                      value={validation.values[input.name] || ""}
                      onBlur={validation.handleBlur}
                    />
                  </div>
                ) : (
                  <TextField
                    id={input.id}
                    label={input.label}
                    name={input.name}
                    type={input.type}
                    currency={
                      !isLoading &&
                      currency.find((item) => item.id == currencyId)
                        .abbreviation
                    }
                    value={validation.values[input.name] || ""}
                    error={validation.errors[input.name] || ""}
                    touched={validation.touched[input.name]}
                    placeHolder={input.placeholder}
                    handler={(e) =>
                      handler(input.name, e.target.value, input.features)
                    }
                    blurHandler={validation.handleBlur}
                  />
                )}
              </div>
            );
          } else if (input.type === "Select" || input.type === "Checkbox") {
            if (
              input.name === "completion_date" &&
              data.building_status !== "under_constraction"
            )
              return;
            return (
              <div key={input.id} className="col-span-1">
                <SelectInput
                  selectOpen={selectOpen}
                  selectOpenHandler={selectOpenHandler}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  value={validation.values[input.name] || ""}
                  error={validation.errors[input.name] || ""}
                  touched={validation.touched[input.name]}
                  placeHolder={input.placeholder}
                  items={selectValues[input.name]}
                  handler={handler}
                  feature={input.features}
                  blurHandler={validation.handleBlur}
                />
              </div>
            );
          }
        })}
      </div>
      <Divider
        sx={{
          "&::before, &::after": {
            borderColor: "var(--white-two)",
          },
          marginTop: "25px",
          marginBottom: "25px",
        }}
      />
      <Map data={data} handler={mapHandler} validation={validation} />
      <div className="flex items-center justify-start gap-x-2">
        <button
          disabled={!isDisabled}
          type="submit"
          className={`${!isDisabled ? "disableButton" : "button"} px-10`}
          onClick={() => stepHandler((prevstate) => prevstate + 1)}
        >
          Next
        </button>
        <button
          type="button"
          className="rounded text-white font-medium bg-gray-500 py-2 px-6"
          onClick={() => stepHandler((prevstate) => prevstate - 1)}
        >
          Back
        </button>
      </div>
    </form>
  );
}

export default Details;
