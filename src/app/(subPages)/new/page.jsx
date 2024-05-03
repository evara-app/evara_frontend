"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";
import Details from "@/app/(subPages)/new/Details";
import Note from "@/app/(subPages)/new/Note";

//? import service
import { getCity, getProvince } from "@/services/addProperty";

//? import inputs json file
import { AddPropertyInputs, InputsError } from "@/constants/addPropertyInputs";
import AddPropertyMethodTypes from "@/constants/addPropertyMethodTypes.json";

function page() {
  const [data, setData] = useState({});
  const [selectValues, setSelectValues] = useState({});
  const [step, setStep] = useState(0);

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
    setData({ ...data, images: locations });
  };

  const mapHandler = (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    setData({ ...data, latitude: latitude, longitude: longitude });
  };

  // render property details page inputs
  const renderInputs = () => {
    const limitedTypes = ["Garden", "Farm"];
    const type = limitedTypes.includes(data.category) ? data.category : "All";
    const activeFields = AddPropertyMethodTypes.find(
      (item) => item.type === data.SellOrBuy && item.category === type
    ).fields;
    const inputs = AddPropertyInputs.filter((input) =>
      activeFields.includes(input.name)
    );
    return inputs;
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
    yupFields.note = Yup.string()
      .required("Note is required field")
      .min(3, "The Note must have at least 3 characters");
    yupFields.images = Yup.array()
      .required("Images is required field")
      .min(3, "You must choose at least 3 photos");
    renderInputs().forEach(
      (input) =>
        input.required &&
        (yupFields[input.name] =
          input.type === "Number" || input.type === "Text"
            ? Yup.string().required(input.requiredError)
            : Yup.mixed().required(input.requiredError))
    );
    return yupFields;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("send ");
  };

  // update formik schema dynamic
  const schema =
    data.SellOrBuy && data.category && Yup.object().shape(yupShapeFields());

  const formik = useFormik({
    initialValues: data || {},
    validationSchema: schema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <SelectCategory
            defaultValue={data}
            handler={dataHandler}
            setHandler={setStep}
            submit={formik.handleSubmit}
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
            inputs={renderInputs()}
            handler={dataHandler}
            mapHandler={mapHandler}
            selectValues={selectValues}
            setSelectValues={setSelectValues}
            validation={formik}
            submit={formik.handleSubmit}
          />
        );
      case 3:
        return (
          <Note
            data={data}
            handler={dataHandler}
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
