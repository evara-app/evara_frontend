"use client";

import React, { useState } from "react";

//? import components
import CustomSelect from "@/common/CustomSelect";
import TextField from "@/common/TextField";
//? import icons
import { HiChevronDown } from "react-icons/hi";

function page() {
  const [data, setData] = useState({
    section: "",
    topic: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const dataHandler = (event) => {
    console.log(event.target.value);
  };
  return (
    <div className="max-w-2xl flex flex-col gap-y-3">
      <h1 className="text-2xl">Evara Support</h1>
      <p className="text-white-two mt-2">
        Enter your desired address and property information
      </p>
      <div className="relative mt-5 flex flex-col gap-y-1">
        <span>Section</span>
        <button
          onClick={() => setOpen(!open)}
          className="flex text-white-two items-center justify-between p-2 w-full border border-white-two rounded"
        >
          Please select the section for the problem
          <HiChevronDown
            className={`icon text-white-two transition ${
              !open && "rotate-180"
            }`}
          />
        </button>
        {open && <CustomSelect />}
      </div>
      <div>
        <TextField
          label="Topic"
          name="topic"
          placeHolder="Enter the subject of your message"
          type="Text"
          value={data.topic}
          handler={dataHandler}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="textarea">Message</label>
        <textarea
          id="textarea"
          className="rounded border border-white-two p-2 focus:border-green-blue outline-none"
          placeholder="Please explain a little about your problem"
          rows={5}
        ></textarea>
      </div>
      <div className="flex gap-x-2">
        <button className="button">Submit</button>
        <button className="outlineGrayBtn">Cancel</button>
      </div>
    </div>
  );
}

export default page;
