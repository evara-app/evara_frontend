"use client";

import React, { useState } from "react";

//? import components
import AdvanceSearchSelect from "@/components/properties/AdvanceSearchSelect";

function AdvanceSearch() {
  const [filter, setFilter] = useState({});

  const filterHandler = (event, name) => {
    setFilter({ ...filter, [name]: event.map((item) => item.value) });
  };
  console.log(filter);
  return (
    <div>
      <h5>Advanced Search</h5>
      <AdvanceSearchSelect filter={filter} filterHandler={filterHandler} />
    </div>
  );
}

export default AdvanceSearch;
