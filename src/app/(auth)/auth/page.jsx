import Image from "next/image";
import React from "react";
import Link from "next/link";

//? import image
import IstanbulImage from "../../../../public/assets/img/auth.jpg";

//? import components
import TextField from "@/components/auth/TextField";

//? import icons
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";

function page() {
  return (
    <div className="grid grid-cols-5 p-5">
      {/* //* image */}
      <div className="col-span-3 rounded overflow-hidden">
        <Image
          src={IstanbulImage}
          alt="Istanbul"
          objectFit="contain"
          quality={100}
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "calc(100vh - 50px)",
            objectPosition: "30% 50%",
          }}
        />
      </div>
      {/* //* auth inputs and ... */}
      <div className="col-span-2 max-w-md mx-auto">
        {/* //* images and link to main page */}
        <Link href="/">
          <div className="flex items-center justify-center gap-x-2 mb-10">
            <Image
              src="/assets/img/evaraLogo.png"
              alt="Evara Logo"
              width={40}
              height={40}
            />
            <Image
              src="/assets/img/subPageLogo.png"
              alt="logo"
              width={100}
              height={20}
            />
          </div>
        </Link>
        <div className="w-full flex items-center justify-center mt-20 relative">
          <button className="authActiveButton relative z-10">Login</button>
          <button className="authDeactiveButton relative -left-1 z-0">
            Sign up
          </button>
        </div>
        {/* //* login inputs  */}
        <div className="flex flex-col gap-y-5 mt-20">
          <TextField
            label="Username"
            value="Farhan Ahmadi"
            type="text"
            icon={<HiUserCircle className="w-8 h-8" />}
          />
          <TextField
            label="Username"
            value="Farhan Ahmadi"
            type="text"
            icon={<HiUserCircle className="w-8 h-8" />}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
