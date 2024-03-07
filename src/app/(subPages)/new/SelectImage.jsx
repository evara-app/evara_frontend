"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
//? import icons
import { IoImagesOutline } from "react-icons/io5";

function SelectImage() {
  const uploadImage = useRef();
  const [thumbnail, setThumbnail] = useState([]);

  const thumbnailHandler = (event) => {
    const files = event.target.files;
    Object.keys(files).forEach((item) =>
      setThumbnail((prevstate) => [
        ...prevstate,
        URL.createObjectURL(files[item]),
      ])
    );
  };

  const clearHandler = () => {
    setThumbnail([]);
  };
  return (
    <div>
      <div className="w-full flex flex-wrap gap-4">
        <div>
          <button
            className="border-dashed border-2 dash border-white-two rounded-lg w-64 h-64 flex items-center justify-center hover:text-green-500"
            onClick={() => uploadImage.current.click()}
          >
            <IoImagesOutline className="w-16 h-16" />
          </button>
          <input
            type="file"
            multiple
            ref={uploadImage}
            className="hidden"
            onChange={thumbnailHandler}
          />
        </div>
        {thumbnail.map((image) => (
          <button className="w-64 aspect-w-16 aspect-h-3 rounded-md overflow-hidden relative">
            <Image
              src={image}
              alt="thumbnail"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </button>
        ))}
      </div>
      <div className="mt-5">
        {thumbnail.length > 0 && (
          <div className="flex items-center gap-x-2 ">
            <button className="button px-10">Next</button>
            <button
              className="rounded text-white font-medium bg-red-500 py-2 px-6"
              onClick={clearHandler}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectImage;
