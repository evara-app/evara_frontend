import React from "react";

function TextField({
  id,
  label,
  type,
  placeHolder,
  value,
  currency,
  name,
  handler,
  error,
  touched,
  blurHandler,
}) {
  const items = ["amount", "monthly_administrative_fees"];
  return (
    <div className="flex flex-col gap-y-1 mt-2 relative">
      <label htmlFor={id} className="flex items-center justify-between">
        {label}
        <span className="text-red-500 text-xs truncate max-w-xs">
          {touched && error && error}
        </span>
      </label>
      <div className="w-full relative">
        <input
          id={id}
          className={`border border-white-two p-2 rounded w-full overflow-hidden ${
            error ? "focus:border-red-500" : "focus:border-green-blue"
          } outline-none`}
          type={type}
          placeholder={placeHolder}
          value={value}
          name={name}
          onChange={handler}
          onBlur={blurHandler}
        />
        {items.includes(name) && (
          <div className="absolute end-0 top-0 text-white-two h-full flex items-center justify-center p-2">
            {currency}
          </div>
        )}
      </div>
    </div>
  );
}

export default TextField;
