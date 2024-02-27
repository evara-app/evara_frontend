import React from "react";

//? import components
import OTPInput from "react-otp-input";

//? import icon
import { HiOutlinePencilSquare } from "react-icons/hi2";

function SendOtp({ value, time, optHandler }) {
  return (
    <div>
      <div className="mt-10 text-white-two flex items-center gap-x-1 text-sm">
        <HiOutlinePencilSquare className="icon text-blue-500/80" />
        <p>wrong number ? </p>
        <button className="text-blue-500/80">change number</button>
      </div>
      <div className="inputOtpField flex flex-col gap-y-3 mt-4">
        <h1 className="text-2xl font-medium text-gray-default">
          Enter Auth Code
        </h1>
        <OTPInput
          value={value}
          onChange={optHandler}
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
      <div className="mt-12">
        <div className="text-white-two mb-3 text-center text-sm">
          {time > 0 ? (
            <p>Resend the code in {time} second</p>
          ) : (
            <button className="text-blue-500/80">Resend Code ? </button>
          )}
        </div>
        <button className="button py-3 w-full">Send Code</button>
      </div>
    </div>
  );
}

export default SendOtp;
