"use client";

import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

//? import components
import SelectMenu from "@/common/SelectMenu";

//? import other libraries
import { FaGlobe } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";

//? import hooks
import { useGetCurrency } from "@/hooks/common";

function CurrencyMenu({ subpage }) {
  const queryClient = useQueryClient();

  const { data } = useGetCurrency();

  const [status, setStatus] = useState(false);
  const [currency, setCurrency] = useState();

  const currencyHandler = (id) => {
    localStorage.setItem("currency", id);
    queryClient.invalidateQueries({ queryKey: ["get-live-currency"] });
    setCurrency(id);
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
            <IoChevronDownSharp
              className={`icon ${subpage && "text-white-two"}  `}
            />
            <BsCurrencyDollar
              className={`icon ${subpage && "text-white-two"} `}
            />
          </>
        }
        type="currency"
        list={data || []}
        status={status}
        handler={currencyHandler}
        statusHandler={currencyStatusHandler}
        handelrClose={closecurrencyHandler}
      />
    </div>
  );
}

export default CurrencyMenu;
