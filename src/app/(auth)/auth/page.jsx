"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

//? import image
import IstanbulImage from "../../../../public/assets/img/auth.jpg";

//? import components
import CheckOtp from "@/app/(auth)/auth/CheckOtp";
import SendOtp from "@/app/(auth)/auth/SendOtp";
import TextField from "@/components/auth/TextField";
import Loading from "@/common/Loading";
import OTPInput from "react-otp-input";
import { Toast } from "@/hooks/Toast";

//? import icons
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";

//? mui
import Divider from "@mui/material/Divider";

const RESEND_TIME = 90;

function page() {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);

  const checkOtpHandler = (event) => {
    Toast("success", "send code");
  };

  const loginMethodHandler = (method) => {
    setLoginMethod(method);
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOtp value={otp} optHandler={setOtp} loginMethod={loginMethod} />
        );
      case 2:
        return <CheckOtp checkOtpHandler={checkOtpHandler} time={time} />;
      default:
        break;
    }
  };

  return (
    <div className="md:grid md:grid-cols-5 p-5">
      {/* image */}
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
      {/* auth inputs and ... */}
      <div className="md:col-span-2 md:max-w-lg w-full mx-auto my-auto px-2">
        {/* images and link to main page */}
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
        {/* login or sign up buttons */}
        <div className="w-full flex items-center justify-center mt-12 relative">
          <button
            className={`${
              loginMethod === 1 ? "authActiveButton" : "authDeactiveButton"
            } relative z-10`}
            onClick={() => loginMethodHandler(1)}
          >
            Phone Number
          </button>
          <button
            className={`${
              loginMethod === 2 ? "authActiveButton" : "authDeactiveButton"
            } relative -left-1 z-0`}
            onClick={() => loginMethodHandler(2)}
          >
            Email
          </button>
        </div>
        {renderSteps()}
        {/* divider */}
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
        {/* login with google button */}
        <div className="mt-12">
          <button className="rounded text-gray-default/80 w-full border border-white-two/60 font-medium py-3 px-6 flex items-center justify-center gap-x-1">
            <img src="/google.svg" alt="google icon" width={30} height={30} />
            Login with google
          </button>
        </div>
        {/* footer text */}
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
