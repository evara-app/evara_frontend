import React from "react";

//? import mui
import Divider from "@mui/material/Divider";

function Poster() {
  return (
    <div className="grid grid-cols-12 py-5">
      <div className="col-span-12 md:col-span-7 lg:col-span-6 bg-green-dark text-center md:text-start p-2 md:p-10">
        <h1 className="text-white text-4xl leading-snug font-bold">
          Experience living in luxury and affordable homes with the Evara
          website
        </h1>
        <p className="text-white text-base mt-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
          architecto adipisci consequatur inventore ab consectetur molestias
          quasi vero minima commodi animi dolorum quia blanditiis, atque laborum
          non incidunt quod officia?
        </p>
        <Divider
          sx={{
            backgroundColor: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <form className="text-white mt-10">
          <h5 className="text-xl">Subscribe to the newsletter</h5>
          <div className="relative w-full mt-3">
            <input
              type="text"
              className="w-full bg-transparent border border-white placeholder:text-gray-300 focus:outline-none rounded p-3"
              placeholder="Inster your email to receiving the latest property special offers and news"
            />
            <button
              type="submit"
              className="rounded bg-white font-medium text-green-dark py-2 px-6 absolute end-0 h-full top-0"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div
        className="w-full col-span-5 lg:col-span-6 bg-posterBackground hidden md:block"
        style={{
          backgroundPosition: "center center",
          minHeight: "40vh",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

export default Poster;
