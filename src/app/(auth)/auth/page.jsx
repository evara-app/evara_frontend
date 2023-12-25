"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

//? import image
import IstanbulImage from "../../../../public/assets/img/auth.jpg";

//? import components
import TextField from "@/components/auth/TextField";
import Loading from "@/common/Loading";
import OTPInput from "react-otp-input";

//? import icons
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";

//? mui
import Divider from "@mui/material/Divider";

function page() {
  const [otp, setOtp] = useState("");
  return (
    <div className="md:grid md:grid-cols-5 p-5">
      {/* //* image */}
      <div className="hidden md:block col-span-3 rounded overflow-hidden">
        <Image
          src={IstanbulImage}
          alt="Istanbul"
          objectFit="contain"
          quality={100}
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "calc(100vh - 50px)",
            objectPosition: "30% 50%",
          }}
        />
      </div>
      {/* //* auth inputs and ... */}
      <div className="md:col-span-2 md:max-w-lg w-full mx-auto my-auto px-2">
        {/* //* images and link to main page */}
        <Link href="/">
          <div className="flex items-center justify-center gap-x-2 mb-10">
            <Image
              src="/assets/img/evaraLogo.png"
              alt="Evara Logo"
              width={40}
              height={40}
            />
            <Image
              src="/assets/img/subPageLogo.png"
              alt="logo"
              width={100}
              height={20}
            />
          </div>
        </Link>
        {/* //* login or sign up buttons */}
        <div className="w-full flex items-center justify-center mt-12 relative">
          <button className="authActiveButton relative z-10">Login</button>
          <button className="authDeactiveButton relative -left-1 z-0">
            Sign up
          </button>
        </div>
        {/* //* login inputs  */}
        <div className="inputOtpField flex flex-col gap-y-5 mt-12">
          {/* <TextField
            label="Username"
            value="Farhan Ahmadi"
            type="text"
            icon={<HiUserCircle className="w-8 h-8" />}
          /> */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            inputStyle="border border-white-two rounded-2xl font-bold focus:outline-none focus:border-green-blue !focus:shadow-greenShaow"
            containerStyle="containerStyle flex gap-x-2 justify-between"
            renderInput={(props) => (
              <div className="flex gap-x-2 justify-center items-center w-full">
                <input type="number" {...props} />
              </div>
            )}
          />
        </div>
        {/* //* login submit button */}
        <div className="mt-12">
          <button className="button py-3 w-full">Login</button>
        </div>
        {/* //* divider */}
        <div className="mt-8">
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "var(--white-two)",
              },
            }}
          >
            or
          </Divider>
        </div>
        {/* //* login with google button */}
        <div className="mt-12">
          <button className="rounded text-gray-default/80 w-full border border-white-two/60 font-medium py-3 px-6 flex items-center justify-center gap-x-1">
            <img src="/google.svg" alt="google icon" width={30} height={30} />
            Login with google
          </button>
        </div>
        {/* //* footer text */}
        <div className="mt-12">
          <p className="text-center text-white-two">
            EvAra.life owns all rights to this website
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
