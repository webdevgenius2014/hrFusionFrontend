import React from 'react'
import CommonModal from "./commonModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const DltndConf = (props) => {
  const title = props.title;
  const message = props.message ? props.message : "Are you sure want to delete?" 
  const btnName = props.btnName ? props.btnName :'Delete'; 
  return (
    <CommonModal isOpen={props?.open} isClose={props?.handleClose}>
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      sx={{ marginBottom: "20px", fontWeight: "600" }}
    >
      {title}
    </Typography>
    <p>{message}</p>
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

        {props?.loading ? <>Loading..</> : <>{btnName}</>}
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "13px" }}
        onClick={props?.handleClose}
      >
        Cancel
      </Button>
    </Box>
  </CommonModal>
  )
}
