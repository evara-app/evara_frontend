import React from "react";

//? import components
import TextField from "@/components/auth/TextField";

//? import icons
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";

function CheckOtp({ checkOtpHandler }) {
  return (
    <div>
      <div className="inputOtpField flex flex-col gap-y-5 mt-12">
        <TextField
          label="Username"
          value="Farhan Ahmadi"
          type="text"
          icon={<HiUserCircle className="w-8 h-8" />}
        />
      </div>
      {/* //* login submit button */}
      <div className="mt-12">
        <button onClick={checkOtpHandler} className="button py-3 w-full">
          Login
        </button>
      </div>
    </div>
  );
}

export default CheckOtp;
