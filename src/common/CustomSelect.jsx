import React from "react";

function CustomSelect({ items, handler }) {
  return (
    <div className="absolute border border-white-two w-full rounded top-20 bg-white">
      <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-1 rounded hover:bg-gray-100"
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
