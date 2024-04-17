import React from "react";

//? import components
import Loading from "@/common/Loading";

//? import icons
import { IoChevronDownSharp } from "react-icons/io5";

//? import utils
import { Separator } from "@/utils/separator";

function SelectInput({
  selectOpen,
  selectOpenHandler,
  id,
  label,
  type,
  placeHolder,
  value,
  items,
  name,
  handler,
}) {
  return (
    <div className="flex flex-col gap-y-1 mt-2 relative">
      <label htmlFor={id}>{label}</label>
      <button
        className="border border-white-two p-2 rounded focus:border-green-blue outline-none w-full text-start flex justify-between items-center"
        onClick={() => selectOpenHandler(name)}
      >
        {value ? (
          <span className="text-gray-default">{Separator(value)}</span>
        ) : (
          <span className="text-white-two">{placeHolder}</span>
        )}
        <IoChevronDownSharp className="icon text-white-two" />
      </button>
      {selectOpen === name && (
        <div className="absolute bg-white w-full top-20 max-w-sm z-50 min-h-fit overflow-y-scroll border border-white-two/50 rounded-md">
          {items ? (
            <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`p-2 rounded hover:text-white hover:font-medium hover:bg-green-400 flex justify-start ${
                    value === item.id
                      ? "bg-green-400/70 text-white"
                      : value?.includes(item.id)
                      ? "bg-green-400/70 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    handler(name, item.id, type);
                    selectOpenHandler(name);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center my-10">
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectInput;
