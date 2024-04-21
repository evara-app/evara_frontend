import React from "react";

function TextField({
  id,
  label,
  type,
  placeHolder,
  value,
  name,
  handler,
  error,
}) {
  return (
    <div className="flex flex-col gap-y-1 mt-2">
      <label htmlFor={id} className="flex items-center justify-between">
        {label}
        <span className="text-red-500 text-xs truncate max-w-xs">
          {error && error}
        </span>
      </label>
      <input
        id={id}
        className={`border border-white-two p-2 rounded ${
          error ? "focus:border-red-500" : "focus:border-green-blue"
        } outline-none`}
        type={type}
        placeholder={placeHolder}
        value={value}
        name={name}
        onChange={handler}
      />
    </div>
  );
}

export default TextField;
