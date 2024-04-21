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
import { AddPropertyInputs, InputsError } from "@/constants/addPropertyInputs";

function page() {
  const [data, setData] = useState({});
  const [selectValues, setSelectValues] = useState({});
  const [step, setStep] = useState(1);

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

  const dataHandler = async (name, value, type, lat, lng) => {
    const coordinateFields = ["country", "city", "province"];
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

    // if input is multi select define that and save array
    if (type === "Checkbox") {
      data[name]
        ? setData({ ...data, [name]: [...data[name], value] })
        : setData({ ...data, [name]: [value] });

      return;
    } else if (coordinateFields.includes(name)) {
      setData({ ...data, [name]: value, lat: lat, lng: lng });
      return;
    }

    // normal set state
    setData({ ...data, [name]: value });
  };

  const imageHandler = (locations) => {
    setData({ ...data, ...locations });
  };

  const mapHandler = (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    setData({ ...data, latitude: latitude, longitude: longitude });
  };

  // make formik fields validation with map
  const yupShapeFields = () => {
    const yupFields = {};
    yupFields.title = Yup.string()
      .required("Title is required field")
      .min(3, "The title must have at least 3 characters");
    yupFields.description = Yup.string()
      .required("Description is required field")
      .min(3, "The description must have at least 3 characters");
    InputsError.forEach(
      (input) =>
        input.required &&
        (yupFields[input.name] = Yup.string().required(input.requiredError))
    );
    AddPropertyInputs.forEach(
      (input) =>
        input.required &&
        (yupFields[input.name] =
          input.type === "Number" || input.type === "Text"
            ? Yup.string().required(input.requiredError)
            : Yup.mixed().required(input.requiredError))
    );
    return yupFields;
  };

  const schema = Yup.object().shape(yupShapeFields());

  const onSubmit = (event) => {
    event.preventDefault();
    switch (step) {
      case 0:
        break;
      case 1:

      default:
        break;
    }
    console.log("send ");
  };

  const formik = useFormik({
    initialValues: data || {},
    validationSchema: schema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
  });

  console.log(data);
  // console.log(formik.errors);

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
            validation={formik}
            submit={formik.handleSubmit}
            handler={imageHandler}
          />
        );
      case 2:
        return (
          <Details
            data={data}
            handler={dataHandler}
            mapHandler={mapHandler}
            selectValues={selectValues}
            setSelectValues={setSelectValues}
            validation={formik}
            submit={formik.handleSubmit}
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
