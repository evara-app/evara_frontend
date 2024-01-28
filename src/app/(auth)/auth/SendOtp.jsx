"use client";

import React, { useState } from "react";

//? import icons
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { HiEyeOff } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";

//? import components
import TextField from "@/components/auth/TextField";

function CheckOtp({ data, dataHandler, sendOtpHandler, loginMethod }) {
  const [passwordStatus, setPasswordStatus] = useState("hidden");

  const passwordIconHandler = (status) => {
    setPasswordStatus(status);
  };

  const passwordIcon =
    passwordStatus === "hidden" ? (
      <button type="button" onClick={() => passwordIconHandler("visible")}>
        <AiOutlineEyeInvisible className="authIcon" />
      </button>
    ) : (
      <button type="button" onClick={() => passwordIconHandler("hidden")}>
        <AiOutlineEye className="authIcon" />
      </button>
    );

  return (
    <form onSubmit={sendOtpHandler}>
      <div className="inputOtpField flex flex-col gap-y-5 mt-12">
        {loginMethod === 1 ? (
          <TextField
            label="Phone Number"
            name="phone_number"
            method="phoneNumber"
            value={data.phone_number}
            dataHandler={dataHandler}
            type="text"
            icon={<HiUserCircle className="authIcon" />}
          />
        ) : (
          <div className="flex flex-col gap-y-5">
            <TextField
              label="Email"
              name="email"
              method="email"
              value={data.email}
              dataHandler={dataHandler}
              type="email"
              icon={<HiUserCircle className="authIcon" />}
            />
            <TextField
              label="Password"
              name="password"
              method="email"
              value={data.password}
              dataHandler={dataHandler}
              type={passwordStatus === "hidden" ? "password" : "text"}
              icon={passwordIcon}
            />
          </div>
        )}
      </div>
      {/* login submit button */}
      <div className="mt-12">
        <button type="submit" className="button py-3 w-full">
          Login
        </button>
      </div>
    </form>
  );
}

export default CheckOtp;
