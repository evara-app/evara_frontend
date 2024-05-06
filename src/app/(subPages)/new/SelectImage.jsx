"use client";

import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

//? import icons
import { IoImagesOutline } from "react-icons/io5";
import { FaTrashCan, FaTruckFieldUn } from "react-icons/fa6";

//? import service
import { imageUpload } from "@/services/images";

//? import components
import TeaxtField from "@/common/TextField";

function SelectImage({
  data,
  setData,
  dataHandler,
  handler,
  validation,
  submit,
  stepHandler,
}) {
  const uploadImage = useRef();
  const oneImageReplaceRef = useRef();
  const editorRef = useRef(null);

  const [locations, setLocations] = useState([]);
  const [currentImage, setCurrentImage] = useState();
  const [imagesFinished, setImagesFinished] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesBlob, setImagesBlob] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  // upload images to amazon server and get location of images
  async function uploadImagesAws() {
    const locations = [];
    const locationsArray = {};
    images.forEach(async (image, index, array) => {
      const { Location } = await imageUpload(image).then((data) =>
        data.promise()
      );
      locationsArray[`image${[image.id]}`] = Location;
      locations.push(Location);
      if (locations.length === array.length) {
        handler(locations);
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

  // open the input to change the image
  const oneImageReplaceRefHandler = (image) => {
    oneImageReplaceRef.current.click();
    setCurrentImage(image);
  };

  //delete image handler
  const imageDelHandler = (id) => {
    delete locations[`image${id}`];
    handler(locations);
    setImages(images.filter((img) => img.id !== id));
    setImagesBlob(imagesBlob.filter((img) => img.id !== id));
  };

  const clearHandler = () => {
    setImages([]);
  };

  // check is all inputs validated
  const isValidated = () => {
    const inputs = ["images", "title", "description"];
    const errors = validation.errors;
    const result = inputs.flatMap((input) => (errors[input] ? true : false));
    if (result.indexOf(true) < 0) return setIsDisabled(true);
    setIsDisabled(false);
  };

  useEffect(() => {
    isValidated();
  }, [validation.errors]);

  return (
    <form onSubmit={submit}>
      <label className="flex items-center justify-between mb-2">
        Property images
        <span className="text-red-500 text-xs truncate max-w-xs">
          {validation.touched.images &&
            validation.errors.images &&
            validation.errors.images}
        </span>
      </label>
      <div className="w-full flex flex-wrap gap-4">
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
            name="image3"
            ref={uploadImage}
            className="hidden"
            onChange={thumbnailHandler}
            onClick={(e) => validation.handleBlur(e)}
          />
        </div>
        {imagesBlob.map((image) => (
          <div
            key={image.id}
            className="image-upload-preview"
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
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-y-5">
        <TeaxtField
          id="title"
          label="Title"
          name="title"
          placeHolder="Write your title"
          value={data?.title || ""}
          type="Text"
          error={validation.errors.title || ""}
          touched={validation.touched.title}
          handler={(e) => dataHandler("title", e.target.value)}
          blurHandler={validation.handleBlur}
        />
        {/* tinymce for description */}
        <div>
          <label
            htmlFor="description"
            className="flex items-center justify-between"
          >
            Description
            <span className="text-red-500 text-xs truncate max-w-xs">
              {validation.touched.description &&
                validation.errors.description &&
                validation.errors.description}
            </span>
          </label>
          <Editor
            id="description"
            name="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onSelectionChange={() =>
              dataHandler("description", editorRef.current.getContent())
            }
            onBlur={(e) => validation.handleBlur(e)}
            initialValue=""
            apiKey="zc1euwls8684f7d9ag3r5q5iec187sjbhlvls32ibw1ra6hl"
            init={{
              highlight_on_focus: false,
              selector: "textarea#open-source-plugins",
              plugins:
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view format help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | fullscreen  preview save | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
            }}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-x-2 ">
          <button
            disabled={!isDisabled}
            type="submit"
            className={`${!isDisabled ? "disableButton" : "button"} px-10`}
            onClick={() => stepHandler((prevstate) => prevstate + 1)}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded text-white font-medium bg-red-500 py-2 px-6"
            onClick={clearHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}

export default SelectImage;
