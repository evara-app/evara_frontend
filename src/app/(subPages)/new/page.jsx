"use client";

import React, { useState } from "react";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";

function page() {
  const [data, setData] = useState();
  const [step, setStep] = useState(1);

  const categoryHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <SelectCategory
            defaultValue={data}
            handler={categoryHandler}
            setHandler={setStep}
          />
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
