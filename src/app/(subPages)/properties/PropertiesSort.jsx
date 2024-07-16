"use client";

import React, { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

//? import icons
import { CiCircleList, CiSearch } from "react-icons/ci";
import { BsGrid, BsSliders } from "react-icons/bs";

//? import mui
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

//? import components
import AdvanceSearch from "@/app/(subPages)/properties/AdvanceSearch";

//? import hooks
import {
  useGetCountry,
  useGetAllCities,
  useGetAllProvince,
  useGetRooms,
  useGetPropertyFields,
} from "@/hooks/propertyDetails";
import { useGetAllCategories } from "@/hooks/useCategories";

//? import constants
import { PropertiesFilter } from "@/constants/propertiesFilters";

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

// convert this filter to string
const notValItems = ["country", "minPrice", "maxPrice", "minGross", "maxGross"];

export const dynamic = "force-static";
export const revalidate = 86400000;

function PropertiesSort({
  count,
  queries,
  categories,
  countries,
  propertyFields,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [options, setOptions] = useState({});
  const [view, setView] = useState(0);
  const [sort, setSort] = useState();
  const [activeView, setActiveView] = useState();
  const [chipQueries, setChipQueries] = useState();
  const [open, setOpen] = useState(false);
  const [generalSearch, setGeneralSearch] = useState("");
  const [state, setState] = React.useState({
    bottom: false,
  });

  // const { data: allCategories, isLoading } = useGetAllCategories();
  // const { results: categories } = allCategories || {};
  // const { data: country } = useGetCountry();
  // const { data: cities } = useGetAllCities();
  // const { data: provinces } = useGetAllProvince();
  // const { data: rooms } = useGetRooms();
  // const { data: propertyFields } = useGetPropertyFields();
  // const { another_features } = propertyFields?.data || {};
  // const transactionType = [
  //   {
  //     id: "BU",
  //     name: "Sell",
  //     type: "Sell",
  //   },
  //   {
  //     id: "RE",
  //     name: "Rent",
  //     type: "Rent",
  //   },
  //   {
  //     id: "DR",
  //     name: "Daily rent",
  //     type: "Rent",
  //   },
  // ];

  // query handler
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const createGeneralSearchQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams();
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

  const handleDelete = (event) => {
    const params = new URLSearchParams(queries);
    console.log(params);
  };

  useEffect(() => {
    setSort(searchParams.get("ordering") || "-created_at");
    setActiveView(searchParams.get("viewType") || 3);
    setChipQueries(queries);
  }, [searchParams]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const generalSearchHandler = () => {
    router.push(
      pathname + "?" + createGeneralSearchQueryString("search", generalSearch)
    );
  };

  // useEffect(() => {
  //   const updatedOptions = { ...options };
  //   if (country && cities && provinces && rooms && another_features) {
  //     const transformData = (data) =>
  //       data.map((item) => ({ label: item.name, value: item.id }));
  //     updatedOptions.country = transformData(country);
  //     updatedOptions.provinces = transformData(provinces);
  //     updatedOptions.cities = transformData(cities);
  //     updatedOptions.room = transformData(rooms);
  //     updatedOptions.features = transformData(another_features);
  //     updatedOptions.transactionType = transformData(transactionType);
  //     categories &&
  //       Object.keys(categories).map((item) => {
  //         updatedOptions.propertyType = transformData(categories[item]);
  //       });
  //   }
  //   setOptions(updatedOptions);
  // }, [country, cities, provinces, rooms, another_features, categories]);

  return (
    <div>
      <div>
        <div className="md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ..."
              className="rounded-full w-full border border-gray-200 placeholder:text-gray-default p-3 focus:outline-none focus:border-green-blue"
              onChange={(event) => setGeneralSearch(event.target.value)}
            />
            <CiSearch className="w-7 h-7 text-gray-default absolute end-2 top-1/2 -translate-y-1/2" />
          </div>
          <button className="button mt-2 w-full" onClick={generalSearchHandler}>
            Search
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-x-2 text-xs sm:text-sm md:hidden">
          <button
            className={`${
              activeView == 1
                ? "borderButton text-white bg-gradient-to-tr from-green-blue to-cyan-default"
                : "borderButton"
            }`}
            onClick={() => viewHandler(1)}
          >
            Map search
          </button>
          <div>
            {["bottom"].map((anchor, index) => (
              <React.Fragment key={anchor}>
                <button
                  key={index}
                  className="borderButton flex items-center justify-center gap-x-2"
                  onClick={toggleDrawer(anchor, true)}
                >
                  <BsSliders className="w-4 h-4 text-gray-default" />
                  Filter
                </button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  <div className="px-4 py-10">
                    <AdvanceSearch
                      categories={categories}
                      countries={countries}
                      propertyFields={propertyFields}
                      onClose={toggleDrawer(anchor, false)}
                      isMobile={true}
                    />
                  </div>
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="p-2 rounded-md text-gray-default border border-gray-200 shadow-sm mt-2 md:mt-0">
        <h5 className="font-medium text-lg px-2">Results : {count} </h5>
        <div className="flex items-end gap-x-2 px-2">
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
        <div className="mt-2 p-2">
          <select
            className="md:hidden borderButton border-none bg-gray-100 px-2 py-2 text-gray-default focus:outline-none"
            onChange={sortHandler}
          >
            {sortButtons.map((btn) => (
              <React.Fragment key={btn.id}>
                {sort === btn.query && <option selected>{btn.name}</option>}
                <option
                  selected={sort === btn.query}
                  name={btn.name}
                  value={btn.query}
                >
                  {btn.name}
                </option>
              </React.Fragment>
            ))}
          </select>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between">
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
      <div className="p-2 border border-gray-200 shadow-sm rounded-md hidden">
        <Stack direction="row" spacing={1}>
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack>
      </div>
    </div>
  );
}

export default PropertiesSort;
