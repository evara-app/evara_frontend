import React from "react";

//? import icons
import SupportIcon from "&/assets/svg/support.svg";
import MessageIcon from "&/assets/svg/message.svg";

function PropertyAgent() {
  return (
    <div className="w-full md:mx-auto">
      <div className="flex flex-col">
        <div className="w-full rounded-lg shadow-[0_0_5px_0_rgba(0,0,0,0.15)] p-4 mb-8 border border-zinc-200">
          <div className="flex items-center md:items-start md:flex-col my-4 md:my-0">
            <div className="w-20 h-[70px] md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px] md:mx-auto overflow-hidden rounded-full">
              <img
                src="https://backoffice.evara.com.tr/media/users/IMG_4977_huNyiV4.jpg"
                alt="contactUs"
                className=" w-full h-auto rounded-full"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center md:gap-y-4 md:my-4">
              <h1 className="font-bold text-lg lg:text-2xl">
                Elham Derakhshandeh
              </h1>
              <span className="text-white-two">Real estate consultant</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-0 md:flex-col md:items-start">
            <span className="flex items-center justify-center gap-x-2 bg-gray-default/80 w-full rounded-lg text-clip text-white font-bold py-1 md:py-4 mb-4">
              <SupportIcon className="svgIcon text-white" />
              Call counseling
            </span>
            <span className="flex items-center justify-center gap-x-2 bg-transparent border border-green-blue w-full rounded-lg text-clip text-white-two font-bold py-1 md:py-4 mb-4">
              <MessageIcon className="svgIcon" />
              Send message
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyAgent;