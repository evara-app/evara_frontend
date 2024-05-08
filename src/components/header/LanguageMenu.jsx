"use client";

import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";

//? import components
import SelectMenu from "@/common/SelectMenu";

//? import other libraries
import { FaGlobe } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";

function LanguageMenu() {
  const [status, setStatus] = useState(false);
  const [language, setLanguage] = useState();

  const languageHandler = (event) => {
    setLanguage(event.currentTarget.innerText);
    setStatus(false);
  };

  const languageStatusHandler = (event) => {
    setStatus(event.currentTarget);
  };

  const closeLanguageHandler = (event) => {
    setStatus(false);
  };
  return (
    <div>
      <SelectMenu
        name={
          <>
            <IoChevronDownSharp className="icon" />
            <FaGlobe className="icon" />
          </>
        }
        list={[
          { id: 1, name: "فارسی" },
          { id: 2, name: "English" },
          { id: 3, name: "Türkçe" },
          { id: 4, name: "русский" },
          { id: 5, name: "العربية" },
        ]}
        type="default"
        status={status}
        handler={languageHandler}
        statusHandler={languageStatusHandler}
        handelrClose={closeLanguageHandler}
      />
    </div>
  );
}

export default LanguageMenu;
