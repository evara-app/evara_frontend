"use client";

import React, { useState } from "react";

//? import components
import SideBar from "@/app/(admin)/admin/SideBar";

//? import icons
import { HiMenuAlt3 } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";

function header({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {open && (
        <button
          className="md:hidden h-screen w-full fixed top-0 left-0 bg-white-two/40 backdrop-blur-sm z-10"
          onClick={() => setOpen(false)}
        ></button>
      )}
      <div className="md:hidden bg-white grid grid-cols-6 justify-items-center p-2 border-b border-gray-200">
        <div className="col-span-1 w-full text-start">
          <button onClick={() => setOpen(!open)}>
            <HiMenuAlt3 className="text-gray-default w-7 h-7" />
          </button>
        </div>
        <div className="col-span-4 text-xl">Evara</div>
        <div className="col-span-1 w-full text-end">
          <button>
            <HiChevronLeft className="text-gray-default w-7 h-7" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 bg-white h-screen">
        <div
          className={`absolute top-0 left-0 z-20 md:static md:col-span-1 bg-blue-gray overflow-y-auto md:translate-x-0 transition-all ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar />
        </div>
        <div className="col-span-6 md:col-span-5 overflow-y-auto p-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}

export default header;
