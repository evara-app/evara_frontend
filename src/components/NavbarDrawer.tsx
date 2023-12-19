"use client";

import * as React from "react";

//? import mui
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//? import icons
import { IoMenu } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { HiGlobeAlt } from "react-icons/hi2";

type Anchor = "left" | "right";

export default function SwipeableTemporaryDrawer() {
  const [activeLi, setActiveLi] = React.useState<string | null>(
    "Property List"
  );

  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const listItems = [
    {
      id: 1,
      label: "Property List",
      icon: (
        <HiOutlineSearch
          className={
            activeLi === "Property List"
              ? "!text-green_blue menuIcon"
              : "menuIcon"
          }
        />
      ),
    },
    {
      id: 2,
      label: "Add a property",
      icon: (
        <HiOutlineViewGridAdd
          className={
            activeLi === "Add a property"
              ? "!text-green_blue menuIcon"
              : "menuIcon"
          }
        />
      ),
    },
    {
      id: 1,
      label: "Log in",
      icon: (
        <HiOutlineUser
          className={
            activeLi === "Log in" ? "!text-green_blue menuIcon" : "menuIcon"
          }
        />
      ),
    },
    {
      id: 1,
      label: "FAQ",
      icon: (
        <HiOutlineQuestionMarkCircle
          className={
            activeLi === "FAQ" ? "!text-green_blue menuIcon" : "menuIcon"
          }
        />
      ),
    },
    {
      id: 1,
      label: "Evara Blog",
      icon: (
        <HiOutlineNewspaper
          className={
            activeLi === "Evara Blog" ? "!text-green_blue menuIcon" : "menuIcon"
          }
        />
      ),
    },
    {
      id: 1,
      label: "About us",
      icon: (
        <HiOutlineInformationCircle
          className={
            activeLi === "About us" ? "!text-green_blue menuIcon" : "menuIcon"
          }
        />
      ),
    },
    {
      id: 1,
      label: "Choose Currency",
      icon: (
        <HiOutlineCurrencyDollar
          className={
            activeLi === "Choose Currency"
              ? "!text-green_blue menuIcon"
              : "menuIcon"
          }
        />
      ),
    },
    {
      id: 1,
      label: "Choose language",
      icon: (
        <HiGlobeAlt
          className={
            activeLi === "Choose language"
              ? "!text-green_blue menuIcon"
              : "menuIcon"
          }
        />
      ),
    },
  ];

  //*   menu open and close handler
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  //* list of menu li
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: "5px 0px" }}>
        {listItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ display: "flex", alignItems: "center", gap: "0px 5px" }}
            >
              {item.label === activeLi && (
                <img
                  src="indicator.svg"
                  alt="indicator"
                  width="17"
                  height="84"
                  decoding="async"
                  data-nimg="1"
                  className="absolute h-20 -left-1 -top-4 z-10 md:hidden rotate-180"
                  loading="lazy"
                  style={{ color: "transparent" }}
                ></img>
              )}
              {item.icon}
              <ListItemText
                className={item.label === activeLi ? "text-green_blue" : ""}
                primary={item.label}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    //* menu button in ui
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="appearance-none"
            onClick={toggleDrawer(anchor, true)}
          >
            <IoMenu className="icon w-8 h-8" />
          </button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
