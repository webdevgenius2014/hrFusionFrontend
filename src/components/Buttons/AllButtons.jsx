import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

export const  AddButton = (props) => {
  return (
    <Button
      startIcon={<AddIcon />}
      variant="contained"
      onClick={props?.onClick}
      sx={{ mt: 3, mb: 2, px: 3, display: "flex", margin: "8px auto 8px auto", background:'#5D87FF ' }}
    >
      {props?.children}
    </Button>
  );
};


export const Buttons = (props) => {
  return (
    <Button
      variant="contained"
      color={props?.color === undefined ? 'primary' : props?.color}
      sx={{ mt: 3, mb: 2, px: 3, display: "flex", margin: "8px auto 8px auto",  }}
      onClick={props?.onClick}
    >
      {props?.children}
    </Button>
  );
};


