import React from "react";

//? import mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationComponent({ count }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
}

export default PaginationComponent;
