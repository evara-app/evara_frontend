"use client";

import React from "react";

//? import hooks
import { useGetCurrency, useGetLocalCurrency } from "@/hooks/common";

function PropertyPrice({ cardData }) {
  const { data: currency, isLoading } = useGetCurrency();
  const { data: localCurrency } = useGetLocalCurrency();
  const currencyId = localCurrency || 1;
  const currencyName =
    !isLoading && currency.find((item) => item.id == currencyId).abbreviation;

  return (
    <>
      {!isLoading &&
        cardData?.price
          .find((item) => item.name === currencyName.toLowerCase())
          ?.price.toLocaleString()}
      {" - "} {currencyName}
    </>
  );
}

export default PropertyPrice;
