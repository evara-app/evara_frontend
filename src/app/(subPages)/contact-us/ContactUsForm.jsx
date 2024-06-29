import React from "react";

//? import constants
import { contactUsForm } from "@/constants/contactUs";

function ContactUsForm() {
  return (
    <form className="flex-auto w-96 p-2 flex flex-col gap-y-3 h-full m-auto">
      {contactUsForm.map((input) =>
        input.name !== "message" ? (
          <label htmlFor={input.id}>
            <span className="ps-1 text-gray-default">{input.label}</span>
            <input
              key={input.id}
              id={input.id}
              name={input.name}
              placeholder={input.placeholder}
              className="w-full border border-gray-200 p-3 focus:outline-none focus:border-green-dark rounded-md shadow-sm"
            />
          </label>
        ) : (
          <label htmlFor={input.id}>
            <span className="ps-1 text-gray-default">{input.label}</span>
            <textarea
              key={input.id}
              id={input.id}
              name={input.name}
              rows={5}
              placeholder={input.placeholder}
              className="w-full border border-gray-200 p-3 focus:outline-none focus:border-green-dark rounded-md shadow-sm"
            ></textarea>
          </label>
        )
      )}
      <button className="button max-w-xs">Send Message</button>
    </form>
  );
}

export default ContactUsForm;
