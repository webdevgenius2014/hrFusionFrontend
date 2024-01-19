import React from 'react'
import CommonModal from "./commonModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const DeleteDilagBox = (props) => {
  return (
    <CommonModal isOpen={props?.deleteopen} isClose={props?.handleDeleteClose}>
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      sx={{ marginBottom: "20px", fontWeight: "600" }}
    >
      {props?.title}
    </Typography>
    <p>Are you sure want to delete?</p>
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "13px", marginRight: "13px" }}
        onClick={props?.handleDelete}
      >

        {props?.loading ? <>Loading..</> : <>Delete</>}
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "13px" }}
        onClick={props?.handleDeleteClose}
      >
        Cancel
      </Button>
    </Box>
  </CommonModal>
  )
}
