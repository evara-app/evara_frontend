"use client";

import React, { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { S3 } from "aws-sdk";

//? import components
import TextField from "@/common/TextField";

//? import constants
import { userField } from "@/constants/profile";

//? import services
import { completeProfile } from "@/services/authService";

function page() {
  const avatar = useRef();
  const [avatarThumbnail, setAvatarThumbnail] = useState();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    real_state_name: "",
  });

  // react query complete profile mutaion
  const { isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const dataHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = async () => {
    const message = await mutateAsync(data);
    console.log(message);
  };

  const avatarHandler = async (event) => {
    const file = event.target.files[0];
    setAvatarThumbnail(URL.createObjectURL(file));
    if (file) {
      const s3 = new S3({
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
        endpoint: process.env.LIARA_ENDPOINT,
      });

      const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: file.name,
        Body: file,
      };
      const response = await s3.upload(params).promise();
      setData({ ...data, avatar: response.Location });
    }
  };

  return (
    <div className="grid grid-cols-3 items-center md:p-6 gap-x-20">
      {/* user information section */}
      <div className="col-span-2">
        {userField.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            label={field.label}
            name={field.name}
            placeHolder={field.placeHolder}
            type={field.type}
            value={field.value}
            handler={dataHandler}
          />
        ))}
        <button onClick={submitHandler} className="button mt-5">
          Submit
        </button>
      </div>
      {/* profile image section  */}
      <div className="bg-blue-gray rounded-md col-span-1 p-4 shadow-md">
        <div className="flex flex-col items-center gap-y-6">
          <div className="w-full flex items-center justify-center">
            <img
              className="w-32 h-32 object-cover object-center rounded-full ring-2 ring-aqua-green ring-offset-2"
              src={
                avatarThumbnail ? avatarThumbnail : "/assets/img/profile.jpeg"
              }
              alt="profile image"
            />
          </div>
          <p className="text-white-two text-sm">
            Here you can change your profile image
          </p>
          <div>
            <button
              onClick={() => avatar.current.click()}
              className="outlineGrayBtn"
            >
              Upload Image
            </button>
            <input
              type="file"
              name="avatar"
              className="hidden"
              ref={avatar}
              onChange={avatarHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
