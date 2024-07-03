"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";

//? import hooks
import { Toast } from "@/hooks/Toast";
import { useGetUser } from "@/hooks/useAuth";

//? import modal
import Modal from "@mui/material/Modal";

//? import service
import { likeProperty } from "@/services/properties";

//? icons
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShare } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";
import { MdOutlineContentCopy } from "react-icons/md";
import { FcLike } from "react-icons/fc";

function SaveAndShare({ property }) {
  const { data: user } = useGetUser();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [operation, setOperation] = useState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOperation("");
    setOpen(false);
  };

  const likeHandler = async () => {
    if (!user) return router.push("/auth");
    try {
      const { results } = await likeProperty(property.id);
      Toast("success", results.en);
      router.refresh(pathname + "?" + searchParams.toString());
    } catch (error) {
      Toast("error", results.en);
    }
  };

  const propertyLink = "https://evara.com.tr/";
  return (
    <div>
      <div className="flexItems gap-x-2">
        <button className="flexItems" onClick={likeHandler}>
          {property.liked ? (
            <FcLike className="saveAndShareBtn" />
          ) : (
            <HiOutlineHeart className="icon-stroke saveAndShareBtn" />
          )}
          save
        </button>
        <button className="flexItems" onClick={handleOpen}>
          <HiOutlineShare className="icon-stroke saveAndShareBtn" /> share
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="bg-white w-full max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg" id="child-modal-title">
              Share
            </h2>
            <button className="cursor-pointer" onClick={handleClose}>
              <GrFormClose className="w-7 h-7 text-gray-default cursor-pointer" />
            </button>
          </div>
          <hr className="my-4" />
          <div className="mb-5">
            <h4 className="text-start mb-5">
              Share this propery with your friends!
            </h4>
            <CopyToClipboard
              text={propertyLink}
              onCopy={() => {
                Toast("success", "The desired text was copied");
                setOpen(false);
              }}
            >
              <button className="flex items-center justify-center gap-x-2 w-full border border-gray-600 rounded-lg py-2 px-4 text-sm">
                <MdOutlineContentCopy className="text-gray-600 w-5 h-5" />
                <span>Copy link</span>
              </button>
            </CopyToClipboard>
          </div>
          <div className="flex flex-col items-center gap-y-4">
            <div className="w-full flex items-center gap-x-4">
              <WhatsappShareButton
                className="shareIcons !bg-[#25D366]"
                title={property?.title}
                url={propertyLink}
              >
                <span>WhatsApp</span>
                <span>
                  <WhatsappIcon size={32} round={true} />
                </span>
              </WhatsappShareButton>
              <TwitterShareButton
                className="shareIcons !bg-[#00ACED]"
                title={property?.title}
                url={propertyLink}
              >
                <span>Twitter</span>
                <span>
                  <TwitterIcon size={32} round={true} />
                </span>
              </TwitterShareButton>
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FacebookShareButton
                className="shareIcons !bg-[#0965fe]"
                title={property?.title}
                url={propertyLink}
              >
                <span>Facebook</span>
                <span>
                  <FacebookIcon size={32} round={true} />
                </span>
              </FacebookShareButton>
              <TelegramShareButton
                className="shareIcons !bg-[#25a3e3]"
                title={property?.title}
                url={propertyLink}
              >
                <span>Telegram</span>
                <span>
                  <TelegramIcon size={32} round={true} />
                </span>
              </TelegramShareButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SaveAndShare;
