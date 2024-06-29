import Image from "next/image";
import React from "react";

//? import components
import ContactUsForm from "@/app/(subPages)/contact-us/ContactUsForm";
import Map from "@/common/Map";

function page() {
  return (
    <div className="contactUs">
      <div className="flex items-start max-w-5xl border border-gray-200 shadow-md shadow-green-600 rounded-md bg-white overflow-hidden mx-auto relative -bottom-3/4">
        <ContactUsForm />
        <Map lat={41.00824} lng={28.978359} />
      </div>
    </div>
  );
}

export default page;
