"use client";

import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";

//? import components
import SelectMenu from "@/common/SelectMenu";

//? import other libraries
import { FaGlobe } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";

function CurrencyMenu() {
  const [status, setStatus] = useState(false);
  const [currency, setCurrency] = useState();

  const currencyHandler = (event) => {
    setCurrency(event.currentTarget.innerText);
    setStatus(false);
  };

  const currencyStatusHandler = (event) => {
    setStatus(event.currentTarget);
  };

  const closecurrencyHandler = (event) => {
    setStatus(false);
  };
  return (
    <div>
      <SelectMenu
        name={
          <>
            <IoChevronDownSharp className="icon" />
            <BsCurrencyDollar className="icon" />
          </>
        }
        list={[
          { id: 1, name: "TRY" },
          { id: 2, name: "EUR" },
          { id: 3, name: "USD" },
          { id: 4, name: "IRT" },
        ]}
        status={status}
        handler={currencyHandler}
        statusHandler={currencyStatusHandler}
        handelrClose={closecurrencyHandler}
      />
    </div>
  );
}

export default CurrencyMenu;
