"use client";

import React, { useState } from "react";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";

function page() {
  const [step, setStep] = useState(1);

  const categoryHandler = (value) => {
    console.log(value);
  };

  const renderSteps = () => {
    switch (step) {
      case 0:
        return <SelectCategory handler={categoryHandler} />;
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
