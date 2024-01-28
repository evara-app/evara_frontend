import React from "react";
import Image from "next/image";

//? import images
import EvaraLogoImage from "&/assets/img/evaraLogo.png";

//? import mui
import Divider from "@mui/material/Divider";

//? import icons
import { PiUserLight } from "react-icons/pi";

function SideBar() {
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <Image src={EvaraLogoImage} alt="Evara Logo" width={40} />
      </div>
      <Divider className="my-2 bg-aqua-green" variant="middle" />
      <div className="mt-5">
        <ul className="flex flex-col gap-y-1">
          <li className="adminLi">Dashboard</li>
          <li className="adminLi">
            <PiUserLight className="icon text-white-two" />
            Users
          </li>
          <li className="adminLi">Properties</li>
          <li className="adminLi">Orders</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
