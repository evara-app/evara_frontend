"use client";

import React, { useState } from "react";

function AboutProperty({ children }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <div
      className={`md:block relative ${
        readMore ? "pb-6" : "max-h-52 overflow-hidden"
      }`}
    >
      <h3 className="text-sm md:text-lg mb-2 font-bold">About this property</h3>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: (
           
          ),
        }}
        className={`text-sm leading-6 mb-2 ${
          readMore ? "h-auto" : "max-h-[190px] overflow-hidden"
        } `}
      ></div> */}
      {children}
      <div
        className={`flex items-end justify-center absolute -bottom-6 left-0 w-full ${
          !readMore && "bg-gradient-to-t from-white via-white/70 h-60 !bottom-0"
        }   `}
      >
        <button
          className="bg-white-two/25 rounded-md py-1 px-4 text-gray-default/70"
          onClick={() => setReadMore(!readMore)}
        >
          {!readMore ? "Read more" : "Read Less"}
        </button>
      </div>
    </div>
  );
}

export default AboutProperty;
