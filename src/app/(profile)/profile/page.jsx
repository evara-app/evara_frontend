"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { S3 } from "aws-sdk";

//? import components
import TextField from "@/common/TextField";

//? import constants
import { userField } from "@/constants/profile";
import Loading from "@/common/Loading";

//? import services
import { completeProfile } from "@/services/authService";

//? import hooks
import { useGetUser } from "@/hooks/useAuth";
import { Toast } from "@/hooks/Toast";

//? import utils
import { includeObj } from "@/utils/objectUtils";

function page() {
  const { data: userData } = useGetUser();
  const { results: user } = userData || {};
  const queryClient = useQueryClient();

  const avatar = useRef();

  const includeskey = ["first_name", "last_name", "avatar", "real_state_name"];
  const [avatarThumbnail, setAvatarThumbnail] = useState();
  const [data, setData] = useState({});

  // react query complete profile mutaion
  const { isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const dataHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = async () => {
    try {
      const { results } = await mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      Toast("success", results.en);
    } catch (error) {}
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

  useEffect(() => {
    if (user) setData(includeObj(user, includeskey));
  }, [user]);

  return (
    <div
      className={`grid grid-cols-3 items-center md:p-6 gap-x-20 transition duration-300 ${
        !user && "blur"
      }`}
    >
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
            value={data[field.name] || ""}
            handler={dataHandler}
          />
        ))}
        {isPending ? (
          <div className="flex justify-start max-w-xs">
            <Loading />
          </div>
        ) : (
          <button onClick={submitHandler} className="button mt-5">
            Submit
          </button>
        )}
      </div>
      {/* profile image section  */}
      <div className="bg-blue-gray rounded-md col-span-1 p-4 shadow-md">
        <div className="flex flex-col items-center gap-y-6">
          <div className="w-full flex items-center justify-center">
            <img
              className="w-32 h-32 object-cover object-center rounded-full ring-2 ring-aqua-green ring-offset-2"
              src={
                avatarThumbnail
                  ? avatarThumbnail
                  : user?.avatar || "/assets/img/user.png"
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
