import React from "react";
import Link from "next/link";

//? import icons
import { VscMail } from "react-icons/vsc";
import {
  AiOutlineYoutube,
  AiFillFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
  return (
    <div className="hidden md:block bg-[#eee] pb-4">
      <div className="w-full h-[175px] rounded-b-[70%] bg-gray-100 shadow mb-14"></div>
      <div className="mx-5 xl:container xl:mx-auto flex flex-col gap-y-8  ">
        <div className="grid grid-cols-2 grid-rows-1 lg:grid-cols-5 content-center justify-items-center">
          <div className="col-span-5 lg:col-auto flex flex-col gap-y-4 mb-8">
            <div className="flex items-center justify-center lg:justify-start gap-x-4">
              <img
                className="w-[40px] h-[40px]"
                src="/assets/img/evaraLogo.png"
                alt="evara"
              />
              <img
                className="w-[100px] h-[30px]"
                src="/assets/img/evaraText.png"
                alt="evara"
              />
            </div>
            <h5 className="text-[14px] font-medium">
              The most comprehensive website for international Real Estate
            </h5>
            <p className="text-[10px]">
              Buying and selling, installment and rent, selling in advance and
              partnership
            </p>
          </div>
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              Contact us
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px] font-medium">
              <li>Phone: +90 (533) 900 5500</li>
              <li>
                Address: Maslak . Ahi Evran Cad. 42 Maslak D:762,
                Sarıyer/İstanbul
              </li>
            </ul>
          </div>
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              About us
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px]">
              <li>What do we do</li>
              <li>News</li>
              <li>Partners</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              Learning
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px]">
              <li>How we work</li>
              <li>Common questions</li>
              <li>Laws and regulations</li>
              <li>Purchase without paying commission</li>
            </ul>
          </div>
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              Our services
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px]">
              <li>Buying property</li>
              <li>Selling property</li>
              <li>Renting and mortgaging property</li>
              <li>Collaboration in buying and selling</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 lg:grid-cols-4 content-center justify-items-start">
          {/* <div className="col-span-5 lg:col-auto flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4 mb-8">
              <div className="flex items-center gap-x-4">
                <div className="flex flex-col gap-y-1">
                  <span className="font-bold">Subscribe to the newsletter</span>
                  <span className="text-[12px]">
                    Receiving the latest property special offers and news
                  </span>
                </div>
                <VscMail size={45} />
              </div>
              <div className="relative">
                <input
                  className="py-3 px-4 bg-white rounded-2xl w-full border border-gray-200 focus:outline-none text-left"
                  type="text"
                  placeholder="Insert Your Email"
                  //   onChange={emailInputHandler}
                />
                <button
                  //   onClick={emailHandler}
                  className="bg-gradient-to-r from-cyan-500 to-green-500 h-full px-5 text-white rounded-2xl absolute top-0 left-0"
                >
                  subscribe
                </button>
              </div>
            </div>
          </div> */}
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              Cooperation
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px]">
              <li>Buying property</li>
              <li>Selling property</li>
              <li>Renting and mortgaging property</li>
              <li>Collaboration in buying and selling</li>
            </ul>
          </div>
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              Installment and rent
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px]">
              <li>Buying property</li>
              <li>Selling property</li>
              <li>Renting and mortgaging property</li>
              <li>Collaboration in buying and selling</li>
            </ul>
          </div>
          <div className="max-w-[170px]">
            <h5 className="text-[16px] text-[#00bb7e] font-bold mb-4">
              Buying property
            </h5>
            <ul className="flex flex-col gap-y-2 text-[13px]">
              <li>Buying property</li>
              <li>Selling property</li>
              <li>Renting and mortgaging property</li>
              <li>Collaboration in buying and selling</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="w-full bg-gray-400 my-4 h-[2px]" />
      <div className="bg-footerBackground bg-no-repeat w-full h-[250px] bg-cover flex items-start justify-between px-5 gap-x-10 pt-5">
        <div className="flex items-center cursor-pointer gap-x-4 text-gray-500">
          <Link
            legacyBehavior
            href="https://m.youtube.com/channel/UCixaw5G95nqzR6dAo-IyqWw"
          >
            <a target="_blank">
              <AiOutlineYoutube className="w-7 h-7 hover:text-cyan-500" />
            </a>
          </Link>
          <Link
            legacyBehavior
            href="https://www.facebook.com/profile.php?id=100059272550043&mibextid=LQQJ4d"
          >
            <a target="_blank">
              <AiFillFacebook className="w-7 h-7 hover:text-blue-600" />
            </a>
          </Link>
          <Link legacyBehavior href="https://t.me/evaralife">
            <a target="_blank">
              <FaTelegramPlane className="w-7 h-7 hover:text-blue-600" />
            </a>
          </Link>
          <Link
            legacyBehavior
            href="https://instagram.com/evaralife?igshid=OGQ5ZDc2ODk2ZA=="
          >
            <a target="_blank">
              <AiOutlineInstagram className="w-7 h-7 hover:text-purple-600" />
            </a>
          </Link>
        </div>
        <div>
          <p className="text-gray-600 text-sm">
            All the rights of this website belongs to Evara
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
