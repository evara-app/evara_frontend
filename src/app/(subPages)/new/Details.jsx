import React, { useEffect } from "react";

//? import inputs json file
import AddPropertyMethods from "@/constants/addPropertyMethods.json";
import AddPropertyMethodTypes from "@/constants/addPropertyMethodTypes.json";
import { AddPropertyInputs } from "@/constants/addPropertyInputs";

//? import components
import TextField from "@/common/TextField";
import CustomSelect from "@/common/CustomSelect";

function Details({ data, handler }) {
  const renderInputs = () => {
    const activeFields = AddPropertyMethodTypes.find(
      (item) => item.type === "Sell" && item.category === "All"
    ).fields;
    const inputs = AddPropertyInputs.filter((input) =>
      activeFields.includes(input.name)
    );
    return inputs;
  };

  useEffect(() => {
    console.log(renderInputs());
  }, []);

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
              {input.name}
            </div>
          );
        }
      })}
    </div>
  );
}

export default Details;
