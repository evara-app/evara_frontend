"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

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

//? import mui
import Divider from "@mui/material/Divider";

const selectNames = ["room", "countries"];

function Details({
  data,
  handler,
  mapHandler,
  selectValues,
  setSelectValues,
  validation,
  submit,
}) {
  // get property details data
  const { data: rooms } = useGetRooms();
  const { data: countries } = useGetCountry();
  const { data: propertyFields } = useGetPropertyFields();

  // states
  const [selectOpen, setSelectOpen] = useState(false);

  // render property details page inputs
  const renderInputs = () => {
    const activeFields = AddPropertyMethodTypes.find(
      (item) => item.type === "Sell" && item.category === "All"
    ).fields;
    const inputs = AddPropertyInputs.filter((input) =>
      activeFields.includes(input.name)
    );
    return inputs;
  };

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

  renderInputs().forEach((input) =>
    console.log(Object.keys(validation.errors).includes(input.name))
  );
  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-3 gap-x-2 gap-y-4">
        {renderInputs().map((input) => {
          if (input.type !== "Select" && input.type !== "Checkbox") {
            return (
              <div key={input.id} className="col-span-1">
                <TextField
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  type={input.type}
                  value={validation.values[input.name] || ""}
                  error={validation.errors[input.name] || ""}
                  touched={validation.touched[input.name]}
                  placeHolder={input.placeholder}
                  handler={(e) => handler(input.name, e.target.value)}
                  blurHandler={validation.handleBlur}
                />
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
      <div>
        <button type="submit" className="button px-10">
          Next
        </button>
      </div>
    </form>
  );
}

export default Details;
