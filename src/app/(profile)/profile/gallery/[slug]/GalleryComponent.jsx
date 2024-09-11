"use client";

import React, { useState, useRef } from "react";

//? import icons
import { IoImagesOutline } from "react-icons/io5";
import { FaTrashCan, FaTruckFieldUn } from "react-icons/fa6";

function GalleryComponent({ images }) {
  const uploadImage = useRef();

  // const { gallery, primary_images } = images;
  const [primaryImages, setPrimaryImages] = useState(images.gallery);

  //delete image handler
  const imageDelHandler = (image) => {
    //   if (mainImages.includes(locations[`image${id}`])) {
    //     const filterImages = mainImages.filter(
    //       (image) => image !== locations[`image${id}`]
    //     );
    //     setMainImages(filterImages);
    //   }
    delete primaryImages[id];
    // handler(locations);
    // setImages(images.filter((img) => img.id !== id));
    // setImagesBlob(imagesBlob.filter((img) => img.id !== id));
  };

  return (
    <div>
      <div className="w-full flex flex-wrap gap-4 justify-center md:justify-start">
        <div>
          <button
            name="images"
            type="button"
            className="border-dashed border-2 dash border-white-two rounded-lg w-64 h-64 flex items-center justify-center hover:text-green-500"
            onClick={() => uploadImage.current.click()}
          >
            <IoImagesOutline className="w-16 h-16" />
          </button>
          <input
            type="file"
            multiple
            name="images"
            ref={uploadImage}
            className="hidden"
            // onChange={thumbnailHandler}
            // onClick={(e) => validation.handleBlur(e)}
          />
        </div>
        {Object.values(primaryImages).map((image) => (
          <div
            key={image}
            className="image-upload-preview relative group"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <button
              onClick={() => imageDelHandler(image)}
              type="button"
              className="absolute top-2 right-2 p-2 bg-gray-700/30 rounded z-10 hover:bg-gray-700/60 transition"
            >
              <FaTrashCan className="w-4 h-4 text-white" />
            </button>
            {/* <div
              id={`image_preview${image.id}`}
              className="image-upload-preview-overlay bg-gray-200/80 z-30"
            ></div>
            <div className="image-upload-preview-overlay flex items-center justify-center">
              <div
                id={`image-upload-progress${image.id}`}
                className="image-upload-preview__progress-overlay"
              >
                <div id={image.id} className="progress-bar__inner"></div>
              </div>
            </div> */}
            {/* {mainImages.includes(locations[`image${image.id}`]) && (
              <span className="absolute top-0 left-0 bg-green-blue text-white p-2 rounded-sm">
                {Number(mainImages.indexOf(locations[`image${image.id}`])) + 1}
              </span>
            )} */}
            <div className="absolute top-0 left-0 hidden group-hover:flex  backdrop-blur-sm w-full h-full items-center justify-center">
              <button
                className="bg-green-700/60 text-white p-2 rounded-md"
                // onClick={() => selectMainImages(image.id)}
              >
                {/* {mainImages.includes(locations[`image${image.id}`])
                  ? `Deselect image ${
                      mainImages.indexOf(locations[`image${image.id}`]) + 1
                    }`
                  : `
                select as image ${mainImages.length + 1}
                `} */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryComponent;
