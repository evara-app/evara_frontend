import React from "react";

function TextField({ id, label, type, placeHolder, value, name, handler }) {
  return (
    <div className="flex flex-col gap-y-1 mt-2">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="border border-white-two p-2 rounded focus:border-green-blue outline-none"
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
