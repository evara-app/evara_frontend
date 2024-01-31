import React from "react";

//? import components
import OTPInput from "react-otp-input";
import Loading from "@/common/Loading";

//? import icon
import { HiOutlinePencilSquare } from "react-icons/hi2";

function SendOtp({
  data,
  otp,
  setOtp,
  time,
  loading,
  checkOtpHandler,
  sendOtpHandler,
  setStep,
}) {
  return (
    <form onSubmit={checkOtpHandler}>
      <div className="mt-10 text-white-two flex items-center gap-x-1 text-sm">
        <HiOutlinePencilSquare className="icon text-blue-500/80" />
        <p>wrong {data.email ? "email" : "phone number"} ? </p>
        <button
          type="button"
          className="text-blue-500/80"
          onChange={() => setStep(1)}
        >
          change number
        </button>
      </div>
      <div className="inputOtpField flex flex-col gap-y-3 mt-5">
        <h1 className="text-2xl font-medium text-gray-default">
          Enter Auth Code
        </h1>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span>-</span>}
          inputStyle="form-input border text-gray-default border-white-two rounded-2xl font-bold focus:outline-none focus:border-green-blue !focus:shadow-greenShaow"
          containerStyle="flex gap-x-2 justify-between"
          renderInput={(props) => (
            <div className="flex gap-x-2 justify-center items-center w-full">
              <input type="number" {...props} />
            </div>
          )}
        />
      </div>
      <div className="mt-5">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="text-white-two mb-3 text-center text-sm">
              {time > 0 ? (
                <p>Resend the code in {time} second</p>
              ) : (
                <button
                  type="button"
                  className="text-blue-500/80"
                  onChange={sendOtpHandler}
                >
                  Resend Code ?
                </button>
              )}
            </div>
            <button type="submit" className="button py-3 w-full">
              Send Code
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default SendOtp;
