import React from "react";
import Image from "next/image";
//? import mui
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

//? import utils
import { convertTime } from "@/utils/toLocalTime";

//? import components
import ReplayComment from "@/app/(subPages)/property/[...slug]/ReplayComment";
import RegisterComment from "@/app/(subPages)/property/[...slug]/RegisterComment";
import LoadMore from "@/app/(subPages)/property/[...slug]/LoadMore";

function Comments({ property, comments, count }) {
  return (
    <div className="w-full rounded-lg px-2 sm:px-8 sm:pb-6 mb-8 shadow-boxShadow p-2 bg-box-default-gray">
      <div className="flexItems justify-between">
        <h5 className="text-sm md:text-xl font-bold">Comments</h5>
        <RegisterComment status="parent" id={property.id} />
      </div>
      <Divider sx={{ margin: "10px 0px" }} />
      <div>
        {comments &&
          comments.map((comment) => (
            <React.Fragment>
              <div className="border border-gray-200 rounded-md p-2 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    {comment?.author?.avatar ? (
                      <Avatar
                        src={comment?.author?.avatar}
                        alt="profile-image"
                        sx={{ width: "36px", height: "36px", fontSize: "16px" }}
                      ></Avatar>
                    ) : (
                      <Avatar
                        sx={{ width: "36px", height: "36px", fontSize: "16px" }}
                      >
                        {comment?.author?.first_name.charAt(0)}
                      </Avatar>
                    )}
                    <div className="flex flex-col items-start">
                      <h5 className="text-gray-default">
                        {comment?.author?.first_name} -
                        {comment?.author?.last_name}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {convertTime(comment?.created_at, "en-US")}
                      </p>
                    </div>
                  </div>
                  <RegisterComment
                    parentComment={comment}
                    status="children"
                    id={property.id}
                    replayId={comment.id}
                  />
                </div>
                <Divider sx={{ margin: "10px 0px" }} />
                <div>
                  <p className="text-gray-default">{comment?.text}</p>
                </div>
              </div>
              {comment?.replies.length > 0 && (
                <ReplayComment
                  parentComment={comment}
                  propertyId={property.id}
                  comments={comment?.replies}
                />
              )}
            </React.Fragment>
          ))}
      </div>
      <LoadMore count={count} />
    </div>
  );
}

export default Comments;
