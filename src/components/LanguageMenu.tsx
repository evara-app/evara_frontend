"use client";

import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";

//? import components
import SelectMenu from "@/common/SelectMenu";

//? import other libraries
import { FaGlobe } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";

function LanguageMenu() {
  const [status, setStatus] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string | null>();

  const languageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguage(event.currentTarget.innerText);
    setStatus(null);
  };

  const languageStatusHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setStatus(event.currentTarget);
  };

  const closeLanguageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStatus(null);
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
        status={status}
        handler={languageHandler}
        statusHandler={languageStatusHandler}
        handelrClose={closeLanguageHandler}
      />
    </div>
  );
}

export default LanguageMenu;
