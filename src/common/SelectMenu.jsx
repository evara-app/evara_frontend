"use client";

import * as React from "react";

//? import mui components
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function SelectMenu({
  name,
  list,
  status,
  handler,
  statusHandler,
  handelrClose,
  type,
}) {
  const open = status;
  return (
    <div className="max-w-[50px] font-sans">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={statusHandler}
        sx={{
          color: "var(--white-two)",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          gap: "0px 2px",
        }}
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={status}
        open={open}
        onClose={handelrClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          marginTop: "10px",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {list.map((menuItem) => {
          return (
            <MenuItem
              className="hover:bg-white-two/30"
              key={menuItem.id}
              onClick={() => handler(menuItem.id)}
            >
              <span className="w-full text-center">
                {type === "currency" ? menuItem.abbreviation : menuItem.name}
              </span>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
