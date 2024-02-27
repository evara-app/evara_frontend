import React from "react";

function CustomSelect() {
  return (
    <div className="absolute border border-white-two w-full rounded mt-2">
      <ul className="flex p-1 flex-col gap-y-1 cursor-pointer transition text-gray-default">
        <li className="p-1 rounded hover:bg-gray-100">support</li>
        <li className="p-1 rounded hover:bg-gray-100">sale</li>
      </ul>
    </div>
  );
}

export default CustomSelect;
