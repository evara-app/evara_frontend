import React from "react";

//? import components
import FavCard from "@/common/FavCard";
import Pagination from "@/common/Pagination";

function page() {
  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card) => (
          <FavCard key={card} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination count={10} />
      </div>
    </div>
  );
}

export default page;
