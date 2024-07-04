"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//? import mui
import Modal from "@mui/material/Modal";

//? import icons
import { IoArrowRedoOutline } from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import Divider from "@mui/material/Divider";

//? import service
import { submitComment } from "@/services/properties";

//? import hooks
import { Toast } from "@/hooks/Toast";

function RegisterComment({
  parentComment = {},
  status,
  id,
  replayId = null,
  replayTo,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  //react query
  const { mutateAsync: postComment } = useMutation({
    mutationFn: submitComment,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const commentHandler = () => {
    setOpen(true);
    console.log(id, replayId);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { results } = await postComment(data);
      Toast("success", results.en);
      router.refresh(pathname + "?" + searchParams.toString());
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData({
      property: id,
      reply_to: replayId,
    });
  }, []);

  return (
    <div>
      {status === "parent" ? (
        <button
          className="border-2 border-green-blue/50 hover:border-green-blue transition font-medium rounded-md py-1 px-4"
          onClick={commentHandler}
        >
          Add Comment
        </button>
      ) : (
        <button
          className="border text-gray-default text-sm border-gray-300 hover:border-gray-400 transition font-medium rounded-md py-1 px-2 flex  items-center gap-x-1"
          onClick={commentHandler}
        >
          <IoArrowRedoOutline className="icon  text-gray-default" />
          Replay
        </button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form className="bg-box-default-gray w-full max-w-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg" id="child-modal-title">
                {replayId
                  ? `replay To : ${parentComment?.author?.first_name} ${parentComment?.author?.last_name}`
                  : "Register Comment"}
              </h2>
              <p className="text-gray-400 text-sm">Write your comment below</p>
            </div>
            <button className="cursor-pointer" onClick={handleClose}>
              <GrFormClose className="w-7 h-7 text-gray-default cursor-pointer" />
            </button>
          </div>
          <Divider sx={{ margin: "10px 0px" }} />
          <div className="flex flex-col gap-y-1 items-start w-full">
            <label htmlFor="comment">Comment text</label>
            <textarea
              name="comment"
              id="comment"
              rows={5}
              className="bg-white w-full focus:outline-none rounded-md p-2 border border-border-gray focus:border-green-blue"
              onChange={(event) =>
                setData({ ...data, text: event.target.value })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className="button mt-5 w-full"
            onClick={submitHandler}
          >
            Submit Comment
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default RegisterComment;
