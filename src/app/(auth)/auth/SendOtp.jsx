import React from "react";

//? import icons
import { HiUserCircle } from "react-icons/hi";

//? import components
import TextField from "@/components/auth/TextField";
import Loading from "@/common/Loading";

function CheckOtp({ data, dataHandler, sendOtpHandler, loginMethod, loading }) {
  return (
    <form onSubmit={sendOtpHandler}>
      <div className="flex flex-col gap-y-5 mt-12">
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
          <TextField
            label="Email"
            name="email"
            method="email"
            value={data.email}
            dataHandler={dataHandler}
            type="email"
            icon={<HiUserCircle className="authIcon" />}
          />
        )}
      </div>
      {/* login submit button */}
      <div className="mt-5">
        {loading ? (
          <Loading />
        ) : (
          <button type="submit" className="button py-3 w-full">
            Login
          </button>
        )}
      </div>
    </form>
  );
}

export default CheckOtp;
