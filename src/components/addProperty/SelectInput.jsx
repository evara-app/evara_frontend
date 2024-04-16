import React from "react";

//? import components
import Loading from "@/common/Loading";

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
        className="border border-white-two p-2 rounded focus:border-green-blue outline-none w-full text-start text-white-two"
        onClick={() => selectOpenHandler(name)}
      >
        {placeHolder}
      </button>
      {selectOpen === name && (
        <div className="absolute bg-white w-full top-20 max-w-sm z-50 min-h-fit overflow-y-scroll shadow-lg rounded-md">
          {items ? (
            <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default ">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-2 rounded hover:text-white hover:font-medium hover:bg-green-400 flex justify-start"
                  onClick={() => handler(name, item.id)}
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
