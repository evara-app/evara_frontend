import React from "react";

function Comments() {
  return (
    <div className="w-full rounded-lg px-2 sm:px-8 sm:pb-6 mb-8 border-b border-zinc-200 p-2">
      <div className="flexItems justify-between">
        <h5 className="text-sm md:text-xl font-bold">Comments</h5>
        <button className="border-2 border-green-blue/50 hover:border-green-blue transition font-medium rounded-md py-2 px-4">
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default Comments;
