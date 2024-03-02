"use client";

import React, { useState } from "react";

//? import components
import SideBar from "@/app/(profile)/profile/SideBar";

//? import icons
import { HiMenuAlt3 } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";

//? import mui
import Drawer from "@mui/material/Drawer";

function header({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
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
        <Drawer open={open} onClose={() => setOpen(false)}>
          <SideBar />
        </Drawer>
      </div>
    </div>
  );
}

export default header;
