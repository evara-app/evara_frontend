"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
//? import images
import EvaraLogoImage from "&/assets/img/evaraLogo.png";

//? import mui
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

//? import icons
import Exit from "&/assets/svg/exit.svg";
import Edit from "&/assets/svg/edit.svg";

//? import constants
import { AdminUl } from "@/constants/adminSidebar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function SideBar() {
  return (
    <div className="bg-white overflow-y-auto flex flex-col h-screen p-4">
      <div className="overflow-y-auto flex-auto">
        <div className="w-full flex items-center justify-center">
          <Image src={EvaraLogoImage} alt="Evara Logo" width={40} />
        </div>
        <Divider className="my-2 bg-aqua-green" variant="middle" />
        <div className="mt-5">
          <ul className="flex flex-col gap-y-1">
            {AdminUl.map((li) => (
              <Link key={li.id} href={li.url}>
                <li className="adminLi group">
                  {li.icon}
                  {li.label}
                </li>
              </Link>
            ))}
          </ul>
          <button className="adminLi group w-full">
            <Exit className="svgIconAdmin" /> Exit
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link href="#">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="User Profile Pic" src="/assets/img/user.jpg" />
          </StyledBadge>
        </Link>
        <div className="flex flex-col flex-auto mx-2">
          <Link href="#">
            <h1 className="text-base text-gray-default">Farhan Ahmadi</h1>
          </Link>
          <span className="text-sm text-white-two">User</span>
        </div>
        <Link href="#">
          <button>
            <Edit className="w-10 h-10 fill-white-two p-2 rounded-2xl border border-white-two hover:bg-gray-50 transition" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
