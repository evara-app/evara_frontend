"use client";

import React, { useState } from "react";

//? import components
import TextField from "@/common/TextField";

//? import constants
import { userField } from "@/constants/profile";

function page() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const dataHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  console.log(data);
  return (
    <div className="grid grid-cols-3 items-center md:p-6 gap-x-20">
      {/* user information section */}
      <div className="col-span-2">
        {userField.map((field) => (
          <TextField
            key={field.id}
            label={field.label}
            name={field.name}
            placeHolder={field.placeHolder}
            type={field.type}
            value={field.value}
            handler={dataHandler}
          />
        ))}
        <button className="button mt-5">Submit</button>
      </div>
      {/* profile image section  */}
      <div className="bg-blue-gray rounded-md col-span-1 p-4 shadow-md">
        <div className="flex flex-col items-center gap-y-6">
          <div className="w-full flex items-center justify-center">
            <img
              className="w-32 h-32 object-cover object-center rounded-full ring-2 ring-aqua-green ring-offset-2"
              src="/assets/img/profile.jpeg"
              alt="profile image"
            />
          </div>
          <p className="text-white-two text-sm">
            Here you can change your profile image
          </p>
          <div>
            <button className="outlineGrayBtn">Upload Image</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
