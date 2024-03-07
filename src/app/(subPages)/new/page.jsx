"use client";

import React, { useState } from "react";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";

const buttonItem = [
  {
    id: 1,
    label: "Category",
    placeHolder: "Select one Category",
    categoryItem: [
      {
        id: 1,
        label: "residential",
        value: "residential",
      },
      {
        id: 2,
        label: "residential",
        value: "residential",
      },
      {
        id: 3,
        label: "residential",
        value: "residential",
      },
      {
        id: 4,
        label: "residential",
        value: "residential",
      },
      {
        id: 5,
        label: "residential",
        value: "residential",
      },
    ],
  },
  {
    id: 2,
    label: "Sell or rent",
    placeHolder: "Sell or rent",
    categoryItem: [
      {
        id: 1,
        label: "residential",
        value: "residential",
      },
      {
        id: 2,
        label: "residential",
        value: "residential",
      },
      {
        id: 3,
        label: "residential",
        value: "residential",
      },
      {
        id: 4,
        label: "residential",
        value: "residential",
      },
      {
        id: 5,
        label: "residential",
        value: "residential",
      },
    ],
  },
  {
    id: 3,
    label: "Property type",
    placeHolder: "Select one roperty type",
    categoryItem: [
      {
        id: 1,
        label: "residential",
        value: "residential",
      },
      {
        id: 2,
        label: "residential",
        value: "residential",
      },
      {
        id: 3,
        label: "residential",
        value: "residential",
      },
      {
        id: 4,
        label: "residential",
        value: "residential",
      },
      {
        id: 5,
        label: "residential",
        value: "residential",
      },
    ],
  },
];

function page() {
  const [step, setStep] = useState(1);

  const categoryHandler = (value) => {
    console.log(value);
  };

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <SelectCategory buttonItem={buttonItem} handler={categoryHandler} />
        );
        break;
      case 1:
        return <SelectImage />;

      default:
        break;
    }
  };
  return (
    <div>
      <Stepper activeStep={step} />
      <div className="mt-5 shadow-md p-4 rounded-lg">{renderSteps()}</div>
    </div>
  );
}

export default page;
