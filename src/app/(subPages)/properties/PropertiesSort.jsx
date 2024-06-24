"use client";

import React, { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

//? import icons
import { CiCircleList } from "react-icons/ci";
import { BsGrid } from "react-icons/bs";

//? import mui
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const sortButtons = [
  {
    id: 1,
    name: "Most visited",
    query: "pop_count",
  },
  {
    id: 2,
    name: "Most popular",
    query: "fav_count",
  },
  {
    id: 3,
    name: "The cheapest",
    query: "price",
  },
  {
    id: 4,
    name: "The most expensive",
    query: "-price",
  },
  {
    id: 5,
    name: "Newest",
    query: "-created_at",
  },
];
const viewType = [
  {
    id: 1,
    label: "Map",
    value: "Map",
  },
  {
    id: 2,
    label: "List + Map",
    value: "List-Map",
  },
  {
    id: 3,
    label: "List",
    value: "List",
  },
];

function PropertiesSort({ count }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [view, setView] = useState(0);
  const [sort, setSort] = useState();
  const [activeView, setActiveView] = useState();

  // query handler
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (event) => {
    setSort(event.target.value);
    router.push(
      pathname + "?" + createQueryString("ordering", event.target.value)
    );
  };

  const viewHandler = (value) => {
    setActiveView(value);
    router.push(pathname + "?" + createQueryString("viewType", value));
  };

  useEffect(() => {
    setSort(searchParams.get("ordering") || "-created_at");
    setActiveView(searchParams.get("viewType") || "List");
  }, [searchParams]);

  return (
    <div>
      <div className="p-2 rounded-md text-gray-default border border-gray-200 shadow-sm">
        <h5 className="font-medium text-lg">Results : {count} </h5>
        <div className="flex items-end gap-x-2">
          <p className="mt-1 text-base">List View : </p>
          <div className="flex items-center gap-x-1">
            <button>
              <CiCircleList className="w-6 h-6 text-gray-default" />
            </button>
            <button>
              <BsGrid className="icon text-gray-default" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-1 p-2 flex items-center gap-x-2">
          <h5 className="text-gray-default">Sort : </h5>
          {sortButtons.map((btn) => (
            <button
              key={btn.id}
              className={`${
                sort === btn.query ? "button" : "disableButton"
              } md:px-2 text-sm bg-white`}
              name={btn.name}
              value={btn.query}
              onClick={sortHandler}
            >
              {btn.name}
            </button>
          ))}
        </div>
        <ButtonGroup
          variant="outlined"
          color="success"
          size="small"
          aria-label="Basic button group"
        >
          {viewType.map((btn) => (
            <Button
              key={btn.id}
              className={`${
                btn.value === activeView &&
                "bg-gradient-to-tr from-green-blue to-cyan-default text-white font-medium"
              }`}
              onClick={() => viewHandler(btn.value)}
            >
              {btn.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default PropertiesSort;
