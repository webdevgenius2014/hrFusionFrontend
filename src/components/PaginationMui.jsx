import Pagination from "@mui/material/Pagination";
import MuiPagination from '@mui/material/Pagination';

import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export const CustomPagination = ({ totalPages, setPage, className }) => {
  const [localTotalPages, setLocalTotalPages] = useState(totalPages);

  useEffect(() => {
    setLocalTotalPages(totalPages);
  }, [totalPages]);

  return (
    <Box py={1} display="flex" color='white' justifyContent="center">
      <Pagination
        count={localTotalPages}
        color="secondary"
        variant="outlined"
        onChange={(event, newPage) => {
          setPage(()=>newPage)}
        }
      />
    </Box>
  );
};
