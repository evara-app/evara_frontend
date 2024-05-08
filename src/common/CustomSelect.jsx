import React from "react";

//? import components
import Loading from "@/common/Loading";

function CustomSelect({ items, name, handler, defaultValue }) {
  return (
    <div className="absolute border border-white-two/40 w-full rounded top-12 bg-white start-0 z-20">
      {items ? (
        <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-2 rounded hover:text-white hover:font-medium hover:bg-green-400 flex justify-start"
              onClick={() => {
                handler({
                  ...defaultValue,
                  [name]: item.value,
                  listing: item.id,
                });
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default CustomSelect;
