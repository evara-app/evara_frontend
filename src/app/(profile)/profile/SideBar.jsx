"use client";

import React from "react";
import Image from "next/image";

//? import images
import EvaraLogoImage from "&/assets/img/evaraLogo.png";

//? import mui
import Divider from "@mui/material/Divider";

//? import icons
import { PiUserLight } from "react-icons/pi";

//? import constants
import { profileList } from "@/constants/profile";

//? import hooks
import { useGetUser } from "@/hooks/useAuth";

function SideBar() {
  const { data } = useGetUser();
  const { results: user } = data || {};

  return (
    <div
      className={`border-r border-white-two shadow-md md:border-none md:shadow-none transition duration-300 ${
        !user && "blur"
      }`}
    >
      <div className="p-4">
        <div className="w-full flex items-center justify-center mt-5">
          <img
            className="w-32 h-32 object-cover object-center rounded-full ring-2 ring-aqua-green ring-offset-2"
            src="/assets/img/profile.jpeg"
            alt="profile image"
          />
        </div>
        <div className="flex flex-col items-center mt-5">
          <h1 className="text-3xl">
            {user?.first_name} {user?.last_name}
          </h1>
          <p className="text-white-two">Evara user</p>
        </div>
      </div>
      <div className="mt-5 pl-4">
        <ul className="flex flex-col gap-y-2">
          {profileList.map((item) => (
            <li
              key={item.id}
              className={`flex items-center p-3 gap-x-2 hover:bg-white text-white-two hover:shadow-sm !hover:text-green-blue hover:fill-green-blue hover:stroke-green-blue stroke-white-two stroke-0 rounded-l cursor-pointer transition ${
                item.value === "Profile" &&
                "bg-white shadow-sm text-green-blue fill-green-blue"
              }`}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <Divider className="my-2 bg-aqua-green" variant="middle" />
    </div>
  );
}

export default SideBar;
