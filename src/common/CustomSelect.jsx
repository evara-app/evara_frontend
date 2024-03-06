import React from "react";

function CustomSelect({ items, handler }) {
  return (
    <div className="absolute border border-white-two/40 w-full rounded top-12 bg-white start-0 z-20">
      <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-2 rounded hover:bg-gray-100 flex justify-start"
            onClick={() => handler(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
