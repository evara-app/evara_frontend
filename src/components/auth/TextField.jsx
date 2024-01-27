import React from "react";

//import constants
import { isd } from "@/constants/isd";

function TextField({
  method,
  label,
  value,
  type,
  name,
  icon,
  iconHandler,
  fieldHandler,
  dataHandler,
}) {
  return (
    <>
      {method === "phoneNumber" ? (
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-default/90 px-1" htmlFor={name}>
            {label}
          </label>
          <div className="relative">
            <input
              id={name}
              className="authTextField !pl-16"
              type={type}
              name={name}
              placeholder={label}
              value={value}
              onChange={dataHandler}
            />
            {icon}
            <select
              className="absolute top-0 left-0 cursor-pointer bg-transparent h-full focus:outline-none border-r border-white-two/60"
              name="isd"
              onChange={dataHandler}
            >
              {isd.map((item) => (
                <option value={item.code} key={item.id}>
                  {item.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div>
          <label className="text-gray-default/90 px-1" htmlFor={name}>
            {label}
          </label>
          <div className="relative">
            <input
              id={name}
              className="authTextField"
              type={type}
              name={name}
              placeholder={label}
              value={value}
              onChange={dataHandler}
            />
            {icon}
          </div>
        </div>
      )}
    </>
  );
}

export default TextField;
