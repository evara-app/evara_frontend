"use client";

import React, { useState, useRef, useEffect } from "react";

//? import icons
import { IoImagesOutline } from "react-icons/io5";
import { FaTrashCan, FaTruckFieldUn } from "react-icons/fa6";

//? import service
import { imageUpload } from "@/services/images";

function GalleryComponent({ DBImages }) {
  const uploadImage = useRef();

  // const { gallery, primary_images } = images;
  const [locations, setLocations] = useState([]);
  const [imagesFinished, setImagesFinished] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesBlob, setImagesBlob] = useState([]);

  const [primaryImages, setPrimaryImages] = useState(DBImages.primary_images);
  const [galleryImages, setGalleryImages] = useState(
    DBImages.gallery.filter(
      (img) =>
        img.file !==
        Object.values(primaryImages).find((item) => item === img.file)
    )
  );

  // upload images to amazon server and get location of images
  async function uploadImagesAws() {
    let imagesLocation = [];
    const locationsArray = {};
    images.forEach(async (image, index, array) => {
      const { Location } = await imageUpload(image).then((data) =>
        data.promise()
      );
      locationsArray[`image${[image.id]}`] = Location;
      imagesLocation.push(Location);
      if (imagesLocation.length === array.length) {
        // handler(imagesLocation);
        setLocations(locationsArray);
      }
    });
  }

  // show thumbnail for user
  const thumbnailHandler = (event) => {
    let id = images.length && images[images.length - 1].id;
    const files = event.target.files;
    Object.keys(files).forEach((item, index) => {
      files[item].id = id ? id + index + 1 : index + 1;
      setImages((prevstate) => [...prevstate, files[item]]);
      setImagesBlob((prevstate) => [
        ...prevstate,
        { id: files[item].id, blob: URL.createObjectURL(files[item]) },
      ]);
    });
    setImagesFinished(files);
  };

  useEffect(() => {
    if (imagesFinished.length) uploadImagesAws();
  }, [imagesFinished]);

  console.log(
    "images",
    images,
    "images blob",
    imagesBlob,
    "finish",
    imagesFinished
  );

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

  const selectMainImages = (file) => {
    if (Object.values(primaryImages) !== file) {
      const key = Object.keys(primaryImages).length + 1;
      setPrimaryImages({ ...primaryImages, [key]: file });
      return;
    }
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
            onChange={thumbnailHandler}
            // onClick={(e) => validation.handleBlur(e)}
          />
        </div>
        {Object.keys(primaryImages).map((id) => (
          <div
            key={id}
            className="image-upload-preview relative group"
            style={{
              backgroundImage: `url(${primaryImages[id]})`,
            }}
          >
            <button
              onClick={() => imageDelHandler(id)}
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
                {Object.values(primaryImages).includes(primaryImages[id])
                  ? `Deselect image ${id}`
                  : `
                select as image ${Object.keys(primaryImages).length + 1}
                `}
              </button>
            </div>
          </div>
        ))}
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="image-upload-preview relative group"
            style={{
              backgroundImage: `url(${img.file})`,
            }}
          >
            <button
              onClick={() => imageDelHandler(img.id)}
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
                onClick={() => selectMainImages(img.file)}
              >
                {Object.values(primaryImages).includes(img.file)
                  ? `Deselect image ${Object.values(primaryImages).indexOf(
                      img.file
                    )}`
                  : `
                select as image ${Object.keys(primaryImages).length + 1}
                `}
              </button>
            </div>
          </div>
        ))}
        {imagesBlob.map((image) => (
          <div
            key={image.id}
            className="image-upload-preview relative group"
            style={{
              backgroundImage: `url(${image.blob})`,
            }}
          >
            <button
              onClick={() => imageDelHandler(image.id)}
              type="button"
              className="absolute top-2 right-2 p-2 bg-gray-700/30 rounded z-10 hover:bg-gray-700/60 transition"
            >
              <FaTrashCan className="w-4 h-4 text-white" />
            </button>
            <div
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
            </div>
            {/* {mainImages.includes(locations[`image${image.id}`]) && (
              <span className="absolute top-0 left-0 bg-green-blue text-white p-2 rounded-sm">
                {Number(mainImages.indexOf(locations[`image${image.id}`])) + 1}
              </span>
            )} */}
            <div className="absolute top-0 left-0 hidden group-hover:flex  backdrop-blur-sm w-full h-full items-center justify-center">
              <button
                className="bg-green-700/60 text-white p-2 rounded-md"
                onClick={() => selectMainImages(image.file)}
              >
                {Object.values(primaryImages).includes(image.file)
                  ? `Deselect image ${Object.values(primaryImages).indexOf(
                      image.file
                    )}`
                  : `
                select as image ${Object.keys(primaryImages).length + 1}
                `}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryComponent;
