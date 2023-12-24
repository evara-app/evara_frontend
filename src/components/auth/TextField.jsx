import React from "react";

//? mui components
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

function TextField({ label, value, type, icon, iconHandler, fieldHandler }) {
  return (
    <div>
      <FormControl
        sx={{ width: "100%" }}
        variant="outlined"
        className="border border-red-700"
      >
        <InputLabel
          sx={{ "&.Mui-focused": { color: "var(--green_blue)" } }}
          htmlFor={label}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id={label}
          type={type}
          value={value}
          onChange={fieldHandler}
          sx={{ borderRadius: "7px", color: "var(--white-two)" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={iconHandler} edge="end">
                {icon}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </div>
  );
}

export default TextField;
