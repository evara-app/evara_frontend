import React from "react";
import Link from "next/link";

//? import components
import ContactUsForm from "@/app/(subPages)/contact-us/ContactUsForm";
import Map from "@/app/(subPages)/contact-us/Map";

//? import icons
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineShareAlt,
} from "react-icons/ai/index";
import { FaTelegramPlane } from "react-icons/fa/index";
import { FiPhoneCall } from "react-icons/fi/index";
import { IoLocationOutline } from "react-icons/io5/index";

function page() {
  return (
    <div>
      <div className="contactUs">
        <div className="mx-auto relative -bottom-2/3 overflow-hidden">
          <div className="w-10/12 md:w-full flex items-start max-w-5xl border border-gray-200 shadow-md shadow-gray-200 rounded-md bg-white mx-auto">
            <ContactUsForm />
            <div className="hidden md:block">
              <Map lat={41.00824} lng={28.978359} />
            </div>
          </div>
          <div className="w-10/12 md:w-full max-w-5xl mt-20 bg-white mx-auto relative border border-gray-200 shadow-md shadow-gray-200 mb-20 rounded-md px-4 py-8 md:p-4 flex flex-col md:flex-row gap-y-4 items-start md:items-center md:mx-auto md:border md:border-gray-200 md:before:w-[1px] md:before:h-full md:before:absolute md:before:left-1/2 md:before:bg-gray-200">
            <div className="md:hidden rounded-full p-2 absolute -top-10 left-1/2 -translate-x-1/2">
              <div className=" flex items-center justify-center bg-white rounded-full p-4 border border-gray-300">
                <FiPhoneCall
                  className="w-5 h-5 md:w-8 rotate-[270deg] translate-x-[2px]"
                  color="#00BB7E"
                />
              </div>
            </div>
            <div className="hidden md:flex absolute items-center justify-center -top-16 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white rounded-full p-4 border border-gray-300">
              <FiPhoneCall
                className="w-8 h-8 rotate-[270deg] translate-x-[2px]"
                color="#00BB7E"
              />
            </div>
            <p className="md:flex-1">You can contact us through the numbers</p>
            <div
              className={`flex flex-col gap-y-4 items-start text-sm md:text-base md:ps-16 md:flex-1`}
            >
              <span className="text-blue-600 text-center font-medium">
                Türkiye main numbers :+90 553 900 5500
              </span>
              <span className="text-blue-600 text-center font-medium">
                Türkiye main numbers :+90 553 910 5500
              </span>
              <span className="text-blue-600 text-center font-medium">
                Türkiye main numbers :+90 553 920 5500
              </span>
              <span className="text-blue-600 text-center font-medium">
                Iran support :+98 990 740 0079
              </span>
              <span className="text-blue-600 text-center font-medium">
                Germany support :+49 211 941 949 80
              </span>
              <span className="text-blue-600 text-center font-medium">
                Canada support :+1 (604) 961-3840
              </span>
              <span className="text-blue-600 text-center font-medium">
                Usa support :+1 (949) 852-3620
              </span>
            </div>
          </div>
          <div className="hidden relative w-10/12 md:w-full max-w-5xl border border-gray-200 shadow-md shadow-gray-200 rounded-md mb-20 px-4 py-9 md:flex flex-row justify-center items-center  md:mx-auto md:border md:border-gray-300 ">
            <div className="md:hidden bg-[#f8f8f8] rounded-full p-2 absolute -top-10 left-1/2 -translate-x-1/2">
              <div className=" flex items-center justify-center bg-white rounded-full p-4 border border-gray-300">
                <IoLocationOutline className="w-5 h-5" color="#00BB7E" />
              </div>
            </div>
            <div className="hidden md:flex absolute mx-auto items-center justify-center -top-10 left-1/2 -translate-x-1/2 bg-white rounded-full p-4 border border-gray-300">
              <IoLocationOutline className="w-8 h-8" color="#00BB7E" />
            </div>
            <div className="flex flex-col max-w-xl mx-auto items-start gap-y-5">
              <p className="flex justify-start items-center">
                <span className="font-medium">Türkiye :</span>
                Skyland B Block Maslak Sariyer Istanbul Turkey
              </p>
              <p className="flex justify-start items-center">
                <span className="font-medium">Germany :</span>
                Germany, Düsseldorf, Monschuer, 12th Street, No 40549
              </p>
              <p className="flex justify-start items-center">
                <span className="font-medium">Canada :</span>
                Canada, British Columbia, Cocoville, Harris Street, no: 952
              </p>
              <p className="flex justify-start items-center">
                <span className="font-medium">Usa :</span>
                United States, California, Air wine, Dr Mickleson Street, 2600,
                no: 92612
              </p>
              <p className="flex justify-start items-center">
                <span className="font-medium">Iran :</span>
                Iran, Tehran, Argentina Sq 19th Bokharest Street, no 21
              </p>
            </div>
          </div>
          <div className="w-10/12 md:w-full max-w-5xl relative border border-gray-200 shadow-md shadow-gray-200 rounded-md mb-20 px-4 py-7 mx-auto flex flex-col-reverse md:flex-row justify-evenly items-center md:mx-auto md:border md:border-gray-300 ">
            <div className="md:hidden rounded-full p-2 absolute -top-10 left-1/2 -translate-x-1/2">
              <div className=" flex items-center justify-center bg-white rounded-full p-4 border border-gray-300">
                <AiOutlineShareAlt className="w-5 h-5" color="#00BB7E" />
              </div>
            </div>
            <div className="hidden absolute md:flex items-center justify-center -top-1/3 left-1/2 -translate-x-1/2 bg-white rounded-full p-4 border border-gray-300">
              <AiOutlineShareAlt className="w-8 h-8" color="#00BB7E" />
            </div>
            <div>
              <p className="text-sm md:text-base text-justify">
                <span className="font-medium">Social Media :</span>
                Follow us on social networks to be aware of our latest news
              </p>
            </div>
            <div className="flex w-full justify-evenly items-center gap-x-2 mb-5 md:mb-0">
              <Link legacyBehavior href="#">
                <a target="_blank">
                  <AiOutlineInstagram className="w-10 h-10" color="#6f6f6f" />
                </a>
              </Link>
              <Link legacyBehavior href="#">
                <a target="_blank">
                  <FaTelegramPlane className="w-10 h-10" color="#6f6f6f" />
                </a>
              </Link>
              <Link legacyBehavior href="#">
                <a target="_blank">
                  <AiFillFacebook className="w-10 h-10" color="#6f6f6f" />
                </a>
              </Link>
              <Link legacyBehavior href="#">
                <a target="_blank">
                  <AiOutlineTwitter className="w-10 h-10" color="#6f6f6f" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
