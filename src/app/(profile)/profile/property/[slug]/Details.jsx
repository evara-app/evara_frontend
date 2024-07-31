"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

//? import inputs json file
import { EditPropertyInputs } from "@/constants/editPropertyInputs";
import EditPropertyMethodTypes from "@/constants/editPropertyMethodTypes.json";

//? import components
import TextField from "@/common/TextField";
import CustomSelect from "@/common/CustomSelect";
import SelectInput from "@/components/addProperty/SelectInput";
import Map from "@/components/addProperty/Map";

//? import service
import { getCity, getProvince, addProperty } from "@/services/addProperty";

//? import hooks
import {
  useGetRooms,
  useGetCountry,
  useGetPropertyFields,
} from "@/hooks/propertyDetails";
import { useGetCurrency, useGetLocalCurrency } from "@/hooks/common";

function Details({ details }) {
  // get property details data
  const { data: rooms } = useGetRooms();
  const { data: countries } = useGetCountry();
  const { data: propertyFields } = useGetPropertyFields();
  const { data: currency, isLoading } = useGetCurrency();
  const { data: localCurrency } = useGetLocalCurrency();
  const currencyId = localCurrency || 1;

  // states
  const [data, setData] = useState(details);
  const [selectOpen, setSelectOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
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

  // our backend accept unnecessary fields in an object named "features" because of that we had to make object named "features" in data state and in the other hand we need to validate fields to handel this we need to set field directly in data. we send "features" object to data
  const dataHandler = async (name, value, feature = false, type, lat, lng) => {
    const coordinateFields = ["country", "city", "province"];
    // define input country & city and get data from db
    switch (name) {
      case "country":
        //delete city and province from data when country changed
        data.province && delete data.province;
        data.city && delete data.city;
        try {
          const cityData = await getProvinceMutateAsync({ value });
          setSelectValues({ ...selectValues, province: cityData });
        } catch (error) {}
        break;
      case "province":
        //delete province from data when city changed
        data.city && delete data.city;
        try {
          const provinceData = await getCityMutateAsync({ value });
          setSelectValues({ ...selectValues, city: provinceData });
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
            [value]: false,
          },
        });
      }
      data[name]
        ? setData({
            ...data,
            [name]: [...data[name], value],
            features: { ...data.features, [value]: true },
          })
        : setData({
            ...data,
            [name]: [value],
            features: { ...data.features, [value]: true },
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

  const mapHandler = (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    setData({ ...data, latitude: latitude, longitude: longitude });
  };

  const selectOpenHandler = (name) => {
    if (name === selectOpen) {
      setSelectOpen(false);
      return;
    }
    setSelectOpen(name);
  };

  useEffect(() => {
    console.log(details);
    details.country && dataHandler("country", details.country);
    details.province && dataHandler("city", details.province);
  }, []);

  // update and set state select values data
  useEffect(() => {
    const updatedSelectValues = { ...selectValues };
    if (rooms) updatedSelectValues.room = rooms;
    if (countries) updatedSelectValues.country = countries;
    if (propertyFields) {
      Object.keys(propertyFields.data).forEach(
        (item) => (updatedSelectValues[item] = propertyFields.data[item])
      );
    }
    setSelectValues(updatedSelectValues);
  }, [rooms, countries, propertyFields]);

  // render property details page inputs
  const renderInputs = () => {
    const limitedTypes = ["Garden", "Farm"];
    const type = limitedTypes.includes(details.type.parent.name)
      ? details.type.parent.name
      : "All";
    const activeFields = EditPropertyMethodTypes.find(
      (item) =>
        item.type === details.listing.listing_type && item.category === type
    ).fields;
    const inputs = EditPropertyInputs.filter((input) =>
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
    // try {
    //   const { results } = await addPropertyMutateAsync({ data });
    //   Toast("success", results.en);
    //   router.push("/");
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("true");
  };

  // update formik schema dynamic
  const schema =
    details.listing.listing_type &&
    details.type.parent.name &&
    Yup.object().shape(yupShapeFields());

  const formik = useFormik({
    initialValues: data || {},
    validationSchema: schema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,
  });
  console.log(selectValues);
  return (
    <div>
      <div className="grid grid=cols-1 md:grid-cols-3 gap-x-2 gap-y-4">
        {renderInputs().map((input) => {
          if (input.type !== "Select" && input.type !== "Checkbox") {
            return (
              <div key={input.id} className="col-span-1">
                <TextField
                  id={input.id}
                  label={input.label}
                  name={input.name}
                  type={input.type}
                  currency={
                    !isLoading &&
                    currency.find((item) => item.id == currencyId).abbreviation
                  }
                  value={
                    input.features
                      ? formik.values.feature?.find(
                          (item) => item.name === input.name
                        )?.value
                      : formik.values[input.name] || ""
                  }
                  error={formik.errors[input.name] || ""}
                  touched={formik.touched[input.name]}
                  placeHolder={input.placeholder}
                  handler={(e) =>
                    dataHandler(input.name, e.target.value, input.features)
                  }
                  blurHandler={formik.handleBlur}
                />
              </div>
            );
          } else if (input.type === "Select" || input.type === "Checkbox") {
            if (
              input.name === "completion_date" &&
              data.building_status !== "under_constraction"
            )
              return;
            return (
              <div key={input.id} className="col-span-1">
                <SelectInput
                  selectOpen={selectOpen}
                  selectOpenHandler={selectOpenHandler}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  value={
                    input.features
                      ? formik.values.feature?.find(
                          (item) => item.name === input.name
                        )?.value
                      : formik.values[input.name] || ""
                  }
                  error={formik.errors[input.name] || ""}
                  touched={formik.touched[input.name]}
                  placeHolder={input.placeholder}
                  items={selectValues[input.name]}
                  handler={dataHandler}
                  feature={input.features}
                  blurHandler={formik.handleBlur}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Details;
