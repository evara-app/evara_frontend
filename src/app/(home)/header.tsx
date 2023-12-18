import React from "react";

//? import components
import Navbar from "@/components/Navbar";

function header() {
  return (
    <div className="bg-homeBackground bg-no-repeat bg-cover bg-center">
      <Navbar />
      <div className="flex flex-col items-center gap-y-6 py-28 mx-auto max-w-4xl xl:max-w-none text-center">
        <h1 className="font-bold text-white text-4xl md:text-6xl">
          Let Us Help You Find Your Dream House!
        </h1>
        <p className="text-white text-center">
          Evara is not a real estate company, it is an smart platform that
          allows you to buy or <br /> rent your favorite property in Türkiye
          cheaper without intermediaries
        </p>
      </div>
    </div>
  );
}

export default header;
