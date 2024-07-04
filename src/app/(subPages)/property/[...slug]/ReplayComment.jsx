import React from "react";

//? import mui
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";

//? import utils
import { convertTime } from "@/utils/toLocalTime";

//? import icons
import { BsArrowReturnRight } from "react-icons/bs";

//? import components
import RegisterComment from "@/app/(subPages)/property/[...slug]/RegisterComment";

function ReplayComment({ parentComment, propertyId, comments }) {
  return (
    <div className="relative">
      <div className="absolute left-0">
        <BsArrowReturnRight className="icon text-gray-default" />
      </div>
      <div className="mt-2 ms-6 relative">
        {comments.length > 0 &&
          comments.map((comment) => (
            <React.Fragment>
              <div className="border border-gray-200 rounded-md p-2 mt-2">
                <div className="w-full flex items-center justify-between">
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
                        {comment?.author?.first_name} -{" "}
                        {comment?.author?.last_name}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        {convertTime(comment?.created_at, "en-US")}
                      </p>
                    </div>
                  </div>
                  {/* <RegisterComment
                    parentComment={parentComment}
                    status="children"
                    id={propertyId}
                    replayId={comment.id}
                  /> */}
                </div>
                <Divider sx={{ margin: "10px 0px" }} />
                <div>
                  <p className="text-gray-default">{comment?.text}</p>
                </div>
              </div>
              {comment?.replies.length > 0 &&
                comment?.replies.map((rep) => (
                  <ReplayComment
                    parentComment={comment}
                    propertyId={propertyId}
                    comments={[rep]}
                  />
                ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default ReplayComment;
