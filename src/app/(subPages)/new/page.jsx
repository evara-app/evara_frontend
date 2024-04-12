"use client";

import React, { useState } from "react";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";

function page() {
  const [data, setData] = useState({});
  const [step, setStep] = useState(1);

  const dataHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const imageHandler = (locations) => {
    setData({ ...data, ...locations });
  };

  console.log(data);

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <SelectCategory
            defaultValue={data}
            handler={dataHandler}
            setHandler={setStep}
          />
        );
        break;
      case 1:
        return (
          <SelectImage
            data={data}
            setData={setData}
            dataHandler={dataHandler}
            handler={imageHandler}
          />
        );
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
