import React from "react";
import { GridStyle } from "./GridStyle";
import { GridToolbar } from "@mui/x-data-grid";
import { CustomPagination } from "../CustomPagination";
export const CustDataGrid = (props) => {
  const styles = {
    backgroundColor: "white",
  };
  const NewPagination = () => (
    <CustomPagination totalPages={props?.totalPages} setPage={props?.setPage} />
  );

  return (
    <GridStyle
      style={styles}
      rows={props?.data}
      columns={props?.columns}
      loading={props?.loading}
      autoHeight
      pagination
      disableSelectionOnClick
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar, pagination: NewPagination }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      sortingMode="server"
      filterMode="server"
      paginationMode="server"
      sx={{
        fontFamily: "inter",
        color: "#B1B1B1",
        fontWeight: "400",
        height: 300,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#E2EAF5",
          fontWeight: "bold",
          color: "#647691",
        },
      }}
      />
      );
    };
    
    // initialState={{
    //   pagination: { paginationModel: { pageSize: 10 } },
    // }}
    // pageSizeOptions={[10]}
// getRowClassName={(params) =>
//   params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
// }

// slots={{
//   pagination: NewPagination,
// }}
