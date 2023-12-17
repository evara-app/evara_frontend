"use client";

import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";

//? import components
import SelectMenu from "@/common/SelectMenu";

//? import other libraries
import { FaGlobe } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";

function CurrencyMenu() {
  const [status, setStatus] = useState<null | HTMLElement>(null);
  const [currency, setCurrency] = useState<string | null>();

  const currencyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrency(event.currentTarget.innerText);
    setStatus(null);
  };

  const currencyStatusHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setStatus(event.currentTarget);
  };

  const closecurrencyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStatus(null);
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
