"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

//? import components
import Stepper from "@/app/(subPages)/new/Stepper";
import SelectCategory from "@/app/(subPages)/new/SelectCategory";
import SelectImage from "@/app/(subPages)/new/SelectImage";
import Details from "@/app/(subPages)/new/Details";
import Note from "@/app/(subPages)/new/Note";

//? import service
import { getCity, getProvince, addProperty } from "@/services/addProperty";

//? import inputs json file
import { AddPropertyInputs, InputsError } from "@/constants/addPropertyInputs";
import AddPropertyMethodTypes from "@/constants/addPropertyMethodTypes.json";

//? import hooks
import { useGetLocalCurrency } from "@/hooks/common";
import { Toast } from "@/hooks/Toast";

function page() {
  const router = useRouter();

  const [data, setData] = useState({});
  const [selectValues, setSelectValues] = useState({});
  const [step, setStep] = useState(0);

  //get city details from db
  const { mutateAsync: getCityMutateAsync } = useMutation({
    mutationFn: getCity,
  });

  //get province details from db
  const { mutateAsync: getProvinceMutateAsync } = useMutation({
    mutationFn: getProvince,
  });

  //add property request
  const { mutateAsync: addPropertyMutateAsync } = useMutation({
    mutationFn: addProperty,
  });

  const { data: lcoalCurrency } = useGetLocalCurrency();
  const currencyId = lcoalCurrency || 1;

  // our backend accept unnecessary fields in an object named "features" because of that we had to make object named "features" in data state and in the other hand we need to validate fields to handel this we need to set field directly in data. we send "features" object to data
  const dataHandler = async (name, value, feature = false, type, lat, lng) => {
    const coordinateFields = ["country", "city", "province"];
    // define input country & city and get data from db
    switch (name) {
      case "country":
        //delete city and province from data when country changed
        data.city && delete data.city;
        data.province && delete data.province;
        try {
          const cityData = await getCityMutateAsync({ value });
          setSelectValues({ ...selectValues, city: cityData });
        } catch (error) {}
        break;
      case "city":
        //delete province from data when city changed
        data.province && delete data.province;
        try {
          const provinceData = await getProvinceMutateAsync({ value });
          setSelectValues({ ...selectValues, province: provinceData });
        } catch (error) {}
      default:
        break;
    }

    // if input is multi select define that and save array
    if (type === "Checkbox") {
      // remove the selected item from data
      if (data[name] && data[name].includes(value)) {
        return setData({
          ...data,
          [name]: data[name].filter((item) => item !== value),
          features: {
            ...data.features,
            [name]: data[name].filter((item) => item !== value),
          },
        });
      }
      data[name]
        ? setData({
            ...data,
            [name]: [...data[name], value],
            features: { ...data.features, [name]: [...data[name], value] },
          })
        : setData({
            ...data,
            [name]: [value],
            features: { ...data.features, [name]: [value] },
          });

      return;
    } else if (coordinateFields.includes(name)) {
      setData({ ...data, [name]: value, lat: lat, lng: lng });
      return;
    }
    // normal set state
    if (feature) {
      setData({
        ...data,
        [name]: value,
        features: { ...data.features, [name]: value },
      });
      return;
    } else {
      setData({ ...data, [name]: value });
    }
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
    yupFields.images = Yup.array()
      .required("Images is required field")
      .min(3, "You must choose at least 3 photos");
    yupFields.longitude = Yup.string().required("Map is required field");
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

  const onSubmit = async (event) => {
    const { results } = await addPropertyMutateAsync({ data });
    Toast("success", results.en);
    router.push("/");
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

  useEffect(() => {
    setData({ ...data, currency: currencyId });
  }, []);

  // console.log(data);

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <SelectCategory
            defaultValue={data}
            handler={setData}
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
            stepHandler={setStep}
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
            stepHandler={setStep}
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

// 1 - check formik {...formik.getFieldProps(name)}
// 2 - number inputs should separate
