"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

//? import icons
import { IoImagesOutline } from "react-icons/io5";

//? import service
import { imageUpload } from "@/services/images";

function SelectImage() {
  const uploadImage = useRef();
  const oneImageReplaceRef = useRef();
  const [currentImage, setCurrentImage] = useState();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  // show thumbnail for user
  const thumbnailHandler = (event) => {
    const files = event.target.files;
    console.log(files);
    Object.keys(files).forEach((item) =>
      setThumbnail((prevstate) => [
        ...prevstate,
        URL.createObjectURL(files[item]),
      ])
    );
  };

  // open the input to change the image
  const oneImageReplaceRefHandler = (image) => {
    oneImageReplaceRef.current.click();
    setCurrentImage(image);
  };

  // replace one image function
  const oneImageHandler = (event) => {
    const files = event.target.files;
    const thumbnailClone = [...thumbnail];
    const currentImageIndex = thumbnail.findIndex((src) => src == currentImage);
    //replace the selected image with new image file
    thumbnailClone.splice(currentImageIndex, 1, URL.createObjectURL(files[0]));
    setThumbnail(thumbnailClone);
  };

  const clearHandler = () => {
    setThumbnail([]);
  };

  const submitHandler = async () => {
    thumbnail.map((image, index) =>
      fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          setImages((prevstate) => [...prevstate, { blob, key: index + 1 }]);
        })
    );
    const links = await imageUpload(images);
    console.log(images, links);
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
          <button
            key={image}
            className="w-64 aspect-w-16 aspect-h-3 rounded-md overflow-hidden relative hover:blur-sm transition duration-300"
            onClick={() => oneImageReplaceRefHandler(image)}
          >
            <Image
              src={image}
              alt="thumbnail"
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <input
              type="file"
              ref={oneImageReplaceRef}
              className="hidden"
              onChange={oneImageHandler}
            />
          </button>
        ))}
      </div>
      <div className="mt-5">
        {thumbnail.length > 0 && (
          <div className="flex items-center gap-x-2 ">
            <button className="button px-10" onClick={submitHandler}>
              Next
            </button>
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
