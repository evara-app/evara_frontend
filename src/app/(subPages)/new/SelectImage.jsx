"use client";

import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

//? import icons
import { IoImagesOutline } from "react-icons/io5";

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
}) {
  const uploadImage = useRef();
  const oneImageReplaceRef = useRef();
  const editorRef = useRef(null);

  const [currentImage, setCurrentImage] = useState();
  const [imagesFinished, setImagesFinished] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesLink, setImagesLink] = useState([]);

  async function uploadImagesAws() {
    const locationsArray = {};
    images.forEach(async (image, index, array) => {
      const { Location } = await imageUpload(image).then((data) =>
        data.promise()
      );
      locationsArray[`image${[image.id]}`] = Location;
      if (Object.keys(locationsArray).length === array.length)
        handler(locationsArray);
    });
  }

  // show thumbnail for user
  const thumbnailHandler = (event) => {
    const files = event.target.files;
    Object.keys(files).forEach((item, index) => {
      files[item].id = index + 1;
      setImages((prevstate) => [...prevstate, files[item]]);
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

  // replace one image function
  const oneImageHandler = (event) => {
    const files = event.target.files;
    const imagelClone = [...images];
    const currentImageIndex = images.findIndex((src) => src == currentImage);
    //replace the selected image with new image file
    imagelClone.splice(currentImageIndex, 1, files[0]);
    setImages(imagelClone);
  };

  const clearHandler = () => {
    setImages([]);
  };

  const submitHandler = async () => {};

  return (
    <form onSubmit={submit}>
      <label className="flex items-center justify-between mb-2">
        Property images
        <span className="text-red-500 text-xs truncate max-w-xs">
          {validation.touched.image3 &&
            validation.errors.image3 &&
            validation.errors.image3}
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
        {images.map((image) => (
          <div
            key={image.id}
            className="image-upload-preview"
            style={{
              backgroundImage: `url(${URL.createObjectURL(image)})`,
            }}
          >
            <div
              id={`image_preview${image.id}`}
              className="image-upload-preview-overlay bg-gray-200/80"
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
          <button type="submit" className="button px-10">
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
