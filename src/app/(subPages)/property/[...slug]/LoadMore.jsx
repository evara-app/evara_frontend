"use client";

import React, { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

//? import icons
import { FaChevronDown } from "react-icons/fa6";

function LoadMore({ count }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const size = Number(searchParams.get("commentSize")) || 4;

  // query handler
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const loadHandler = (event) => {
    router.push(pathname + "?" + createQueryString("commentSize", size + 5));
  };

  if (count <= size) return;
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <button
          className="text-lg py-3 bg-green-500 text-white rounded-full px-4 flex items-center justify-center gap-x-2 flex-row-reverse mt-5"
          onClick={loadHandler}
        >
          Load more <FaChevronDown className="icon text-white" />
        </button>
      </div>
    </div>
  );
}

export default LoadMore;
