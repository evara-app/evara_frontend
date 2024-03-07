import React, { useState } from "react";

//? import components
import CustomSelect from "@/common/CustomSelect";

//? import icons
import { HiChevronDown } from "react-icons/hi";

function SelectCategory({ buttonItem, handler }) {
  const [open, setOpen] = useState(false);

  const openHandler = (event) => {
    if (event.target.id === open) {
      setOpen(false);
      return;
    }
    setOpen(event.target.id);
  };

  return (
    <div className="flex items-center flex-wrap md:flex-nowrap gap-y-4 gap-x-2">
      {buttonItem.map((button) => (
        <div className="flex flex-col w-full">
          <h5 className="ps-1 mb-1">{button.label}</h5>
          <button
            id={button.id}
            className="flex flex-auto text-white-two items-center justify-between p-2 border border-white-two/40 rounded relative"
            onClick={openHandler}
          >
            {button.placeHolder}
            <HiChevronDown className={`icon text-white-two transition`} />
            {open == button.id && (
              <CustomSelect items={button.categoryItem} handler={handler} />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
