"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
//? import image
import IstanbulImage from "../../../../public/assets/img/auth.jpg";

//? import components
import CheckOtp from "@/app/(auth)/auth/CheckOtp";
import SendOtp from "@/app/(auth)/auth/SendOtp";
import { Toast } from "@/hooks/Toast";

//? mui
import Divider from "@mui/material/Divider";

//? import react query
import { useMutation } from "@tanstack/react-query";

//? import service
import { getOtp, checkOtp } from "@/services/authService";

const RESEND_TIME = 90;
const GET_OTP_DATA = {
  password: "",
  isd: "+98",
  phone_number: "",
};

function page() {
  const router = useRouter();

  const [data, setData] = useState(GET_OTP_DATA);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);

  //react query send otp form to db
  const {
    error: otpError,
    data: getOtpData,
    mutateAsync: getOtpMutate,
  } = useMutation({
    mutationFn: getOtp,
  });

  //react query check otp & set cookies
  const {
    error: checkOtpError,
    data: checkOtpData,
    mutateAsync: checkOtpMutate,
  } = useMutation({
    mutationFn: checkOtp,
  });

  const sendOtpHandler = async (event) => {
    event.preventDefault();
    try {
      const message = await getOtpMutate({ data });
      console.log(message);
      Toast("success", message.en);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      Toast("error", error?.response?.data?.message);
    }
  };

  const checkOtpHandler = async (event) => {
    event.preventDefault();
    // change the varibale otp to password
    const CHECK_OTP_DATA = {
      password: otp,
      isd: data.isd,
      phone_number: data.phone_number,
    };
    try {
      const message = await checkOtpMutate({ CHECK_OTP_DATA });
      const { messages } = message;
      axios.post("/api/auth", message);
      Toast("success", messages.en);
      router.push("/");
    } catch (error) {
      Toast("error", error?.response?.data?.message);
    }
  };

  const dataHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
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
          <SendOtp
            data={data}
            dataHandler={dataHandler}
            loginMethod={loginMethod}
            sendOtpHandler={sendOtpHandler}
          />
        );
      case 2:
        return (
          <CheckOtp
            time={time}
            setOtp={setOtp}
            value={otp}
            sendOtpHandler={sendOtpHandler}
            checkOtpHandler={checkOtpHandler}
          />
        );
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
        {/* <div className="w-full flex items-center justify-center mt-12 relative">
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
        </div> */}
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
