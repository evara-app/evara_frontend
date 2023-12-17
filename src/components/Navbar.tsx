import React from "react";
import Image from "next/image";
import Link from "next/link";

//? import images
import EvaraLogoImage from "../../public/assets/img/evaraLogo.png";
import EvaraTextImage from "../../public/assets/img/evaraText.png";

//? import other libraries
import { FaGlobe } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";

//? import components
import SelectMenu from "@/common/SelectMenu";
import LanguageMenu from "@/components/LanguageMenu";
import CurrencyMenu from "@/components/CurrencyMenu";

function Navbar() {
  return (
    <div className="flex items-center justify-between p-4">
      {/* //* Logo Section */}
      <div className="flex items-center gap-x-2">
        <Image src={EvaraLogoImage} alt="Evara Logo" width={50} />
        <Image src={EvaraTextImage} alt="Evara Logo" width={130} />
      </div>
      {/* //* Buttons Section */}
      <div>
        <ul className="flex items-center gap-x-3">
          <li className="headerLi">
            <Link href="/">Home</Link>
          </li>
          <li className="headerLi">
            <Link href="/">About us</Link>
          </li>
          <li className="headerLi">
            <Link className="flex items-center" href="/">
              <IoChevronDownSharp className="icon text-white-two" />
              {/* <SelectMenu
                name="Service"
                list={[
                  { id: 1, name: "Turkish citizenship" },
                  { id: 2, name: "Citizenship and Residence in Türkiye" },
                  { id: 3, name: "Buy property in Türkiye" },
                ]}
              /> */}
            </Link>
          </li>
          <li className="headerLi">
            <Link href="/">Property list</Link>
          </li>
          <li className="headerLi">
            <Link href="/">Mag</Link>
          </li>
          <li className="headerLi">
            <Link href="/">Contact us</Link>
          </li>
        </ul>
      </div>
      {/* //* Auth & Language Section */}
      <div className="flex items-center gap-x-3 text-white">
        <Link href="/">Login</Link>
        <button className="px-2 py-1 border-2 border-green_blue rounded-md">
          Add Property
        </button>
        <LanguageMenu />
        <CurrencyMenu />
      </div>
    </div>
  );
}

export default Navbar;
