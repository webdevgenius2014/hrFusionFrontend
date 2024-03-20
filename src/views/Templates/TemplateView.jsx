import React from "react";
import CommonModal from "../../components/modal/commonModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import parser from "react-html-parser";
import Button from "@mui/material/Button";

export const TemplateView = (props) => {
  return (
    <CommonModal isOpen={props?.open} isClose={props?.handleClose} title="View Template">
     
        <Box>
          <Box sx={{ my: 2 }}>
            <b>Title:- </b> <span> {props?.data?.title}</span>
          </Box>
          <Box sx={{ my: 2 }}>
            <b>Subject:- </b> <span>{props?.data?.subject}</span>
          </Box>
          <Box sx={{ my: 2 }}>
            <b>Message:- </b> <span>{parser(props?.data?.message)}</span>
          </Box>
          <Box sx={{ position: "absolute", bottom: "30px", left: "50%" }}>
            {props?.apiFun && (
              <Button
                variant="contained"
                onClick={() => props?.apiFun({ template_id: props?.data?.id })}
              >
                Send
              </Button>
            )}
          </Box>
        </Box>
    </CommonModal>
  );
};
