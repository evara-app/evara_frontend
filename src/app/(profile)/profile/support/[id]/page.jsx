import React from "react";
import Link from "next/link";

//? import mui
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

//? import icons
import { HiChevronRight } from "react-icons/hi";

function page() {
  return (
    <div className="p-4 max-w-3xl">
      <div>
        <Breadcrumbs separator={<HiChevronRight />} aria-label="breadcrumb">
          <Link href="#">Support</Link>
          <Link href="#" className="text-black">
            Ticket : 11223344
          </Link>
        </Breadcrumbs>
      </div>
      <Divider className="my-5" />
      <div className="flex flex-col gap-y-1">
        <label htmlFor="textarea" className="text-xl">
          Answer
        </label>
        <textarea
          id="textarea"
          className="rounded border border-white-two p-2 focus:border-green-blue outline-none"
          placeholder="Please explain a little about your problem"
          rows={5}
          name="description"
          //   value={data.description}
          //   onChange={dataHandler}
        ></textarea>
        <div className="flex gap-x-2 mt-2">
          <button className="button">Submit</button>
          <button className="outlineGrayBtn">Cancel</button>
        </div>
      </div>
      <Divider className="my-5" />
      <div className="border-2 border-white-two/50 rounded-lg p-3 mt-5">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center">
            <Link href="/profile">
              <Avatar
                alt="Profile"
                src="/assets/img/profile.jpeg"
                sx={{ width: 56, height: 56 }}
                className="ring-1 ring-offset-1 ring-green-blue"
              />
            </Link>
            <div className="flex flex-auto flex-col justify-start ms-2">
              <Link href="/profile" className="text-gray-default">
                Farhan Ahmadi
              </Link>
              <p className="text-white-two text-xs">website user</p>
            </div>
            <div>
              <p className="text-white-two">1402/12/10</p>
            </div>
          </div>
          <Divider />
          <p className="text-white-two leading-6 text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, enim
            nemo! Aspernatur placeat quas quod, in laboriosam nam? Eius optio
            consequatur sunt saepe voluptatem? Omnis, illo? Culpa maiores dolore
            soluta?
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default page;
