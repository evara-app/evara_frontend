"use client";

import React, { useState } from "react";

//? import mui components
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

//? import other libraries
import { IoChevronDownSharp } from "react-icons/io5";

export default function LinkSelectMenu({ name, links }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        className="text-sm lg:text-base"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "var(--white-two)",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          gap: "0px 1px",
          textTransform: "none",
        }}
      >
        <IoChevronDownSharp className="icon text-white-two" />
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ marginTop: "10px" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {links.map((link) => {
          return (
            <Link key={link.id} href={link.href}>
              <MenuItem className="hover:bg-white-two/30">{link.name}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
}
