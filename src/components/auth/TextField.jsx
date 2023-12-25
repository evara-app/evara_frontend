import React from "react";

//? icons
import { HiUserCircle } from "react-icons/hi";

function TextField({ label, value, type, icon, iconHandler, fieldHandler }) {
  return (
    <div>
      <label className="text-gray-default/90 px-1" htmlFor="">
        Username or Phone number
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Username or Phone number"
          className="form-input border border-white-two/60 w-full p-4 rounded-md focus:border-green-blue focus:ring-0 text-white-two placeholder:text-white-two mt-1"
        />
        <HiUserCircle className="w-10 h-10 text-gray-default/50 absolute top-1/2 -translate-y-1/2 right-3 border-l border-white-two/60 pl-1" />
      </div>
    </div>
  );
}

export default TextField;
