"use client";

import React from "react";

//? icons
import MoneyIcon from "&/assets/svg/moneyBag.svg";
import Calendar from "&/assets/svg/calendar.svg";

//? import hooks
import { useGetCurrency, useGetLocalCurrency } from "@/hooks/common";

function PriceDetails({ property }) {
  const { data: currency, isLoading } = useGetCurrency();
  const { data: localCurrency } = useGetLocalCurrency();
  const currencyId = localCurrency || 1;
  const currencyName =
    !isLoading && currency.find((item) => item.id == currencyId).abbreviation;

  return (
    <div className="w-full mb-10 rounded-lg  py-4 px-2 sm:px-8 sm:py-6 border border-gray-200 bg-box-default-gray shadow-boxShadow">
      <div className="flex items-center md:flex-col md:gap-y-2 md:items-start lg:flex-row justify-between mb-4">
        <span className="flex items-center gap-x-1">
          <MoneyIcon className="svgIcon" />
          Price
        </span>
        <div className="flex items-center gap-x-4 rounded-md bg-white-two/25 px-2 py-1 text-sm">
          <span>Property code: :</span>
          <span>00333</span>
        </div>
      </div>
      <div className="mb-10 flex flex-col gap-y-3">
        <div className="w-full p-3 border border-white-two rounded-lg focus:outline-none">
          <span className="text-lg">
            Sell :
            <span className="text-green-blue font-medium">
              {!isLoading &&
                property?.price
                  .find((item) => item.name === currencyName.toLowerCase())
                  ?.price.toLocaleString()}
              {" - "} {currencyName}
            </span>
          </span>
        </div>
      </div>
      <button className="flex items-center justify-center gap-x-2 bg-gradient-to-tr from-cyan-default to-green-blue w-full rounded-lg text-white font-bold text-xl py-4">
        <Calendar className="svgIcon" />
        Schedule a visit
      </button>
    </div>
  );
}

export default PriceDetails;
