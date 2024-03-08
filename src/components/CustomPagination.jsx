import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export const CustomPagination = ({ totalPages, setPage }) => {
  const [localTotalPages, setLocalTotalPages] = useState(totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLocalTotalPages(totalPages);
  }, [totalPages]);

  return (
    <Box py={1} display="flex" color="white" justifyContent="center">
      <Stack spacing={2}>
        <Pagination
          count={localTotalPages}
          page={currentPage} 
          showFirstButton
          showLastButton
          color="secondary"
          variant="outlined"
          shape="rounded"
          onChange={(event, newPage) => {
            console.log("new",newPage)
            setPage(() => newPage);
            setCurrentPage(newPage);
          }}
        />
      </Stack>
    </Box>
  );
};
