import React from "react";
import Image from "next/image";
import Link from "next/link";

//? import images
import EvaraLogoImage from "../../../public/assets/img/evaraLogo.png";
import EvaraTextImage from "../../../public/assets/img/evaraText.png";

//? import components
import LinkSelectMenu from "@/common/LinkSelectMenu";
import LanguageMenu from "@/components/header/LanguageMenu";
import CurrencyMenu from "@/components/header/CurrencyMenu";
import NavbarDrawer from "@/components/header/NavbarDrawer";
import LoginCheck from "@/app/(subPages)/LoginCheck";

//? import icons
import { IoSearch } from "react-icons/io5";

function Navbar() {
  return (
    <>
      <div className="hidden md:flex items-center justify-between p-4">
        {/* //* Logo Section */}
        <Link href="/">
          <div className="flex items-center gap-x-2">
            <Image src={EvaraLogoImage} alt="Evara Logo" width={50} />
            <Image
              className="hidden lg:flex "
              src={EvaraTextImage}
              alt="Evara Logo"
              width={130}
            />
          </div>
        </Link>
        {/* //* Buttons Section */}
        <div>
          <ul className="flex items-center gap-x-3">
            <li className="headerLi">
              <Link href="/">Home</Link>
            </li>
            <li className="headerLi">
              <Link href="/about-us">About us</Link>
            </li>
            <li className="headerLi">
              <LinkSelectMenu
                name="Service"
                links={[
                  { id: 1, href: "/", name: "Turkish citizenship" },
                  {
                    id: 2,
                    href: "/",
                    name: "Citizenship and Residence in Türkiye",
                  },
                  { id: 3, href: "/", name: "Buy property in Türkiye" },
                ]}
              />
            </li>
            <li className="headerLi">
              <Link href="/properties">Property list</Link>
            </li>
            <li className="headerLi">
              <Link href="/mag">Mag</Link>
            </li>
            <li className="headerLi">
              <Link href="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>
        {/* //* Auth & Language Section */}
        <div className="flex items-center gap-x-2 lg:gap-x-3 text-white">
          <LoginCheck />
          <Link href="/new">
            <span className="px-2 py-1 border-2 border-green-blue rounded-md">
              Add Property
            </span>
          </Link>
          <LanguageMenu />
          <CurrencyMenu />
        </div>
      </div>
      <div className="flex items-center justify-between md:hidden py-2 px-4">
        <NavbarDrawer />
        <Image src={EvaraLogoImage} alt="Evara Logo" width={40} />
        <IoSearch className="icon w-7 h-7" />
      </div>
    </>
  );
}

export default Navbar;
