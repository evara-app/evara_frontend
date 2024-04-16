"use client";

import React, { useEffect, useState } from "react";

//? import inputs json file
import AddPropertyMethods from "@/constants/addPropertyMethods.json";
import AddPropertyMethodTypes from "@/constants/addPropertyMethodTypes.json";
import { AddPropertyInputs } from "@/constants/addPropertyInputs";

//? import components
import TextField from "@/common/TextField";
import CustomSelect from "@/common/CustomSelect";
import SelectInput from "@/components/addProperty/SelectInput";

//? import hooks
import { useGetRooms, useGetCountry } from "@/hooks/propertyDetails";

const selectNames = ["room", "countries"];

function Details({ data, handler }) {
  const { data: rooms } = useGetRooms();
  const { data: countries } = useGetCountry();

  const [selectValues, setSelectValues] = useState({});
  const [selectOpen, setSelectOpen] = useState(false);

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

  useEffect(() => {
    if (rooms) setSelectValues({ ...selectValues, room: rooms });
    if (countries) setSelectValues({ ...selectValues, country: countries });
  }, [rooms, countries]);

  console.log(countries);

  return (
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
                value={data[input.name] || ""}
                placeHolder={input.placeholder}
                handler={(e) => handler(input.name, e.target.value)}
              />
            </div>
          );
        } else if (input.type === "Select") {
          return (
            <div key={input.id} className="col-span-1">
              <SelectInput
                selectOpen={selectOpen}
                selectOpenHandler={selectOpenHandler}
                label={input.label}
                name={input.name}
                placeHolder={input.placeholder}
                items={selectValues[input.name]}
                handler={handler}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default Details;
