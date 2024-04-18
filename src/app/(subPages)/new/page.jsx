"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";
import Details from "@/app/(subPages)/new/Details";

//? import service
import { getCity, getProvince } from "@/services/addProperty";

//? import inputs json file
import { AddPropertyInputs } from "@/constants/addPropertyInputs";

function page() {
  const [data, setData] = useState({});
  const [selectValues, setSelectValues] = useState({});
  const [step, setStep] = useState(2);

  //get city details from db
  const {
    data: getCityData,
    isPending: getCityPending,
    mutateAsync: getCityMutateAsync,
  } = useMutation({
    mutationFn: getCity,
  });

  //get province details from db
  const {
    data: getProvinceData,
    isPending: getProvincePending,
    mutateAsync: getProvinceMutateAsync,
  } = useMutation({
    mutationFn: getProvince,
  });

  const dataHandler = async (name, value, type) => {
    // if input is multi select define that and save array
    if (type === "Checkbox") {
      data[name]
        ? setData({ ...data, [name]: [...data[name], value] })
        : setData({ ...data, [name]: [value] });

      return;
    }

    // normal set state
    setData({ ...data, [name]: value });

    // define input country & city and get data from db
    switch (name) {
      case "country":
        try {
          const cityData = await getCityMutateAsync({ value });
          setSelectValues({ ...selectValues, city: cityData });
        } catch (error) {}
        break;
      case "city":
        try {
          const provinceData = await getProvinceMutateAsync({ value });
          setSelectValues({ ...selectValues, province: provinceData });
        } catch (error) {}
      default:
        break;
    }
  };

  const imageHandler = (locations) => {
    setData({ ...data, ...locations });
  };

  const yupShapeFields = () => {
    const yupFields = {};
    AddPropertyInputs.forEach(
      (input) => input.required && (yupFields[input.name] = input.requiredError)
    );
    return yupFields;
  };

  console.log(yupShapeFields());

  const schema = Yup.object().shape(yupShapeFields());

  const formik = useFormik({
    initialValues: data || {},
    validationSchema: schema,
    // onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
  });

  console.log(formik.errors);

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
      case 2:
        return (
          <Details
            data={data}
            handler={dataHandler}
            selectValues={selectValues}
            setSelectValues={setSelectValues}
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
